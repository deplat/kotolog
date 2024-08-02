'use client';

import { useState } from "react";
import { PetProfileCreationForm } from "@/app/dashboard/PetProfileCreationForm";
import { useRouter } from "next/navigation";
import { CatsForDashboard } from "@/lib/data";
import Image from "next/image";

interface CatListProps {
    cats: CatsForDashboard
}

export const CatList = ({ cats }: CatListProps) => {
    const router = useRouter();
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

    const handleAddProfile = (catId: number) => {
        setSelectedCatId(catId);
    };

    const handleViewProfile = async (catId: number) => {
        router.push(`/cats/${catId}`);
    };

    return (
        <>
            <div>
                <ul>
                    {cats.map((cat) => (
                        <li key={cat.id} className="flex items-center gap-x-4 p-3 border-b-2">
                            <div className="w-20 h-20 flex items-center justify-center bg-gray-200 relative">
                                {cat.avatar?.src ? (
                                    <Image
                                        src={cat.avatar.src}
                                        alt={cat.name}
                                        width={cat.avatar.width}
                                        height={cat.avatar.height}
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                                        {cat.name}
                                    </span>
                                )}
                            </div>
                            <span>{cat.name}</span>
                            <span className="text-gray-600">{cat.slug}</span>
                            <div className="ms-auto">
                                {cat.profile ? (
                                    <button
                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleViewProfile(cat.id)}
                                    >
                                        Профиль
                                    </button>
                                ) : (
                                    <button
                                        className="bg-green-500 text-white py-1 px-2 rounded"
                                        onClick={() => handleAddProfile(cat.id)}
                                    >
                                        + Профиль
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedCatId && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-lg w-1/2">
                        <PetProfileCreationForm petId={selectedCatId} />
                        <button
                            className="mt-4 bg-red-500 text-white py-1 px-2 rounded"
                            onClick={() => setSelectedCatId(null)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
