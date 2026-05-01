import { PollingMap } from "@/components/PollingMap"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Polling Locator | CivicIQ",
  description: "Find your nearest polling place, early voting locations, and get directions.",
}

export default function PollingPage() {
  return (
    <div className="flex-1 container mx-auto p-4 py-8">
      <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold mb-2">Find Your Polling Place</h1>
        <p className="text-primary/70 max-w-2xl mx-auto">
          Enter your zip code or use your current location to find official polling places, drop boxes, and early voting centers near you.
        </p>
      </div>
      <PollingMap />
    </div>
  )
}
