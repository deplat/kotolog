import { SignOut } from '@/components/auth/signout-button'

export const NotAuthorized = () => {
  return (
    <main className="flex w-full flex-grow items-center justify-center">
      <div>
        Not authorized :( <SignOut label="Sign Out" />
      </div>
    </main>
  )
}
