'use server'

import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

interface PetCardProps {
  id: number
  name: string
  slug: string
  avatarSrc?: string | StaticImageData
}

export const PetCard = async ({ id, name, slug, avatarSrc }: PetCardProps) => {
  return (
    <div className="group flex overflow-hidden rounded bg-stone-100 shadow-sm sm:shadow-lg">
      <Link href={`/koshki/${slug}`} className="flex flex-1">
        <div className="h-40 min-w-40 max-w-40 rounded bg-stone-200">
          {avatarSrc && (
            <Image src={avatarSrc} alt={name} width={160} height={160} className="rounded" />
          )}
        </div>
        <div className="flex flex-1 flex-col overflow-hidden truncate">
          <div>#{id}</div>
          <div className="overflow-hidden truncate">{name}</div>
          <div>{slug}</div>
        </div>
      </Link>
    </div>
  )
}
