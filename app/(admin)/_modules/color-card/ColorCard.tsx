import { Color } from '@/types'
import { ColorCardControls } from '@/app/(admin)/_modules/color-card/ColorCardControls'

export const ColorCard = ({ id, name }: Color) => {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden rounded bg-stone-100 shadow-sm sm:shadow-md">
      <div className="flex w-full px-3">
        <div className="w-1/12">#{id}</div>

        <div className="w-11/12">{name}</div>
      </div>
      <ColorCardControls id={id} name={name} />
    </div>
  )
}
