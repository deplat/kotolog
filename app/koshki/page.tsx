import { getCachedCats } from './(data-access)/cat'
import { getCachedListOfUniqueColorsFromCats } from './(data-access)/color'
import { CatsListLayout } from '@/app/koshki/(components)/cats-list-layout'

export default async function CatsPage() {
  const cats = await getCachedCats()
  const uniqueColors = await getCachedListOfUniqueColorsFromCats()
  return (
    <>
      <CatsListLayout initialCats={cats} uniqueColors={uniqueColors} />
    </>
  )
}
