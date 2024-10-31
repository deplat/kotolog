import Link from 'next/link'
import Image from 'next/image'

interface PetCardProps {
  id: number
  name: string
  slug: string
  avatarSrc?: string
}
export const PetCard = ({ id, name, slug, avatarSrc }: PetCardProps) => {
  return (
    <Link href={`/koshki/${slug}`}>
      <div className="relative aspect-1 h-24 w-24">
        {avatarSrc ? <Image src={avatarSrc} alt={name} fill /> : null}
      </div>
      <div>
        <span>{name}</span>
        <span>/{slug}</span>
      </div>
    </Link>
  )
}
