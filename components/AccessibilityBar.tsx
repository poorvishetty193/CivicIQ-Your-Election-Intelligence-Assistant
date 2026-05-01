"use client"

import { useState, useEffect } from "react"
import { Type, Contrast, Accessibility, Volume2, VolumeX } from "lucide-react"

export function AccessibilityBar() {
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal")
  const [highContrast, setHighContrast] = useState(false)
  const [dyslexicFont, setDyslexicFont] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)

  useEffect(() => {
    // Apply font size
    if (fontSize === "large") {
      document.documentElement.style.fontSize = "18px"
    } else {
      document.documentElement.style.fontSize = "16px"
    }

    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Apply dyslexic font
    if (dyslexicFont) {
      document.body.style.fontFamily = "'OpenDyslexic', sans-serif"
    } else {
      document.body.style.fontFamily = "var(--font-body)"
    }
    
    // Save to localStorage
    localStorage.setItem("civiciq_a11y_tts", String(ttsEnabled))
  }, [fontSize, highContrast, dyslexicFont, ttsEnabled])

  return (
    <div className="fixed right-4 top-24 z-50 flex flex-col gap-2 bg-surface p-2 shadow-custom rounded-custom border border-primary/10">
      <button
        onClick={() => setFontSize(s => s === "normal" ? "large" : "normal")}
        className="p-2 hover:bg-bg rounded text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Toggle larger text"
        aria-pressed={fontSize === "large"}
      >
        <Type className="h-5 w-5" />
      </button>
      <button
        onClick={() => setHighContrast(c => !c)}
        className="p-2 hover:bg-bg rounded text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Toggle high contrast"
        aria-pressed={highContrast}
      >
        <Contrast className="h-5 w-5" />
      </button>
      <button
        onClick={() => setDyslexicFont(d => !d)}
        className="p-2 hover:bg-bg rounded text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Toggle dyslexia-friendly font"
        aria-pressed={dyslexicFont}
      >
        <Accessibility className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTtsEnabled(t => !t)}
        className="p-2 hover:bg-bg rounded text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Toggle text-to-speech"
        aria-pressed={ttsEnabled}
      >
        {ttsEnabled ? <Volume2 className="h-5 w-5 text-success" /> : <VolumeX className="h-5 w-5" />}
      </button>
    </div>
  )
}
