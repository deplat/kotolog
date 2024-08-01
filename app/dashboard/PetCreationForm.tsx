import {useEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {upload} from "@vercel/blob/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {checkSlugUnique} from "@/lib/checkSlug";
import {useRouter} from "next/navigation";
import {PetFormData} from "@/types/pet";
import {ColorsForDashboard} from "@/lib/data";

interface CatCreationFormProps {
    colors: ColorsForDashboard;
    closeForm: () => void;
}

export const PetCreationForm = ({colors, closeForm}: CatCreationFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setError,
        clearErrors,
        formState: {errors, isSubmitting}
    } = useForm<PetFormData>();
    const avatarFileRef = useRef<HTMLInputElement>(null);
    const photosFileRef = useRef<HTMLInputElement>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [slugError, setSlugError] = useState('');
    const [selectedColors, setSelectedColors] = useState<number[]>([]);
    const [showFurType, setShowFurType] = useState(true);
    const router = useRouter();

    const watchSlug = watch('slug');

    useEffect(() => {
        const checkSlug = async (slug: string) => {
            try {
                const isUnique = await checkSlugUnique(slug);
                if (!isUnique) {
                    setSlugError('Slug is already in use');
                    setError('slug', {type: 'custom', message: 'Slug is already in use'});
                } else {
                    setSlugError('');
                    clearErrors('slug');
                }
            } catch (error) {
                setSlugError('Error checking Slug');
            }
        };
        if (watchSlug) {
            checkSlug(watchSlug);
        }
    }, [clearErrors, setError, watchSlug]);


    const toggleColorSelection = (colorId: number) => {
        setSelectedColors((prevColors) =>
            prevColors.includes(colorId)
                ? prevColors.filter((id) => id !== colorId)
                : [...prevColors, colorId]
        );
    };

    const onSubmit = async (data: PetFormData) => {
        if (slugError) return;
        let avatarUrl: string | undefined;
        const photoUrls: string[] = [];
        if (avatarFileRef.current?.files?.length) {
            const file = avatarFileRef.current.files[0];
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

        if (photosFileRef.current?.files?.length) {
            const files = Array.from(photosFileRef.current.files);
            for (const file of files) {
                try {
                    const blob = await upload('photos/' + data.slug + '/' + file.name, file, {
                        access: "public",
                        handleUploadUrl: "/api/blob"
                    })
                    photoUrls.push(blob.url);
                } catch (error) {
                    console.error('Error uploading photo:', error);
                }
            }
        }

        const cleanedData: PetFormData = {
            ...data,
            colors: selectedColors,
            avatar: avatarUrl,
            photos: photoUrls
        };

        try {
            const response = await fetch('/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cleanedData),
            });

            if (response.ok) {
                setIsSuccess(true)
            } else {
                const errorData = await response.json();
                if (errorData.errors) {
                    for (const [key, value] of Object.entries(errorData.errors)) {
                        setError(key as keyof PetFormData, {type: 'custom', message: value as string});
                    }
                }
            }
            const createdPet = await response.json();
            console.log('Pet created:', createdPet);
            router.refresh()
            closeForm()
        } catch (error) {
            setError('root', {type: 'custom', message: 'Network Error'});
        }
    };

    return (
        <div className="container max-w-3xl mx-auto p-4 rounded-md backdrop-blur-lg bg-white/75">
            {isSuccess ? (
                <div>
                    <h3 className="text-2xl font-semibold">Питомец добавлен!</h3>
                    <button onClick={() => router.refresh()}>Добавить другого питомца</button>
                </div>
            ) : (
                <div>
                    <h3 className="text-2xl font-semibold mb-2">новый питомец.</h3>
                    <hr className="border mb-4" style={{borderColor: '#F35627'}}/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='petType'>Вид:</label>
                            <select
                                className="form-select w-3/4 rounded border-gray-300"
                                id='petType'
                                {...register('petType', {required: 'Обязательное поле'})}
                            >
                                <option value='CAT'>Кошка</option>
                                <option value='DOG'>Собака</option>
                            </select>
                            {errors.petType && <p className="text-red-600">{errors.petType.message}</p>}
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='name'>Имя:</label>
                            <input
                                className="form-input w-3/4 rounded border-gray-300"
                                id='name'
                                type='text'
                                {...register('name', {required: 'Обязательное поле'})}
                            />
                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className='w-1/4' htmlFor='slug'>Слаг:</label>
                            <input
                                className="form-input w-3/4 rounded border-gray-300"
                                id='slug'
                                type='text'
                                {...register('slug', {required: 'Обязательное поле'})}
                            />
                            {errors.slug && <p className="text-red-600">{errors.slug.message}</p>}
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='birthDate'>Дата рождения:</label>
                            <Controller
                                control={control}
                                name='birthDate'
                                render={({field}) => (
                                    <DatePicker
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat='yyyy-MM-dd'
                                        placeholderText='Укажите дату'
                                    />
                                )}
                            />
                            {errors.birthDate && <p className="text-red-600">{errors.birthDate.message}</p>}
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className='w-1/4' htmlFor='gender'>Пол:</label>
                            <select
                                className="form-select w-3/4 rounded border-gray-300"
                                id='gender'
                                {...register('gender', {required: 'Обязательное поле'})}
                            >
                                <option value='MALE'>Мужской</option>
                                <option value='FEMALE'>Женский</option>
                            </select>
                            {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='hasFur'>Наличие шерсти:</label>
                            <input
                                className="form-checkbox rounded border-gray-300"
                                id='hasFur'
                                type="checkbox"
                                onChange={(e) => setShowFurType(e.target.checked)}
                            />
                        </div>

                        {showFurType && (
                            <div className="form-group mb-4 flex items-center">
                                <label className="w-1/4" htmlFor="furType">Тип шерсти:</label>
                                <select
                                    className="form-select w-3/4 rounded border-gray-300"
                                    id='furType'
                                    {...register("furType")}
                                >
                                    <option value="SHORT">короткая</option>
                                    <option value="MEDIUM">средняя</option>
                                    <option value="LONG">длинная</option>
                                    <option value="HAIRLESS">безшёрстный</option>
                                </select>
                                {errors.furType && <p className="text-red-600">{errors.furType.message}</p>}
                            </div>
                        )}

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='colors'>Окрас:</label>
                            <div className="w-3/4 flex flex-wrap" id='colors'>
                                {colors.map((color) => (
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
                            <label className="w-1/4" htmlFor='avatar'>Аватар:</label>
                            <input
                                className="form-input w-3/4 rounded border-gray-300"
                                id='avatar'
                                ref={avatarFileRef}
                                type="file"
                            />
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='photos'>Фотографии:</label>
                            <input
                                className="form-input w-3/4 rounded border-gray-300"
                                id='photos'
                                ref={photosFileRef}
                                type="file"
                                multiple
                            />
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='isUnclaimed'>Группа риска:</label>
                            <input
                                className="form-checkbox rounded border-gray-300"
                                id='isUnclaimed'
                                type="checkbox"
                                {...register('isUnclaimed')}
                            />
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='isFeatured'>Высокий приоритет:</label>
                            <input
                                className="form-checkbox rounded border-gray-300"
                                id='isFeatured'
                                type="checkbox"
                                {...register('isFeatured')}
                            />
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='isAvailable'>Можно усыновить:</label>
                            <input
                                className="form-checkbox rounded border-gray-300"
                                id='isAvailable'
                                type="checkbox"
                                {...register('isAvailable')}
                            />
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='isAdopted'>Пристроен:</label>
                            <input
                                className="form-checkbox rounded border-gray-300"
                                id='isAdopted'
                                type="checkbox"
                                {...register('isAdopted')}
                            />
                        </div>

                        <div className="form-group mb-4 flex items-center">
                            <label className="w-1/4" htmlFor='isVisible'>Показывать:</label>
                            <input
                                className="form-checkbox rounded border-gray-300"
                                id='isVisible'
                                type="checkbox"
                                {...register('isVisible')}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="px-4 p-2 hover:underline"
                                type='button' onClick={closeForm}>Закрыть</button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
