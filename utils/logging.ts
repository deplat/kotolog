import { prisma } from '@/prisma/prisma'

export interface LogActionInput {
  userId: string
  profileId?: string
  petId?: string
  action: string
  metadata?: Record<string, any>
}

export async function logAction({ userId, profileId, petId, action, metadata }: LogActionInput) {
  try {
    await prisma.log.create({
      data: {
        userId,
        profileId,
        petId,
        action,
        metadata,
      },
    })
  } catch (loggingError) {
    console.error('Failed to log action:', loggingError)
  }
}
