import { updateUser } from "@/lib/api/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await updateUser(body.id, body);

        const cookieStore = await cookies();
        cookieStore.set("user", JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return NextResponse.json({ success: true, user });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 },
        );
    }
}
