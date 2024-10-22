import clsx from 'clsx'
import Link from 'next/link'

export const Nav = () => {
  return (
    <div className="flex w-full items-center gap-x-2 border-t border-stone-950 bg-stone-100 px-2 py-2">
      {[
        { label: 'Dashboard', href: '/admin' },
        { label: 'New Pet', href: '/admin/newPet' },
        { label: 'New Color', href: '/admin/editor/newColor' },
      ].map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={clsx(
            'flex items-center border border-stone-950 bg-stone-100 px-4 py-2.5 text-stone-950 underline-offset-4 transition-all duration-100 first:me-auto',
            'hover:bg-stone-950 hover:text-stone-100 hover:underline'
          )}
        >
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
