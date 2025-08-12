import api from "@/lib/api";
import { getUserByEmailAndPassword } from "@/lib/api/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const user = await getUserByEmailAndPassword({ email, password });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }

        // Set User in an http-only cookie
        const response = NextResponse.json({ success: true });
        response.cookies.set("user_token", JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });
        
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
