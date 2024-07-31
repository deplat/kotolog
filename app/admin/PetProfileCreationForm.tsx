'use client';
import {SubmitHandler, useForm } from "react-hook-form";
import { useState} from "react";
import {PetProfileFormData} from "@/types/pet";

interface PetCreateProfileFormProps {
    petId: number;
}

export const PetProfileCreationForm = ({ petId }: PetCreateProfileFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<PetProfileFormData>({
        defaultValues: {
            petId,
            socialized: true,
            friendlyWithCats: true,
            friendlyWithDogs: false,
            friendlyWithAnimals: false,
            litterBoxTrained: true,
            usesScratchingPost: true,
            sterilized: true,
            vaccinated: true,
            treatedForParasites: true,
            healthStatus: 'UNKNOWN',
        },
    });
    const [healthNotes, setHealthNotes] = useState<string[]>([]);
    const [specialties, setSpecialties] = useState<string[]>([]);
    
    const onSubmit: SubmitHandler<PetProfileFormData> = async (data) => {

        const cleanedData: PetProfileFormData = {
            ...data,
            healthNotes,
            specialties,
        };

        Object.keys(cleanedData).forEach(
            (key) =>
                cleanedData[key as keyof PetProfileFormData] === undefined &&
                delete cleanedData[key as keyof PetProfileFormData],
        );

        try {
            const response = await fetch(`/api/pets/${petId}/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanedData),
            });

            if (!response.ok) {
                console.error('Network response was not ok');
            }
            const createdProfile = await response.json();
            console.log('Pet profile created:', createdProfile);
        } catch (error) {
            console.error('Error creating pet profile:', error);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <h3 className="text-xl font-semibold mb-4">Cat Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Социализирован</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("socialized")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Дружелюбный с кошками</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("friendlyWithCats")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Дружелюбный с собаками</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("friendlyWithDogs")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Дружелюбный с животными</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("friendlyWithAnimals")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Использует лоток</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("litterBoxTrained")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Использует когтеточку</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("usesScratchingPost")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Стерилизован</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("sterilized")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Вакцинирован</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("vaccinated")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Обработан от паразитов</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("treatedForParasites")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Состояние здоровья</label>
                    <select
                        className="form-select w-3/4 rounded border-gray-300"
                        {...register("healthStatus", { required: true })}
                    >
                        <option value="HEALTHY">Здоров</option>
                        <option value="UNDER_TREATMENT">На лечении</option>
                        <option value="RECOVERING">На восстановлении</option>
                        <option value="CHRONIC_CONDITION">Хроническое заболевание</option>
                        <option value="UNKNOWN">Неизвестно</option>
                    </select>
                    {errors.healthStatus && <span className="text-red-600">This field is required</span>}
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Особенности здоровья</label>
                    <input
                        type="text"
                        className="form-input w-3/4 rounded border-gray-300"
                        value={healthNotes.join(",")}
                        onChange={(e) => setHealthNotes(e.target.value.split(","))}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Фишечки</label>
                    <input
                        type="text"
                        className="form-input w-3/4 rounded border-gray-300"
                        value={specialties.join(",")}
                        onChange={(e) => setSpecialties(e.target.value.split(","))}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Биография</label>
                    <textarea
                        className="form-textarea w-3/4 rounded border-gray-300"
                        {...register("biography")}
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
};
