"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, GraduationCap, Languages, Accessibility, RefreshCcw, HandHeart } from "lucide-react";

type Situation = "first-time" | "moved" | "student" | "non-english" | "disability" | "returning";

const SITUATIONS: { id: Situation; label: string; icon: React.ReactNode }[] = [
  { id: "first-time", label: "First-Time Voter", icon: <HandHeart className="w-6 h-6" /> },
  { id: "moved", label: "Moved Recently", icon: <MapPin className="w-6 h-6" /> },
  { id: "student", label: "College Student", icon: <GraduationCap className="w-6 h-6" /> },
  { id: "non-english", label: "Non-English Speaker", icon: <Languages className="w-6 h-6" /> },
  { id: "disability", label: "Voter with a Disability", icon: <Accessibility className="w-6 h-6" /> },
  { id: "returning", label: "Returning Citizen (Post-Incarceration)", icon: <RefreshCcw className="w-6 h-6" /> }
];

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function RightsNavigator() {
  const [step, setStep] = useState<number>(0);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [state, setState] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRights = async (selectedState: string) => {
    if (!situation || !selectedState) return;
    setLoading(true);
    try {
      const res = await fetch("/api/rights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation, state: selectedState })
      });
      const data = await res.json();
      setSummary(data.summary);
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-surface border border-primary/10 rounded-2xl shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center overflow-hidden">
      <h2 className="text-3xl font-bold mb-8">Civic Rights Navigator</h2>
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <h3 className="text-xl mb-6">What situation describes you best?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SITUATIONS.map(sit => (
                <button
                  key={sit.id}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-primary/20 hover:border-accent hover:bg-accent/5 transition-all text-primary font-medium"
                  onClick={() => {
                    setSituation(sit.id);
                    setStep(1);
                  }}
                >
                  {sit.icon}
                  {sit.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-sm mx-auto space-y-6"
          >
            <h3 className="text-xl">Which state do you live in?</h3>
            <input 
              type="text" 
              placeholder="e.g. California, Texas..." 
              value={state}
              onChange={e => setState(e.target.value)}
              className="w-full p-4 text-lg border-2 border-primary/20 rounded-xl focus:outline-none focus:border-accent text-center bg-bg"
            />
            <div className="flex gap-4">
              <Button variant="outline" className="w-full" onClick={() => setStep(0)}>Back</Button>
              <Button 
                className="w-full" 
                disabled={!state.trim() || loading} 
                onClick={() => fetchRights(state)}
              >
                {loading ? "Loading..." : "Get My Rights"}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && summary && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-6 text-left bg-bg p-8 rounded-xl border border-primary/10 shadow-inner"
          >
            <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
              <h3 className="text-xl font-bold text-primary">Your Voting Rights in {state}</h3>
              <Button variant="ghost" size="sm" onClick={() => { setStep(0); setSummary(null); setState(""); }}>Start Over</Button>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-primary/80 space-y-3">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                  h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2 text-primary">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold mt-3 mb-2 text-primary">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold mt-3 mb-2 text-primary">{children}</h3>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
