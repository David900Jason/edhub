import { NextResponse } from "next/server";
import { getUserByEmailAndPassword } from "@/lib/api/auth";

export async function POST(req: Request) {
    try {
        // Request
        const body = await req.json();
        const { email, password } = body;
        const user = await getUserByEmailAndPassword({ email, password });

        // Response
        if (!user) {
            throw new Error("User not found");
        }
        console.log("User found:", user);

        // Store user session in http-only cookie
        const response = NextResponse.json(user);
        response.cookies.set({
            name: "user",
            value: JSON.stringify(user),
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
            secure: true,
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
