import { PetList } from '@/app/(admin)/_modules/pet-list'
import { Suspense } from 'react'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'

export default async function Pets() {
  const session = await auth()
  if (!session) {
    return <NotAuthenticated />
  }
  if (session?.user.role === 'USER') {
    return <NotAuthorized />
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Suspense>
        <PetList />
      </Suspense>
    </div>
  )
}
