'use client'

import { useState } from 'react'
import { Color } from '@/types'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ColorEditor } from '@/app/admin/_modules/color-editor'
import { icons } from '@/components/icons'
import { Plus, SquarePlus } from 'lucide-react'

export const BottomNavControls = () => {
  const [isColorEditorOpen, setIsColorEditorOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const closeEditor = () => setIsColorEditorOpen(false)
  const pathname = usePathname()
  return (
    <div className="fixed bottom-0 flex h-14 w-full items-center border-t border-stone-700 bg-stone-100">
      {pathname !== '/admin' && (
        <div className="flex h-full">
          <Link
            href="/admin"
            className="inline-flex aspect-1 h-full items-center justify-center hover:bg-stone-700 hover:text-stone-100"
          >
            <icons.arrowLeft size={30} absoluteStrokeWidth />
          </Link>
          <div className="h-full w-[1px] bg-stone-700"></div>
        </div>
      )}

      <div className="ms-auto flex h-full">
        {[{ label: 'New Pet', href: '/admin/newPet' }].map((link, index) => (
          <div key={index} className="flex h-full">
            <div className="h-full w-[1px] bg-stone-700"></div>
            <Link
              href={link.href}
              className={
                'inline-flex h-full items-center px-4 underline-offset-4 transition duration-75 hover:bg-stone-700 hover:text-stone-100 hover:underline'
              }
            >
              <span>{link.label}</span>
            </Link>
          </div>
        ))}
        <div className="h-full w-[1px] bg-stone-700"></div>

        <Button
          onClick={() => setIsColorEditorOpen(!isColorEditorOpen)}
          className={clsx(
            'inline-flex h-full items-center px-4 underline-offset-4 transition duration-75 hover:bg-stone-700 hover:text-stone-100 hover:underline',
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
                {selectedColor ? 'Edit Color' : 'New Color'}
              </DialogTitle>
              <ColorEditor color={selectedColor} closeEditor={closeEditor} />
            </DialogPanel>
          </div>
        </Dialog>
      </div>
    </div>
  )
}
