"use client";

import Link from "next/link"
import { LanguageSelector } from "./LanguageSelector"
import { Landmark, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { AnimatePresence, motion } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-primary/10 bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" onClick={() => setIsOpen(false)}>
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-primary">CivicIQ</span>
        </Link>
        <div className="flex items-center gap-4">
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
            <Link href="/stats" className="text-sm font-medium hover:text-accent outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 transition-colors flex items-center gap-1">
              My Stats
            </Link>
          </div>
          <div className="h-4 w-px bg-primary/20 hidden md:block"></div>
          <LanguageSelector />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-surface border-b border-primary/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              <Link href="/chat" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-accent transition-colors">
                AI Assistant
              </Link>
              <Link href="/timeline" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-accent transition-colors">
                Timeline
              </Link>
              <Link href="/polling" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-accent transition-colors">
                Polling Map
              </Link>
              <Link href="/quiz" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-accent transition-colors">
                Quiz
              </Link>
              <Link href="/stats" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-accent transition-colors">
                My Stats
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
