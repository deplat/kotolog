'use server'

import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { prismaErrorHandler } from '@/lib/errorHandlers'

export type Pets = Prisma.PromiseReturnType<typeof getPets>

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
    return await prisma.pet.findMany({
      include: petInclude,
    })
  } catch (error) {
    throw prismaErrorHandler(error)
  }
}

export const cachedPets = unstable_cache(async () => getPets(), ['pets'], {
  tags: ['pets'],
})
