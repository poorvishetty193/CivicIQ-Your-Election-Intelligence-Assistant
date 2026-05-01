import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { AccessibilityBar } from "@/components/AccessibilityBar"

const dmSerif = DM_Serif_Display({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display" 
})

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-body" 
})

export const metadata: Metadata = {
  title: "CivicIQ | Your Election Intelligence Assistant",
  description: "Nonpartisan election education assistant explaining voting registration, polling procedures, election timelines, and civic rights.",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${dmSans.variable} font-body antialiased bg-bg text-text min-h-screen flex flex-col`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-surface focus:text-primary">
          Skip to main content
        </a>
        <AccessibilityBar />
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
