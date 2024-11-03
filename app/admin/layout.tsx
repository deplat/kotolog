import { BottomNav } from '@/app/admin/_modules/nav/BottomNav'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col bg-stone-200">
      {children}
      <BottomNav />
    </div>
  )
}
