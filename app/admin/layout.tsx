import { AdminNav } from '@/app/admin/(components)/admin-nav'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full flex-col">
      <AdminNav />
      <main className="flex flex-1">{children}</main>
    </div>
  )
}
