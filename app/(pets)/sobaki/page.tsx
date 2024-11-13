import { getCachedDogs } from '@/data-access'

export default async function DogsPage() {
  const dogs = await getCachedDogs()
  if (!dogs) return null
  return <></>
}
