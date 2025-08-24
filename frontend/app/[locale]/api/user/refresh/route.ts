import { NextResponse } from "next/server";
import { refreshUser } from "@/app/[locale]/test/test_api";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const refresh = cookieStore.get("refresh");

        if (!refresh) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await refreshUser();

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}