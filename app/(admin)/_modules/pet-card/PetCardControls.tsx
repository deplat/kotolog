'use client'

import { IDropdownMenu } from '@/app/(admin)/_components/menus/IDropdownMenu'
import { icons } from '@/components/icons'
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
import { deletePet } from '@/data-access'

interface PetCardControlsProps {
  id: string
  avatarSrc?: string | StaticImageData
  name: string
}

export const PetCardControls = ({ id, avatarSrc, name }: PetCardControlsProps) => {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  async function onDeletePet(id: string) {
    setFeedback('Удаление питомца...')
    try {
      const response = await deletePet(id)
      response.success ? setFeedback('Питомец удален успешно.') : setFeedback(response.message)
    } catch (error) {
      if (error instanceof Error) {
        setFeedback(error.message)
      }
    }
  }

  return (
    <>
      <IDropdownMenu
        menuButton={{ leftIcon: icons.dotsVertical, variant: 'primary' }}
        menuItems={[
          { id: '1', label: 'Изменить', link: true, href: `/admin/pets/${id}` },
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
        className="relative z-90"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-stone-300/75 dark:bg-stone-950/85">
          <DialogPanel className="flex max-w-lg flex-col items-center gap-y-3 rounded bg-stone-50 p-4 shadow-lg ring-1 ring-stone-700/15 dark:bg-gray-800/85 dark:ring-stone-300/5">
            <DialogTitle className="flex w-full text-xl font-semibold">
              Удалить питомца?
            </DialogTitle>
            <Description>Вы планируете удалить питомца:</Description>
            <Image src={avatarSrc || ''} alt={name} width={125} height={125} />
            <span className="text-lg font-semibold">{name}</span>
            <div className="flex gap-x-2">
              <Button onClick={() => onDeletePet(id)} className="btn-warning">
                Удалить
              </Button>

              <Button onClick={() => setIsDeleteDialogOpen(false)} className="btn-primary">
                Отмена
              </Button>
            </div>
            {feedback && <span className="text-red-500">{feedback}</span>}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
