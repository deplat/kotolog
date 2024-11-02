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
    const withAvatarParam = searchParams.get('withAvatar')
    setShowAvatar(withAvatarParam !== 'false')
  }, [searchParams])

  if (!showAvatar) return null

  return (
    <div className="relative aspect-1 h-32 w-32 bg-stone-200">
      {avatarSrc ? <Image src={avatarSrc} alt={`${name}'s avatar`} fill sizes="128px" /> : null}
    </div>
  )
}
