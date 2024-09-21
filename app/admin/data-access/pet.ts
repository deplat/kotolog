'use server'

import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'
import { PetData } from '@/types'
import { prismaErrorHandler } from '@/lib/errorHandlers'

export type Pet = Prisma.PromiseReturnType<typeof getPet>
export type Pets = Prisma.PromiseReturnType<typeof getPets>

/*  CREATE  */
export const createPet = async (data: PetData) => {
  try {
    const createInput: Prisma.PetCreateInput = {
      name: data.name,
      slug: data.slug,
      birthDate: data.birthDate,
      gender: data.gender,
      petType: data.petType,
      furType: data.furType,
      isUnclaimed: data.isUnclaimed,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured,
      isAdopted: data.isAdopted,
      isVisible: data.isVisible,
      profile: {
        create: {
          socialized: data.socialized,
          friendlyWithCats: data.friendlyWithCats,
          friendlyWithDogs: data.friendlyWithDogs,
          friendlyWithAnimals: data.friendlyWithAnimals,
          litterBoxTrained: data.litterBoxTrained,
          usesScratchingPost: data.usesScratchingPost,
          sterilized: data.sterilized,
          vaccinated: data.vaccinated,
          treatedForParasites: data.treatedForParasites,
          healthStatus: data.healthStatus,
          biography: data.biography,
        },
      },
      colors: {
        connect: data.colors.map((id) => ({ id })),
      },
      ...(data.avatar && {
        avatar: {
          create: { src: data.avatar.src, width: data.avatar.width, height: data.avatar.height },
        },
      }),
    }
    const createdPet = await prisma.pet.create({
      data: createInput,
      include: { avatar: true, colors: true },
    })
    try {
      revalidateTag('pets')
      revalidateTag('cats')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
    return createdPet
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

/*  READ  */
const petInclude = Prisma.validator<Prisma.PetInclude>()({
  avatar: {
    select: {
      src: true,
      width: true,
      height: true,
    },
  },
  photos: {
    select: {
      src: true,
      width: true,
      height: true,
    },
  },
  profile: {
    select: {
      socialized: true,
      friendlyWithCats: true,
      friendlyWithDogs: true,
      friendlyWithAnimals: true,
      litterBoxTrained: true,
      usesScratchingPost: true,
      sterilized: true,
      vaccinated: true,
      treatedForParasites: true,
      healthStatus: true,
      healthNotes: {
        select: { id: true, description: true },
      },
      specialties: {
        select: { id: true, description: true },
      },
      biography: true,
    },
  },
  colors: true,
})

export const getPets = async () => {
  try {
    const pets = await prisma.pet.findMany({
      include: petInclude,
    })
    return pets
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export const getPet = async (id: number) => {
  try {
    return await prisma.pet.findUnique({
      where: { id },
      include: petInclude,
    })
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export const getPetBySlug = async (slug: string) => {
  try {
    return await prisma.pet.findUnique({
      where: { slug },
      select: { slug: true },
    })
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export const cachedPets = unstable_cache(async () => getPets(), ['pets'], {
  tags: ['pets'],
})

/*  UPDATE  */
export const updatePet = async (id: number, data: PetData) => {
  try {
    const updateInput: Prisma.PetUpdateInput = {
      name: data.name,
      slug: data.slug,
      birthDate: data.birthDate,
      gender: data.gender,
      petType: data.petType,
      furType: data.furType,
      isUnclaimed: data.isUnclaimed,
      isFeatured: data.isFeatured,
      isAdopted: data.isAdopted,
      isVisible: data.isVisible,
      profile: {
        update: {
          socialized: data.socialized,
          friendlyWithCats: data.friendlyWithCats,
          friendlyWithDogs: data.friendlyWithDogs,
          friendlyWithAnimals: data.friendlyWithAnimals,
          litterBoxTrained: data.litterBoxTrained,
          usesScratchingPost: data.usesScratchingPost,
          sterilized: data.sterilized,
          vaccinated: data.vaccinated,
          treatedForParasites: data.treatedForParasites,
          healthStatus: data.healthStatus,
          biography: data.biography,
        },
      },
    }
    const updatedPet = await prisma.pet.update({ where: { id }, data: updateInput })
    try {
      revalidateTag('pets')
      revalidateTag('cats')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
    return updatedPet
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

/*  DELETE  */
export const deletePet = async (id: number) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: id },
      include: {
        adoptionApplications: true,
        fosterings: true,
        healthRecords: {
          include: {
            medications: true,
            treatments: true,
            vaccinations: true,
          },
        },
        avatar: true,
        photos: true,
        profile: {
          include: {
            healthNotes: true,
            specialties: true,
          },
        },
      },
    })
    if (!pet) {
      throw new Error('Pet not found')
    }
    if (pet.avatar) {
      await prisma.image.delete({
        where: {
          id: pet.avatar.id,
        },
      })
    }

    if (pet.photos.length > 0) {
      await prisma.image.deleteMany({
        where: { petId: pet.id },
      })
    }

    if (pet.profile) {
      if (pet.profile.healthNotes) {
        await prisma.healthNote.deleteMany({
          where: {
            profileId: pet.profile.id,
          },
        })
      }

      if (pet.profile.specialties) {
        await prisma.specialty.deleteMany({
          where: {
            profileId: pet.profile.id,
          },
        })
      }

      await prisma.petProfile.delete({
        where: {
          id: pet.profile.id,
        },
      })
    }
    const deletedPet = await prisma.pet.delete({ where: { id } })
    try {
      revalidateTag('pets')
      revalidateTag('cats')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
    return deletedPet
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}
