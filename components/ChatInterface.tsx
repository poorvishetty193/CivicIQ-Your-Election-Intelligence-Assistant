"use client"

import { useRef, useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Send, Copy, Download, Bot, User, Loader2, Volume2 } from "lucide-react"
import jsPDF from "jspdf"

const STARTER_QUESTIONS = [
  "How do I register to vote?",
  "What happens on Election Day?",
  "What is the Electoral College?",
  "How are votes counted?",
  "What is early voting?",
]

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [ttsEnabled, setTtsEnabled] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()

    // Check if TTS is enabled in localStorage
    const savedTts = localStorage.getItem("civiciq_a11y_tts") === "true"
    setTtsEnabled(savedTts)

    // Read last assistant message if TTS is enabled
    const lastMessage = messages[messages.length - 1]
    if (savedTts && lastMessage?.role === "assistant" && !isLoading) {
      speak(lastMessage.content)
    }
  }, [messages, isLoading])

  const speak = (text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    let y = 10
    doc.setFontSize(16)
    doc.text("CivicIQ - Chat History", 10, y)
    y += 10
    doc.setFontSize(12)

    messages.forEach((m) => {
      const prefix = m.role === "user" ? "You: " : "CivicIQ: "
      const lines = doc.splitTextToSize(`${prefix}${m.content}`, 180)
      if (y + lines.length * 7 > 280) {
        doc.addPage()
        y = 10
      }
      doc.text(lines, 10, y)
      y += lines.length * 7 + 5
    })
    doc.save("civiciq-chat.pdf")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto w-full bg-surface shadow-custom rounded-custom overflow-hidden border border-primary/10">
      <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-bg">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="font-bold text-lg">CivicIQ Assistant</h2>
        </div>
        <div className="flex gap-2">
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={exportPDF} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80 animate-in fade-in zoom-in duration-500">
            <Bot className="h-16 w-16 text-primary/50" />
            <p className="text-lg max-w-md">
              Hi! I&apos;m CivicIQ, your nonpartisan election assistant powered by Google Gemini. Ask me anything about voting and elections.
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => append({ role: "user", content: q })}
                  className="px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-4 ${
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${m.role === "user" ? "bg-accent text-primary" : "bg-primary text-white"}`}>
                {m.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`relative group max-w-[80%] rounded-2xl p-4 ${
                m.role === "user" ? "bg-primary text-white rounded-tr-sm" : "bg-bg text-text rounded-tl-sm border border-primary/10"
              }`}>
                <div className="prose prose-sm md:prose-base dark:prose-invert whitespace-pre-wrap max-w-none">
                  {m.content}
                </div>
                {m.role === "assistant" && (
                  <div className="absolute -right-12 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyToClipboard(m.content)}
                      className="p-2 text-primary hover:bg-primary/10 rounded"
                      aria-label="Copy message"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => speak(m.content)}
                      className="p-2 text-primary hover:bg-primary/10 rounded"
                      aria-label="Read aloud"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-4">
            <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-bg text-text rounded-2xl rounded-tl-sm border border-primary/10 p-4 flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-primary/70">CivicIQ is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-bg border-t border-primary/10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about voting..."
            className="flex-1 bg-surface"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
