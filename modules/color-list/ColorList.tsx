import { getCachedColors } from '@/data-access'
import { ColorCard } from '@/modules/color-card'
import { NoColors } from '@/modules/color-list/components/NoColors'

export const ColorList = async () => {
  const colors = await getCachedColors()
  if (!colors) {
    return <NoColors />
  }
  return (
    <div className="flex h-full w-full flex-col">
      <ul className="flex flex-col gap-y-2">
        {colors.map((color) => (
          <div key={color.id}>
            <ColorCard id={color.id} name={color.name} />
          </div>
        ))}
      </ul>
    </div>
  )
}
