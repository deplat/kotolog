'use client'
import {useState} from "react";
import {PetProfileCreationForm} from "@/app/admin/PetProfileCreationForm";
import {useRouter} from "next/navigation";



export const CatList = (cats) => {
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
                        <li key={cat.id} className="flex justify-between items-center p-2 border-b">
                            <span>{cat.name}</span>
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
                        <PetProfileCreationForm petId={selectedCatId}/>
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