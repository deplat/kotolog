import { PetCard } from '@/app/admin/_modules/pet-card/PetCard'
import { Meta, StoryObj } from '@storybook/react'
import kittens from '@/public/cats-kittens.png'

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
    id: 1,
    name: 'Daniel',
    slug: 'Daniel',
    avatarSrc: kittens,
  },
}

export const WithoutAvatar: Story = {
  args: {
    id: 2,
    name: 'Daniel',
    slug: 'Daniel',
    avatarSrc: kittens,
  },
}
