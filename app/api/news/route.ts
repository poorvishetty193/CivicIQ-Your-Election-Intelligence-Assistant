import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'edge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// Use gemini-2.0-flash or gemini-flash-latest with grounding enabled
const newsModel = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash", 
  tools: [{ googleSearch: {} } as any] 
});

const MOCK_NEWS = [
  {
    title: "New Voting Technology Improves Ballot Processing Speeds",
    summary: "State election directors highlight upgrades in optical scanners that decrease line wait times and increase counting accuracy.",
    source: "Election News Today",
    url: "https://www.vote.org"
  },
  {
    title: "Youth Registration Reaches Historic Highs",
    summary: "Recent outreach programs and mobile-friendly registration portals drive unprecedented engagement among first-time voters.",
    source: "Democracy Report",
    url: "https://www.rockthevote.org"
  },
  {
    title: "Understanding Your State's Early Voting Period",
    summary: "A comprehensive breakdown of early voting timelines across all 50 states to help voters cast their ballots comfortably.",
    source: "Civic Watch",
    url: "https://www.vote411.org"
  }
];

export async function GET() {
  try {
    const prompt = `Fetch the top 5 current U.S. election news items. 
Return ONLY a valid JSON array of objects with the following keys:
- title: string
- summary: string
- source: string
- url: string

Do not wrap the response in markdown blocks like \`\`\`json. Return just the JSON array.`;

    const result = await newsModel.generateContent(prompt);
    let outputText = result.response.text();
    
    // Clean up if it still has markdown
    outputText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(outputText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("News API error:", error);
    // Return high-quality fallback mock news instead of 500 error
    return NextResponse.json(MOCK_NEWS);
  }
}
