import { BottomNavControls } from '@/app/admin/_modules/nav/BottomNavControls'
import { auth } from '@/auth'

export const BottomNav = async () => {
  const session = await auth()
  if (session?.user.role == 'USER') return null
  return <BottomNavControls />
}
