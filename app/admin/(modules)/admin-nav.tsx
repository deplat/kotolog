import { ThemeSwitch } from '@/components/theme-switcher'
import { AuthBlock } from '@/components/auth/auth-block'
import { NavLink } from '@/app/admin/(components)/nav-link'

export const AdminNav = () => {
  return (
    <div className="flex w-full items-center justify-center gap-6 p-4">
      {[
        { label: 'Home', href: '/' },
        { label: 'Editor', href: '/admin/editor' },
        { label: 'New Pet', href: '/admin/editor/newPet' },
      ].map((link, index) => (
        <NavLink key={index} label={link.label} href={link.href} />
      ))}
      <div>
        <ThemeSwitch />
      </div>
      <AuthBlock />
    </div>
  )
}
