import { NextResponse } from "next/server"
import { geminiModel } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json()

    if (!text || !targetLang) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    if (targetLang === "en") {
      return NextResponse.json({ translatedText: text })
    }

    const prompt = `Translate the following text to ${targetLang}. Only return the translated text, no explanations:\n\n${text}`
    
    const result = await geminiModel.generateContent(prompt)
    const translated = result.response.text()

    return NextResponse.json({ translatedText: translated })
  } catch (error) {
    console.error("Translate API error:", error)
    return NextResponse.json({ error: "Failed to translate" }, { status: 500 })
  }
}
