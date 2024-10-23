'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { ColorEditor } from '@/app/admin/_modules/color-editor'

export const Nav = () => {
  const [isColorEditorOpen, setIsColorEditorOpen] = useState(false)
  const [colorId, setColorId] = useState<number | null>(null)
  const closeEditor = () => setIsColorEditorOpen(false)
  const pathname = usePathname()
  return (
    <div className="flex w-full items-center gap-x-2 border-t border-stone-950 bg-stone-100 px-2 py-2">
      {[
        { label: 'Admin', href: '/admin' },
        { label: 'New Pet', href: '/admin/newPet' },
      ].map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={clsx(
            'flex items-center border border-stone-950 px-4 py-2.5 underline-offset-4 transition-all duration-100 first:me-auto',
            'hover:bg-stone-950 hover:text-stone-100 hover:underline',
            pathname == link.href ? 'bg-stone-950 text-stone-100' : 'bg-stone-100 text-stone-950'
          )}
        >
          <span>{link.label}</span>
        </Link>
      ))}
      <>
        <Button
          onClick={() => setIsColorEditorOpen(!isColorEditorOpen)}
          className={clsx(
            'flex items-center border border-stone-950 px-4 py-2.5 underline-offset-4 transition-all duration-100 first:me-auto',
            'data-[hover]:bg-stone-950 data-[hover]:text-stone-100 data-[hover]:underline',
            isColorEditorOpen ? 'bg-stone-950 text-stone-100' : ''
          )}
        >
          New Color
        </Button>
        <Dialog
          open={isColorEditorOpen}
          onClose={() => setIsColorEditorOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75">
            <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 border border-stone-950 bg-stone-100 p-4">
              <DialogTitle className="flex w-full text-xl font-semibold">
                {colorId ? 'Edit Color' : 'New Color'}
              </DialogTitle>
              <ColorEditor color={null} close={closeEditor} />
            </DialogPanel>
          </div>
        </Dialog>
      </>
    </div>
  )
}
