'use server'

import { prisma } from '@/prisma/prisma'
import { Prisma } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import { prismaErrorHandler } from '@/utils/errorHandlers'

export type Color = Prisma.PromiseReturnType<typeof getColorById>
export type Colors = Prisma.PromiseReturnType<typeof getColors>

const colorSelect = Prisma.validator<Prisma.ColorSelect>()({
  id: true,
  name: true,
})

export const createColor = async (name: string) => {
  try {
    const newColor = await prisma.color.create({
      data: { name },
    })
    try {
      revalidateTag('colors')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
    return newColor
  } catch (error) {
    console.error('Error creating color:', error)
    throw prismaErrorHandler(error)
  }
}

const getColors = async () => {
  try {
    return await prisma.color.findMany({
      select: colorSelect,
    })
  } catch (error) {
    console.error('Error getting (.)colors:', error)
    throw prismaErrorHandler(error)
  }
}

export const getColorById = async (id: number) => {
  try {
    return await prisma.color.findUnique({ where: { id }, select: colorSelect })
  } catch (error) {
    console.error('Error getting color:', error)
    throw prismaErrorHandler(error)
  }
}

export const getColorByName = async (name: string) => {
  try {
    return await prisma.color.findUnique({ where: { name }, select: colorSelect })
  } catch (error) {
    console.error('Error getting color by name:', error)
    throw prismaErrorHandler(error)
  }
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

export const updateColor = async (id: number, name: string) => {
  try {
    const updatedColor = await prisma.color.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
    try {
      revalidateTag('colors')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
    return updatedColor
  } catch (error) {
    console.error('Error updating color:', error)
    throw prismaErrorHandler(error)
  }
}

export const deleteColor = async (id: number) => {
  try {
    await prisma.color.delete({
      where: {
        id,
      },
    })
    try {
      revalidateTag('colors')
      revalidateTag('(.)pets')
      revalidateTag('cats')
      revalidateTag('unique_colors_from_cats')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
  } catch (error) {
    console.error('Error deleting color:', error)
    throw prismaErrorHandler(error)
  }
}
