import { PetList } from '@/app/admin/_modules/pet-list'
import { auth } from '@/auth'
import { ColorList } from '@/app/admin/_modules/color-list'
import { UserRole } from '@/types/UserRole'
import { NotAuthenticated } from '@/app/admin/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/admin/_components/NotAuthorized'

export default async function Admin() {
  const session = await auth()
  const userRole = session?.user.role
  if (!session) {
    return <NotAuthenticated />
  }
  if (userRole == UserRole.USER) {
    return <NotAuthorized />
  }
  return (
    <main className="flex flex-grow p-3">
      <div className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
        <PetList />
        <ColorList />
      </div>
    </main>
  )
}
