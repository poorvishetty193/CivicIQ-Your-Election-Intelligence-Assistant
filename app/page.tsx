import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin, CalendarDays, BrainCircuit, Sparkles } from "lucide-react";
import { VoterChecklist } from "@/components/VoterChecklist";
import { ElectionCountdown } from "@/components/ElectionCountdown";
import { MythBuster } from "@/components/MythBuster";
import { BallotExplainer } from "@/components/BallotExplainer";
import { RightsNavigator } from "@/components/RightsNavigator";
import { CivicPassport } from "@/components/CivicPassport";
import { LiveNewsFeed } from "@/components/LiveNewsFeed";
import { StateExplorer } from "@/components/StateExplorer";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center pb-12 w-full relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-bg to-bg -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="max-w-7xl w-full px-6 space-y-24 py-16 md:py-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Your Personal Election Assistant</span>
          </div>

          {/* Animated SVG Hero */}
          <div className="w-48 h-48 mx-auto relative mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
              <style>
                {`
                  @keyframes drop {
                    0% { transform: translateY(-40px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(15px); opacity: 0; }
                  }
                  @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }
                  @keyframes particle {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
                  }
                  .ballot { animation: drop 3s infinite cubic-bezier(0.4, 0, 0.2, 1); }
                  .box { animation: float 4s infinite ease-in-out; }
                  .particle { animation: particle 2s infinite ease-out; }
                `}
              </style>
              
              {/* Particles */}
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-accent particle" style={{'--dx': '-30px', '--dy': '-30px'} as any} />
              <circle cx="50" cy="50" r="3" fill="currentColor" className="text-primary particle" style={{'--dx': '30px', '--dy': '-20px'} as any} />
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-accent particle" style={{'--dx': '-20px', '--dy': '30px'} as any} />
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-primary particle" style={{'--dx': '40px', '--dy': '20px'} as any} />

              {/* Box */}
              <g className="box text-primary">
                <path d="M20 40 L80 40 L70 90 L30 90 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
                <path d="M15 40 L85 40" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                <path d="M40 60 L60 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-accent"/>
              </g>

              {/* Falling Ballot */}
              <g className="ballot text-text">
                <rect x="40" y="10" width="20" height="30" fill="currentColor" rx="2" className="drop-shadow-md"/>
                <line x1="45" y1="18" x2="55" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="45" y1="24" x2="55" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="45" y1="30" x2="50" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </g>
            </svg>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-primary leading-tight">
            Democracy works<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-sm">
              when you do.
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

        <section>
          <LiveNewsFeed />
        </section>

        <section>
          <ElectionCountdown />
        </section>

        <section>
          <StateExplorer />
        </section>

        <section>
          <MythBuster />
        </section>

        {/* Feature Grid & Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 text-left items-start">
          <div className="xl:col-span-2 space-y-12">
            
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

            <BallotExplainer />
            
            <RightsNavigator />
            
          </div>

          <div className="xl:col-span-1 sticky top-24">
            <VoterChecklist />
          </div>
        </div>

        <section>
          <CivicPassport />
        </section>

      </div>
    </div>
  )
}
