"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "hi", name: "हिन्दी" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "tl", name: "Tagalog" },
]

export function LanguageSelector() {
  const [lang, setLang] = useState("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("civiciq_lang")
    if (savedLang) setLang(savedLang)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    setLang(newLang)
    localStorage.setItem("civiciq_lang", newLang)
    // Trigger translation logic here or reload
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-primary" />
      <select
        value={lang}
        onChange={handleChange}
        className="bg-transparent border-none text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-primary rounded"
        aria-label="Select language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  )
}
