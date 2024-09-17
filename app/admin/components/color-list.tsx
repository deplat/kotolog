'use client'

import { Colors } from '@/lib/data'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

interface ColorListProps {
  colors: Colors
}

export const ColorList = ({ colors }: ColorListProps) => {
  const router = useRouter()
  const handleDeleteColor = async (id: number) => {
    await fetch(`/api/colors/${id}`, {
      method: 'DELETE',
    })
    router.refresh()
  }
  return (
    <ul>
      {colors.map((color) => (
        <li key={color.id} className="flex items-center gap-x-4 border-b-2 p-3">
          <span>{color.name}</span>
          <div className="ms-auto">
            <button className="text-red-600" onClick={() => handleDeleteColor(color.id)}>
              <IoClose size={24} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
