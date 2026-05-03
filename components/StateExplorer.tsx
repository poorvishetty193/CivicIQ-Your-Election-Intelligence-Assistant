"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import React from "react";
import { event } from "@/lib/analytics";
import { trackFeatureEvent } from "@/lib/firestore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { generateSessionId } from "@/lib/utils";

// eslint-disable-next-line
const USAMap = dynamic(() => import("react-usa-map"), { ssr: false }) as React.ComponentType<any>;

type StateRules = {
  id_required: string;
  registration_deadline: string;
  early_voting_days: string;
  mail_ballot_info: string;
};

const US_STATES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "Washington D.C."
};

export function StateExplorer() {
  const [selectedState, setSelectedState] = useState<{ id: string; name: string } | null>(null);
  const [rules, setRules] = useState<StateRules | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const sessionId = React.useRef(generateSessionId());

  const fetchRules = async (abbr: string) => {
    const name = US_STATES[abbr] || abbr;
    setSelectedState({ id: abbr, name });
    setRules(null);
    setLoading(true);

    event('state_rules_viewed', { category: 'feature', label: name });
    trackFeatureEvent('state_explorer', sessionId.current);

    const cacheKey = `state_${abbr}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setRules(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/state-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: name })
      });
      const data = await res.json();
      setRules(data);
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // react-usa-map passes a stateEvent object
  const handleMapClick = (stateEvent: { target: { dataset: { name: string } } }) => {
    const abbr = stateEvent?.target?.dataset?.name;
    if (abbr) fetchRules(abbr);
  };

  return (
    <div className="w-full py-8 relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">State Rules Explorer</h2>
        <p className="text-primary/70">Select your state to instantly see its voting rules.</p>
      </div>

      {/* Mobile: Dropdown */}
      {isMobile ? (
        <div className="max-w-sm mx-auto px-4">
          <label htmlFor="state-select" className="block text-sm font-medium mb-2 text-primary/70">
            Select your state
          </label>
          <select
            id="state-select"
            className="w-full p-3 border-2 border-primary/20 rounded-xl text-base bg-surface text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue=""
            onChange={(e) => { if (e.target.value) fetchRules(e.target.value); }}
          >
            <option value="" disabled>Choose a state...</option>
            {Object.entries(US_STATES).map(([abbr, name]) => (
              <option key={abbr} value={abbr}>{name}</option>
            ))}
          </select>
        </div>
      ) : (
        /* Desktop: SVG Map */
        <div className="w-full max-w-4xl mx-auto cursor-pointer">
          <USAMap onClick={handleMapClick} defaultFill="#CBD5E1" />
        </div>
      )}

      {/* Slide-up Drawer */}
      <AnimatePresence>
        {selectedState && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedState(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-surface border-t-2 border-x-2 border-primary/10 rounded-t-3xl shadow-2xl z-50 p-6 md:p-8 max-h-[85vh] overflow-y-auto select-none"
            >
              <div className="flex justify-between items-center mb-6 border-b border-primary/10 pb-4">
                <h3 className="text-2xl font-bold leading-tight">{selectedState.name} Voting Rules</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedState(null)} aria-label="Close drawer" className="rounded-full shrink-0">
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-primary/50">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-accent" />
                  <p>Fetching latest rules for {selectedState.name}...</p>
                </div>
              ) : rules ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {[
                      { label: "ID Required", value: rules.id_required },
                      { label: "Registration Deadline", value: rules.registration_deadline },
                      { label: "Early Voting", value: rules.early_voting_days },
                      { label: "Mail Ballots", value: rules.mail_ballot_info },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-bg p-4 rounded-xl border border-primary/5">
                        <span className="text-xs font-bold text-primary/50 uppercase">{label}</span>
                        <p className="mt-1 font-medium text-sm text-primary/80 leading-relaxed">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-2">
                    <Button variant="outline" className="w-full sm:w-auto px-8" onClick={() => setSelectedState(null)}>
                      Close Rules
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-red-500 mb-4">Failed to load rules. Please try again.</p>
                  <Button onClick={() => setSelectedState(null)}>Close</Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
