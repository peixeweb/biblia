import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        groqKeyExists: !!process.env.GROQ_API_KEY,
        groqKeyPrefix: process.env.GROQ_API_KEY?.substring(0, 10),
    });
}