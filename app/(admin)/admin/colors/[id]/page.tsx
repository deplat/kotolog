import { getColorById } from '@/data-access'
import { checkUserRole } from '@/utils/checkUserRole'
import { UserRole } from '@/types/UserRole'
import { NotAuthorized } from '@/app/(admin)/_components/NotAuthorized'
import { NotAuthenticated } from '@/app/(admin)/_components/NotAuthenticated'
import { ColorEditor } from '@/app/(admin)/_modules/color-editor'

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const { allowed, role } = await checkUserRole([UserRole.ADMIN, UserRole.MANAGER])
  if (!allowed) {
    if (!role) {
      return <NotAuthenticated />
    } else return <NotAuthorized />
  }
  const params = await props.params
  const id = Number(params.id)
  if (isNaN(id) || id <= 0) {
    return <div>Invalid color ID: {id}</div>
  }

  try {
    const color = await getColorById(id)
    if (!color) {
      return <div>There's no color with id: {id}</div>
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
