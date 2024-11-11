import { ColorList } from '@/app/(admin)/_modules/color-list'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'

export default async function Page() {
  const session = await auth()
  if (!session) {
    return <NotAuthenticated />
  }
  if (session?.user.role === 'USER') {
    return <NotAuthorized />
  }
  return (
    <div className="flex w-full flex-col justify-center bg-stone-300 sm:p-3">
      <ColorList />
    </div>
  )
}
