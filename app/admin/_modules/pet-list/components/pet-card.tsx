'use client'
import Image from 'next/image'
import { IoPencil, IoTrashBin } from 'react-icons/io5'
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'

export const PetCard = ({
  id,
  name,
  slug,
  avatarSrc,
}: {
  id: number
  name: string
  slug: string
  avatarSrc?: string
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="flex w-full min-w-80 border border-stone-950 p-3">
      <div className="relative mr-3 aspect-1">
        {avatarSrc ? <Image src={avatarSrc} alt={name} fill /> : null}
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="">{name}</div>
        <div className="">/{slug}</div>
        <div className="flex justify-end gap-x-2">
          {' '}
          <Button onClick={() => router.push(`/admin/${id}`)} className="hover:text-blue-600">
            <IoPencil size={24} />
          </Button>
          <>
            <Button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="data-[hover]:text-red-600"
            >
              <IoTrashBin size={24} />
            </Button>
            <Dialog
              open={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75">
                <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 border border-stone-950 bg-stone-100 p-4">
                  <DialogTitle className="flex w-full text-xl font-semibold">
                    Delete pet?
                  </DialogTitle>
                  <Description>This action will permanently delete pet:</Description>
                  <Image src={avatarSrc || ''} alt={name} width={125} height={125} />
                  <span className="text-lg font-semibold">{name}</span>
                  <div className="flex gap-x-3">
                    <Button className="px-4 py-2.5 text-red-600 underline-offset-4">Delete</Button>

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
          </>
        </div>
      </div>
    </div>
  )
}
