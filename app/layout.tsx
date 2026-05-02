import type { Metadata } from "next"
import { DM_Serif_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { AccessibilityBar } from "@/components/AccessibilityBar"
import { PageTransition } from "@/components/PageTransition"

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
  title: "CivicIQ — Your Election Intelligence Assistant",
  description: "Nonpartisan election education assistant explaining voting registration, polling procedures, election timelines, and civic rights.",
  manifest: "/manifest.json",
  openGraph: {
    title: "CivicIQ — Your Election Intelligence Assistant",
    description: "Nonpartisan election education assistant.",
    url: "https://civiciq.example.com",
    siteName: "CivicIQ",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicIQ",
    description: "Your Election Intelligence Assistant",
    images: ["/og-image.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${dmSans.variable} font-body antialiased bg-bg text-text min-h-screen flex flex-col relative`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-surface focus:text-primary">
          Skip to main content
        </a>
        <AccessibilityBar />
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        
        {/* Floating Chat Button */}
        <a 
          href="/chat" 
          className="fixed bottom-6 right-6 z-50 bg-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
          title="Ask CivicIQ"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 whitespace-nowrap transition-all duration-500 font-bold">
            Ask CivicIQ
          </span>
        </a>
      </body>
    </html>
  )
}

