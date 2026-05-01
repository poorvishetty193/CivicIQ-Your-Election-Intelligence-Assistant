"use client"

import { useState, useEffect, useRef } from "react"
import { ELECTION_PHASES, type ElectionPhase } from "@/lib/election-data"
import { CheckCircle2, Circle, Clock, ChevronDown, CalendarPlus } from "lucide-react"

export function ElectionTimeline() {
  const [filter, setFilter] = useState<"all" | "presidential" | "midterm" | "local">("all")
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  
  const filteredPhases = ELECTION_PHASES.filter(phase => 
    filter === "all" || phase.type.includes(filter)
  )

  const handleAddToCalendar = (e: React.MouseEvent, phase: ElectionPhase) => {
    e.stopPropagation()
    // Simplified Google Calendar link generation
    const text = encodeURIComponent(phase.title)
    const details = encodeURIComponent(phase.description)
    // Using an arbitrary future date for demo purposes
    const dates = "20241105T130000Z/20241105T140000Z"
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dates}`
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(["all", "presidential", "midterm", "local"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none capitalize
              ${filter === f ? "bg-primary text-white" : "bg-surface border border-primary/10 text-primary hover:bg-primary/5"}
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-primary/20 ml-4 md:ml-8 space-y-8 pb-8">
        {filteredPhases.map((phase, index) => {
          const isExpanded = expandedPhase === phase.id
          
          return (
            <div 
              key={phase.id} 
              className="relative pl-8 md:pl-12 group cursor-pointer"
              onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
            >
              {/* Icon */}
              <div className="absolute -left-[17px] bg-bg p-1">
                {phase.status === "completed" && <CheckCircle2 className="h-6 w-6 text-success" />}
                {phase.status === "active" && <Clock className="h-6 w-6 text-accent animate-pulse" />}
                {phase.status === "upcoming" && <Circle className="h-6 w-6 text-primary/30" />}
              </div>

              {/* Content Card */}
              <div className={`
                bg-surface border border-primary/10 rounded-custom p-4 md:p-6 shadow-sm transition-all duration-300
                hover:shadow-md hover:border-primary/30
                ${isExpanded ? "ring-2 ring-primary/20" : ""}
              `}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary/60 block mb-1">
                      {phase.dateRange}
                    </span>
                    <h3 className="text-xl font-bold text-primary">{phase.title}</h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-primary/50 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </div>
                
                <div className="flex gap-2 mb-4">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    phase.status === "completed" ? "bg-success/10 text-success" :
                    phase.status === "active" ? "bg-accent/20 text-yellow-800" :
                    "bg-primary/10 text-primary/70"
                  }`}>
                    {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-primary/10 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <p className="text-primary/80 leading-relaxed">
                      {phase.description}
                    </p>
                    <div className="bg-primary/5 p-4 rounded-md">
                      <h4 className="font-bold text-sm mb-1">Voter Action Required:</h4>
                      <p className="text-sm">{phase.voterAction}</p>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCalendar(e, phase)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                    >
                      <CalendarPlus className="h-4 w-4" />
                      Add to Google Calendar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
