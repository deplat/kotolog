import { ColorList } from '@/app/admin/_modules/color-list'

export default async function Page() {
  return (
    <main className="flex w-full flex-grow justify-center p-3">
      <ColorList />
    </main>
  )
}
