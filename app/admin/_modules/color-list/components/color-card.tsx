'use client'
import { Color } from '@/types'
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { deleteColor } from '@/app/admin/_data-access'
import clsx from 'clsx'
import { useState } from 'react'
import { LuMoreVertical } from 'react-icons/lu'
import { IButton } from '@/components/IButton'

export const ColorCard = ({ id, name }: Color) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const onDeleteColor = async (id: number) => await deleteColor(id)
  const onEditColor = (id: number) => {
    console.log(id)
  }
  return (
    <div className="flex w-full justify-between border border-stone-950 p-3 shadow-md">
      <span>{name}</span>
      <Menu>
        <MenuButton>
          <LuMoreVertical size={24} />
          <MenuItems
            anchor="bottom end"
            className="flex gap-x-1 border border-stone-950 bg-stone-100 p-3 shadow-2xl"
          >
            <MenuItem>
              <IButton label="Edit" onClick={() => onEditColor} primary />
            </MenuItem>
            <MenuItem>
              <IButton label="Delete" onClick={() => setIsDeleteDialogOpen(true)} warning />
            </MenuItem>
          </MenuItems>
        </MenuButton>
      </Menu>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75">
          <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 border border-stone-950 bg-stone-100 p-4">
            <DialogTitle className="flex w-full text-xl font-semibold">Delete color?</DialogTitle>
            <Description>This action will permanently delete color:</Description>
            <span className="text-lg font-semibold">{name}</span>
            <div className="flex gap-x-3">
              <Button
                onClick={() => onDeleteColor(id)}
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
  )
}
