import { BottomNav } from '@/app/(admin)/_modules/nav/BottomNav'

export default async function Layout({
  children,
  explorer,
}: {
  children: React.ReactNode
  explorer: React.ReactNode
}) {
  return (
    <>
      <main className="flex h-full w-full flex-col lg:flex-row">
        {children}
        {explorer}
      </main>
      <BottomNav />
    </>
  )
}
