import { PetList } from '@/app/admin/_modules/pet-list'

export default async function Pets() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PetList />
    </div>
  )
}
