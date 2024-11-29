import { prisma } from '@/prisma/prisma'
import { UserProfileRole } from '@prisma/client'

export async function validateUserProfileRole(
  userId: string,
  profileId: string,
  allowedProfileRoles: UserProfileRole[]
): Promise<boolean> {
  const userProfileRole = await prisma.profileRole.findFirst({
    where: {
      userId,
      profileId,
      role: {
        in: allowedProfileRoles,
      },
    },
  })

  return !!userProfileRole
}
