import { SignOut } from '@/components/auth/SignOutButtonServer'

export const NotAuthorized = () => {
  return (
    <main className="flex w-full flex-grow items-center justify-center">
      <div>
        У вас нет доступа :( <SignOut label="Выйти" />
      </div>
    </main>
  )
}
