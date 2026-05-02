import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { situation, state } = await request.json();

    if (!situation || !state) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const prompt = `Provide a concise, easy-to-understand summary of voting rights for a ${situation} living in ${state}, USA.
Use simple formatting (bullet points).
Be highly encouraging and nonpartisan.`;
    
    const result = await geminiFlash.generateContent(prompt);
    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Rights API error:", error);
    return NextResponse.json({ error: "Failed to get rights" }, { status: 500 });
  }
}
