import { ColorList } from '@/app/(admin)/_modules/color-list'

export default async function Page() {
  return (
    <div className="flex w-full flex-grow justify-center sm:p-3">
      <ColorList />
    </div>
  )
}
