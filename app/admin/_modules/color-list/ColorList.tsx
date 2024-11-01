import { getCachedColors } from '@/app/admin/_data-access'
import { ColorCard } from '@/app/admin/_modules/color-card'
import { NoColors } from '@/app/admin/_modules/color-list/components/no-colors'

export const ColorList = async () => {
  const colors = await getCachedColors()
  return (
    <div className="flex h-fit w-full max-w-xl flex-col border border-stone-950 bg-stone-50 p-3 shadow-md">
      <h3 className="mb-2.5 text-2xl">Colors</h3>
      {colors ? (
        <ul className="flex flex-col gap-y-3">
          {colors.map((color) => (
            <div key={color.id} className="flex w-full">
              <ColorCard id={color.id} name={color.name} />
            </div>
          ))}
        </ul>
      ) : (
        <NoColors />
      )}
    </div>
  )
}
