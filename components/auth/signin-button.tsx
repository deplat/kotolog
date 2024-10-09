import { signIn } from '@/auth'

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <button type="submit" className="underline">
        Sign in
      </button>
    </form>
  )
}
