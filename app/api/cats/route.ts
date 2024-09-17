import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const cats = await prisma.pet.findMany({
      where: {
        petType: 'CAT',
      },
      include: {
        avatar: {
          select: {
            src: true,
            width: true,
            height: true,
          },
        },
        profile: {
          select: {
            id: true,
          },
        },
      },
    })
    return NextResponse.json(cats)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message })
  }
}
