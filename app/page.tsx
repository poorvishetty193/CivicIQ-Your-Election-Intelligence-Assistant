import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, MapPin, CalendarDays, BrainCircuit } from "lucide-react"
import { VoterChecklist } from "@/components/VoterChecklist"

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center p-6 text-center">
      <div className="max-w-6xl w-full space-y-12 py-12">
        
        {/* Hero Section */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Be Informed. <br/>
            <span className="text-accent">Vote with Confidence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary/80 max-w-2xl mx-auto font-medium">
            CivicIQ is your personal, nonpartisan election intelligence assistant.
            Clear, accessible, and ready to help you participate in democracy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="text-lg shadow-custom hover:-translate-y-1 transition-transform">
              <Link href="/chat">Chat with CivicIQ</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg bg-surface hover:-translate-y-1 transition-transform">
              <Link href="/timeline">Explore Election Timeline</Link>
            </Button>
          </div>
        </section>

        {/* Feature Grid & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12 text-left">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface p-6 rounded-custom shadow-custom border border-primary/5 hover:border-primary/20 transition-colors">
                <MessageSquare className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">AI Assistant</h2>
                <p className="text-primary/70 mb-4">
                  Ask anything about voter registration, polling procedures, or civic rights. Always nonpartisan, always helpful.
                </p>
                <Link href="/chat" className="text-accent font-bold hover:underline">Try it out &rarr;</Link>
              </div>

              <div className="bg-surface p-6 rounded-custom shadow-custom border border-primary/5 hover:border-primary/20 transition-colors">
                <CalendarDays className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Interactive Timeline</h2>
                <p className="text-primary/70 mb-4">
                  Track the election cycle from candidate filing to inauguration. Add key dates directly to your calendar.
                </p>
                <Link href="/timeline" className="text-accent font-bold hover:underline">View Timeline &rarr;</Link>
              </div>

              <div className="bg-surface p-6 rounded-custom shadow-custom border border-primary/5 hover:border-primary/20 transition-colors">
                <MapPin className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Polling Locator</h2>
                <p className="text-primary/70 mb-4">
                  Find your nearest polling place, get directions, and check operating hours securely.
                </p>
                <Link href="/polling" className="text-accent font-bold hover:underline">Find Polls &rarr;</Link>
              </div>

              <div className="bg-surface p-6 rounded-custom shadow-custom border border-primary/5 hover:border-primary/20 transition-colors">
                <BrainCircuit className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Civic Knowledge</h2>
                <p className="text-primary/70 mb-4">
                  Test your knowledge about the electoral process and earn democracy champion badges.
                </p>
                <Link href="/quiz" className="text-accent font-bold hover:underline">Take the Quiz &rarr;</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <VoterChecklist />
          </div>
        </div>

      </div>
    </div>
  )
}
