'use client'

import { useEffect, useState, Fragment } from 'react'
import { useTheme } from 'next-themes'
import { IoDesktop, IoMoon, IoSunny } from 'react-icons/io5'
import { IconType } from 'react-icons'
import {
  Menu,
  MenuButton,
  MenuItems,
  Transition,
  RadioGroup,
  MenuItem,
  Radio,
} from '@headlessui/react'
import clsx from 'clsx'

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const renderIcon = () => {
    if (!mounted) return <div className="flex h-6 w-6" />
    return resolvedTheme === 'dark' ? <IoMoon size={24} /> : <IoSunny size={24} />
  }

  const renderOption = (value: string, label: string, Icon: IconType) => (
    <Radio value={value}>
      {({ checked }) => (
        <MenuItem
          as="button"
          className={clsx(
            checked ? 'text-orange-600' : '',
            'dark flex w-full items-center px-2 py-2 hover:bg-orange-600 hover:text-stone-50'
          )}
        >
          <Icon className="mr-2" size={24} />
          {label}
        </MenuItem>
      )}
    </Radio>
  )

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        aria-label="Toggle theme"
        className="flex items-center justify-center hover:text-orange-600 data-[active]:text-orange-600"
      >
        {renderIcon()}
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-90 mt-2 w-32 origin-top-right overflow-hidden rounded-lg bg-white shadow-lg focus:outline-none dark:bg-gray-700/75 dark:ring-1 dark:ring-inset dark:ring-gray-50/15 dark:backdrop-blur-xl">
          <RadioGroup value={theme} onChange={setTheme}>
            {renderOption('light', 'Светлая', IoSunny)}
            {renderOption('dark', 'Тёмная', IoMoon)}
            {renderOption('system', 'Система', IoDesktop)}
          </RadioGroup>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
