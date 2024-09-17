'use server'

import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { revalidateTag, unstable_cache } from 'next/cache'
import { PetFormData } from '@/types'

/*  CREATE  */
export const createPet = async (data: PetFormData) => {
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
  revalidateTag('pets')
  return createdPet
}

/*  READ  */
const petInclude = Prisma.validator<Prisma.PetInclude>()({
  avatar: true,
  photos: true,
  profile: true,
  colors: true,
})

export const getPet = async (id: number) => {
  try {
    return await prisma.pet.findUnique({
      where: { id },
      include: petInclude,
    })
  } catch (error) {
    throw error
  }
}

export const getPets = async () => {
  return prisma.pet.findMany({
    include: petInclude,
  })
}

export const cachedPets = unstable_cache(async () => getPets(), ['pets'], {
  tags: ['pets'],
})

export type Pet = Prisma.PromiseReturnType<typeof getPet>
export type Pets = Prisma.PromiseReturnType<typeof getPets>

/*  UPDATE  */
export const updatePet = async (id: number, data: PetFormData) => {
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
  revalidateTag('pets')
  return updatedPet
}

/*  DELETE  */
