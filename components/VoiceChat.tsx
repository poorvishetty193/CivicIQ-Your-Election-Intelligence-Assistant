"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { event } from "@/lib/analytics";
import { trackFeatureEvent } from "@/lib/firestore";

interface VoiceChatProps {
  onTranscript: (text: string) => void;
  isProcessing: boolean;
}

export function VoiceChat({ onTranscript, isProcessing }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize Web Speech API SpeechRecognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const sr = new SpeechRecognition();
        sr.continuous = false;
        sr.interimResults = false;
        sr.lang = "en-US";
        
        sr.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
          setIsListening(false);
        };
        
        sr.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        sr.onend = () => {
          setIsListening(false);
        };

        setRecognition(sr);
      }
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
      event('voice_chat_used', { category: 'feature', label: 'speech_recognition' });
      trackFeatureEvent('voice_chat', 'session_' + Date.now().toString());
    }
  };

  if (!recognition) {
    return null; // Not supported
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isListening ? "default" : "outline"}
        size="icon"
        className={`rounded-full transition-all ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : ''}`}
        onClick={toggleListening}
        disabled={isProcessing}
        type="button"
      >
        {isListening ? <Mic className="h-5 w-5 text-white" /> : <MicOff className="h-5 w-5" />}
      </Button>
      {isListening && (
        <div className="flex gap-1 items-center h-6">
          <div className="w-1.5 h-3 bg-red-400 rounded-full animate-[bounce_1s_infinite_0ms]" />
          <div className="w-1.5 h-4 bg-red-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
          <div className="w-1.5 h-2 bg-red-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
        </div>
      )}
    </div>
  );
}

// Global utility to read text aloud
export const speakText = (text: string) => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};
