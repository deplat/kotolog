import {CatWithAvatarAndProfileId} from "@/types";
import Image from "next/image";
import {getAge} from "@/lib/helpers";

const getCats = async () => {
    const res = await fetch(`/api/cats`, {next: {revalidate: 10}})
    if (!res.ok) {
        throw new Error(`Failed to fetch cats from 'Cats' page`)
    }
    return res.json()
}

export default async function Cats () {
    const cats : CatWithAvatarAndProfileId[] = await getCats();

    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">кошки</h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {cats.map((cat) => (
                        <div key={cat.id} className="group relative">
                            <div
                                className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Image src={cat.avatar?.url || ""} alt={cat.name} className="object-cover" fill/>
                            </div>
                                <div className="text-center mt-4">
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        <a href={`/cats/${cat.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {cat.name}
                                        </a>
                                    </h3>
                                    <p className="mt-2.5 text-lg text-gray-500">{cat.birth ? getAge(cat.birth) : '\u00A0'}</p>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}