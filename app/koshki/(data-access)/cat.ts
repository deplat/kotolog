import { prisma } from '@/prisma'
import { unstable_cache } from 'next/cache'
import { getAge } from '@/lib/get-age'
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

  const today = new Date()
  return cats.map((cat) => {
    const ageString = cat.birthDate ? getAge(cat.birthDate) : ''
    const birthDate = cat.birthDate ? new Date(cat.birthDate) : null
    const ageInYears = birthDate ? today.getFullYear() - birthDate.getFullYear() : 0
    const isKitten =
      birthDate &&
      (ageInYears < 1 || (ageInYears === 1 && today < new Date(birthDate.getFullYear() + 1)))
    return {
      ...cat,
      ageString,
      ageCategory: isKitten ? 'kitten' : 'cat',
    }
  })
}

export const getCachedCats = unstable_cache(async () => getCats(), ['pets'], {
  tags: ['pets'],
})
