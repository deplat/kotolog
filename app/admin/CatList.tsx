import { useRouter } from "next/navigation";
import { CatsForDashboard } from "@/lib/data";
import Image from "next/image";

interface CatListProps {
    cats: CatsForDashboard;
    onAddProfile: (catId: number) => void;
}

export const CatList = ({ cats, onAddProfile }: CatListProps) => {
    const router = useRouter();

    const handleViewProfile = async (catId: number) => {
        router.push(`/koshki/${catId}`);
    };

    const handleDeleteCat = async (id: number) => {
        await fetch(`/api/pets/${id}`, {
            method: "DELETE",
        });
        router.refresh();
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
                                        onClick={() => onAddProfile(cat.id)}
                                    >
                                        + Профиль
                                    </button>
                                )}
                            </div>
                            <div>
                                <button
                                    className='text-red-600'
                                    onClick={() => handleDeleteCat(cat.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
