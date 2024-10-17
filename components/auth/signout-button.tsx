import { signOut } from '@/auth'

export function SignOut({ label }: { label: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button type="submit" className="underline">
        {label}
      </button>
    </form>
  )
}
