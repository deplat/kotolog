import Link from 'next/link'

export const NavLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <Link
      href={href}
      className="px-4 py-2.5 underline-offset-4 hover:bg-stone-950 hover:text-stone-100"
    >
      {label}
    </Link>
  )
}
