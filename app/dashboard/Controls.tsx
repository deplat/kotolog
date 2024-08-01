'use client';

import { useState } from "react";
import { PetCreationForm } from "@/app/dashboard/PetCreationForm";
import { ColorCreationForm } from "@/app/dashboard/ColorCreationForm";
import {ColorsForDashboard} from "@/lib/data";

interface ControlsProps  {
    colors: ColorsForDashboard
}

export default function Controls({ colors }: ControlsProps) {
    const [isPetCreationFormVisible, setIsPetCreationFormVisible] = useState(false);
    const [isColorCreationFormVisible, setIsColorCreationFormVisible] = useState(false);

    const togglePetCreationForm = () => {
        setIsPetCreationFormVisible(prev => !prev);
    };

    const toggleColorCreationForm = () => {
        setIsColorCreationFormVisible(prev => !prev);
    };

    return (
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
        </div>
    );
}