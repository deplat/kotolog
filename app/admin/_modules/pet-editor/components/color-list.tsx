'use client'

import { IoClose } from 'react-icons/io5'
import { Colors } from '@/app/admin/_data-access/color'
import { deleteColor } from '@/app/admin/_data-access/color'

export const ColorList = ({ colors }: { colors: Colors }) => {
  const handleDeleteColor = async (id: number) => {
    await deleteColor(id)
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
