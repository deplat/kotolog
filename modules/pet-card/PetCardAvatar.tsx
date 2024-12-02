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

  if (!avatarSrc) {
    return <div className="h-40 w-40 rounded bg-gray-200 shadow-sm"></div>
  }
  return (
    <Image
      src={avatarSrc}
      alt={`${name}'s avatar`}
      width={160}
      height={160}
      className="shadow-sm"
    />
  )
}
