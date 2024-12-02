import { SignIn } from '@/components/auth/SignInButtonServer'

export const NotAuthenticated = () => {
  return (
    <main className="flex w-full flex-grow items-center justify-center">
      <div>
        Вы не вошли :( <SignIn label="Войти" />
      </div>
    </main>
  )
}
