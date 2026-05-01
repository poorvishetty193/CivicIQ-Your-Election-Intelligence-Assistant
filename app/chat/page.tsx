import { ChatInterface } from "@/components/ChatInterface"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Assistant | CivicIQ",
  description: "Chat with CivicIQ, your personal nonpartisan election intelligence assistant.",
}

export default function ChatPage() {
  return (
    <div className="flex-1 container mx-auto p-4 flex flex-col pt-8">
      <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold mb-2">Your Election Assistant</h1>
        <p className="text-primary/70 max-w-2xl mx-auto">
          Have questions about voting in your state, election timelines, or how the process works? 
          Ask our AI assistant for clear, unbiased information.
        </p>
      </div>
      <ChatInterface />
    </div>
  )
}
