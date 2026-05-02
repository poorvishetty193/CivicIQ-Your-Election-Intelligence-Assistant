"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  GraduationCap, Mic, CheckCircle, Vote, Lightbulb, Navigation,
  Share2, Lock, Award
} from "lucide-react";
import confetti from "canvas-confetti";
import { VoterGuideGenerator } from "./VoterGuideGenerator";
import { event } from "@/lib/analytics";
import { savePassportProgress } from "@/lib/firestore";
import { auth } from "@/lib/firebase-auth";

export type BadgeType = "quiz" | "voice" | "checklist" | "ballot" | "myth" | "rights";

const BADGES: { id: BadgeType; label: string; icon: React.ReactNode; desc: string; link: string }[] = [
  {
    id: "quiz",
    label: "Civic Scholar",
    icon: <GraduationCap className="w-8 h-8" />,
    desc: "Complete the Civic Knowledge Quiz",
    link: "/quiz",
  },
  {
    id: "voice",
    label: "Vocal Voter",
    icon: <Mic className="w-8 h-8" />,
    desc: "Use Voice Chat to ask a question",
    link: "/chat",
  },
  {
    id: "checklist",
    label: "Ready to Vote",
    icon: <CheckCircle className="w-8 h-8" />,
    desc: "Complete the Voter Checklist",
    link: "/#checklist",
  },
  {
    id: "ballot",
    label: "Ballot Analyst",
    icon: <Vote className="w-8 h-8" />,
    desc: "Analyze a ballot measure",
    link: "/#ballot",
  },
  {
    id: "myth",
    label: "Truth Seeker",
    icon: <Lightbulb className="w-8 h-8" />,
    desc: "Flip 5 Election Myth cards",
    link: "/#myths",
  },
  {
    id: "rights",
    label: "Rights Navigator",
    icon: <Navigation className="w-8 h-8" />,
    desc: "Navigate the Civic Rights Tree",
    link: "/#rights",
  },
];

function triggerConfetti() {
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#1B3A6B", "#C9A84C", "#3B82F6"],
  });
}

export function earnBadge(badgeId: BadgeType) {
  if (typeof window === "undefined") return;
  const saved: BadgeType[] = JSON.parse(localStorage.getItem("civiciq_badges") || "[]");
  if (!saved.includes(badgeId)) {
    const updated = [...saved, badgeId];
    localStorage.setItem("civiciq_badges", JSON.stringify(updated));
    triggerConfetti();
    
    event('badge_earned', { category: 'gamification', label: badgeId });
    
    const user = auth.currentUser;
    if (user) {
      const score = Math.round((updated.length / 6) * 100);
      savePassportProgress(user.uid, updated, score).catch(console.error);
    }

    // Dispatch a storage event so CivicPassport re-reads on the same tab
    window.dispatchEvent(new Event("civiciq_badge_earned"));
  }
}

export function CivicPassport() {
  const [earnedBadges, setEarnedBadges] = useState<BadgeType[]>([]);
  const [justEarned, setJustEarned] = useState<BadgeType | null>(null);

  const loadBadges = () => {
    const saved = localStorage.getItem("civiciq_badges");
    setEarnedBadges(saved ? JSON.parse(saved) : []);
  };

  useEffect(() => {
    loadBadges();
    // Listen for badges earned in same tab
    window.addEventListener("civiciq_badge_earned", loadBadges);
    // Listen for badges from other tabs
    window.addEventListener("storage", loadBadges);
    return () => {
      window.removeEventListener("civiciq_badge_earned", loadBadges);
      window.removeEventListener("storage", loadBadges);
    };
  }, []);

  const handleDemoEarn = (badgeId: BadgeType) => {
    earnBadge(badgeId);
    setJustEarned(badgeId);
    loadBadges();
    setTimeout(() => setJustEarned(null), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem("civiciq_badges");
    setEarnedBadges([]);
  };

  const handleShare = async () => {
    triggerConfetti();
    const score = Math.round((earnedBadges.length / BADGES.length) * 100);
    const text = `I earned a ${score}% CivicIQ Civic Passport score! Can you beat it?`;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My CivicIQ Score", text, url });
      } catch {
        // dismissed
      }
    } else {
      window.open(
        `https://x.com/intent/tweet?text=${encodeURIComponent(text + " " + url)}`,
        "_blank"
      );
    }
  };

  const progress = Math.round((earnedBadges.length / BADGES.length) * 100);

  return (
    <div className="bg-surface border border-primary/10 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto shadow-sm">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-2xl">
            <Award className="w-8 h-8 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">My Civic Passport</h2>
            <p className="text-primary/60 text-sm mt-1">Explore features to earn democracy badges.</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-primary/30 hover:text-primary/60 transition-colors underline underline-offset-2"
        >
          Reset badges
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm font-bold text-primary/70">
          <span>{earnedBadges.length} / {BADGES.length} badges earned</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-blue-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {earnedBadges.length === BADGES.length && (
          <p className="text-center text-green-600 font-bold text-sm pt-1 animate-in fade-in">
            🎉 Democracy Champion! You&apos;ve earned all badges!
          </p>
        )}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {BADGES.map((badge) => {
          const isEarned = earnedBadges.includes(badge.id);
          const isNew = justEarned === badge.id;
          return (
            <div
              key={badge.id}
              className={`relative overflow-hidden rounded-2xl border-2 p-5 flex flex-col items-center text-center transition-all duration-500 group ${
                isEarned
                  ? "bg-gradient-to-br from-surface to-accent/10 border-accent/50 shadow-md"
                  : "bg-surface border-primary/10 opacity-60"
              } ${isNew ? "scale-105 ring-2 ring-accent ring-offset-2" : ""}`}
            >
              {/* Glow on earned */}
              {isEarned && (
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Icon */}
              <div className={`mb-3 p-3 rounded-full transition-colors ${isEarned ? "bg-accent/20 text-accent" : "bg-primary/5 text-primary/30"}`}>
                {badge.icon}
              </div>

              <h4 className="font-bold text-sm mb-1 leading-tight">{badge.label}</h4>
              <p className="text-xs text-primary/50 mb-3 leading-snug">{badge.desc}</p>

              {/* Status / Action */}
              {isEarned ? (
                <span className="text-xs font-bold text-accent flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Earned
                </span>
              ) : (
                <button
                  onClick={() => handleDemoEarn(badge.id)}
                  className="text-xs text-primary/40 hover:text-accent flex items-center gap-1 transition-colors mt-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  aria-label={`Demo earn ${badge.label} badge`}
                >
                  <Lock className="w-3 h-3" /> Demo earn
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="rounded-full px-8 gap-2" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
          Share Your Passport
        </Button>
        <VoterGuideGenerator />
      </div>
    </div>
  );
}
