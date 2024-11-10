'use client'

import { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useSearchParams } from 'next/navigation'

interface PetAvatarProps {
  avatarSrc?: string | StaticImageData
  name: string
}

export const PetCardAvatar = ({ avatarSrc, name }: PetAvatarProps) => {
  const searchParams = useSearchParams()
  const [showAvatar, setShowAvatar] = useState(true) // Default to `true`

  useEffect(() => {
    const withAvatarParam = searchParams.get('showAvatar')
    setShowAvatar(withAvatarParam !== 'false')
  }, [searchParams])

  if (!showAvatar) return null

  return (
    <div className="relative m-3 aspect-1 w-40 overflow-hidden rounded bg-stone-200 ring-2 ring-stone-700/85">
      {avatarSrc ? (
        <Image src={avatarSrc} alt={`${name}'s avatar`} objectFit={'cover'} fill />
      ) : null}
    </div>
  )
}
