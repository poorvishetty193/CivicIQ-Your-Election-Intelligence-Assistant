"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MessageSquare, RefreshCw } from "lucide-react";
import { event } from "@/lib/analytics";
import { trackFeatureEvent } from "@/lib/firestore";

const MYTHS = [
  { myth: "My vote doesn't count because of the Electoral College.", fact: "Your vote directly decides which electors are chosen in your state, and local elections have no electoral college." },
  { myth: "You need a photo ID to vote in every state.", fact: "Voter ID laws vary by state. Many states do not require a photo ID to cast a ballot." },
  { myth: "People with felony convictions can never vote again.", fact: "In most states, voting rights are restored after serving the sentence or upon release." },
  { myth: "Voter fraud is a widespread problem.", fact: "Extensive research and audits have shown that voter fraud is exceptionally rare in U.S. elections." },
  { myth: "You can't vote if you don't speak English.", fact: "The Voting Rights Act requires language assistance and translated materials in many jurisdictions." },
  { myth: "College students must vote in their home state.", fact: "College students often have the right to register and vote where they attend school." },
  { myth: "Mail-in ballots are easily tampered with.", fact: "Mail-in voting has multiple layers of security, including signature verification and tracking." },
  { myth: "If you owe taxes, you can't vote.", fact: "There is no poll tax in the U.S. Owing taxes or debt does not disqualify you from voting." },
  { myth: "You have to vote for every office on the ballot.", fact: "You can leave races blank. It's called 'undervoting', and your other votes will still count." },
  { myth: "The voting age is 18, so I can't register if I'm 17.", fact: "Many states allow 17-year-olds to pre-register, and some let them vote in primaries if they will be 18 by the general election." }
];

export function MythBuster() {
  const router = useRouter();
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        event('myth_busted', { category: 'engagement', label: MYTHS[index].myth });
        trackFeatureEvent('myth_buster', 'session_' + Date.now().toString());
      }
      return next;
    });
  };

  const handleAskMore = (e: React.MouseEvent, fact: string) => {
    e.stopPropagation();
    router.push(`/chat?q=${encodeURIComponent(`Can you tell me more about this election fact: ${fact}`)}`);
  };

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Election Myth Buster</h2>
        <p className="text-primary/60 text-sm">Tap a card to reveal the fact</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-4">
        {MYTHS.map((item, index) => {
          const isFlipped = flippedCards.has(index);
          return (
            <div
              key={index}
              className="card-scene w-full h-[380px] cursor-pointer"
              onClick={() => toggleFlip(index)}
              role="button"
              aria-label={isFlipped ? `Flip back: ${item.myth}` : `Reveal fact: ${item.myth}`}
              aria-pressed={isFlipped}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(index); }}
            >
              <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>

                {/* Front — Myth */}
                <div className="card-face rounded-2xl border-2 border-red-200 bg-red-50 p-6 flex flex-col justify-between shadow-md">
                  <div className="flex flex-col items-center text-center flex-1 justify-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 uppercase tracking-widest">
                      Myth
                    </span>
                    <p className="text-lg font-bold text-red-900 leading-snug">
                      &ldquo;{item.myth}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4 text-red-400 text-sm font-medium">
                    <RefreshCw className="w-4 h-4" />
                    Tap to reveal the fact
                  </div>
                </div>

                {/* Back — Fact */}
                <div className="card-face card-face-back rounded-2xl border-2 border-green-300 bg-green-50 p-6 flex flex-col justify-between shadow-md">
                  <div className="flex flex-col items-center text-center flex-1 justify-center gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-widest">
                      ✓ Fact
                    </span>
                    <p className="text-base font-medium text-green-900 leading-relaxed">
                      {item.fact}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 border-green-400 text-green-800 hover:bg-green-100"
                    onClick={(e) => handleAskMore(e, item.fact)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask CivicIQ More
                  </Button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
