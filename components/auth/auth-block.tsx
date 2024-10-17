import { SignOut } from '@/components/auth/signout-button'
import { SignIn } from '@/components/auth/signin-button'
import { auth } from '@/auth'

export const AuthBlock = async () => {
  const session = await auth()
  if (!session) return <SignIn label="Sign In" />
  return <SignOut label="Sign Out" />
}
