import { prisma } from '@/prisma/prisma'
import { UserProfileRole } from '@prisma/client'
import { auth } from '@/auth'

export async function validateUserProfileRole(
  profileId: string,
  allowedProfileRoles: UserProfileRole[]
): Promise<{
  success: boolean
  hasRole?: boolean
  userId?: string
}> {
  try {
    const userId = (await auth())?.user.id
    if (!userId) {
      return {
        success: true,
      }
    }
    const userProfileRole = await prisma.profileRole.findFirst({
      where: {
        userId,
        profileId,
        role: {
          in: allowedProfileRoles,
        },
      },
    })

    return { success: true, hasRole: !!userProfileRole, userId }
  } catch (err) {
    return { success: false }
  }
}
