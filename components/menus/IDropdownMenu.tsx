import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import Link from 'next/link'
import { icons } from '@/lib/styling/icons'

interface MenuButtonProps {
  label?: string
  leftIcon?: 'dots-v' | 'dots-h'
  rightIcon?: 'dots-v' | 'dots-h'
}

interface MenuItemProps extends MenuButtonProps {
  id: string
  label: string
  link?: boolean // renders as <Link> if true, <button> if false
  href?: string // required if link is true
  onClick?: () => void // only if link is false
}

interface IDropdownMenuProps {
  menuButton: MenuButtonProps
  menuItems: MenuItemProps[]
}

export const IDropdownMenu: React.FC<IDropdownMenuProps> = ({ menuButton, menuItems }) => {
  const LeftIcon = menuButton.leftIcon
    ? menuButton.leftIcon === 'dots-v'
      ? icons.dotsVertical
      : icons.dotsHorizontal
    : null
  const RightIcon = menuButton.rightIcon
    ? menuButton.rightIcon === 'dots-v'
      ? icons.dotsVertical
      : icons.dotsHorizontal
    : null

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex gap-x-1.5 ring-inset">
        {LeftIcon && <LeftIcon size={24} />}
        {menuButton.label && <span>{menuButton.label}</span>}
        {RightIcon && <RightIcon size={24} />}
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 min-w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all focus:outline-none"
      >
        {menuItems.map((item) => (
          <MenuItem key={item.id}>
            {({ focus }) =>
              item.link && item.href ? (
                <Link
                  href={item.href}
                  className={`${
                    focus ? 'bg-gray-100' : ''
                  } block w-full px-4 py-2 text-left text-sm`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`${
                    focus ? 'bg-gray-100' : ''
                  } block w-full px-4 py-2 text-left text-sm`}
                >
                  {item.label}
                </button>
              )
            }
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
