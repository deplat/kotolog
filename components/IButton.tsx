import { Button } from '@headlessui/react'
import clsx from 'clsx'

export const IButton = ({
  onClick,
  label,
  rightIcon,
  leftIcon,
  size,
  primary,
  secondary,
  warning,
}: {
  onClick?: () => void
  label?: string
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  primary?: boolean
  secondary?: boolean
  warning?: boolean
}) => {
  const baseStyle = clsx(
    'px-4 py-2.5 underline-offset-4  flex items-center justify-center',
    'data-[hover]:underline'
  )
  const primaryStyle = clsx(
    'bg-stone-100 ring-1 ring-inset  ring-stone-950',
    'data-[hover]:bg-stone-950 data-[hover]:text-stone-100'
  )
  const warningStyle = 'text-red-600'

  const styles = `${baseStyle} ${primary ? primaryStyle : ''} ${warning ? warningStyle : ''}`

  return (
    <Button onClick={onClick} className={`${styles}`}>
      {leftIcon}
      <span>{label}</span>
      {rightIcon}
    </Button>
  )
}
