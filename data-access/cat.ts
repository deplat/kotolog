'use server'

import { prisma } from '@/prisma/prisma'
import { unstable_cache } from 'next/cache'
import { getAgeDataFromBirthDate } from '@/utils/getAgeDataFromBirthDate'
import { Prisma } from '@prisma/client'
import { FormattedPetData } from '@/types'

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

const getCats = async (filters: { [key: string]: string | string[] }) => {
  const colorFilters = Array.isArray(filters['colors'])
    ? filters['colors'].map((color) => ({
        name: color,
      }))
    : filters['colors']
      ? [{ name: filters['colors'] }]
      : undefined
  const cats = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
      colors: {
        some: {
          OR: colorFilters,
        },
      },
    },
    select: catSelect,
    orderBy: {
      id: 'desc',
    },
  })
  if (!cats) {
    return {
      success: false,
    }
  } else {
    const data: FormattedPetData[] = cats.map((cat) => {
      const { ageString, ageGroup } = getAgeDataFromBirthDate(cat.birthDate)
      return {
        ...cat,
        ageString,
        ageGroup,
      }
    })
    return {
      success: true,
      data,
    }
  }
}

export const getCachedCats = unstable_cache(getCats, ['pets'], {
  tags: ['pets'],
})
