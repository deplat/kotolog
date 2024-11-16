'use server'

import { prisma } from '@/prisma/prisma'
import { prismaErrorHandler } from '@/utils/errorHandlers'
import { Prisma } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import { PetData } from '@/types'
import { UserRole } from '@/types/UserRole'
import { checkUserRole } from '@/utils/checkUserRole'

export type Pet = Prisma.PromiseReturnType<typeof getPet>
export type Pets = Prisma.PromiseReturnType<typeof getPets>

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

/*  CREATE  */
export const createPet = async (data: PetData) => {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to create pets.`)
    return { success: false, message: 'User is not authorized to create pets.', data: null }
  }
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
      isAdopted: data.isAdopted ? data.isAdopted : false,
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
          healthNotes: {
            createMany: {
              data: data.healthNotes,
            },
          },
          specialties: {
            createMany: {
              data: data.specialties,
            },
          },
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
      ...(data.photos && {
        photos: {
          createMany: {
            data: data.photos,
          },
        },
      }),
    }
    const createdPet = await prisma.pet.create({
      data: createInput,
      include: petInclude,
    })
    revalidateTag('pets')
    revalidateTag('unique_colors_from_cats')
    revalidateTag('availableDogGenders')
    revalidateTag('availableDogFurTypes')
    revalidateTag('availableDogAgeGroups')
    revalidateTag('availableDogColors')
    return { success: true, message: 'Pet created successfully.', data: createdPet }
  } catch (error) {
    const prismaError = prismaErrorHandler(error)
    console.error('Error creating pet:', prismaError.message)
    return {
      success: false,
      message: 'Error creating pet: ' + prismaError.message,
      data: null,
    }
  }
}

export const getPet = async (id: number) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: petInclude,
    })
    return pet
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export const getPetBySlug = async (slug: string) => {
  try {
    return await prisma.pet.findUnique({
      where: { slug },
      select: { id: true, slug: true },
    })
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

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

export const getCachedPets = unstable_cache(getPets, ['pets'], { tags: ['pets'] })

/*  UPDATE  */
export const updatePet = async (id: number, data: PetData) => {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to update pets.`)
    return { success: false, message: 'User is not authorized to update pets.', data: null }
  }
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
      colors: {
        set: data.colors.map((id) => ({ id })),
      },
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
          healthNotes: data.healthNotes?.length
            ? {
                updateMany: {
                  where: { id: { in: data.healthNotes.map((note) => note.id) } },
                  data: data.healthNotes,
                },
              }
            : undefined,
          specialties: data.specialties?.length
            ? {
                updateMany: {
                  where: { id: { in: data.specialties.map((spec) => spec.id) } },
                  data: data.specialties,
                },
              }
            : undefined,
        },
      },
    }

    if (data.avatar) {
      updateInput.avatar = {
        update: {
          src: data.avatar.src,
          width: data.avatar.width,
          height: data.avatar.height,
        },
      }
    }

    if (data.photos && data.photos.length > 0) {
      updateInput.photos = {
        createMany: {
          data: data.photos,
        },
      }
    }

    const updatedPet = await prisma.pet.update({
      where: { id },
      data: updateInput,
      include: petInclude,
    })
    revalidateTag('pets')
    revalidateTag('unique_colors_from_cats')
    revalidateTag('availableDogGenders')
    revalidateTag('availableDogFurTypes')
    revalidateTag('availableDogAgeGroups')
    revalidateTag('availableDogColors')
    return { success: true, message: 'Pet updated successfully.', data: updatedPet }
  } catch (error) {
    const prismaError = prismaErrorHandler(error)
    console.error('Error updating pet:', prismaError.message)
    return {
      success: false,
      message: 'Error updating pet' + prismaError.message,
      data: null,
    }
  }
}

/*  DELETE  */
export const deletePet = async (id: number) => {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to delete pets.`)
    return { success: false, message: 'User is not authorized to delete pets.', data: null }
  }
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
      return { success: false, message: 'Pet not found.', data: null }
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
    revalidateTag('pets')
    revalidateTag('unique_colors_from_cats')
    revalidateTag('availableDogGenders')
    revalidateTag('availableDogFurTypes')
    revalidateTag('availableDogAgeGroups')
    revalidateTag('availableDogColors')
    return { success: true, message: 'Pet deleted successfully.', data: deletedPet }
  } catch (error) {
    const prismaError = prismaErrorHandler(error)
    console.error('Error deleting pet:', prismaError.message)
    return {
      success: false,
      message: 'Error deleting pet: ' + prismaError.message,
      data: null,
    }
  }
}
