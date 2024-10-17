import { signIn } from '@/auth'

export async function SignIn({ label }: { label: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <button type="submit" className="underline">
        {label}
      </button>
    </form>
  )
}
