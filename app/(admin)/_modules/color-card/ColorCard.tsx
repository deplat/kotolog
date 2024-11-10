import { Color } from '@/types'
import { ColorCardControls } from '@/app/(admin)/_modules/color-card/ColorCardControls'

export const ColorCard = ({ id, name }: Color) => {
  return (
    <div className="border-b-1 flex w-full items-center justify-between border-stone-950 bg-stone-50/75 shadow-md">
      <div className="px-3">
        <span>{name}</span>
      </div>
      <ColorCardControls id={id} name={name} />
    </div>
  )
}
