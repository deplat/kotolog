import { prisma } from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const id = Number(params.id)
    await prisma.color.delete({
      where: { id },
    })
    revalidateTag('colors')
    revalidateTag('cats')
    return NextResponse.json({ status: 204 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message })
  }
}
