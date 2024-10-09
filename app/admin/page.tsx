import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'

export default async function Admin() {
  const session = await auth()
  if (!session)
    return (
      <div className="flex items-center justify-center">
        <p>
          Not authenticated :( <SignIn />
        </p>
      </div>
    )
  if (!session.user.isAdmin)
    return (
      <div className="flex items-center justify-center">
        <p>
          Not authorized :( <SignOut />
        </p>
      </div>
    )

  return <div className="flex flex-1"></div>
}
