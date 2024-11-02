'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function AvatarToggleLink() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const withAvatar = searchParams.get('withAvatar') === 'true'

  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set('withAvatar', withAvatar ? 'false' : 'true')

  return (
    <Link href={`${pathname}?${newSearchParams.toString()}`}>
      {withAvatar ? 'Hide Avatars' : 'Show Avatars'}
    </Link>
  )
}
