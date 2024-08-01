import prisma from '@/lib/prisma';
import {NextRequest, NextResponse} from 'next/server';
import {revalidateTag} from "next/cache";

export async function GET() {
    try {
        const colors = await prisma.color.findMany();
        return NextResponse.json(colors);
    } catch (error) {
        return NextResponse.json({error: (error as Error).message});
    }
}

export async function POST(req: NextRequest) {
    const {name} = await req.json();
    try {
        const newColor = await prisma.color.create({
            data: {name},
        });
        revalidateTag('dashboard-colors')
        return NextResponse.json(newColor);
    } catch (error) {
        return NextResponse.json({error: (error as Error).message});
    }
}