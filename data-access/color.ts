'use server'

import { prisma } from '@/prisma/prisma'
import { Prisma, UserAppRole, UserProfileRole } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import { prismaErrorHandler } from '@/utils/error-handler'
import { auth } from '@/auth'
import { errorResponse, successResponse } from '@/utils/response'
import { logAction } from '@/utils/logging'
import { validateUserAppRole } from '@/utils/validateUserAppRole'

export type Color = Prisma.PromiseReturnType<typeof getColorById>
export type Colors = Prisma.PromiseReturnType<typeof getColors>

const colorSelect = Prisma.validator<Prisma.ColorSelect>()({
  id: true,
  name: true,
})

export const createColor = async (name: string) => {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an pet')
  }
  const hasPermissions = await validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) {
    await logAction({
      userId,
      action: 'CREATE_COLOR_ERROR',
      metadata: {
        error: 'User does not have permission to create color',
      },
    })
    return errorResponse('You do not have permission to create color')
  }
  try {
    const newColor = await prisma.color.create({
      data: { name },
    })
    revalidateTag('colors')
    return successResponse('Color created: ', newColor)
  } catch (error) {
    const parsedError = prismaErrorHandler(error)
    await logAction({
      userId,
      action: 'CREATE_COLOR_ERROR',
      metadata: {
        error: parsedError.message,
        input: name,
      },
    })
    return errorResponse(parsedError.message)
  }
}

const getColors = async () => {
  try {
    return await prisma.color.findMany({
      select: colorSelect,
    })
  } catch (error) {
    console.error('Error getting colors:', error)
    throw prismaErrorHandler(error)
  }
}

export const getColorById = async (id: string) => {
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
  const uniqueColors: Colors = await prisma.$queryRaw`
    SELECT DISTINCT "Color"."name", "Color"."id" FROM "Color"
    JOIN "PetColor" ON "PetColor"."colorId" = "Color"."id"
    JOIN "Pet" ON "Pet"."id" = "PetColor"."petId"
    WHERE "Pet"."type" = 'CAT'`
  return uniqueColors.map((color: { name: string }) => color.name)
}

export const getCachedListOfUniqueColorsFromCats = unstable_cache(
  getListOfUniqueColorsFromCats,
  ['unique_colors_from_cats'],
  {
    tags: ['unique_colors_from_cats'],
  }
)

const getListOfUniqueColorsFromDogs = async () => {
  const uniqueColors: Colors = await prisma.$queryRaw`
    SELECT DISTINCT "Color"."name" FROM "Color"
    JOIN "_PetColors" ON "_PetColors"."A" = "Color"."id"
    JOIN "Pet" ON "Pet"."id" = "_PetColors"."B"
    WHERE "Pet"."petType" = 'DOG'`
  return uniqueColors.map((color: { name: string }) => color.name)
}

export const getCachedListOfUniqueColorsFromDogs = unstable_cache(
  getListOfUniqueColorsFromDogs,
  ['unique_colors_from_dogs'],
  {
    tags: ['unique_colors_from_dogs'],
  }
)

export const updateColor = async (id: string, name: string) => {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an pet')
  }
  const hasPermissions = await validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) {
    await logAction({
      userId,
      action: 'CREATE_COLOR_ERROR',
      metadata: {
        error: 'User does not have permission to create color',
      },
    })
    return errorResponse('You do not have permission to create color')
  }
  try {
    const updatedColor = await prisma.color.update({
      where: { id },
      data: { name },
    })
    revalidateTag('colors')
    revalidateTag('pets')
    revalidateTag('unique_colors_from_cats')
    revalidateTag('unique_colors_from_dogs')

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

export const deleteColor = async (id: string) => {
  const user = (await auth())?.user
  const userId = user?.id
  if (!user || !userId) {
    return errorResponse('You must be logged in to create an pet')
  }
  const hasPermissions = await validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) {
    await logAction({
      userId,
      action: 'CREATE_COLOR_ERROR',
      metadata: {
        error: 'User does not have permission to create color',
      },
    })
    return errorResponse('You do not have permission to create color')
  }
  try {
    const deletedColor = await prisma.color.delete({
      where: { id },
    })
    revalidateTag('colors')
    revalidateTag('pets')
    revalidateTag('unique_colors_from_cats')
    revalidateTag('unique_colors_from_dogs')
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
