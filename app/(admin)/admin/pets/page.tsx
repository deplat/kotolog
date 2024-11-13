import { PetList } from '@/app/(admin)/_modules/pet-list'
import { Suspense } from 'react'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'
import AvatarToggleLink from '@/app/(admin)/_modules/pet-list/components/AvatarToggleLink'

export default async function Pets() {
  const session = await auth()
  if (!session) {
    return <NotAuthenticated />
  }
  if (session?.user.role === 'USER') {
    return <NotAuthorized />
  }
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
