"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Calendar, Printer, RotateCcw } from "lucide-react"

const CHECKLIST_ITEMS = [
  "Check registration status",
  "Confirm polling location",
  "Review sample ballot",
  "Arrange transportation",
  "Bring valid ID",
  "Know your voting rights",
  "Check early voting options",
  "Set a reminder for Election Day",
  "Learn about candidates/measures",
  "Tell a friend to vote!"
]

export function VoterChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("civiciq_checklist")
    if (saved) {
      setCheckedItems(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("civiciq_checklist", JSON.stringify(checkedItems))
    }
  }, [checkedItems, isLoaded])

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

  const resetChecklist = () => {
    if (confirm("Reset your checklist progress?")) {
      setCheckedItems({})
    }
  }

  const printChecklist = () => {
    window.print()
  }

  const setReminder = () => {
    const text = encodeURIComponent("Election Day - Vote!")
    const details = encodeURIComponent("CivicIQ Reminder: It's Election Day! Make sure you head to your polling place or return your ballot.")
    const dates = "20241105T120000Z/20241105T230000Z"
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dates}`
    window.open(url, "_blank")
  }

  const completedCount = Object.values(checkedItems).filter(Boolean).length
  const progressPercent = (completedCount / CHECKLIST_ITEMS.length) * 100

  return (
    <div className="bg-surface rounded-custom shadow-custom border border-primary/10 overflow-hidden print:shadow-none print:border-none">
      <div className="p-6 border-b border-primary/10 bg-primary/5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Voter Readiness Checklist</h2>
          <p className="text-primary/60 text-sm">Everything you need to be prepared for the polls.</p>
        </div>
        <div className="hidden sm:flex gap-2 print:hidden">
          <Button variant="ghost" size="icon" onClick={resetChecklist} title="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={printChecklist} title="Print">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Ring / Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-primary">{completedCount} of {CHECKLIST_ITEMS.length} Complete</span>
            <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-3 bg-primary/10 rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => (
            <label 
              key={item} 
              className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors
                ${checkedItems[item] ? "bg-success/5 border-success/30" : "bg-bg border-primary/5 hover:border-primary/20"}
              `}
            >
              <input 
                type="checkbox" 
                checked={checkedItems[item] || false} 
                onChange={() => toggleItem(item)}
                className="h-5 w-5 rounded border-primary/20 text-primary focus:ring-primary cursor-pointer"
              />
              <span className={`font-medium ${checkedItems[item] ? "text-success line-through opacity-70" : "text-primary"}`}>
                {item}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col sm:flex-row gap-4 print:hidden">
          <Button onClick={setReminder} className="gap-2 flex-1">
            <Calendar className="h-4 w-4" /> Set Election Day Reminder
          </Button>
          <Button variant="outline" onClick={printChecklist} className="gap-2 flex-1">
            <Printer className="h-4 w-4" /> Print Checklist
          </Button>
        </div>
      </div>
    </div>
  )
}
