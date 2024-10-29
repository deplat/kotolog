import type { Meta, StoryObj } from '@storybook/react'

import { IDropdownMenu } from './IDropdownMenu'

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

export const WithVertDotsIcon = {
  args: {
    menuButton: { leftIcon: 'dots-v' },
    menuItems: [],
  },
}

export const WithHorizDotsIcon = {
  args: {
    menuButton: { leftIcon: 'dots-h' },
    menuItems: [],
  },
}

export const WithLabelAndRightIcon = {
  args: {
    menuButton: { label: 'Menu', rightIcon: 'dots-v' },
    menuItems: [],
  },
}

export const WithMenuLinks = {
  args: {
    menuButton: { label: 'Menu' },
    menuItems: [
      { id: '1', label: 'Item 1', link: true },
      { id: '2', label: 'Item 2', link: true },
      { id: '3', label: 'Item 3', link: true },
    ],
  },
}
