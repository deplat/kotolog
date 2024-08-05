// components/Filter.tsx
import { useState } from "react";

type FilterProps = {
    uniqueColors: string[];
    onFilterChange: (filters: { gender?: string; furType?: string; colors?: string[]; age?: string }) => void;
};

export const Filter = ({ uniqueColors, onFilterChange }: FilterProps) => {
    const [gender, setGender] = useState<string | undefined>();
    const [furType, setFurType] = useState<string | undefined>();
    const [colors, setColors] = useState<string[]>([]);
    const [age, setAge] = useState<string | undefined>();

    const handleColorChange = (color: string) => {
        setColors((prevColors) =>
            prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
        );
    };

    const applyFilters = () => {
        onFilterChange({ gender, furType, colors, age });
    };

    return (
        <div className="sticky top-0 bg-white z-10 mb-4 flex justify-between p-4 shadow-md">
            <div className="relative inline-block text-left">
                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Gender
                </button>
                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setGender('')}>All</button>
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setGender('MALE')}>Male</button>
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setGender('FEMALE')}>Female</button>
                    </div>
                </div>
            </div>

            <div className="relative inline-block text-left">
                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Fur Type
                </button>
                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setFurType('')}>All</button>
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setFurType('SHORT')}>Short</button>
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setFurType('LONG')}>Long</button>
                    </div>
                </div>
            </div>

            <div className="relative inline-block text-left">
                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Colors
                </button>
                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {uniqueColors.map((color) => (
                            <div key={color} className="block px-4 py-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={colors.includes(color)}
                                    onChange={() => handleColorChange(color)}
                                /> {color}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative inline-block text-left">
                <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Age
                </button>
                <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setAge('')}>All</button>
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setAge('under1')}>Under 1 year</button>
                        <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => setAge('above1')}>Above 1 year</button>
                    </div>
                </div>
            </div>

            <button onClick={applyFilters} className="px-4 py-2 bg-blue-500 text-white rounded-md">Apply Filters</button>
        </div>
    );
};