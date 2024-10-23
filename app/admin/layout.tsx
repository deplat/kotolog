import { Nav } from '@/app/admin/_modules/nav'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full flex-col">
      {children}
      <div className="fixed bottom-0 flex w-full">
        <Nav />
      </div>
    </div>
  )
}
