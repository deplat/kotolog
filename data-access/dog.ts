'use server'

import { prisma } from '@/prisma/prisma'
import { unstable_cache } from 'next/cache'
import { Prisma } from '@prisma/client'
import { Colors } from '@/data-access/color'
import { getAgeDataFromBirthDate } from '@/utils/getAgeDataFromBirthDate'
import { FormattedPetData } from '@/types'

export type Dogs = Prisma.PromiseReturnType<typeof getDogs>
export type Dog = Prisma.PromiseReturnType<typeof getDogBySlug>

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

const getDogs = async (filters: {
  [key: string]: string | string[]
}): Promise<{
  success: boolean
  message: string
  data: FormattedPetData[]
}> => {
  const colorFilters = Array.isArray(filters['colors'])
    ? filters['colors'].map((color) => ({
        name: color,
      }))
    : filters['colors']
      ? [{ name: filters['colors'] }]
      : undefined

  const dogs = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
      colors: {
        some: {
          OR: colorFilters,
        },
      },
    },
    select: dogSelect,
    orderBy: {
      id: 'desc',
    },
  })

  if (!dogs) {
    return { success: false, message: 'Собаки не найдены', data: [] }
  } else {
    const data = dogs.map((dog) => {
      const { ageString, ageGroup } = getAgeDataFromBirthDate(dog.birthDate)
      return {
        ...dog,
        ageString,
        ageGroup,
      }
    })

    return {
      success: true,
      message: 'Собаки найдены',
      data,
    }
  }
}

export const getCachedDogs = unstable_cache(getDogs, ['pets'], {
  tags: ['pets'],
})

export const getDogBySlug = async (slug: string) => {
  const dog = await prisma.pet.findUnique({
    where: {
      slug,
    },
    select: dogSelect,
  })
  if (!dog) {
    return { success: false, message: 'Собака с таким слагом не найдена', data: null }
  }
  const today = new Date()
  const ageString = dog.birthDate ? getAgeFromDate(dog.birthDate) : ''
  const birthDate = dog.birthDate ? new Date(dog.birthDate) : null
  const ageInYears = birthDate ? today.getFullYear() - birthDate.getFullYear() : 0
  const isKitten =
    birthDate &&
    (ageInYears < 1 || (ageInYears === 1 && today < new Date(birthDate.getFullYear() + 1)))
  return {
    ...dog,
    ageString,
    ageCategory: isKitten ? 'PUPPY' : 'ADULT',
  }
}

const getAvailableDogGenders = async (): Promise<string[]> => {
  const availableDogGenders = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
    },
    select: {
      gender: true,
    },
    distinct: ['gender'],
  })

  // Filter out null values and return only non-null genders
  return availableDogGenders.map((dog) => dog.gender).filter((gender) => gender !== null)
}

export const getCachedAvailableDogGenders = unstable_cache(
  getAvailableDogGenders,
  ['availableDogGenders'],
  {
    tags: ['availableDogGenders'],
  }
)

const getAvailableDogFurTypes = async (): Promise<string[]> => {
  const availableFurTypes = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
    },
    select: {
      furType: true,
    },
    distinct: ['furType'],
  })

  // Filter out null values and return only non-null fur types
  return availableFurTypes.map((dog) => dog.furType).filter((furType) => furType !== null)
}

export const getCachedAvailableDogFurTypes = unstable_cache(
  getAvailableDogFurTypes,
  ['availableDogFurTypes'],
  {
    tags: ['availableDogFurTypes'],
  }
)

const getAvailableDogAgeGroups = async (): Promise<string[]> => {
  const availableDogs = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
    },
    select: {
      birthDate: true,
    },
  })

  const currentDate = new Date()

  return availableDogs.reduce<string[]>((acc, dog) => {
    if (!dog.birthDate) return acc // Skip if birthDate is not available

    const birthDate = new Date(dog.birthDate)
    const ageInYears = currentDate.getUTCFullYear() - birthDate.getUTCFullYear()
    const ageInMonths = currentDate.getUTCMonth() - birthDate.getUTCMonth()

    const totalAgeInYears = ageInYears - (ageInMonths < 0 ? 1 : 0)

    // If age is under 1 year, consider as "puppy"
    if (totalAgeInYears < 1) {
      if (!acc.includes('puppy')) acc.push('PUPPY')
    } else {
      // If age is 1 year or older, consider as "adult"
      if (!acc.includes('adult')) acc.push('ADULT')
    }

    return acc
  }, [])
}

export const getCachedAvailableDogAgeGroups = unstable_cache(
  getAvailableDogAgeGroups,
  ['availableDogAgeGroups'],
  {
    tags: ['availableDogAgeGroups'],
  }
)

const getAvailableDogColors = async () => {
  const availableColors: Colors = await prisma.$queryRaw`
    SELECT DISTINCT "Color"."name" FROM "Color"
    JOIN "_PetColors" ON "_PetColors"."A" = "Color"."id"
    JOIN "Pet" ON "Pet"."id" = "_PetColors"."B"
    WHERE "Pet"."petType" = 'DOG'`
  return availableColors.map((color: { name: string }) => color.name)
}

export const getCachedAvailableDogColors = unstable_cache(
  getAvailableDogColors,
  ['availableDogColors'],
  {
    tags: ['availableDogColors'],
  }
)
