import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'

export default async function Admin() {
  const session = await auth()
  const userRole = session?.user.role
  if (!session) {
    return <NotAuthenticated />
  }
  if (userRole === 'USER') {
    return <NotAuthorized />
  }
  return <></>
}
