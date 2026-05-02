"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles, AlertCircle } from "lucide-react";

export function BallotExplainer() {
  const [ballotText, setBallotText] = useState("");
  const [explanation, setExplanation] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    if (!ballotText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // In a real app, this would hit an API route, but for this refactor we can use chat API or make a new one.
      // Wait, the instructions said: "Gemini explains it in plain English... Shows a 'Complexity Score' (Simple / Moderate / Complex) based on Gemini's assessment."
      // I need an API route for this. I will quickly add an API route or just use the chat API.
      // Actually, I'll create app/api/ballot-explain/route.ts
      const res = await fetch("/api/ballot-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ballotText })
      });
      if (!res.ok) throw new Error("Failed to explain ballot");
      const data = await res.json();
      setExplanation(data.explanation);
      setComplexity(data.complexity);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface border border-primary/20 rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold">Ask About My Ballot</h3>
      </div>
      <p className="text-sm text-primary/70">Paste a ballot measure or proposition, and CivicIQ will explain it in plain English.</p>
      
      <textarea
        className="w-full h-32 p-3 rounded-lg border border-primary/20 bg-bg text-text resize-none focus:outline-none focus:ring-2 focus:ring-accent/50"
        placeholder="Paste ballot text here..."
        value={ballotText}
        onChange={(e) => setBallotText(e.target.value)}
      />
      
      <Button onClick={handleExplain} disabled={loading || !ballotText.trim()} className="w-full">
        {loading ? "Analyzing..." : "Explain This Measure"}
      </Button>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {explanation && complexity && (
        <div className="mt-4 p-4 rounded-lg bg-bg border border-primary/10 space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary/70">Complexity Score:</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              complexity === 'Simple' ? 'bg-green-100 text-green-800' :
              complexity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {complexity}
            </span>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Plain English Explanation</h4>
            <p className="text-sm leading-relaxed text-text/90">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
