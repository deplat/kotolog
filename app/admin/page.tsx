import { auth } from '@/auth'
import { UserRole } from '@/types/UserRole'
import { NotAuthenticated } from '@/app/admin/_components/NotAuthenticated'
import { NotAuthorized } from '@/app/admin/_components/NotAuthorized'
import Link from 'next/link'
import clsx from 'clsx'

export default async function Admin() {
  const session = await auth()
  const userRole = session?.user.role
  if (!session) {
    return <NotAuthenticated />
  }
  if (userRole == UserRole.USER) {
    return <NotAuthorized />
  }
  return (
    <main className="flex flex-grow p-3">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        {[
          { label: 'Pets', href: '/admin/pets' },
          { label: 'Colors', href: '/admin/colors' },
        ].map((link, index) => (
          <Link
            key={index}
            className={clsx(
              'text-semibold w-fit min-w-32 border border-stone-950 bg-stone-50 p-3 text-center text-lg underline-offset-4 shadow-md hover:underline focus:underline'
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  )
}
