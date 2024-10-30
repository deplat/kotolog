import { Button } from '@headlessui/react'
import clsx from 'clsx'
import { stateClasses } from '@/lib/styling/stateClasses'
import { icons } from '@/lib/styling/icons'

interface IButtonProps {
  onClick?: () => void
  label?: string
  LeftIcon?: (typeof icons)[keyof typeof icons]
  RightIcon?: (typeof icons)[keyof typeof icons]
  variant?: 'primary' | 'secondary' | 'warning'
  size?: 'sm' | 'md' | 'lg'
}

export const IButton: React.FC<IButtonProps> = ({
  onClick,
  label,
  LeftIcon,
  RightIcon,
  variant,
  size,
}) => {
  const baseStyle = 'px-4 py-2.5 underline-offset-4 flex items-center justify-center'

  const variantStyle = clsx({
    'bg-stone-100 ring-1 ring-inset ring-stone-950': variant === 'primary',
    'bg-gray-100 text-gray-800 ring-1 ring-gray-300': variant === 'secondary',
    'text-red-600': variant === 'warning',
  })

  const sizeStyle = clsx({
    'text-sm px-3 py-2': size === 'sm',
    'text-base px-4 py-2.5': size === 'md',
    'text-lg px-5 py-3': size === 'lg',
  })

  const stateStyles = stateClasses({
    hover: ['bg-stone-950', 'text-stone-100', 'underline'],
    focus: ['ring-2', 'ring-offset-2', 'ring-indigo-500'],
  })

  const styles = clsx(baseStyle, variantStyle, sizeStyle, stateStyles)

  return (
    <Button onClick={onClick} className={styles}>
      {LeftIcon && <LeftIcon size={24} />}
      {label && <span>{label}</span>}
      {RightIcon && <RightIcon size={24} />}
    </Button>
  )
}
