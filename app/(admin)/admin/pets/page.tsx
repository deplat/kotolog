'use server'

import { PetList } from '@/app/(admin)/_modules/pet-list'
import { Suspense } from 'react'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import AvatarToggleLink from '@/app/(admin)/_modules/pet-list/components/AvatarToggleLink'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Pets() {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between py-3">
        <h3 className="text-2xl">Питомцы</h3>
        <AvatarToggleLink />
      </div>
      <Suspense>
        <PetList />
      </Suspense>
    </div>
  )
}
