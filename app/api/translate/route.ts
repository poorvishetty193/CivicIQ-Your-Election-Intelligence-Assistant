import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    if (targetLang === "en") {
      return NextResponse.json({ translatedText: text });
    }

    const prompt = `Translate the following text to ${targetLang}. Return only the translated text, nothing else: ${text}`;
    
    const result = await geminiFlash.generateContent(prompt);
    const translated = result.response.text();

    return NextResponse.json({ translatedText: translated });
  } catch (error) {
    console.error("Translate API error:", error);
    return NextResponse.json({ error: "Failed to translate" }, { status: 500 });
  }
}
