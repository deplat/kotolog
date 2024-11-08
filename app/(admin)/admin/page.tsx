import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'
import { redirect } from 'next/navigation'

export default async function Admin() {
  const session = await auth()
  if (!session) {
    return <NotAuthenticated />
  }
  if (session?.user.role === 'USER') {
    return <NotAuthorized />
  }
  redirect('/admin/pets')
}
