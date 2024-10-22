import { PetList } from '@/app/admin/_modules/pet-list'

export default async function Admin() {
  return (
    <main className="flex flex-1 p-3">
      <div className="flex w-full">
        <PetList />
      </div>
    </main>
  )
}
