import { prisma } from '@/prisma/prisma'
import { validateUserProfileRole } from '@/utils/validateUserProfileRole'
import { auth } from '@/auth'
import { ProfileType, Status, UserProfileRole } from '@prisma/client'

interface ProfileData {
  name: string
  id: string
  nickName: string
  description: string
  phone: string
  address: string
  website: string | null
  owner: string
  type: ProfileType
  status: Status
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
  archivedReason: string | null
}

export default async function Page({ params }: { params: Promise<{ profileNickName: string }> }) {
  const userId = (await auth())?.user.id
  if (!userId) {
    return <>Please login to continue.</>
  }

  const profileNickName = (await params).profileNickName
  if (!profileNickName) {
    return <>Incorrect profile nick name.</>
  }

  const profile: ProfileData | null = await prisma.profile.findUnique({
    where: { nickName: profileNickName },
  })
  if (!profile) return <>No profile with nickname "{profileNickName}" found.</>

  const hasPermissions = await validateUserProfileRole(userId, profile.id, [
    UserProfileRole.PROFILE_MANAGER,
    UserProfileRole.PROFILE_ADMIN,
    UserProfileRole.PROFILE_OWNER,
  ])
  if (!hasPermissions) return <>You are not authorized to view this profile.</>

  return (
    <>
      <div>
        <div>{profile.name}</div>
        <div>{profile.nickName}</div>
        <div>{profile.description}</div>
        <div>{profile.phone}</div>
        <div>{profile.website}</div>
        <div>{profile.owner}</div>
        <div>{profile.type}</div>
      </div>
    </>
  )
}
