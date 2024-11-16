'use server'

import { prisma } from '@/prisma/prisma'
import { unstable_cache } from 'next/cache'
import { Prisma } from '@prisma/client'
import { Colors } from '@/data-access/color'
import { getAgeDataFromBirthDate } from '@/utils/getAgeDataFromBirthDate'
import { FormattedPetData, PetData } from '@/types'

export type Dogs = Prisma.PromiseReturnType<typeof getDogs>
export type Dog = Prisma.PromiseReturnType<typeof getDogBySlug>

const dogWhere = Prisma.validator<Prisma.PetSelect>

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
  const dogs = await prisma.pet.findMany({
    where: {
      petType: 'DOG',
      isVisible: true,
      colors: {
        q,
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
    const data: FormattedPetData[] = dogs.map((dog) => {
      let { ageString, ageGroup } = getAgeDataFromBirthDate(dog.birthDate)
      return {
        ...dog,
        colors: dog.colors.map((color) => color.id),
        ageString,
        ageGroup,
      }
    })

    return {
      success: true,
      message: 'Собаки найдены',
      data: data,
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
