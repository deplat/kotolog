import { PetCard } from '@/app/admin/_modules/pet-card/PetCard'
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
    id: 1,
    name: 'Some Pet',
    slug: 'some-pet',
    avatarSrc: 'https://s3.timeweb.cloud/31c3d159-kotolog/0db11fb8-e833-43af-942b-840143fe903b',
  },
}
