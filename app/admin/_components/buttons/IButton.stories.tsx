import { IButton } from '@/app/admin/_components/buttons/IButton'
import { Meta, StoryObj } from '@storybook/react'
import { icons } from '@/lib/styling/icons'

const meta: Meta<typeof IButton> = {
  component: IButton,
  decorators: [
    (Story) => (
      <div className="flex h-screen w-full items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof IButton>

export const Primary: Story = {
  args: {
    label: 'Primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
  },
}

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Button',
    leftIcon: icons.pencil,
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Button',
    rightIcon: icons.pencil,
  },
}

export const IconOnly: Story = {
  args: {
    leftIcon: icons.pencil,
  },
}

export const Small: Story = {
  args: {
    label: 'Button',
    size: 'sm',
  },
}

export const SmallIconOnly: Story = {
  args: {
    leftIcon: icons.pencil,
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Button',
    size: 'lg',
  },
}

export const LargeIconOnly: Story = {
  args: {
    leftIcon: icons.pencil,
    size: 'lg',
  },
}
