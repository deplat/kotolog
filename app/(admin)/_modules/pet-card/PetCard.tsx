'use server'

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { PetCardControls } from '@/app/(admin)/_modules/pet-card/PetCardControls'

interface PetCardProps {
  id: number
  name: string
  slug: string
  avatarSrc?: string | StaticImageData
}

export const PetCard = async ({ id, name, slug, avatarSrc }: PetCardProps) => {
  return (
    <div className="relative rounded bg-stone-100 shadow-sm sm:shadow-lg">
      <div className="absolute right-0 top-0">
        <PetCardControls id={id} name={name} />
      </div>

      <Link href={`/koshki/${slug}`} className="flex flex-1 overflow-hidden">
        <div className="h-40 w-40 shrink-0 rounded bg-stone-200">
          {avatarSrc && (
            <Image
              src={avatarSrc}
              alt={name}
              width={160}
              height={160}
              className="h-full w-full rounded object-cover"
            />
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-1 flex-col justify-between gap-y-3 truncate p-3 sm:justify-evenly">
          <div className="truncate text-stone-600">#{id}</div>
          <div className="truncate text-lg text-orange-600">{name}</div>
          <div className="truncate text-stone-600">{slug}</div>
        </div>
      </Link>
    </div>
  )
}
