'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@headlessui/react'
import clsx from 'clsx'

export const Nav = () => {
  const router = useRouter()
  return (
    <div className="flex w-full items-center gap-x-2 border-t border-stone-950 bg-stone-100 px-2 py-2">
      {[
        { label: 'Dashboard', onClick: () => router.push('/admin') },
        { label: 'New Pet', onClick: () => router.push('/admin/newPet') },
        { label: 'New Color', onClick: () => router.push('/admin/editor/newColor') },
      ].map((item, index) => (
        <Button
          onClick={item.onClick}
          key={index}
          className={clsx(
            'flex items-center border border-stone-950 bg-stone-100 px-4 py-2.5 text-stone-950 underline-offset-4 transition-all duration-100 first:me-auto',
            'data-[hover]:bg-stone-950 data-[hover]:text-stone-100 data-[hover]:underline'
          )}
        >
          <span>{item.label}</span>
        </Button>
      ))}
    </div>
  )
}
