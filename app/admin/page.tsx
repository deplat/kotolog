import { cachedColors } from './editor/[id]/(data-access)/color'
import { Dashboard } from '@/app/admin/(components)/dashboard'
import { auth } from '@/auth'
import { SignIn } from '@/app/(components)/auth/signin-button'
import { SignOut } from '@/app/(components)/auth/signout-button'
import { cachedPets } from '@/app/admin/(data-access)/pet'

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
  const colors = await cachedColors()
  const pets = await cachedPets()

  return (
    <div className="flex max-h-full w-full flex-1">
      <Dashboard colors={colors} pets={pets} />
    </div>
  )
}
