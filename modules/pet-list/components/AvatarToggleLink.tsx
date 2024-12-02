'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Image as ImageOn, ImageOff } from 'lucide-react'

export default function AvatarToggleLink() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const withAvatar = searchParams.get('showAvatar') !== 'false'

  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set('showAvatar', withAvatar ? 'false' : 'true')

  return (
    <Link href={`${pathname}?${newSearchParams.toString()}`}>
      {withAvatar ? (
        <ImageOn size={32} absoluteStrokeWidth />
      ) : (
        <ImageOff size={32} absoluteStrokeWidth />
      )}
    </Link>
  )
}
