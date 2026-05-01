"use client"

import { MapPin, Navigation, ExternalLink, Info, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

export function PollingMap() {
  const [zip, setZip] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // vote.org blocks iframes and scraping. We direct to the official USA.gov locator.
    window.open("https://www.usa.gov/election-office", "_blank")
  }

  return (
    <div className="max-w-4xl mx-auto w-full bg-surface shadow-custom border border-primary/10 rounded-custom overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Info Side */}
        <div className="p-8 md:p-12 space-y-6">
          <div className="bg-primary/5 p-3 rounded-full w-fit">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary">Where do I vote?</h2>
          <p className="text-primary/70 leading-relaxed">
            Polling locations are assigned based on your residential address. They can change between elections, so it's important to verify yours before heading out.
          </p>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="shrink-0 h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-xs font-bold text-success">1</span>
              </div>
              <p className="text-sm font-medium">Verify your registration status first.</p>
            </li>
            <li className="flex gap-3">
              <div className="shrink-0 h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-xs font-bold text-success">2</span>
              </div>
              <p className="text-sm font-medium">Find your specific precinct polling place.</p>
            </li>
            <li className="flex gap-3">
              <div className="shrink-0 h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-xs font-bold text-success">3</span>
              </div>
              <p className="text-sm font-medium">Check early voting options in your county.</p>
            </li>
          </ul>

          <div className="pt-4">
            <Button asChild className="w-full md:w-fit gap-2">
              <a href="https://vote.gov" target="_blank" rel="noopener noreferrer">
                Official Voter Resources <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Action Side */}
        <div className="bg-bg p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-primary/10">
          <div className="space-y-6">
            <div className="bg-surface p-6 rounded-xl border border-primary/10 shadow-sm">
              <h3 className="font-bold text-xl mb-4">Quick Locator</h3>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/60 uppercase tracking-wider">Your Zip Code</label>
                  <Input 
                    placeholder="e.g. 90210" 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="bg-bg"
                    maxLength={5}
                  />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Search className="h-4 w-4" /> Find Official Location
                </Button>
              </form>
            </div>

            <div className="flex gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Info className="h-5 w-5 text-primary shrink-0" />
              <p className="text-xs text-primary/70 italic">
                Note: Polling places are typically managed at the county level. Always double-check your local election board's website for the most accurate information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
