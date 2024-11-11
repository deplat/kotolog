import { Color } from '@/types'
import { ColorCardControls } from '@/app/(admin)/_modules/color-card/ColorCardControls'

export const ColorCard = ({ id, name }: Color) => {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden rounded bg-stone-100/75 shadow-sm sm:shadow-md">
      <div className="px-3">
        <span>{name}</span>
      </div>
      <ColorCardControls id={id} name={name} />
    </div>
  )
}
