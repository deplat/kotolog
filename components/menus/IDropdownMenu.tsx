import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { LuMoreHorizontal, LuMoreVertical } from 'react-icons/lu'

const icons = {
  dotsVertical: LuMoreVertical,
  dotsHorizontal: LuMoreHorizontal,
}

interface MenuButtonProps {
  label?: string
  leftIcon?: 'dots-v' | 'dots-h'
  rightIcon?: 'dots-v' | 'dots-h'
}

interface MenuItemProps extends MenuButtonProps {
  link?: boolean
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
        className="absolute right-0 z-10 mt-2 min-w-36 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      ></MenuItems>
    </Menu>
  )
}
