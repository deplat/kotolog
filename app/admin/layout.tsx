import { auth } from '@/auth'
import { UserRole } from '@/types/UserRole'
import { BottomNav } from '@/app/admin/_modules/nav/BottomNav'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <div className="flex h-screen w-full flex-col">
      {children}
      {session?.user.role == UserRole.USER ? null : <BottomNav />}
    </div>
  )
}
