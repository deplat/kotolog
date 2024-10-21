import { signOut } from '@/auth'
import { Button } from '@headlessui/react'
import clsx from 'clsx'

export async function SignOut({ label }: { label: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        type="submit"
        className={clsx(
          'bg-stone-950 px-4 py-2.5 text-stone-100 underline-offset-4 transition-all duration-100',
          'data-[hover]:bg-transparent data-[hover]:text-stone-950 data-[hover]:underline'
        )}
      >
        {label}
      </Button>
    </form>
  )
}
