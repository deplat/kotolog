import { ColorEditor } from '@/app/(admin)/_modules/color-editor'
import { auth } from '@/auth'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
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
    <div className="mx-auto w-full max-w-xl py-3">
      <h1 className="mb-3 text-2xl">Добавить окрас</h1>
      <ColorEditor color={null} />
    </div>
  )
}
