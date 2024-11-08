import Link from 'next/link'
import { PawPrint, Plus, Search, Menu, SwatchBook } from 'lucide-react'

export const NavbarControls = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center sm:bottom-6">
      <nav className="flex w-full justify-between bg-stone-100/35 px-4 py-2.5 backdrop-blur sm:max-w-xs sm:rounded-full sm:shadow sm:ring-1 sm:ring-stone-700">
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
              className="relative transition group-hover:scale-125 group-hover:text-orange-600"
            />
          </Link>
        ))}
      </nav>
    </div>
  )
}
