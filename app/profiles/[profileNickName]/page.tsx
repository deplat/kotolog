import { prisma } from '@/prisma/prisma'
import { validateUserProfileRole } from '@/utils/validateUserProfileRole'
import { auth } from '@/auth'
import { UserProfileRole } from '@prisma/client'

export default async function Page({ params }: { params: Promise<{ profileNickName: string }> }) {
  const userId = (await auth())?.user.id
  if (!userId) {
    return <>Not authenticated</>
  }

  const profileNickName = (await params).profileNickName
  const profile = await prisma.profile.findUnique({ where: { nickName: profileNickName } })
  if (!profile) return <>Cannot find profile with this name.</>

  const hasPermissions = await validateUserProfileRole(userId, profile.id, [
    UserProfileRole.PROFILE_MANAGER,
    UserProfileRole.PROFILE_ADMIN,
    UserProfileRole.PROFILE_OWNER,
  ])
  if (!hasPermissions) return <>You are not authorized to view this profile.</>

  return <div>{profile.name}</div>
}
