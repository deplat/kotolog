'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {ColorCreateInput} from "@/types";

export const ColorCreateForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ColorCreateInput>();
    const onSubmit: SubmitHandler<ColorCreateInput> = async (data) => {
        try {
            const response = await fetch('/api/colors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error('Network response was not ok');
            }
            const createdColor = await response.json();
            console.log('Color created:', createdColor);
        } catch (error) {
            console.error('Error creating color:', error);
        }
    }
    return (
        <div className="container mx-auto">
            <h3>new color.</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Имя</label>
                    <input
                        className="form-input w-3/4 rounded border-gray-300"
                        {...register("name", {required: true})}
                    />
                    {errors.name && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Отправить
                    </button>
                </div>
            </form>
        </div>

    )
}