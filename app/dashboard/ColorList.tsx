import { ColorsForDashboard } from "@/lib/data";

interface ColorListProps {
    colors: ColorsForDashboard
}

export const ColorList = ({ colors }: ColorListProps) => {
    return (
            <ul>
                {colors.map((color) => (
                    <li key={color.id} className="flex items-center gap-x-4 p-3 border-b-2">
                        <span>{color.name}</span>
                        <div className="ms-auto">
                            {/* Add any buttons or actions here if needed */}
                        </div>
                    </li>
                ))}
            </ul>
    )
}
