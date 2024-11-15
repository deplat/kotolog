'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@headlessui/react'
import { Sidebar } from '@/components/Sidebar'
import Form from 'next/form'

export const FilterSidebar = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => setShowSidebar(!showSidebar)

  return (
    <>
      <Button onClick={toggleSidebar} className="ms-auto flex items-center ps-4 text-xl">
        <SlidersHorizontal size={28} />
        <span className="me-2 hidden sm:ms-2 sm:block">Фильтр</span>
      </Button>
      <Sidebar showSidebar={showSidebar}>
        <Form action="" className="flex h-full flex-col">
          {children}
          <div className="mt-auto flex flex-col">
            <Button type="submit">Применить</Button>
            <Button type="reset">Сбросить</Button>
            <Button onClick={toggleSidebar}>Закрыть</Button>
          </div>
        </Form>
      </Sidebar>
    </>
  )
}
