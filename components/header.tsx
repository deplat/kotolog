import { ThemeSwitch } from '@/components/theme-switcher'
import Link from 'next/link'

export const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-end space-x-4">
        <Link
          href="/"
          className="me-auto text-2xl font-semibold decoration-orange-600 decoration-2 underline-offset-4 hover:underline"
        >
          Котолог
        </Link>
        <Link href="/koshki" className="text-lg hover:text-orange-600">
          Питомцы
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  )
}
