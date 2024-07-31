'use server'

import prisma from "@/lib/prisma";
import {CatList} from "@/app/admin/CatList";
import {getCatsForDashboard} from "@/lib/data";

export const Dashboard = async () => {
    const colors = await prisma.color.findMany({
        select: {
            id: true,
            name: true,
        }
    });

    const cats = await getCatsForDashboard()
    console.log(cats)

    return (
        <section className="dashboard">
            <div className="dashboard container flex w-full border-2">
                <CatList cats={cats}/>
            </div>
        </section>
    )
}