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
    <div className="flex w-full min-w-80 overflow-hidden rounded-lg bg-white shadow-xl ring-2 ring-stone-700/55 backdrop-blur dark:bg-gray-900/55">
      <Link href={`/koshki/${slug}`} className="flex w-full">
        <PetCardAvatar avatarSrc={avatarSrc} name={name} />
        <div className="flex w-full flex-col justify-between p-3">
          <div className="text-stone-600 dark:text-stone-400">#{id}</div>
          <div className="text-lg">{name}</div>
          <div className="text-stone-600 dark:text-stone-400">/{slug}</div>
        </div>
      </Link>
      <PetCardControls id={id} name={name} avatarSrc={avatarSrc} />
    </div>
  )
}
