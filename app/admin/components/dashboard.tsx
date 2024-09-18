'use client'

import { useState } from 'react'
import { ColorEditor } from '@/app/admin/components/color-editor'
import { Colors } from '../data-access/color'
import { PetList } from '@/app/admin/components/pet-list'
import { ColorList } from '@/app/admin/components/color-list'
import { PetEditor } from '@/app/admin/components/pet-editor'
import { getPet, Pet, Pets } from '@/app/admin/data-access/pet'
import { Button } from '@headlessui/react'

export const Dashboard = ({ colors, pets }: { colors: Colors; pets: Pets }) => {
  const [isPetEditorVisible, setIsPetEditorVisible] = useState(false)
  const [isColorEditorVisible, setIsColorEditorVisible] = useState(false)
  const [isPetEditFormVisible, setIsPetEditFormVisible] = useState(false)
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const [pet, setPet] = useState<Pet>(null)

  const togglePetEditor = () => {
    setIsPetEditorVisible((prev) => !prev)
  }

  const toggleColorEditor = () => {
    setIsColorEditorVisible((prev) => !prev)
  }

  const togglePetEditForm = () => {
    setIsPetEditFormVisible((prev) => !prev)
  }

  const handleEditPet = async (petId: number) => {
    setSelectedPetId(petId)
    const pet = await getPet(petId)
    setPet(pet)
    setIsPetEditFormVisible(true)
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center overflow-x-hidden px-4 md:px-6">
      <div className="flex w-full gap-4">
        <div className="flex h-fit flex-col rounded-md bg-white/75 p-4 backdrop-blur-lg dark:bg-gray-700/75">
          <h2 className="mb-2 text-xl font-semibold">кошки</h2>
          <hr className="hr primary mb-2 border-2" />
          <div className="overflow-y-auto">
            <PetList pets={pets} onEditPet={handleEditPet} />
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

      <div className="overflow-visiblew fixed bottom-5 right-5 z-50 flex gap-x-1">
        <Button
          onClick={togglePetEditor}
          className="min-w-24 rounded-md bg-stone-600 px-4 py-2 text-lg font-semibold text-stone-300 data-[hover]:bg-stone-900 data-[focus]:outline-none data-[focus]:ring-8 data-[focus]:ring-stone-50 data-[focus]:ring-offset-2"
        >
          {isPetEditorVisible ? '- pet' : '+ pet'}
        </Button>
        <Button
          onClick={toggleColorEditor}
          className="min-w-24 rounded-md bg-stone-600 px-4 py-2 text-lg font-semibold text-stone-300 data-[hover]:bg-stone-900 data-[focus]:outline-none data-[focus]:ring-8 data-[focus]:ring-stone-50 data-[focus]:ring-offset-2"
        >
          {isColorEditorVisible ? '- color' : '+ color'}
        </Button>
        {isPetEditorVisible && (
          <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-hidden">
            <PetEditor colors={colors} closeForm={togglePetEditForm} />
          </div>
        )}

        {isColorEditorVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <ColorEditor closeForm={toggleColorEditor} />
          </div>
        )}

        {isPetEditFormVisible && selectedPetId && (
          <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-hidden">
            <PetEditor pet={pet} colors={colors} closeForm={togglePetEditForm} />
          </div>
        )}
      </div>
    </div>
  )
}
