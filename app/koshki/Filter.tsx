import {useEffect, useRef, useState} from "react";
import {FaFilter} from "react-icons/fa6";
import {FaXmark} from "react-icons/fa6";

type FilterProps = {
    uniqueColors: string[];
    onFilterChange: (filters: { gender?: string; furType?: string; colors?: string[]; age?: string }) => void;
};

export const Filter = ({uniqueColors, onFilterChange}: FilterProps) => {
    const [gender, setGender] = useState<string | undefined>();
    const [furType, setFurType] = useState<string | undefined>();
    const [colors, setColors] = useState<string[]>([]);
    const [age, setAge] = useState<string | undefined>();
    const [showGender, setShowGender] = useState(false);
    const [showFurType, setShowFurType] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showAge, setShowAge] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);

    const handleGenderChange = (gender: string) => {
        setGender(gender);
        setShowGender(false);
    };

    const handleFurTypeChange = (furType: string) => {
        setFurType(furType);
        setShowFurType(false);
    };

    const handleColorChange = (color: string) => {
        setColors((prevColors) =>
            prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
        );
    };

    const handleAgeChange = (age: string) => {
        setAge(age);
        setShowAge(false);
    };

    const applyFilters = () => {
        onFilterChange({gender, furType, colors, age});
    };

    const resetFilters = () => {
        setGender(undefined);
        setFurType(undefined);
        setColors([]);
        setAge(undefined);
        setShowGender(false);
        setShowFurType(false);
        setShowColors(false);
        setShowAge(false);
        onFilterChange({});
    };

    const toggleDropdown = (dropdown: string) => {
        setShowGender(dropdown === "gender" ? !showGender : false);
        setShowFurType(dropdown === "furType" ? !showFurType : false);
        setShowColors(dropdown === "colors" ? !showColors : false);
        setShowAge(dropdown === "age" ? !showAge : false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setShowGender(false);
            setShowFurType(false);
            setShowColors(false);
            setShowAge(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            {/* Filter Button */}
            <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                aria-label={isFilterVisible ? "Скрыть фильтр" : "Показать фильтр"}
                className={`fixed bottom-6 right-6 flex flex-row items-center justify-center p-4 border-2 border-orange-500 rounded-full bg-white shadow-lg z-50`}
            >
                {isFilterVisible ? (
                    <FaXmark className='text-orange-500'/>
                ) : (
                    <FaFilter className='text-orange-500'/>
                )}
            </button>

            {/* Container for Filter Bar */}
            <div
                className={`fixed top-0 left-0 w-full flex justify-center transition-transform transform ${isFilterVisible ? "translate-y-0" : "-translate-y-full"} z-10`}
            >
                {/* Filter Bar */}
                <div
                    ref={filterRef}
                    className="flex flex-wrap gap-y-2 w-full max-w-2xl p-4 rounded-md bg-white shadow-lg border-b border-b-orange-500"
                    role="region"
                    aria-label="Панель фильтрации"
                >
                    <div className="flex flex-wrap gap-x-2 gap-y-2 flex-grow">
                        <div className="relative">
                            <button
                                className={`rounded-md border px-4 py-2 text-sm text-gray-700 font-medium ${gender && 'border-orange-500'} bg-white hover:bg-gray-50`}
                                onClick={() => toggleDropdown('gender')}
                                aria-haspopup="listbox"
                                aria-expanded={showGender}
                                aria-label="Пол"
                            >
                                Пол
                            </button>
                            {showGender && (
                                <div
                                    className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-50">
                                    <div className='p-2' role="listbox" aria-labelledby="Пол">
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${gender === '' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleGenderChange('')}>Любой
                                        </button>
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${gender === 'MALE' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleGenderChange('MALE')}>Кот
                                        </button>
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${gender === 'FEMALE' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleGenderChange('FEMALE')}>Кошка
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className={`rounded-md border px-4 py-2 text-sm font-medium text-gray-700 ${furType && 'border-orange-500'} bg-white hover:bg-gray-50`}
                                onClick={() => toggleDropdown('furType')}
                                aria-haspopup="listbox"
                                aria-expanded={showFurType}
                                aria-label="Тип шерсти"
                            >
                                Тип&nbsp;шерсти
                            </button>
                            {showFurType && (
                                <div
                                    className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-50">
                                    <div className='p-2' role="listbox" aria-labelledby="Тип шерсти">
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${furType === '' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleFurTypeChange('')}>Любой
                                        </button>
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${furType === 'SHORT' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleFurTypeChange('SHORT')}>Короткий
                                        </button>
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${furType === 'LONG' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleFurTypeChange('LONG')}>Длинный
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className={`rounded-md border px-4 py-2 text-sm text-gray-700 font-medium ${colors.length > 0 && 'border-orange-500'} bg-white hover:bg-gray-50`}
                                onClick={() => toggleDropdown('colors')}
                                aria-haspopup="listbox"
                                aria-expanded={showColors}
                                aria-label="Окрас"
                            >
                                Окрас
                            </button>
                            {showColors && (
                                <div
                                    className="absolute mt-2 w-56 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-50">
                                    <div className="p-2" role="listbox" aria-labelledby="Окрас">
                                        {uniqueColors.map((color) => (
                                            <div key={color} className="block px-4 py-2 text-sm text-gray-700">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        checked={colors.includes(color)}
                                                        onChange={() => handleColorChange(color)}
                                                        aria-checked={colors.includes(color)}
                                                        aria-label={color}
                                                    />&nbsp;&nbsp;{color}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className={`rounded-md border px-4 py-2 text-sm text-gray-700 font-medium ${age && 'border-orange-500'} bg-white hover:bg-gray-50`}
                                onClick={() => toggleDropdown('age')}
                                aria-haspopup="listbox"
                                aria-expanded={showAge}
                                aria-label="Возраст"
                            >
                                Возраст
                            </button>
                            {showAge && (
                                <div
                                    className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-50">
                                    <div className='p-2' role="listbox" aria-labelledby="Возраст">
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${age === '' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleAgeChange('')}>Любой
                                        </button>
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${age === 'under1' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleAgeChange('under1')}>Менее года
                                        </button>
                                        <button
                                            className={`w-full px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 hover:text-white ${age === 'above1' ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
                                            onClick={() => handleAgeChange('above1')}>Более года
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons container */}
                    <div className="relative ms-auto flex gap-x-2">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm text-red-600 underline-offset-4 rounded-md hover:underline"
                            aria-label="Сбросить фильтры"
                        >
                            Сбросить
                        </button>
                        <button
                            onClick={applyFilters}
                            className="px-4 py-2 bg-orange-500 text-sm text-white rounded-md"
                            aria-label="Применить фильтры"
                        >
                            Показать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
