import { PetCard } from './PetCard'
import { Meta, StoryObj } from '@storybook/react'
import cat from '@/public/cat.jpeg'

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
    id: 's',
    name: 'Daniel',
    nickName: 'Daniel',
    avatarSrc: 'cat',
  },
}

export const WithoutAvatar: Story = {
  args: {
    id: 's',
    name: 'Daniel',
    nickName: 'Daniel',
  },
}
