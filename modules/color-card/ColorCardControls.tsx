'use client'

import { IDropdownMenu } from '@/components/menu/IDropdownMenu'
import { icons } from '@/components/icons'
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { deleteColor } from '@/data-access'
import { PetColorData } from '@/types/pet'

export const ColorCardControls = ({ id, name }: PetColorData) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const onDeleteColor = async (id: string) => await deleteColor(id)

  return (
    <div>
      <IDropdownMenu
        menuButton={{ leftIcon: icons.dotsVertical }}
        menuItems={[
          {
            id: '1',
            label: 'Изменить',
            link: true,
            href: `/admin/colors/${id}`,
            variant: 'primary',
          },
          {
            id: '2',
            label: 'Удалить',
            onClick: () => setIsDeleteDialogOpen(true),
            variant: 'warning',
          },
        ]}
      />
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75 dark:bg-stone-950/85">
          <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 rounded bg-stone-50 p-4 shadow-lg ring-1 ring-stone-700/15 dark:bg-gray-800/85 dark:ring-stone-300/5">
            <DialogTitle className="flex w-full text-xl font-semibold">Удалить окрас?</DialogTitle>
            <Description>Вы планируете удалить окрас:</Description>
            <span className="my-4 text-lg font-semibold">{name}</span>
            <div className="flex gap-x-3">
              <Button onClick={() => onDeleteColor(id)} className="btn-warning">
                Удалить
              </Button>
              <Button onClick={() => setIsDeleteDialogOpen(false)} className="btn-primary">
                Отмена
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
