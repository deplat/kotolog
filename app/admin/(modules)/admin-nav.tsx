'use client'

import { Button } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { ThemeSwitch } from '@/components/theme-switcher'
import { SignOutButtonClient } from '@/components/auth/signout-button-client'
import { useSession } from 'next-auth/react'
import { SignInButtonClient } from '@/components/auth/signin-button-client'

export const AdminNav = () => {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div className="flex w-full items-center justify-center gap-6 p-4">
      {[
        { text: 'Home', url: '/' },
        { text: 'Editor', url: '/admin/editor' },
        { text: 'New Pet', url: '/admin/editor/newPet' },
      ].map((item, index) => (
        <Button
          key={index}
          onClick={() => router.push(item.url)}
          className={
            'w-auto min-w-fit max-w-[500px] rounded-md border' +
            '' +
            'transition-all duration-[1s] ease-out data-[hover]:scale-125 data-[hover]:underline data-[hover]:underline-offset-2'
          }
        >
          <span className="text-[1.5rem]">{item.text}</span>
        </Button>
      ))}
      <div>
        <ThemeSwitch />
      </div>
      {session ? <SignOutButtonClient /> : <SignInButtonClient />}
    </div>
  )
}
