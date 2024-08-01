import { ColorsForDashboard } from "@/lib/data";

interface ColorListProps {
    colors: ColorsForDashboard
}

export const ColorList = ({ colors }: ColorListProps) => {
    return (
        <div className="h-full overflow-y-auto">
            <ul className="p-4 rounded-md backdrop-blur-lg bg-white/75">
                {colors.map((color) => (
                    <li key={color.id} className="flex items-center gap-x-4 p-3 border-b-2">
                        <span>{color.name}</span>
                        <div className="ms-auto">
                            {/* Add any buttons or actions here if needed */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
