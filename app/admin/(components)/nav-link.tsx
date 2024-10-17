import Link from 'next/link'

export const NavLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link href={href} className="underline-offset-4 hover:underline">
      {label}
    </Link>
  )
}
