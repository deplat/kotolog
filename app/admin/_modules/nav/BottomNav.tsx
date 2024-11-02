import { BottomNavControls } from '@/app/admin/_modules/nav/BottomNavControls'
import { auth } from '@/auth'
import { UserRole } from '@/types/UserRole'

export const BottomNav = async () => {
  const session = await auth()
  if (session?.user.role == UserRole.USER) return null
  return <BottomNavControls />
}
