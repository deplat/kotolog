'use server'

import { PetList } from '@/modules/pet-list'
import { Suspense } from 'react'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import AvatarToggleLink from '@/modules/pet-list/components/AvatarToggleLink'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Pets({ params }: { params: Promise<{ profileNickName: string }> }) {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const profileNickName = (await params).profileNickName
  if (!profileNickName) return <>Incorrect profile nick name.</>
  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between gap-x-4 py-3">
        <Link
          href={`/profiles/${profileNickName}/pets`}
          className="text-2xl hover:text-orange-600 focus:text-orange-600"
        >
          Питомцы
        </Link>
        <Link
          href={`/profiles/${profileNickName}/cats`}
          className="text-2xl hover:text-orange-600 focus:text-orange-600"
        >
          Кошки
        </Link>
        <Link
          className="ms-auto hover:text-orange-600 focus:text-orange-600"
          href={`/profiles/${profileNickName}/pets/newPet`}
        >
          <Plus size={36} absoluteStrokeWidth />
        </Link>
        <AvatarToggleLink />
      </div>
      <Suspense>
        <PetList profileNickName={profileNickName} />
      </Suspense>
    </div>
  )
}
