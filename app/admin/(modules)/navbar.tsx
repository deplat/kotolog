import { ThemeSwitch } from '@/components/theme-switcher'

export const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-end p-4">
      <ThemeSwitch />
    </div>
  )
}
