import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, MapPin, CalendarDays, BrainCircuit, Sparkles } from "lucide-react"
import { VoterChecklist } from "@/components/VoterChecklist"

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center pb-12 w-full relative">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-bg to-bg -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="max-w-7xl w-full px-6 space-y-20 py-16 md:py-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Your Personal Election Assistant</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-primary leading-tight">
            Be Informed.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">
              Vote with Confidence.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-primary/80 max-w-2xl mx-auto font-medium leading-relaxed">
            CivicIQ is your nonpartisan election intelligence platform.
            Clear, accessible, and ready to help you participate in democracy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            <Button size="lg" asChild className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Link href="/chat">Chat with CivicIQ</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 rounded-full bg-surface/50 backdrop-blur-sm border-2 hover:-translate-y-1 transition-all duration-300">
              <Link href="/timeline">Explore Timeline</Link>
            </Button>
          </div>
        </section>

        {/* Feature Grid & Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 text-left items-start">
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/chat" className="group block bg-surface/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <MessageSquare className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">AI Assistant</h2>
                <p className="text-primary/70 leading-relaxed">
                  Ask anything about voter registration, polling procedures, or civic rights. Always nonpartisan, always helpful.
                </p>
              </Link>

              <Link href="/timeline" className="group block bg-surface/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <CalendarDays className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">Interactive Timeline</h2>
                <p className="text-primary/70 leading-relaxed">
                  Track the election cycle from candidate filing to inauguration. Add key dates directly to your calendar.
                </p>
              </Link>

              <Link href="/polling" className="group block bg-surface/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <MapPin className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">Polling Locator</h2>
                <p className="text-primary/70 leading-relaxed">
                  Find your nearest polling place, get directions, and check operating hours securely through official channels.
                </p>
              </Link>

              <Link href="/quiz" className="group block bg-surface/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <BrainCircuit className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">Civic Knowledge</h2>
                <p className="text-primary/70 leading-relaxed">
                  Test your knowledge about the electoral process and earn democracy champion badges. New questions every time!
                </p>
              </Link>
            </div>
          </div>

          <div className="xl:col-span-1 sticky top-24">
            <VoterChecklist />
          </div>
        </div>
      </div>
    </div>
  )
}
