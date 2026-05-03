import { Suspense } from "react"
import { ChatInterface } from "@/components/ChatInterface"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Skeleton } from "@/components/Skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Assistant | CivicIQ",
  description: "Chat with CivicIQ, your personal nonpartisan election intelligence assistant.",
}

export default function ChatPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex-1 flex flex-col p-6 gap-4">
              <Skeleton lines={3} className="h-6" />
              <Skeleton lines={2} className="h-6" />
            </div>
          }
        >
          <ChatInterface />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
