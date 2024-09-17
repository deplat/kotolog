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
