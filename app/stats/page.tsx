"use client";

import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Award, Target } from "lucide-react";

export default function StatsPage() {
  const [stats, setStats] = useState({
    quiz: 0,
    checklists: 0,
    badges: 0,
    myths: 0,
    voice: 0,
    ballot: 0,
  });

  useEffect(() => {
    // Read from localStorage
    const savedBadges = JSON.parse(localStorage.getItem("civiciq_badges") || "[]");
    const savedChecklist = JSON.parse(localStorage.getItem("civiciq_checklist") || "{}");
    const savedQuizScore = parseInt(localStorage.getItem("civiciq_quiz_best") || "0", 10);
    
    // Derived stats
    const checklistCount = Object.values(savedChecklist).filter(v => v === true).length;
    
    setStats({
      quiz: (savedQuizScore / 15) * 100 || 0,
      checklists: (checklistCount / 10) * 100 || 0,
      badges: (savedBadges.length / 6) * 100 || 0,
      myths: savedBadges.includes("myth") ? 100 : 0,
      voice: savedBadges.includes("voice") ? 100 : 0,
      ballot: savedBadges.includes("ballot") ? 100 : 0,
    });
  }, []);

  const data = [
    { subject: "Quiz Mastery", A: stats.quiz, fullMark: 100 },
    { subject: "Checklist readiness", A: stats.checklists, fullMark: 100 },
    { subject: "Badges Earned", A: stats.badges, fullMark: 100 },
    { subject: "Myth Busting", A: stats.myths, fullMark: 100 },
    { subject: "Voice Usage", A: stats.voice, fullMark: 100 },
    { subject: "Ballot Analysis", A: stats.ballot, fullMark: 100 },
  ];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-6 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full font-bold mb-6">
          <Target className="w-5 h-5" />
          <span>My Stats</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Civic Engagement Profile</h1>
        <p className="text-lg text-primary/70">A breakdown of your learning and readiness across the platform.</p>
      </div>

      <div className="w-full bg-surface border border-primary/10 rounded-3xl p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="w-full h-[400px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="currentColor" className="text-primary/10" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "currentColor", className: "text-primary font-bold text-xs md:text-sm" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="CivicIQ"
                dataKey="A"
                stroke="#1B3A6B"
                fill="#3B82F6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-3 w-full bg-primary/5 p-4 rounded-xl border border-primary/10">
          <Award className="w-6 h-6 text-accent" />
          <p className="font-medium text-primary">
            Overall Score: <span className="font-bold text-accent">{Math.round((stats.quiz + stats.checklists + stats.badges) / 3)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
