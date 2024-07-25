'use client'
import {CatWithAvatarAndProfileId} from "@/types";
import {CatCreateProfileForm} from "@/app/admin/CatCreateProfileForm";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";



export const CatList = () => {
    const router = useRouter();
    const [cats, setCats] = useState<CatWithAvatarAndProfileId[]>([])
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

    useEffect(() => {
        const getCats = async () => {
            const res = await fetch(`/api/cats`, {
                next: {
                    revalidate: 30,
                },
            });
            if (!res.ok) {
                console.error("Failed to get Cats from admin page");
            }
            const data = await res.json();
            setCats(data)
        };
        getCats()
    }, [])

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
                    {cats.map((cat: CatWithAvatarAndProfileId) => (
                        <li key={cat.id} className="flex justify-between items-center p-2 border-b">
                            <span>{cat.name}</span>
                            { cat.profile ? (
                                <button
                                    className="bg-blue-500 text-white py-1 px-2 rounded"
                                    onClick={() => handleViewProfile(cat.id)}
                                >
                                    Профиль
                                </button>
                            ): (
                                <button
                                    className="bg-green-500 text-white py-1 px-2 rounded"
                                    onClick={() => handleAddProfile(cat.id)}
                                >
                                    Заполнить профиль
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedCatId && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-lg w-1/2">
                        <CatCreateProfileForm catId={selectedCatId} />
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
)
}