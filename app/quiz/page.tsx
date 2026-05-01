import { QuizEngine } from "@/components/QuizEngine"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Civic Knowledge Quiz | CivicIQ",
  description: "Test your knowledge about the electoral process, voting rights, and democracy.",
}

export default function QuizPage() {
  return (
    <div className="flex-1 container mx-auto p-4 py-8 md:py-12">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold mb-4">Civic Knowledge Challenge</h1>
        <p className="text-primary/70 max-w-2xl mx-auto text-lg">
          How much do you really know about how elections work? Take our 15-question quiz to test your civic literacy and earn your badge.
        </p>
      </div>
      <QuizEngine />
    </div>
  )
}
