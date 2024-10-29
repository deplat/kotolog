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
    menuButton: { label: 'Menu', leftIcon: 'dots-v' },
    menuItems: [],
  },
}
