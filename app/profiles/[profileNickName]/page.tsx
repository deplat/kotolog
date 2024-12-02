import { prisma } from '@/prisma/prisma'
import { validateUserProfileRole } from '@/utils/validateUserProfileRole'
import { auth } from '@/auth'
import { ProfileType, Status, UserProfileRole } from '@prisma/client'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { NotAuthorized } from '@/components/NotAuthorized'
import Link from 'next/link'

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
    return <NotAuthenticated />
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
  if (!hasPermissions) return <NotAuthorized />

  return (
    <>
      <div>
        <Link href={`/profiles/${profile.nickName}/pets`} className="btn-primary">
          Питомцы
        </Link>
      </div>
    </>
  )
}
