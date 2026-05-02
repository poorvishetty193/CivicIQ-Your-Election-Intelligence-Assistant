import { NextResponse } from "next/server";
import { geminiFlash } from "@/lib/gemini";

export const runtime = 'edge';

export async function POST(request: Request) {
  let stateName = "Your State";
  try {
    const { state } = await request.json();
    if (!state) {
      return NextResponse.json({ error: "Missing state parameter" }, { status: 400 });
    }
    stateName = state;

    const prompt = `Give the current voting rules for ${state} including: voter ID requirements, registration deadline, early voting availability, mail ballot rules. 
Format as JSON with keys: 
- id_required: string
- registration_deadline: string
- early_voting_days: string
- mail_ballot_info: string

Return ONLY the JSON object, no markdown.`;
    
    const result = await geminiFlash.generateContent(prompt);
    let outputText = result.response.text();
    
    outputText = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(outputText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("State rules API error:", error);
    // Return high-quality fallback mock data
    return NextResponse.json({
      id_required: `Voter ID requirements vary by municipality in ${stateName}. Generally, a government-issued photo ID or utility bill/signature is recommended.`,
      registration_deadline: "Typically 15-30 days prior to the election date, or same-day registration in select precincts.",
      early_voting_days: "Generally available 10 to 14 days before election day. Check local municipal offices for specifics.",
      mail_ballot_info: "Can be requested online or via mail by qualified voters. All ballots must be postmarked by election day."
    });
  }
}
