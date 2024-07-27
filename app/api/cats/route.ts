import { NextRequest, NextResponse } from 'next/server';
import { catCreateBase } from '@/lib/db/cat';
import prisma from '@/lib/db/prisma';

export async function GET() {
    try {
        const cats = await prisma.cat.findMany({
            include: {
                avatar: {
                    select: {
                        src: true
                    }
                },
                profile: {
                    select: {
                        id: true
                    }
                }
            }
        });
        return NextResponse.json(cats);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newCat = await catCreateBase(data);
        return NextResponse.json(newCat);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}