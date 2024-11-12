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
    <>
      <Link href={`/koshki/${slug}`} className="flex w-full">
        <PetCardAvatar avatarSrc={avatarSrc} name={name} />
        <div className="flex w-full flex-col justify-evenly gap-y-1 px-3 py-2">
          <div className="text-stone-600 dark:text-stone-400">#{id}</div>
          <div className="text-xl text-orange-600">{name}</div>
          <div className="text-stone-600 dark:text-stone-400">/{slug}</div>
        </div>
      </Link>
      <PetCardControls id={id} name={name} avatarSrc={avatarSrc} />
    </>
  )
}
