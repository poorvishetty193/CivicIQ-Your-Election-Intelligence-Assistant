import { ElectionTimeline } from "@/components/ElectionTimeline"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Election Timeline | CivicIQ",
  description: "Interactive timeline of the election process from candidate filing to inauguration.",
}

export default function TimelinePage() {
  return (
    <div className="flex-1 container mx-auto p-4 py-8 md:py-12">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold mb-4">The Election Timeline</h1>
        <p className="text-primary/70 max-w-2xl mx-auto text-lg">
          Follow the electoral process step-by-step. Filter by election type, learn what actions you need to take, and add key dates directly to your Google Calendar.
        </p>
      </div>
      <ElectionTimeline />
    </div>
  )
}
