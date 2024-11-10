'use client'

import Link from 'next/link'
import {
  PawPrint,
  Plus,
  Search,
  Menu as MenuIcon,
  SwatchBook,
  Sun,
  Moon,
  SunMoon,
  Home,
  LogOut,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTheme } from 'next-themes'

export const NavbarControls = () => {
  const pathname = usePathname()
  const { setTheme } = useTheme()
  console.log(pathname)
  return (
    <>
      <>
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
        ].map((item, index) => (
          <Link key={index} href={item.href} title={item.title} className="group">
            <item.icon
              size={30}
              absoluteStrokeWidth
              className={clsx(
                'relative drop-shadow transition-all group-hover:text-orange-600 dark:text-stone-200 sm:group-hover:-translate-y-0.5',
                pathname == item.href ? 'text-orange-600' : 'text-stone-700'
              )}
            />
          </Link>
        ))}
      </>
      <>
        <Menu>
          <MenuButton className="group">
            <MenuIcon
              size={30}
              absoluteStrokeWidth
              className="drop-shadow transition-all group-hover:text-orange-600 group-data-[open]:text-orange-600 sm:group-hover:-translate-y-0.5"
            />
          </MenuButton>
          <MenuItems
            anchor={{ gap: 20, to: 'top', offset: -50 }}
            className="flex min-w-36 flex-col gap-y-2.5 rounded-lg bg-stone-50/55 text-center shadow-lg ring-1 ring-orange-600 backdrop-blur dark:bg-gray-800/55"
          >
            <div className="flex">
              <MenuItem
                as={Button}
                onClick={() => setTheme('light')}
                className="flex flex-1 justify-center p-2 hover:text-orange-700"
              >
                <Sun size={30} absoluteStrokeWidth />
              </MenuItem>
              <MenuItem
                as={Button}
                onClick={() => setTheme('system')}
                className="flex flex-1 justify-center p-2 hover:text-orange-700"
              >
                <SunMoon size={30} absoluteStrokeWidth />
              </MenuItem>
              <MenuItem
                as={Button}
                onClick={() => setTheme('dark')}
                className="flex flex-1 justify-center p-2 hover:text-orange-700"
              >
                <Moon size={30} absoluteStrokeWidth />
              </MenuItem>
            </div>
            <div className="flex">
              <MenuItem
                as={Link}
                href="/"
                className="flex flex-1 justify-center p-2 hover:text-orange-700"
              >
                <Home size={30} absoluteStrokeWidth />
              </MenuItem>
              <MenuItem
                as={Link}
                href="/api/auth/signout"
                className="flex flex-1 justify-center p-2 hover:text-red-800"
              >
                <LogOut size={30} absoluteStrokeWidth />
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </>
    </>
  )
}
