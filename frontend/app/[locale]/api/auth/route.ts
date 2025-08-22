// app/api/auth/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Call your backend
    const res = await fetch(
        "http://localhost:8000/users?email=" + email + "&password=" + password,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
    );

    const data = await res.json();
    // return NextResponse.json({ success: true, user: data[0] });

    if (!res.ok) {
        return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    // Store token in HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(data[0]), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ success: true, user: data[0] });
}
