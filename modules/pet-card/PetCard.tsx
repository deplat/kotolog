'use server'

import Link from 'next/link'
import Image from 'next/image'
import { PetCardControls } from '@/modules/pet-card/PetCardControls'

interface PetCardProps {
  name: string
  nickName: string
  profileNickName: string
  avatarSrc: string
}

export const PetCard = async ({ name, nickName, avatarSrc, profileNickName }: PetCardProps) => {
  return (
    <div className="relative rounded bg-stone-100 shadow-sm dark:bg-gray-700/55 sm:shadow-lg">
      <div className="absolute right-0 top-0">
        <PetCardControls
          nickName={nickName}
          name={name}
          avatarSrc={avatarSrc}
          profileNickName={profileNickName}
        />
      </div>

      <Link href={`/koshki/${nickName}`} className="flex flex-1 overflow-hidden">
        <div className="h-40 w-40 shrink-0 rounded bg-stone-200">
          {avatarSrc && avatarSrc != '' && (
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
          <div className="truncate text-xl text-orange-600 dark:text-orange-500">{name}</div>
          <div className="truncate text-stone-600 dark:text-stone-300">{nickName}</div>
        </div>
      </Link>
    </div>
  )
}
