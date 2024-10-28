import { Button } from '@headlessui/react'
import clsx from 'clsx'

export const IMenuItemButton = ({
  onClick,
  label,
  rightIcon,
  leftIcon,
  size,
  variant,
}: {
  onClick: () => void
  label?: string
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant: 'primary' | 'secondary' | 'warning'
}) => {
  const baseStyle = clsx(
    'flex w-full group px-4 py-1.5 underline-offset-4  items-center justify-center',
    'data-[hover]:underline',
    'data-[focus]:bg-stone-950'
  )
  const primaryStyle = clsx('bg-stone-100', 'data-[hover]:bg-stone-950 data-[hover]:text-stone-100')
  const secondaryStyle = ''
  const warningStyle = 'text-red-600 data-[hover]:bg-red-600 data-[hover]:text-stone-100'

  const styles = clsx(
    baseStyle,
    variant == 'primary' && primaryStyle,
    variant == 'secondary' && secondaryStyle,
    variant == 'warning' && warningStyle
  )

  return (
    <Button onClick={onClick} className={styles}>
      {leftIcon}
      <span>{label}</span>
      {rightIcon}
    </Button>
  )
}
