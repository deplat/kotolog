import { IButton } from '@/components/buttons/IButton'
import { Meta, StoryObj } from '@storybook/react'

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

export const Default: Story = {
  args: {
    label: 'Button',
  },
}
