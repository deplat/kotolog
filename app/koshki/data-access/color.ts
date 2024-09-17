import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export type Colors = Prisma.PromiseReturnType<typeof getColors>

const colorSelect = Prisma.validator<Prisma.ColorSelect>()({
  id: true,
  name: true,
})

const getColors = async () => {
  return await prisma.color.findMany({
    select: colorSelect,
  })
}

export const getCachedColors = unstable_cache(getColors, ['colors'], {
  tags: ['colors'],
})

const getListOfUniqueColorsFromCats = async () => {
  const uniqueColors: Colors =
    await prisma.$queryRaw`SELECT DISTINCT name FROM "Color" WHERE id IN (SELECT "A" FROM "_PetColors")`
  return uniqueColors.map((color: { name: string }) => color.name)
}

export const getCachedListOfUniqueColorsFromCats = unstable_cache(
  async () => getListOfUniqueColorsFromCats(),
  ['unique_colors_from_cats'],
  {
    tags: ['unique_colors_from_cats'],
  }
)
