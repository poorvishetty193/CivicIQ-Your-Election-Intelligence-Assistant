import { geminiModel } from "@/lib/gemini"

export const runtime = "edge"

const SYSTEM_PROMPT = "You are CivicIQ, an expert nonpartisan election education assistant. You explain voting registration, polling procedures, election timelines, ballot types, and civic rights clearly and accessibly. Never give partisan opinions. Always encourage civic participation."

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Map messages to Gemini format (handling structured parts from client)
    const history = messages.slice(0, -1).map((m: any) => {
      const text = m.parts
        ?.filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("") || m.content || ""
      
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text }],
      }
    })
    
    const lastMessageObj = messages[messages.length - 1]
    const lastMessageText = lastMessageObj.parts
      ?.filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("") || lastMessageObj.content || ""

    const chat = geminiModel.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1024,
      },
    })

    const result = await chat.sendMessageStream(`${SYSTEM_PROMPT}\n\nUser Question: ${lastMessageText}`)

    // Create a ReadableStream following the Vercel AI SDK Data Stream Protocol
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              // '0:' prefix denotes a text part in the Data Stream Protocol
              controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`))
            }
          }
        } catch (e) {
          console.error("Streaming error:", e)
        } finally {
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-vercel-ai-data-stream": "v1",
      },
    })
  } catch (error: any) {
    console.error("Gemini Chat Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
