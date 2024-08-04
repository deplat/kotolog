'use client'

import { ColorsForDashboard } from "@/lib/data";
import {useRouter} from "next/navigation";

interface ColorListProps {
    colors: ColorsForDashboard
}

export const ColorList = ({ colors }: ColorListProps) => {
    const router = useRouter()
    const handleDeleteColor = async (id: number) => {
        await fetch(`/api/colors/${id}`, {
            method: "DELETE",
        })
        router.refresh()
    }
    return (
            <ul>
                {colors.map((color) => (
                    <li key={color.id} className="flex items-center gap-x-4 p-3 border-b-2">
                        <span>{color.name}</span>
                        <div className="ms-auto">
                            <button
                                className='text-red-600'
                                onClick={() => handleDeleteColor(color.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
    )
}
