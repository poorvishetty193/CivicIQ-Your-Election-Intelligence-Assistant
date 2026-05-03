"use client";

import { useRef, useEffect, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Copy, Download, Bot, User, Loader2, Volume2, VolumeX } from "lucide-react";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { VoiceChat, speakText } from "./VoiceChat";
import { event } from "@/lib/analytics";
import { trackFeatureEvent } from "@/lib/firestore";
import { generateSessionId } from "@/lib/utils";

const SESSION_ID = generateSessionId();

const STARTER_QUESTIONS = [
  "How do I register to vote?",
  "What happens on Election Day?",
  "What is the Electoral College?",
  "How are votes counted?",
  "What is early voting?",
];

type Message = {
  id: string;
  role: "user" | "model" | "assistant" | "system";
  content: string;
};

export function ChatInterface() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const savedTts = localStorage.getItem("civiciq_a11y_tts") === "true";
    setTtsEnabled(savedTts);
  }, []);

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      appendMessage(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const appendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    event('chat_message_sent', { category: 'engagement', label: 'ai_chat' });
    trackFeatureEvent('chat', SESSION_ID);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(await res.text() || "An error occurred");
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMsgId = (Date.now() + 1).toString();
      setMessages(msgs => [...msgs, { id: assistantMsgId, role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages(msgs => msgs.map(m => m.id === assistantMsgId ? { ...m, content: assistantContent } : m));
      }

      if (ttsEnabled) {
        speakText(assistantContent);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    appendMessage(input);
  };

  const stopAudio = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(16);
    doc.text("CivicIQ - Chat History", 10, y);
    y += 10;
    doc.setFontSize(12);

    messages.forEach((m) => {
      const prefix = m.role === "user" ? "You: " : "CivicIQ: ";
      const lines = doc.splitTextToSize(`${prefix}${m.content}`, 180);
      if (y + lines.length * 7 > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(lines, 10, y);
      y += lines.length * 7 + 5;
    });
    doc.save("civiciq-chat.pdf");
  };

  return (
    <div className="flex flex-col bg-surface shadow-custom rounded-custom overflow-hidden border border-primary/10"
         style={{ height: '100dvh', maxHeight: '100dvh' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-bg shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h2 className="font-bold text-lg">CivicIQ Assistant</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={stopAudio} className="gap-2 text-primary/70 hover:text-primary">
            <VolumeX className="h-4 w-4" />
            <span className="hidden sm:inline">Stop Audio</span>
          </Button>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={exportPDF} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          )}
        </div>
      </div>

      {/* Message list — flex-1 + overflow-y: auto */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-80 animate-in fade-in zoom-in duration-500">
            <Bot className="h-16 w-16 text-primary/50" />
            <p className="text-lg max-w-md">
              Hi! I&apos;m CivicIQ, your nonpartisan election assistant powered by Google Gemini. Ask me anything about voting and elections.
            </p>
            {/* Starter chips — horizontal scrollable */}
            <div className="flex overflow-x-auto gap-2 max-w-2xl pb-1 hide-scrollbar">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => appendMessage(q)}
                  className="whitespace-nowrap shrink-0 px-4 py-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
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
              <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${m.role === "user" ? "bg-accent text-primary border-2 border-accent" : "bg-blue-600 text-white"}`}>
                {m.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`relative group max-w-[80%] rounded-2xl p-4 ${
                m.role === "user" ? "border-2 border-accent bg-transparent text-text rounded-tr-sm" : "bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-100 rounded-tl-sm shadow-sm"
              }`}>
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
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
                      onClick={() => speakText(m.content)}
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
            <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-blue-600 text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-blue-50 text-blue-900 dark:bg-blue-950/30 dark:text-blue-100 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium">CivicIQ is thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="flex gap-4 animate-in fade-in">
            <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-red-500 text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div className="bg-red-500/10 text-red-600 rounded-2xl rounded-tl-sm border border-red-500/20 p-4">
              <p className="font-bold mb-1">Connection Error</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky input bar with safe-area-inset-bottom for iPhone */}
      <div className="p-3 bg-bg border-t border-primary/10 safe-bottom shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <VoiceChat onTranscript={appendMessage} isProcessing={isLoading} />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about voting..."
            className="flex-1 bg-surface text-base"
            style={{ fontSize: '16px' }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
