import { ColorList } from '@/app/(admin)/_modules/color-list'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function Page() {
  const session = await auth()
  if (!session) {
    return <NotAuthenticated />
  }
  if (session?.user.role === 'USER') {
    return <NotAuthorized />
  }
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-2xl">Окрасы</h1>
        <Link href="/admin/colors/newColor">
          <Plus size={30} absoluteStrokeWidth />
        </Link>
      </div>
      <ColorList />
    </div>
  )
}
