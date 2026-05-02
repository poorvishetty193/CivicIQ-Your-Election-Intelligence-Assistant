import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const prompt = `Analyze the following ballot measure or proposition. 
Provide a plain English explanation of what it does, who typically supports it, and what a YES or NO vote means.
Enforce strict nonpartisanship.
Also, assign a "Complexity Score" which must be exactly one of: "Simple", "Moderate", or "Complex".
Respond in JSON format:
{
  "explanation": "your explanation...",
  "complexity": "Simple"
}

Ballot Text: "${text}"`;
    
    const result = await geminiFlash.generateContent(prompt);
    let outputText = result.response.text();
    
    // Attempt to parse JSON from the response (sometimes Gemini wraps in ```json ... ```)
    outputText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(outputText);

    return NextResponse.json({ explanation: data.explanation, complexity: data.complexity });
  } catch (error) {
    console.error("Ballot Explain API error:", error);
    return NextResponse.json({ error: "Failed to analyze ballot" }, { status: 500 });
  }
}
