import { ColorList } from '@/modules/color-list'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Page() {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null
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
