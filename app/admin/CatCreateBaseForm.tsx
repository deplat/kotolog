'use client';
import {SubmitHandler, useForm} from "react-hook-form";
import {CatCreateBaseInput} from "@/types";
import {useEffect, useRef, useState} from "react";
import {upload} from "@vercel/blob/client";

export const CatCreateBaseForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<CatCreateBaseInput>({
        defaultValues: {
            sex: "MALE",
            fur: "SHORT",
            birth: undefined,
            unclaimed: false,
            show: true,
            adopted: false,
        },
    });

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [colorOptions, setColorOptions] = useState<{ id: number, name: string }[]>([]);
    const [selectedColors, setSelectedColors] = useState<number[]>([]);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch('/api/colors');
                const colors = await response.json();
                setColorOptions(colors);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchColors();
    }, []);

    const toggleColorSelection = (colorId: number) => {
        setSelectedColors((prevColors) =>
            prevColors.includes(colorId)
                ? prevColors.filter((id) => id !== colorId)
                : [...prevColors, colorId]
        );
    };

    const onSubmit: SubmitHandler<CatCreateBaseInput> = async (data) => {
        let avatarUrl: string | undefined
        if (inputFileRef.current?.files?.length) {
            const file = inputFileRef.current.files[0];
            try {
                const blob = await upload('avatar/' + file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/blob"
                });
                avatarUrl = (blob.url);
            } catch (error) {
                console.error('Error uploading avatar:', error);
            }
        }
        const cleanedData: CatCreateBaseInput = {
            ...data,
            birth: data.birth ? new Date(data.birth) : undefined,
            colors: selectedColors,
            avatarUrl
        };

        Object.keys(cleanedData).forEach(
            (key) =>
                cleanedData[key as keyof CatCreateBaseInput] === undefined &&
                delete cleanedData[key as keyof CatCreateBaseInput],
        );

        try {
            const response = await fetch('/api/cats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cleanedData),
            });

            if (!response.ok) {
                console.error('Network response was not ok');
            }
            const createdCat = await response.json();
            console.log('Cat created:', createdCat);
        } catch (error) {
            console.error('Error creating cat:', error);
        }
    };

    return (
        <div className="container mx-auto py-3 px-4">
            <h3 className="text-2xl font-semibold mb-4">new cat.</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Имя</label>
                    <input
                        className="form-input w-3/4 rounded border-gray-300"
                        {...register("name", {required: true})}
                    />
                    {errors.name && <span className="text-red-600">This field is required</span>}
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Пол</label>
                    <select
                        className="form-select w-3/4 rounded border-gray-300"
                        {...register("sex", {required: true})}
                    >
                        <option value="MALE">мальчик</option>
                        <option value="FEMALE">девочка</option>
                    </select>
                    {errors.sex && <span className="text-red-600">This field is required</span>}
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Тип шерсти</label>
                    <select
                        className="form-select w-3/4 rounded border-gray-300"
                        {...register("fur", {required: true})}
                    >
                        <option value="SHORT">короткая</option>
                        <option value="LONG">длинная</option>
                        <option value="HAIRLESS">безшёрстный</option>
                    </select>
                    {errors.fur && <span className="text-red-600">This field is required</span>}
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Дата рождения</label>
                    <input
                        type="date"
                        className="form-input w-3/4 rounded border-gray-300"
                        {...register("birth")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Цвета</label>
                    <div className="w-3/4 flex flex-wrap">
                        {colorOptions.map((color) => (
                            <button
                                type="button"
                                key={color.id}
                                className={`px-4 py-2 mr-2 mb-2 rounded border ${selectedColors.includes(color.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                onClick={() => toggleColorSelection(color.id)}
                            >
                                {color.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Аватар</label>
                    <input
                        className="form-input w-3/4 rounded border-gray-300"
                        ref={inputFileRef}
                        type="file"
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Невостребованный</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("unclaimed")}
                    />
                </div>

                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Показывать</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("show")}
                    />
                </div>
                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Пристроен</label>
                    <input
                        type="checkbox"
                        className="form-checkbox rounded border-gray-300"
                        {...register("adopted")}
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
