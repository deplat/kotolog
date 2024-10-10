import { Button } from '@headlessui/react'

export const Notification = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="flex min-h-12 flex-col items-center justify-center">
      <Button onClick={onClose} className="ms-auto">
        Close
      </Button>
      <span>{message}</span>
    </div>
  )
}
