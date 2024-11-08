import Link from 'next/link'
import { PawPrint, Plus, Search, Menu, SwatchBook } from 'lucide-react'

export const NavbarControls = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center sm:bottom-8">
      <nav className="flex w-full justify-between p-3 sm:max-w-xs">
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
              className="relative transition group-hover:scale-125"
            />
          </Link>
        ))}
      </nav>
    </div>
  )
}
