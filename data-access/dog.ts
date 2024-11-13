'use server'

import { prisma } from '@/prisma/prisma'
import { unstable_cache } from 'next/cache'
import { getAgeFromDate } from '@/utils/getAgeFromDate'
import { Prisma } from '@prisma/client'

export type Dogs = Prisma.PromiseReturnType<typeof getDogs>

const dogSelect = Prisma.validator<Prisma.PetSelect>()({
  id: true,
  slug: true,
  name: true,
  gender: true,
  birthDate: true,
  furType: true,
  colors: {
    select: {
      id: true,
      name: true,
    },
  },
  profile: {
    select: {
      id: true,
    },
  },
  avatar: {
    select: {
      src: true,
      width: true,
      height: true,
    },
  },
})

const getDogs = async () => {
  const dogs = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
    },
    select: dogSelect,
    orderBy: {
      id: 'desc',
    },
  })

  const today = new Date()
  return dogs.map((dog) => {
    const ageString = dog.birthDate ? getAgeFromDate(dog.birthDate) : ''
    const birthDate = dog.birthDate ? new Date(dog.birthDate) : null
    const ageInYears = birthDate ? today.getFullYear() - birthDate.getFullYear() : 0
    const isKitten =
      birthDate &&
      (ageInYears < 1 || (ageInYears === 1 && today < new Date(birthDate.getFullYear() + 1)))
    return {
      ...dog,
      ageString,
      ageCategory: isKitten ? 'puppy' : 'adult',
    }
  })
}

export const getCachedDogs = unstable_cache(async () => getDogs(), ['pets'], {
  tags: ['pets'],
})
