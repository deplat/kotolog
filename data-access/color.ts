'use server'

import { prisma } from '@/prisma/prisma'
import { Prisma } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import { prismaErrorHandler } from '@/utils/errorHandlers'
import { checkUserRole } from '@/utils/checkUserRole'
import { UserRole } from '@/types/UserRole'

export type Color = Prisma.PromiseReturnType<typeof getColorById>
export type Colors = Prisma.PromiseReturnType<typeof getColors>

const colorSelect = Prisma.validator<Prisma.ColorSelect>()({
  id: true,
  name: true,
})

export const createColor = async (
  name: string
): Promise<{ success: boolean; message: string; data: Color | null }> => {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to create colors.`)
    return { success: false, message: 'User is not authorized to create colors.', data: null }
  }
  try {
    const newColor = await prisma.color.create({
      data: { name },
    })
    revalidateTag('colors')

    return { success: true, message: 'Color created successfully.', data: newColor }
  } catch (error) {
    const prismaError = prismaErrorHandler(error)
    console.error('Error creating color:', prismaError.message)
    return {
      success: false,
      message: 'Error creating color: ' + prismaError.message,
      data: null,
    }
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
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to update colors.`)
    return { success: false, message: 'User is not authorized to update colors.', data: null }
  }
  try {
    const updatedColor = await prisma.color.update({
      where: { id },
      data: { name },
    })
    revalidateTag('colors')
    revalidateTag('pets')
    revalidateTag('cats')
    revalidateTag('unique_colors_from_cats')

    return { success: true, message: 'Color updated successfully.', data: updatedColor }
  } catch (error) {
    const prismaError = prismaErrorHandler(error)
    console.error('Error updating color:', prismaError.message)
    return {
      success: false,
      message: 'Error updating color: ' + prismaError.message,
      data: null,
    }
  }
}

export const deleteColor = async (id: number) => {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    console.error(`User with role ${role} is not authorized to delete colors.`)
    return { success: false, message: 'User is not authorized to delete colors.', data: null }
  }
  try {
    const deletedColor = await prisma.color.delete({
      where: { id },
    })
    revalidateTag('colors')
    revalidateTag('pets')
    revalidateTag('cats')
    revalidateTag('unique_colors_from_cats')
    return { success: true, message: 'Color deleted successfully.', data: deletedColor }
  } catch (error) {
    const prismaError = prismaErrorHandler(error)
    console.error('Error deleting color:', prismaError.message)
    return {
      success: false,
      message: 'Error deleting color: ' + prismaError.message,
      data: null,
    }
  }
}
