import { Button } from '@headlessui/react'
import clsx from 'clsx'
import { createStateStyles } from '@/utils/createStateStyles'
import { icons } from '@/components/icons'

interface IButtonProps {
  onClick?: () => void
  label?: string
  leftIcon?: (typeof icons)[keyof typeof icons]
  rightIcon?: (typeof icons)[keyof typeof icons]
  variant?: 'primary' | 'secondary' | 'warning'
  size?: 'sm' | 'md' | 'lg'
}

export const IButton: React.FC<IButtonProps> = ({
  onClick,
  label,
  leftIcon,
  rightIcon,
  variant = 'primary', // default
  size = 'md', // default
}) => {
  const LeftIcon = leftIcon
  const RightIcon = rightIcon
  const iconSize = {
    sm: 20,
    md: 24,
    lg: 28,
  }

  const baseStyle = clsx('flex items-center justify-center transition')

  const primaryStyle = clsx(
    'bg-gray-500',
    createStateStyles('data-[hover]', ['bg-stone-950', 'text-stone-100'])
  )
  const secondaryStyle = clsx(
    'bg-stone-100 ring-1 ring-stone-600',
    createStateStyles('data-[hover]', ['bg-gray-200'])
  )
  const warningStyle = clsx(
    'text-red-600',
    createStateStyles('data-[hover]', ['bg-red-600', 'text-stone-100'])
  )

  const variantStyles = {
    primary: primaryStyle,
    secondary: secondaryStyle,
    warning: warningStyle,
  }

  const sizeStyle = clsx({
    'p-2': size === 'sm',
    'text-sm px-3 py-2': size === 'sm' && label,
    'p-2.5': size === 'md',
    'text-lg px-4 py-2.5': size === 'md' && label,
    'p-3': size === 'lg',
    'text-lg px-5 py-3': size === 'lg' && label,
  })

  const styles = clsx(baseStyle, variantStyles[variant], sizeStyle)

  return (
    <Button onClick={onClick} className={styles}>
      {LeftIcon && <LeftIcon size={iconSize[size]} />}
      {label && <span className={clsx({ 'mx-2': LeftIcon || RightIcon })}>{label}</span>}
      {RightIcon && <RightIcon size={iconSize[size]} />}
    </Button>
  )
}
