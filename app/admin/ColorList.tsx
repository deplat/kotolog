import prisma from "@/lib/prisma";

export const ColorList = async () => {
    const colors = await prisma.color.findMany()
    return (
        <ul className="flex flex-col gap-y-1.5 items-center">
            {colors.map((color) => (
                <li key={color.id} className="w-1/2 text-center border-2 border-blue-400 rounded">{color.name}</li>
            ))}
        </ul>
    )
}