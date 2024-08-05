import Image from "next/image";
import {getAge} from "@/lib/helpers";
import {Cats} from "@/lib/data";

interface CatsListProps {
    initialCats: Cats
}

export const CatsList = ({initialCats} : CatsListProps) => {
    return (
        <div>
            {initialCats.map((cat) => (
                <div key={cat.id} className="group relative">
                    <div
                        className="relative aspect-h-1 aspect-w-1 w-full rounded overflow-hidden">
                        <Image
                            src={cat.avatar?.src || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/static/paw-main"}
                            alt={cat.name}
                            fill
                        />
                    </div>
                    <div className="text-center mt-2.5">
                        <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                            <a href={`/koshki/${cat.slug}`}>
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {cat.name}
                            </a>
                        </h3>
                        <p className="mt-1 text-lg lg:text-xl text-gray-500">{cat.birthDate ? getAge(cat.birthDate) : '\u00A0'}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}