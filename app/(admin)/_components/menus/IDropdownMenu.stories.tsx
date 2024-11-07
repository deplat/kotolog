import type { Meta, StoryObj } from '@storybook/react'

import { IDropdownMenu } from './IDropdownMenu'
import { icons } from '@/components/icons'

const meta: Meta<typeof IDropdownMenu> = {
  component: IDropdownMenu,
  decorators: [
    (Story) => (
      <div className="flex h-screen w-full items-center justify-center">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof IDropdownMenu>

export const Default: Story = {
  args: {
    menuButton: { label: 'Menu' },
    menuItems: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ],
  },
}

export const WithLeftIcon = {
  args: {
    menuButton: { label: 'Menu', leftIcon: icons.chevronDown },
    menuItems: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ],
  },
}

export const WithRightIcon = {
  args: {
    menuButton: { label: 'Menu', rightIcon: icons.chevronDown },
    menuItems: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ],
  },
}

export const IconOnly = {
  args: {
    menuButton: { leftIcon: icons.chevronDown },
    menuItems: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ],
  },
}

export const WithMenuLinks = {
  args: {
    menuButton: { label: 'Menu' },
    menuItems: [
      { id: '1', label: 'Link 1', link: true },
      { id: '2', label: 'Link 2', link: true },
      { id: '3', label: 'Link 3', link: true },
    ],
  },
}

export const Small: Story = {
  args: {
    menuButton: { label: 'Menu', size: 'sm' },
    menuItems: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ],
  },
}
