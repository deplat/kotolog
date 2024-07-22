import prisma from '@/lib/db/prisma';
import {NextResponse} from 'next/server';

export async function DELETE({ params }: { params: { id: number } }) {
    try {
        const id = Number(params.id);
        await prisma.color.delete({
            where: { id },
        });
        return NextResponse.json({ status: 204 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}