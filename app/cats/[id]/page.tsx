import prisma from "@/lib/db/prisma";
import NotFound from "next/dist/client/components/not-found-error";
import Image from "next/image";
import {getAge} from "@/lib/helpers";

export default async function CatPage({params}: { params: { id: string } }) {

        const cat = await prisma.cat.findUnique({
            where: {id: Number(params.id)},
            include: {
                avatar: true,
                profile: true,
            }
        })
        if (!cat) {
            return NotFound
        }

    return (
        <main className="bg-gray-50">
            <div className="container">
                <div className="grid">
                    <div className="group relative">
                        <div
                            className="relative aspect-h-1 aspect-w-1 w-full rounded overflow-hidden">
                            <Image
                                src={cat.avatar?.url || "https://7srwfaunr1krwltq.public.blob.vercel-storage.com/avatar/michelle-brittain-A62zcEohwFk-D1Ln4qiNlnCNKz3DkBGhgEaFxc9i63.jpg"}
                                alt={cat.name}
                                fill
                            />
                        </div>
                        <div className="text-center mt-2.5">
                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                                <a href={`/cats/${cat.id}`}>
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {cat.name}
                                </a>
                            </h3>
                            <p className="mt-1 text-lg lg:text-xl text-gray-500">{cat.birth ? getAge(cat.birth) : '\u00A0'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};
