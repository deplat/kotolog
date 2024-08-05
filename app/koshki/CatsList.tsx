'use client'

import Image from "next/image";
import {getAge} from "@/lib/helpers";
import {Cats} from "@/lib/data";
import {useState} from "react";
import {Filter} from "@/app/koshki/Filter";

interface CatsListProps {
    initialCats: Cats
}

export const CatsList = ({initialCats} : CatsListProps) => {
    const [filteredCats, setFilteredCats] = useState<Cats>(initialCats);
    const handleFilterChange = (filters) => {
        let newCats = initialCats;
        if (filters.gender) {
            newCats = newCats.filter(cat => cat.gender === filters.gender);
        }
        setFilteredCats(newCats);
    }
    return (
        <div>
            <Filter onFilterChange={handleFilterChange}/>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
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
        </div>
    )
}