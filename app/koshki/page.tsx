import {getCachedCats} from "@/lib/data";
import {CatsList} from "@/app/koshki/CatsList";

export default async function CatsPage() {
    const cats = await getCachedCats()
    return (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">кошки</h2>
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                    <CatsList initialCats={cats}/>
                </div>
            </div>
    )
}