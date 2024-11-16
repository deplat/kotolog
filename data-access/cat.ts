'use server'

import { prisma } from '@/prisma/prisma'
import { unstable_cache } from 'next/cache'
import { getAgeDataFromBirthDate } from '@/utils/getAgeDataFromBirthDate'
import { Prisma } from '@prisma/client'

export type Cats = Prisma.PromiseReturnType<typeof getCats>

const catSelect = Prisma.validator<Prisma.PetSelect>()({
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

const getCats = async () => {
  const cats = await prisma.pet.findMany({
    where: {
      petType: 'CAT',
      isVisible: true,
    },
    select: catSelect,
    orderBy: {
      id: 'desc',
    },
  })
  return {
    success: true,
    data: cats.map((cat) => {
      const { ageString, ageGroup } = getAgeDataFromBirthDate(cat.birthDate)
      const catAgeGroup = ageGroup == 'Молодой' ? 'Котёнок' : ageGroup
      return {
        ...cat,
        ageString,
        catAgeGroup,
      }
    }),
  }
}

export const getCachedCats = unstable_cache(async () => getCats(), ['pets'], {
  tags: ['pets'],
})
