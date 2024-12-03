import { PetCard } from './PetCard'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PetCard> = {
  component: PetCard,
  decorators: [
    (Story) => (
      <div className="flex h-screen w-full items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PetCard>

export const Default: Story = {
  args: {
    name: 'Daniel',
    nickName: 'Daniel',
    avatarSrc: 'cat',
  },
}

export const WithoutAvatar: Story = {
  args: {
    name: 'Daniel',
    nickName: 'Daniel',
  },
}
