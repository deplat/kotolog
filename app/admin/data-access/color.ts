'use server'

import { prismaErrorHandler } from '@/lib/errorHandlers'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'

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
      revalidateTag('pets')
      revalidateTag('cats')
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
    const colors = await prisma.color.findMany({
      select: colorSelect,
    })
    return colors
  } catch (error) {
    console.error('Error getting colors:', error)
    throw prismaErrorHandler(error)
  }
}

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
      revalidateTag('pets')
      revalidateTag('cats')
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
      revalidateTag('pets')
      revalidateTag('cats')
    } catch (revalidateError) {
      console.error('Tag revalidation failed:', revalidateError)
    }
  } catch (error) {
    console.error('Error deleting color:', error)
    throw prismaErrorHandler(error)
  }
}

export const getCachedColors = unstable_cache(getColors, ['colors'], {
  tags: ['colors'],
})
