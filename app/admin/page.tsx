import { getCachedColors } from './data-access/color'
import { Dashboard } from '@/app/admin/components/dashboard'
import { auth } from '@/auth'
import { SignIn } from '@/components/auth/signin-button'
import { SignOut } from '@/components/auth/signout-button'
import { cachedPets } from '@/app/admin/data-access/pet'

export default async function Admin() {
  const session = await auth()
  if (!session)
    return (
      <div>
        Not authenticated :( <SignIn />
      </div>
    )
  if (!session.user.isAdmin)
    return (
      <div>
        Not authorized :( <SignOut />
      </div>
    )
  const colors = await getCachedColors()
  const pets = await cachedPets()

  return (
    <div className="flex max-h-full w-full flex-1">
      <Dashboard colors={colors} pets={pets} />
    </div>
  )
}
