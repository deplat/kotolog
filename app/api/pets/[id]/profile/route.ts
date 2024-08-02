import {NextRequest, NextResponse} from "next/server";
import {createPetProfile} from "@/lib/data";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const profile = await createPetProfile(data);
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, {status: 500});
    }
}