import { SignOut } from '@/components/auth/SignOutButtonServer'
import { SignIn } from '@/components/auth/SignInButtonServer'
import { auth } from '@/auth'

export const AuthBlock = async () => {
  const session = await auth()
  if (!session) return <SignIn label="Sign In" />
  return <SignOut label="Sign Out" />
}
