import { getCachedColors } from '@/data-access'
import { ColorCard } from '@/app/(admin)/_modules/color-card'
import { NoColors } from '@/app/(admin)/_modules/color-list/components/NoColors'

export const ColorList = async () => {
  const colors = await getCachedColors()
  if (!colors) {
    return <NoColors />
  }
  return (
    <div className="flex h-full w-full flex-col px-3 sm:max-w-xl">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-2xl">Colors</h1>
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
