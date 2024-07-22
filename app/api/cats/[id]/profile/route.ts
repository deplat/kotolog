import {NextRequest, NextResponse} from "next/server";
import {catCreateProfile} from "@/lib/db/cat";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newCat = await catCreateProfile(data);
        return NextResponse.json(newCat);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message });
    }
}