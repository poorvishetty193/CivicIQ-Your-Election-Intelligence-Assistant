import Link from "next/link"
import { LanguageSelector } from "./LanguageSelector"
import { Landmark } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-primary/10 bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-primary">CivicIQ</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/chat" className="text-sm font-medium hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 transition-colors">
              AI Assistant
            </Link>
            <Link href="/timeline" className="text-sm font-medium hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 transition-colors">
              Timeline
            </Link>
            <Link href="/polling" className="text-sm font-medium hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 transition-colors">
              Polling Map
            </Link>
            <Link href="/quiz" className="text-sm font-medium hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 transition-colors">
              Quiz
            </Link>
          </div>
          <div className="h-4 w-px bg-primary/20 hidden md:block"></div>
          <LanguageSelector />
        </div>
      </div>
    </nav>
  )
}
