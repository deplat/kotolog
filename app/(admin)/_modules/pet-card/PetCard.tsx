import Link from 'next/link'
import { StaticImageData } from 'next/image'
import { PetCardControls } from './PetCardControls'
import { PetCardAvatar } from '@/app/(admin)/_modules/pet-card/PetCardAvatar'

interface PetCardProps {
  id: number
  name: string
  slug: string
  avatarSrc?: string | StaticImageData
}

export const PetCard = ({ id, name, slug, avatarSrc }: PetCardProps) => {
  return (
    <div className="flex w-full min-w-80 rounded bg-stone-50/75 shadow-sm ring-2 ring-stone-700/85 backdrop-blur dark:bg-gray-950/15 dark:ring-stone-400/65 sm:shadow">
      <Link href={`/koshki/${slug}`} className="flex w-full">
        <div className="flex">
          <PetCardAvatar avatarSrc={avatarSrc} name={name} />
        </div>
        <div className="flex w-full flex-col justify-evenly p-3">
          <div className="text-stone-600 dark:text-stone-400">#{id}</div>
          <div className="text-xl text-orange-600">{name}</div>
          <div className="text-stone-600 dark:text-stone-400">/{slug}</div>
        </div>
      </Link>
      <PetCardControls id={id} name={name} avatarSrc={avatarSrc} />
    </div>
  )
}
