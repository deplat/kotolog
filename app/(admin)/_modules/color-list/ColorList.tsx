import { getCachedColors } from '@/data-access'
import { ColorCard } from '@/app/(admin)/_modules/color-card'
import { NoColors } from '@/app/(admin)/_modules/color-list/components/NoColors'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const ColorList = async () => {
  const colors = await getCachedColors()
  if (!colors) {
    return <NoColors />
  }
  return (
    <div className="flex h-full w-full flex-col sm:max-w-xl">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-2xl">Colors</h1>
        <Link href="/admin/colors/newColor">
          <Plus size={30} absoluteStrokeWidth />
        </Link>
      </div>
      <ul className="flex flex-col gap-y-2 overflow-hidden rounded p-3 shadow-lg ring-2 ring-stone-700/85">
        {colors.map((color) => (
          <div key={color.id}>
            <ColorCard id={color.id} name={color.name} />
          </div>
        ))}
      </ul>
    </div>
  )
}
