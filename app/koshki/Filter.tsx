// components/Filter.tsx
import {useEffect, useRef, useState} from "react";

type FilterProps = {
    uniqueColors: string[];
    onFilterChange: (filters: { gender?: string; furType?: string; colors?: string[]; age?: string }) => void;
};

export const Filter = ({ uniqueColors, onFilterChange }: FilterProps) => {
    const [gender, setGender] = useState<string | undefined>();
    const [furType, setFurType] = useState<string | undefined>();
    const [colors, setColors] = useState<string[]>([]);
    const [age, setAge] = useState<string | undefined>();
    const [showGender, setShowGender] = useState(false);
    const [showFurType, setShowFurType] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showAge, setShowAge] = useState(false);
    const [showFilterBar, setShowFilterBar] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleGenderChange = (gender: string) => {
        setGender(gender);
        setShowGender(false);
    };

    const handleColorChange = (color: string) => {
        setColors((prevColors) =>
            prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
        );
    };

    const applyFilters = () => {
        onFilterChange({ gender, furType, colors, age });
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowGender(false);
            setShowFurType(false);
            setShowColors(false);
            setShowAge(false);
            setShowFilterBar(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={ref} className="sticky top-0 z-10 mx-auto p-2 max-w-full">
            {/* Filter Icon for Small Screens */}
            <div className="sm:hidden flex justify-center mb-4">
                <button
                    onClick={() => setShowFilterBar(!showFilterBar)}
                    className="rounded-full bg-orange-500 text-white p-2 shadow-md focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v5.172a1 1 0 01-1.707.707L9 18.414a1 1 0 00-.707-.293H6a1 1 0 01-1-1v-2a1 1 0 01.293-.707l6.414-6.414A1 1 0 0013 7.414V6a1 1 0 00-.293-.707L7 1.293A1 1 0 016.293 1H4a1 1 0 00-1 1v2z"
                        />
                    </svg>
                </button>
            </div>

            {/* Filter Bar */}
            <div className={`flex flex-wrap gap-x-2 gap-y-2 mb-4 rounded-md backdrop-blur-lg bg-white/75 shadow-md p-2 ${showFilterBar ? 'block' : 'hidden'} sm:flex sm:justify-center`}>
                <div className="relative">
                    <button
                        className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                            setShowGender(!showGender);
                            setShowFurType(false);
                            setShowColors(false);
                            setShowAge(false);
                        }}
                    >
                        Пол
                    </button>
                    {showGender && (
                        <div className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-10">
                            <div className='p-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${gender === '' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => handleGenderChange('')}>Любой</button>
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${gender === 'MALE' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => handleGenderChange('MALE')}>Кот</button>
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${gender === 'FEMALE' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => handleGenderChange('FEMALE')}>Кошка</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                            setShowFurType(!showFurType);
                            setShowGender(false);
                            setShowColors(false);
                            setShowAge(false);
                        }}
                    >
                        Тип шерсти
                    </button>
                    {showFurType && (
                        <div className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-10">
                            <div className='p-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${furType === '' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => setFurType('')}>Любой</button>
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${furType === 'SHORT' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => setFurType('SHORT')}>Короткая</button>
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${furType === 'LONG' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => setFurType('LONG')}>Длинная</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                            setShowColors(!showColors);
                            setShowGender(false);
                            setShowFurType(false);
                            setShowAge(false);
                        }}
                    >
                        Окрас
                    </button>
                    {showColors && (
                        <div className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-10">
                            <div className='p-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {uniqueColors.map((color) => (
                                    <div key={color} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            checked={colors.includes(color)}
                                            onChange={() => handleColorChange(color)}
                                            className="mr-2"
                                        />
                                        {color}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        className="rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                            setShowAge(!showAge);
                            setShowGender(false);
                            setShowFurType(false);
                            setShowColors(false);
                        }}
                    >
                        Возраст
                    </button>
                    {showAge && (
                        <div className="absolute mt-2 w-36 rounded-md backdrop-blur-lg bg-white/75 shadow-md z-10">
                            <div className='p-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${age === '' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => setAge('')}>Любой</button>
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${age === 'under1' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => setAge('under1')}>До 1 года</button>
                                <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${age === 'above1' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-500 hover:text-white'}`} onClick={() => setAge('above1')}>Старше 1 года</button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={applyFilters}
                    className="px-4 py-2 bg-orange-500 text-sm text-white rounded-md"
                >
                    Показать
                </button>
            </div>
        </div>
    );
};
