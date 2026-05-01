import { geminiModel } from "@/lib/gemini"
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai"

export const runtime = "edge"

const SYSTEM_PROMPT = "You are CivicIQ, an expert nonpartisan election education assistant. You explain voting registration, polling procedures, election timelines, ballot types, and civic rights clearly and accessibly. Never give partisan opinions. Always encourage civic participation."

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Map messages to Gemini format
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1].content

    const chat = geminiModel.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1024,
      },
    })

    const result = await chat.sendMessageStream(`${SYSTEM_PROMPT}\n\nUser Question: ${lastMessage}`)

    const stream = GoogleGenerativeAIStream(result)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error("Gemini Chat Error:", error)
    
    return new Response(JSON.stringify({ error: error.message || "An unknown error occurred with the Gemini API." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
