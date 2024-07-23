'use client';
import {SubmitHandler, useForm } from "react-hook-form";
import { CatCreateProfileInput } from "@/types";
import { useRef, useState} from "react";
import {upload} from "@vercel/blob/client";

interface CatCreateProfileFormProps {
    catId: number;
}

export const CatCreateProfileForm = ({ catId }: CatCreateProfileFormProps) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<CatCreateProfileInput>({
        defaultValues: {
            catId,
            socialized: true,
            catFriendly: true,
            dogFriendly: false,
            animalFriendly: false,
            litterBox: true,
            scratchingPost: true,
            sterilized: true,
            vaccinated: true,
            paraTreated: true,
            healthStatus: 'UNKNOWN',
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [healthFeatures, setHealthFeatures] = useState<string[]>([]);
    const [specialties, setSpecialties] = useState<string[]>([]);
    const [album, setAlbum] = useState<string[]>([]);

    const onSubmit: SubmitHandler<CatCreateProfileInput> = async (data) => {
        const albumUrls: string[] = []
        if (fileInputRef.current?.files?.length) {
            const files = Array.from(fileInputRef.current.files);
            for (const file of files) {
                try {
                    const blob = await upload('albums/' + catId + '/' + file.name, file, {
                        access: "public",
                        handleUploadUrl: "/api/blob"
                    })
                    albumUrls.push(blob.url);
                } catch (error) {
                    console.error('Error uploading album photo:', error);
                }
            }
        }
        const cleanedData: CatCreateProfileInput = {
            ...data,
            healthFeatures,
            specialties,
            album : albumUrls,
        };

        Object.keys(cleanedData).forEach(
            (key) =>
                cleanedData[key as keyof CatCreateProfileInput] === undefined &&
                delete cleanedData[key as keyof CatCreateProfileInput],
        );

        try {
            const response = await fetch(`/api/cats/${catId}/profile`, {
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
            console.log('Cat profile created:', createdProfile);
        } catch (error) {
            console.error('Error creating cat profile:', error);
        }
    };

    const handleListChange = (setList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setList((prevList) => {
            if (prevList.includes(value)) {
                return prevList.filter(item => item !== value);
            }
            return [...prevList, value];
        });
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
                        {...register("catFriendly")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Дружелюбный с собаками</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("dogFriendly")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Дружелюбный с животными</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("animalFriendly")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Использует лоток</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("litterBox")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Использует когтеточку</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("scratchingPost")}
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
                        {...register("paraTreated")}
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
                        value={healthFeatures.join(",")}
                        onChange={(e) => setHealthFeatures(e.target.value.split(","))}
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
                        {...register("bio")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Альбом</label>
                    <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="form-input w-3/4 rounded border-gray-300"
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
