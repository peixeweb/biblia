import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
    console.log("=== /api/test called ===");
    console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY?.substring(0, 10));
    
    if (!process.env.GROQ_API_KEY) {
        return NextResponse.json({ error: "No API key" }, { status: 500 });
    }
    
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
    
    try {
        console.log("Calling Groq...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say hello in 3 words" }],
            model: "llama-3.3-70b-versatile",
        });
        console.log("Result:", chatCompletion.choices[0]?.message?.content);
        return NextResponse.json({ result: chatCompletion.choices[0]?.message?.content });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}