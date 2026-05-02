import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { state } = await request.json();

    const prompt = `Generate a structured voter guide for someone voting in ${state ? state : 'their state'}.
Format as JSON with exactly these keys:
- state: string (the state name, or "General U.S." if none provided)
- registration_tip: string (short tip)
- key_dates: string (sentence about general deadlines)
- rights_summary: string (brief overview of voter rights)
- encouragement_message: string (motivational closing)

Return ONLY the JSON object, no markdown.`;
    
    const result = await geminiFlash.generateContent(prompt);
    let outputText = result.response.text();
    
    outputText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(outputText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Voter Guide API error:", error);
    return NextResponse.json({ error: "Failed to generate guide" }, { status: 500 });
  }
}
