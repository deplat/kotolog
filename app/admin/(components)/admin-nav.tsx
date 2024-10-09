'use client'

import { Button } from '@headlessui/react'
import { useRouter } from 'next/navigation'

export const AdminNav = () => {
  const router = useRouter()
  return (
    <div className="flex h-24 w-full flex-col items-center justify-center lg:flex-row">
      {[
        { text: 'Home', url: '/' },
        { text: 'Editor', url: '/admin/editor' },
        { text: 'New Pet', url: '/admin/editor/newPet' },
      ].map((item, index) => (
        <Button
          key={index}
          onClick={() => router.push(item.url)}
          className={
            'h-24 w-auto min-w-[200px] max-w-[500px] rounded-md border' +
            '' +
            'transition-all duration-[1s] ease-out data-[hover]:scale-125 data-[hover]:underline data-[hover]:underline-offset-2'
          }
        >
          <span className="text-[2rem]">{item.text}</span>
        </Button>
      ))}
    </div>
  )
}
