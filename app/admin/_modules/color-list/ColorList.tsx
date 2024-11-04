import { getCachedColors } from '@/data-access'
import { ColorCard } from '@/app/admin/_modules/color-card'
import { NoColors } from '@/app/admin/_modules/color-list/components/NoColors'
import Link from 'next/link'
import { X } from 'lucide-react'
import clsx from 'clsx'

export const ColorList = async () => {
  const colors = await getCachedColors()
  if (!colors) {
    return <NoColors />
  }
  return (
    <div className="flex h-full w-full flex-col border-stone-950 bg-stone-50 px-3 shadow-md sm:max-w-xl sm:border">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-2xl">Colors</h1>
        <Link
          href="/admin/"
          className={clsx('transition duration-75 hover:bg-stone-700 hover:text-stone-200')}
        >
          <X size={32} absoluteStrokeWidth />
        </Link>
      </div>
      <ul className="flex flex-col">
        {colors.map((color) => (
          <div key={color.id} className="flex w-full border-stone-950 last:border-b">
            <ColorCard id={color.id} name={color.name} />
          </div>
        ))}
      </ul>
    </div>
  )
}
