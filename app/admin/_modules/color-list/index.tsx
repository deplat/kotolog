import { getCachedColors } from '@/app/admin/_data-access'
import { NoColors } from '@/app/admin/_modules/color-list/components/no-colors'

export const ColorList = async () => {
  const colors = await getCachedColors()
  return (
    <div className="flex h-fit w-fit max-w-xl flex-col border border-stone-950 p-3">
      <h3 className="mb-2.5 text-2xl">Colors</h3>
      {colors ? (
        <ul className="flex flex-col gap-y-3">
          {colors.map((color, index) => (
            <div key={index} className="w-fit border border-stone-950">
              {color.name}
            </div>
          ))}
        </ul>
      ) : (
        <NoColors />
      )}
    </div>
  )
}
