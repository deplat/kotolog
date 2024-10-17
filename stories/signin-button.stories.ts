import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/components/auth/signin-button'

const meta: Meta<typeof SignIn> = {
  component: SignIn,
}

export default meta
type Story = StoryObj<typeof SignIn>

export const Default: Story = {
  args: {
    label: 'Sign In',
  },
}
