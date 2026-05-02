import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { question, selectedAnswer, isCorrect } = await request.json();

    if (!question || !selectedAnswer) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const prompt = `The user answered a civic quiz question. 
Question: "${question}"
User's Answer: "${selectedAnswer}"
This answer is ${isCorrect ? 'correct' : 'incorrect'}.
Generate a 2-sentence civic explanation of why this answer is ${isCorrect ? 'correct' : 'incorrect'} in plain English. Return only the explanation.`;
    
    const result = await geminiFlash.generateContent(prompt);
    const explanation = result.response.text();

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Quiz Explain API error:", error);
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 });
  }
}
