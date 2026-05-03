"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";

// Target dates for upcoming major elections
const ELECTION_DATES = [
  { label: "2025 State & Local Elections", date: new Date("2025-11-04T20:00:00") },
  { label: "2026 Midterm Elections", date: new Date("2026-11-03T20:00:00") }
];

export function ElectionCountdown() {
  const [now, setNow] = useState<Date | null>(null);
  
  useEffect(() => {
    // Only run on client — avoids server/client hydration mismatch
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Not yet hydrated on client — render a skeleton to avoid mismatch
  if (!now) {
    return (
      <div className="bg-accent/5 rounded-2xl p-8 border border-accent/20 max-w-3xl mx-auto flex flex-col items-center text-center animate-pulse">
        <div className="h-8 w-48 bg-primary/10 rounded-full mb-6" />
        <div className="h-6 w-64 bg-primary/10 rounded-full mb-8" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-[70px] md:w-[100px] h-[60px] md:h-[80px] bg-primary/10 rounded-lg" />
              <div className="w-10 h-3 bg-primary/10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Find next election
  const nextElection = ELECTION_DATES.find(e => e.date > now) || ELECTION_DATES[1];
  const diff = nextElection.date.getTime() - now.getTime();
  
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

  let actionItem = "";
  if (days > 365) actionItem = "Learn about your local candidates and the issues that matter to you.";
  else if (days > 90) actionItem = "Ensure your voter registration is up to date and correct.";
  else if (days > 30) actionItem = "Request your mail-in ballot if you plan to vote absentee.";
  else actionItem = "Confirm your polling place and make a plan to vote!";

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="bg-surface border border-primary/20 text-primary font-mono text-xl xs:text-2xl sm:text-3xl md:text-5xl font-bold py-2 sm:py-3 md:py-4 px-2 sm:px-4 md:px-6 rounded-lg shadow-inner w-full min-w-[60px] sm:min-w-[80px] md:min-w-[110px] max-w-[100px] md:max-w-[140px] text-center relative overflow-hidden">
        {value.toString().padStart(2, '0')}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-bg/50 shadow-sm" />
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-primary/60 mt-2 truncate max-w-full">{label}</span>
    </div>
  );

  return (
    <div className="bg-accent/5 rounded-2xl p-4 sm:p-8 border border-accent/20 max-w-3xl mx-auto flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent font-semibold rounded-full mb-4 sm:mb-6">
        <CalendarDays className="w-4 h-4" />
        <span>Next Major Election</span>
      </div>
      
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">{nextElection.label}</h3>
      
      <div className="flex items-start gap-2 md:gap-6 mb-8 w-full max-w-md md:max-w-xl">
        <TimeBlock value={days} label="Days" />
        <span className="text-xl sm:text-3xl md:text-5xl font-bold text-primary/20 mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeBlock value={hours} label="Hours" />
        <span className="text-xl sm:text-3xl md:text-5xl font-bold text-primary/20 mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeBlock value={minutes} label="Mins" />
        <span className="text-xl sm:text-3xl md:text-5xl font-bold text-primary/20 mt-2 sm:mt-3 md:mt-4">:</span>
        <TimeBlock value={seconds} label="Secs" />
      </div>

      <div className="w-full bg-surface p-4 rounded-xl border border-primary/10 flex items-start text-left gap-3">
        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold mb-1 text-sm text-primary/70 uppercase tracking-wider">Here&apos;s what you should be doing NOW:</h4>
          <p className="text-primary font-medium">{actionItem}</p>
        </div>
      </div>
    </div>
  );
}
