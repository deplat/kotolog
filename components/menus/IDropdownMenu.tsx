import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import Link from 'next/link'
import clsx from 'clsx'
import { icons } from '@/lib/styling/icons'
import { createStateStyles } from '@/lib/styling/createStateStyles'

interface MenuButtonProps {
  label?: string
  leftIcon?: (typeof icons)[keyof typeof icons]
  rightIcon?: (typeof icons)[keyof typeof icons]
  variant?: 'primary' | 'secondary' | 'warning'
  size?: 'sm' | 'md' | 'lg'
}

interface MenuItemProps extends MenuButtonProps {
  id: string
  link?: boolean // renders as <Link> if true, <button> if false
  href?: string // required if link is true
  onClick?: () => void // only if link is false
}

interface IDropdownMenuProps {
  menuButton: MenuButtonProps
  menuItems: MenuItemProps[]
}

export const IDropdownMenu: React.FC<IDropdownMenuProps> = ({
  menuButton: { variant = 'primary', size = 'md', ...menuButton },
  menuItems,
}) => {
  const MenuButtonLeftIcon = menuButton.leftIcon
  const MenuButtonRightIcon = menuButton.rightIcon

  const iconSize = {
    sm: 20,
    md: 24,
    lg: 28,
  }

  // MenuButton styles
  const menuButtonBaseStyle = clsx(
    'underline-offset-4 flex items-center justify-center transition ring-inset',
    createStateStyles({
      hover: ['underline'],
    })
  )
  const menuButtonVariantStyles = {
    primary: clsx(
      'bg-stone-100 ring-1 ring-stone-950',
      createStateStyles({ hover: ['bg-stone-950', 'text-stone-100'] })
    ),
    secondary: clsx(
      'bg-stone-100 ring-1 ring-stone-600',
      createStateStyles({ hover: ['bg-gray-200'] })
    ),
    warning: clsx('text-red-600', createStateStyles({ hover: ['bg-red-600', 'text-stone-100'] })),
  }

  const menuButtonSizeStyles = clsx({
    'p-2': size === 'sm',
    'text-sm px-3 py-2': size === 'sm' && menuButton.label,
    'p-2.5': size === 'md',
    'text-lg px-4 py-2.5': size === 'md' && menuButton.label,
    'p-3': size === 'lg',
    'text-lg px-5 py-3': size === 'lg' && menuButton.label,
  })

  const menuButtonStyles = clsx(
    menuButtonBaseStyle,
    menuButtonVariantStyles[variant],
    menuButtonSizeStyles
  )

  // MenuItem styles
  const menuItemBaseStyle = clsx(
    'block w-full text-left transition duration-150',
    createStateStyles({
      focus: ['bg-gray-100'],
    })
  )
  const menuItemVariantStyles = {
    primary: 'text-stone-900 hover:bg-stone-100',
    secondary: 'text-gray-800 hover:bg-gray-200',
    warning: 'text-red-600 hover:bg-red-100',
  }

  const menuItemSizeStyles = clsx({
    'px-3 py-1.5 text-sm': size === 'sm',
    'px-4 py-2 text-base': size === 'md',
    'px-5 py-2.5 text-lg': size === 'lg',
  })

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className={menuButtonStyles}>
        {MenuButtonLeftIcon && <MenuButtonLeftIcon size={iconSize[size]} />}
        {menuButton.label && (
          <span className={clsx({ 'mx-2': MenuButtonLeftIcon || MenuButtonRightIcon })}>
            {menuButton.label}
          </span>
        )}
        {MenuButtonRightIcon && <MenuButtonRightIcon size={iconSize[size]} />}
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 min-w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all focus:outline-none"
      >
        {menuItems.map((item) => {
          const ItemLeftIcon = item.leftIcon
          const ItemRightIcon = item.rightIcon

          const menuItemStyles = clsx(
            menuItemBaseStyle,
            menuItemVariantStyles[variant],
            menuItemSizeStyles
          )

          return (
            <MenuItem key={item.id}>
              {({ active }) =>
                item.link && item.href ? (
                  <Link
                    href={item.href}
                    className={clsx(menuItemStyles, { 'bg-gray-100': active })}
                  >
                    {ItemLeftIcon && <ItemLeftIcon size={iconSize[size]} className="mr-2" />}
                    {item.label}
                    {ItemRightIcon && <ItemRightIcon size={iconSize[size]} className="ml-2" />}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={clsx(menuItemStyles, { 'bg-gray-100': active })}
                  >
                    {ItemLeftIcon && <ItemLeftIcon size={iconSize[size]} className="mr-2" />}
                    {item.label}
                    {ItemRightIcon && <ItemRightIcon size={iconSize[size]} className="ml-2" />}
                  </button>
                )
              }
            </MenuItem>
          )
        })}
      </MenuItems>
    </Menu>
  )
}
