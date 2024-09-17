import { NextRequest, NextResponse } from 'next/server'
import { createPet } from '@/lib/data'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

export async function GET() {
  try {
    const pets = await prisma.pet.findMany({
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
    return NextResponse.json(pets)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const newPet = await createPet(data)
    revalidateTag('cats')
    return NextResponse.json(newPet)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message })
  }
}
