import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { IDropdownMenu } from '@/app/admin/_components/menus/IDropdownMenu'
import { icons } from '@/lib/styling/icons'
import { useState } from 'react'
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import clsx from 'clsx'

interface PetCardProps {
  id: number
  name: string
  slug: string
  avatarSrc?: string | StaticImageData
  showAvatar?: boolean
  onEditPet: () => void
  onDeletePet: () => void
}
export const PetCard = ({
  id,
  name,
  slug,
  avatarSrc,
  showAvatar,
  onEditPet,
  onDeletePet,
}: PetCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const showDeleteDialog = () => setIsDeleteDialogOpen(true)
  return (
    <div className="flex min-w-80 ring-1 ring-stone-950">
      <Link href={`/koshki/${slug}`} className="flex w-full">
        {showAvatar ? (
          <div className="relative aspect-1 h-32 w-32">
            {avatarSrc ? <Image src={avatarSrc} alt={name} fill /> : null}
          </div>
        ) : null}
        <div className="flex w-full flex-col justify-between p-3">
          <div className="text-stone-600">#{id}</div>
          <div className="text-lg">{name}</div>
          <div className="text-stone-600">/{slug}</div>
        </div>
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
            className="relative z-50"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75">
              <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 border border-stone-950 bg-stone-100 p-4">
                <DialogTitle className="flex w-full text-xl font-semibold">Delete pet?</DialogTitle>
                <Description>This action will permanently delete pet:</Description>
                <Image src={avatarSrc || ''} alt={name} width={125} height={125} />
                <span className="text-lg font-semibold">{name}</span>
                <div className="flex gap-x-3">
                  <Button
                    onClick={onDeletePet}
                    className="px-4 py-2.5 text-red-600 underline-offset-4"
                  >
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
      </Link>
    </div>
  )
}
