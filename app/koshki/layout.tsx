import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="mx-auto w-full max-w-7xl p-4 sm:px-6">
        <Header />
      </div>
      <main className="flex flex-grow">{children}</main>
      <div className="mx-auto w-full max-w-7xl p-4 sm:px-6">
        <Footer />
      </div>
    </div>
  )
}
