import { ColorCardControls } from '@/app/(admin)/_modules/color-card/ColorCardControls'
import { PetColorData } from '@/types/pet'

export const ColorCard = ({ id, name }: PetColorData) => {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden rounded bg-stone-100 shadow-sm dark:bg-gray-700/55 sm:shadow-md">
      <div className="flex w-full px-3">
        <div className="w-11/12">{name}</div>
      </div>
      <ColorCardControls id={id} name={name} />
    </div>
  )
}
