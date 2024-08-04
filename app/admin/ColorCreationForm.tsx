import {SubmitHandler, useForm} from "react-hook-form";
import {ColorCreateInput} from "@/types";
import {useRouter} from "next/navigation";

interface ColorCreationFormProps {
    closeForm: () => void;
}

export const ColorCreationForm = ({closeForm}: ColorCreationFormProps) => {
    const {register, handleSubmit, formState: {errors}} = useForm<ColorCreateInput>();
    const router = useRouter();
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
            router.refresh()
            closeForm()
        } catch (error) {
            console.error('Error creating color:', error);
        }
    }
    return (
        <div className="container max-w-3xl mx-auto p-4 rounded-md backdrop-blur-lg bg-white/75">
            <h3 className="text-2xl font-semibold mb-2">новый цвет.</h3>
            <hr className="border mb-4" style={{borderColor: '#F35627'}}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4 flex items-center">
                    <label className="w-1/4">Имя</label>
                    <input
                        className="form-input w-3/4 rounded border-gray-300"
                        {...register("name", {required: 'Обязательное поле!'})}
                    />
                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 p-2 hover:underline"
                        type='button' onClick={closeForm}>Закрыть
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        type="submit"
                    >
                        Отправить
                    </button>
                </div>
            </form>
        </div>

    )
}