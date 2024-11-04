'use client'

import { IDropdownMenu } from '@/app/admin/_components/menus/IDropdownMenu'
import { icons } from '@/components/icons'
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Image, { StaticImageData } from 'next/image'
import clsx from 'clsx'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deletePet } from '@/data-access'

interface PetCardControlsProps {
  id: number
  avatarSrc?: string | StaticImageData
  name: string
}

export const PetCardControls = ({ id, avatarSrc, name }: PetCardControlsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()
  const onEditPet = () => router.push(`/admin/${id}`)
  const onDeletePet = async () => await deletePet(id)
  const showDeleteDialog = () => setIsDeleteDialogOpen(true)

  return (
    <div>
      <IDropdownMenu
        menuButton={{ leftIcon: icons.dotsVertical }}
        menuItems={[
          { id: '1', label: 'Edit', onClick: onEditPet },
          { id: '2', label: 'Delete', onClick: showDeleteDialog, variant: 'warning' },
        ]}
      />
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-90"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75">
          <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 border border-stone-950 bg-stone-100 p-4">
            <DialogTitle className="flex w-full text-xl font-semibold">Delete pet?</DialogTitle>
            <Description>This action will permanently delete pet:</Description>
            <Image src={avatarSrc || ''} alt={name} width={125} height={125} />
            <span className="text-lg font-semibold">{name}</span>
            <div className="flex gap-x-3">
              <Button onClick={onDeletePet} className="px-4 py-2.5 text-red-600 underline-offset-4">
                Delete
              </Button>

              <Button
                onClick={() => setIsDeleteDialogOpen(false)}
                className={clsx(
                  'px-4 py-2.5 underline-offset-4 ring-1 ring-inset ring-stone-950',
                  'data-[hover]:bg-stone-950 data-[hover]:text-stone-100 data-[hover]:underline'
                )}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
