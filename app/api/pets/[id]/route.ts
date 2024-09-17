import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { del } from '@vercel/blob'

export async function DELETE(req: NextRequest, { params }: { params: { id: number } }) {
  const id = Number(params.id)

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: id },
      include: {
        adoptionApplications: true,
        fosterings: true,
        healthRecords: {
          include: {
            medications: true,
            treatments: true,
            vaccinations: true,
          },
        },
        avatar: true,
        photos: true,
        profile: {
          include: {
            healthNotes: true,
            specialties: true,
          },
        },
      },
    })

    if (!pet) {
      return NextResponse.json({ error: 'No pet with this ID' }, { status: 404 })
    }

    if (pet.avatar) {
      await del(pet.avatar.src)
      await prisma.image.delete({
        where: {
          id: pet.avatar.id,
        },
      })
    }

    if (pet.photos.length > 0) {
      await del(pet.photos.map((image) => image.src))
      await prisma.image.deleteMany({
        where: { petId: pet.id },
      })
    }

    if (pet.profile) {
      if (pet.profile.healthNotes) {
        await prisma.healthNote.deleteMany({
          where: {
            profileId: pet.profile.id,
          },
        })
      }

      if (pet.profile.specialties) {
        await prisma.specialty.deleteMany({
          where: {
            profileId: pet.profile.id,
          },
        })
      }

      await prisma.petProfile.delete({
        where: {
          id: pet.profile.id,
        },
      })
    }

    await prisma.pet.delete({
      where: { id },
    })
    revalidateTag('pets')
    return NextResponse.json('Cat deleted successfully.')
  } catch (error) {
    console.error('Error deleting cat:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
