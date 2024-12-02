import { getColorById } from '@/data-access'
import { NotAuthenticated } from '@/components/NotAuthenticated'
import { ColorEditor } from '@/modules/color-editor'
import { auth } from '@/auth'
import { validateUserAppRole } from '@/utils/validateUserAppRole'
import { UserAppRole } from '@prisma/client'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const userId = (await auth())?.user.id
  if (!userId) return <NotAuthenticated />
  const hasPermissions = validateUserAppRole(userId, [
    UserAppRole.MODERATOR,
    UserAppRole.ADMIN,
    UserAppRole.SUPER_ADMIN,
  ])
  if (!hasPermissions) return null
  const params = await props.params

  try {
    const color = await getColorById(params.id)
    if (!color) {
      return <div>There's no color with id: {params.id}</div>
    }
    return (
      <div className="mx-auto w-full max-w-xl py-3">
        <h1 className="mb-3 text-2xl">Редактировать окрас: "{color.name}"</h1>
        <ColorEditor color={color} />
      </div>
    )
  } catch (error) {
    console.error('Error getting color:', error)
    return <div>Error getting color, please try again later.</div>
  }
}
