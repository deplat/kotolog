import {NextRequest, NextResponse} from "next/server";
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const slug = req.nextUrl.searchParams.get('slug');
        if (!slug) {
            return NextResponse.json({error: "Slug is required"});
        }
        const pet = await prisma.pet.findUnique({
            where: {slug},
        });
        return NextResponse.json({exists: !!pet}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500});
    }
}
