'use client'

import Link from 'next/link'
import { PawPrint, Plus, Search, Menu, SwatchBook } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export const NavbarControls = () => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center sm:bottom-6">
      <nav className="flex w-full justify-between bg-stone-50/35 px-4 py-3 backdrop-blur sm:max-w-xs sm:rounded-full sm:shadow-lg sm:ring-2 sm:ring-stone-700/50">
        {[
          {
            title: 'Pets',
            href: '/admin/pets',
            icon: PawPrint,
          },
          {
            title: 'Colors',
            href: '/admin/colors',
            icon: SwatchBook,
          },
          {
            title: 'Add new pet',
            href: '/admin/newPet',
            icon: Plus,
          },
          {
            title: 'Search for pets or colors',
            href: '/admin/search',
            icon: Search,
          },
          {
            title: 'Menu',
            href: '/admin/menu',
            icon: Menu,
          },
        ].map((item, index) => (
          <Link key={index} href={item.href} title={item.title} className="group">
            <item.icon
              size={30}
              absoluteStrokeWidth
              className={clsx(
                'relative drop-shadow transition-all group-hover:text-orange-600 sm:group-hover:-translate-y-0.5',
                pathname == item.href ? 'text-orange-600' : 'text-stone-700'
              )}
            />
          </Link>
        ))}
      </nav>
    </div>
  )
}
