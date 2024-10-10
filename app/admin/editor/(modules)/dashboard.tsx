'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'
import { Colors } from '@/app/admin/editor/(data-access)/color'
import { ColorList } from '@/app/admin/editor/(components)'
import { ColorEditor } from '@/app/admin/editor/(components)'
import { PetList } from '@/app/admin/editor/(components)'
import { Pets } from '../(data-access)'

export const Dashboard = ({ colors, pets }: { colors: Colors; pets: Pets }) => {
  const [showColorEditor, setShowColorEditor] = useState(false)

  const toggleColorEditor = () => {
    setShowColorEditor((prev) => !prev)
  }

  const closeColorEditor = () => {
    setShowColorEditor(false)
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center overflow-x-hidden px-4 md:px-6">
      <div className="flex w-full gap-4">
        <div className="flex h-fit flex-col rounded-md bg-white/75 p-4 backdrop-blur-lg dark:bg-gray-700/75">
          <h2 className="mb-2 text-xl font-semibold">кошки</h2>
          <hr className="hr primary mb-2 border-2" />
          <div className="overflow-y-auto">
            <PetList pets={pets} />
          </div>
        </div>
        <div className="ms-auto flex h-fit w-fit flex-col rounded-md bg-white/75 p-4 backdrop-blur-lg dark:bg-gray-700/75">
          <h2 className="mb-2 text-xl font-semibold">окрасы</h2>
          <hr className="hr primary mb-2 border-2" />
          <div className="overflow-y-auto">
            <ColorList colors={colors} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex gap-x-1">
        <Button
          onClick={toggleColorEditor}
          className="min-w-24 rounded-md bg-stone-600 px-4 py-2 text-lg font-semibold text-stone-300 data-[hover]:bg-stone-900 data-[focus]:outline-none data-[focus]:ring-8 data-[focus]:ring-stone-50 data-[focus]:ring-offset-2"
        >
          {showColorEditor ? '- color' : '+ color'}
        </Button>
        {showColorEditor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <ColorEditor closeEditor={closeColorEditor} />
          </div>
        )}
      </div>
    </div>
  )
}
