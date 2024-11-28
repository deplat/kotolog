import { prisma } from '@/prisma/prisma'
import { UserAppRole } from '@prisma/client'

export async function validateUserAppRole(
  userId: string,
  allowedAppRoles: UserAppRole[]
): Promise<boolean> {
  const userAppRole = await prisma.user.findUnique({
    where: {
      id: userId,
      role: {
        in: allowedAppRoles,
      },
    },
  })

  return !!userAppRole
}
