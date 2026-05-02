import { geminiFlash } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = "You are CivicIQ, a nonpartisan election education assistant. Explain voting registration, polling procedures, election timelines, ballot types, and civic rights clearly. Never give partisan opinions. Always encourage civic participation.";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 20;

  let record = rateLimit.get(ip);
  if (!record || now > record.resetTime) {
    record = { count: 0, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  rateLimit.set(ip, record);
  return true;
}

function sanitizeInput(input: string): string {
  // Strip HTML tags
  let sanitized = input.replace(/<[^>]*>?/gm, '');
  // Limit to 1000 chars
  return sanitized.slice(0, 1000);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    const { messages } = await req.json();

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;
    const sanitizedMessage = sanitizeInput(lastMessage);

    const chat = geminiFlash.startChat({
      history: history,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }], role: 'system' } as any
    });

    const result = await chat.sendMessageStream(sanitizedMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return new NextResponse(JSON.stringify({ error: error.message || "An unknown error occurred." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
