'use client';

import { useState } from "react";
import { PetCreationForm } from "@/app/admin/PetCreationForm";
import { ColorCreationForm } from "@/app/admin/ColorCreationForm";
import { PetProfileCreationForm } from "@/app/admin/PetProfileCreationForm";
import { CatsForDashboard, ColorsForDashboard } from "@/lib/data";
import { CatList } from "@/app/admin/CatList";
import { ColorList } from "@/app/admin/ColorList";

interface DashboardProps {
    colors: ColorsForDashboard;
    cats: CatsForDashboard;
}

export const Dashboard = ({ colors, cats }: DashboardProps) => {
    const [isPetCreationFormVisible, setIsPetCreationFormVisible] = useState(false);
    const [isColorCreationFormVisible, setIsColorCreationFormVisible] = useState(false);
    const [isPetProfileCreationFormVisible, setIsPetProfileCreationFormVisible] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

    const togglePetCreationForm = () => {
        setIsPetCreationFormVisible(prev => !prev);
    };

    const toggleColorCreationForm = () => {
        setIsColorCreationFormVisible(prev => !prev);
    };

    const togglePetProfileCreationForm = () => {
        setIsPetProfileCreationFormVisible(prev => !prev);
    };

    const handleAddProfile = (catId: number) => {
        setSelectedCatId(catId);
        setIsPetProfileCreationFormVisible(true);
    };

    return (
        <>
            <div className="flex gap-4">
                <div
                    className="flex flex-col h-fit p-4 rounded-md backdrop-blur-lg bg-white/75"
                    style={{ maxHeight: "700px" }}
                >
                    <h2 className="text-xl font-semibold mb-2">кошки</h2>
                    <hr className="hr primary border-2 mb-2" />
                    <div className="overflow-y-auto">
                        <CatList cats={cats} onAddProfile={handleAddProfile} />
                    </div>
                </div>
                <div className="flex flex-col h-fit p-4 rounded-md backdrop-blur-lg bg-white/75"
                     style={{ maxHeight: "700px" }}
                >
                    <h2 className="text-xl font-semibold mb-2">окрасы</h2>
                    <hr className="hr primary border-2 mb-2" />
                    <div className="overflow-y-auto">
                        <ColorList colors={colors} />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 right-0 p-4 bg-white shadow-lg z-50">
                <button onClick={togglePetCreationForm} className="mr-2">
                    {isPetCreationFormVisible ? '- Питомец' : '+ Питомец'}
                </button>
                <button onClick={toggleColorCreationForm}>
                    {isColorCreationFormVisible ? '- Цвет' : '+ Цвет'}
                </button>

                {isPetCreationFormVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <PetCreationForm colors={colors} closeForm={togglePetCreationForm} />
                    </div>
                )}

                {isColorCreationFormVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <ColorCreationForm closeForm={toggleColorCreationForm} />
                    </div>
                )}

                {isPetProfileCreationFormVisible && selectedCatId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <PetProfileCreationForm petId={selectedCatId} closeForm={togglePetProfileCreationForm} />
                    </div>
                )}
            </div>
        </>
    );
};
