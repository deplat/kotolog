import { auth } from '@/auth'
import { NavbarControls } from '@/app/(admin)/_modules/nav/NavbarControls'

export const Navbar = async () => {
  const session = await auth()
  if (session?.user.role == 'USER') return null
  return <NavbarControls />
}
