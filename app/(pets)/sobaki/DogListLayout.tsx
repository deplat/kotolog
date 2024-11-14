'use client'

import { Sidebar } from '@/components/Sidebar'
import { useState } from 'react'
import { Button, Field, Label } from '@headlessui/react'
import { SlidersHorizontal } from 'lucide-react'
import { GiSittingDog } from 'react-icons/gi'

export const DogListLayout = ({
  initialDogs,
  uniqueColorsFromDogs,
}: {
  initialDogs: any[]
  uniqueColorsFromDogs: string[]
}) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => setShowSidebar(!showSidebar)
  return (
    <div className="w-full px-3 py-[15vh] sm:px-6">
      <div className="flex w-full items-center">
        <GiSittingDog size={36} className="me-2 text-gray-500 dark:text-gray-400 md:me-4" />
        <h1 className="text-4xl font-bold">Собаки</h1>
        <Button onClick={toggleSidebar} className="ms-auto flex items-center ps-4 text-xl">
          <SlidersHorizontal size={24} />
          <span className="hidden sm:ms-2 sm:block">Фильтр</span>
        </Button>
      </div>
      <Sidebar showSidebar={showSidebar}>
        <div className="me-auto flex h-full min-w-60 max-w-sm flex-col py-4">
          <h2 className="mb-2 text-2xl">Фильтр</h2>
          <Field className="flex flex-col rounded bg-gray-200 p-3 sm:p-6">
            <Label>Пол</Label>
          </Field>
          <div className="fieldset">
            <label>Возраст</label>
            <select>
              <option value="all">Все</option>
              <option value="male">Мальчик</option>
              <option value="female">Девочка</option>
            </select>
          </div>
          <div className="fieldset">
            <label>Окрас</label>
            <select>
              <option value="all">Все</option>
            </select>
          </div>
          <div className="mt-auto flex w-full flex-col">
            <Button className="text-center">Сохранить</Button>
            <Button onClick={toggleSidebar} className="text-center">
              Закрыть
            </Button>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
