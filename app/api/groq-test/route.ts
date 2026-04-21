import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: NextRequest) {
    const { query } = await req.json();
    console.log("groq-test received:", query);
    console.log("groq:", !!groq);
    
    const result = await groq.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "llama-3.3-70b-versatile",
    });
    
    console.log("result:", result.choices[0]?.message?.content);
    return NextResponse.json({ result: result.choices[0]?.message?.content });
}