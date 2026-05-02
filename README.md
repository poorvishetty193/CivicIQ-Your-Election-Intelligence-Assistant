# CivicIQ — Your Election Intelligence Assistant

> *Democracy works when you do.*

<img width="1983" height="793" alt="ChatGPT Image May 2, 2026, 03_01_36 PM" src="https://github.com/user-attachments/assets/d298904f-cf44-4bb0-942d-97e4de7b6997" />

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-2.0%20Flash-orange?style=flat-square&logo=google)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?style=flat-square)](./public/manifest.json)

---

## 📋 Table of Contents
1. [Vertical Chosen](#vertical-chosen)
2. [Approach & Logic](#approach--logic)
3. [How the Solution Works](#how-the-solution-works)
4. [Features](#features)
5. [Google Services Used](#google-services-used)
6. [Architecture](#architecture)
7. [Assumptions Made](#assumptions-made)
8. [Setup Instructions](#setup-instructions)
9. [Environment Variables](#environment-variables)
10. [Running Tests](#running-tests)
11. [Accessibility](#accessibility)
12. [Project Structure](#project-structure)

---

## 1. Vertical Chosen

**Election Process Education**

CivicIQ targets the critical gap between citizens and their democratic process. Millions of eligible voters skip elections not out of apathy, but confusion — unclear registration rules, unknown polling locations, and intimidating ballot language. CivicIQ solves this with an AI-powered civic education platform that meets voters where they are: on their phones, in plain language, in real time.

The platform covers the full electoral lifecycle:
- Voter registration and eligibility
- Understanding ballot measures and propositions
- State-specific voting rules and deadlines
- Election Day logistics and voter rights
- Post-election certification and results process

---

## 2. Approach & Logic

### Design Philosophy
CivicIQ is built on three principles:
- **Nonpartisan** — Every AI response is governed by a strict system prompt that prohibits partisan opinions and encourages civic participation regardless of political affiliation
- **Accessible** — WCAG 2.1 AA compliant, with voice input, text-to-speech, dyslexia-friendly fonts, high contrast mode, and full keyboard navigation
- **Simple to deploy** — Single API key (`GEMINI_API_KEY`), zero database dependencies, browser-based persistence

### AI Strategy
All intelligence is powered by **Google Gemini 2.0 Flash** — a single unified model handles:
- Conversational civic Q&A with streaming
- Real-time election news via Search Grounding
- Multi-language translation (8 languages)
- Ballot measure plain-English explanation
- State-specific voting rule generation
- Quiz answer explanations
- Personalized voter guide PDF generation
- Civic rights summaries by voter profile

This unified approach means one API key, one billing account, one model to trust — and consistent nonpartisan tone across every feature.

### Decision Tree Logic
The **Civic Rights Navigator** uses a client-side decision tree with 6 voter profiles (First-time voter, Moved recently, Student, Non-English speaker, Disability, Returning citizen). Each profile maps to a tailored Gemini prompt that generates a personalized rights summary — making complex legal information feel like a conversation, not a document.

### Gamification Logic
The **Civic Passport** tracks feature engagement via `localStorage` boolean flags. Badges unlock when users: complete the quiz, use voice chat, finish the checklist, use the ballot explainer, bust 5 myths, and navigate the rights tree. This drives exploration of every feature — which directly improves the user's civic knowledge.

---

## 3. How the Solution Works

### Data Flow
```
User Input (Browser)
     ↓
Next.js Frontend (React Components)
     ↓
Next.js API Routes (Edge Runtime) ← GEMINI_API_KEY lives here only
     ↓
Google Gemini 2.0 Flash API
     ↓
Streamed / JSON Response
     ↓
React UI renders result
```

### Key Technical Decisions

| Decision | Reason |
|---|---|
| **Edge Runtime on all API routes** | Faster cold starts, lower global latency |
| **Streaming chat responses** | Real-time feel, no waiting for full response |
| **localStorage for persistence** | Zero backend infrastructure, instant reads |
| **sessionStorage for state cache** | State voting rules cached after first Gemini call |
| **In-memory rate limiting** | No Redis/Upstash needed, 20 req/IP/min enforced |
| **Browser TTS + STT** | Voice features with zero API cost |
| **SVG US map (inline)** | No Maps API needed for state explorer, fully accessible |
| **jsPDF for voter guide** | Client-side PDF generation, no server storage |

### API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/chat` | POST | Streaming civic Q&A via Gemini |
| `/api/translate` | POST | Translate UI text to 8 languages |
| `/api/quiz-explain` | POST | AI explanation for quiz answers |
| `/api/ballot` | POST | Plain-English ballot measure breakdown |
| `/api/news` | GET | Live election news via Gemini Search Grounding |
| `/api/state-rules` | POST | State-specific voting rules as structured JSON |
| `/api/voter-guide` | POST | Personalized voter guide content for PDF |

---

## 4. Features

### 🤖 AI Chat Assistant
Streaming conversational assistant powered by Gemini 2.0 Flash. Maintains full multi-turn history. Includes suggested starter questions, copy-to-clipboard, PDF export, and voice input/output.

### 🗓️ Election Timeline
Interactive vertical stepper covering all 8 phases of the US election cycle — from candidate filing to inauguration. Filterable by election type. Each phase expandable with detailed voter action items. Google Calendar deep-link integration for reminders.

### 🗺️ Polling Place Locator
Google Maps embed with Places API nearby search for polling locations. Zip code and geolocation input. Results sidebar with directions links.

### 📝 Civic Knowledge Quiz
15-question interactive quiz with instant AI-powered explanations for every answer. Progress bar, badge system (Civic Novice → Democracy Champion), confetti on completion, Web Share API integration.

### 🗳️ Ballot Explainer
Paste any ballot measure text. Gemini returns a plain-English explanation, pro/con framing (nonpartisan), and a Complexity Score (Simple / Moderate / Complex).

### 💡 Election Myth Buster
10 CSS flip-card myths with fact reveals. Myths include common misconceptions about ID requirements, felon voting rights, write-in votes, and more. "Ask CivicIQ more" deep-links into chat.

### 🧭 Civic Rights Navigator
Decision tree for 6 voter profiles. Each path generates a Gemini-powered personalized rights summary with animated step transitions.

### 🗺️ State Rules Explorer
Clickable SVG map of all 50 US states. Click any state for its current voter ID requirements, registration deadline, early voting availability, and mail ballot rules — generated by Gemini and cached in sessionStorage.

### ⏱️ Election Countdown
Live flip-clock countdown to the next major US election with dynamic "what to do now" checklist based on days remaining.

### 🎙️ Voice Chat
Web Speech API transcription + SpeechSynthesis TTS. Visual waveform animation while listening. Full hands-free civic education.

### 🏅 Civic Passport
Gamified badge system tracking all feature engagement. Canvas-generated shareable passport image. Progress ring showing civic exploration %.

### 📊 Activity Stats
Recharts RadarChart visualizing personal civic engagement across 6 dimensions from localStorage data.

### 📄 Voter Guide PDF
One-click personalized voter guide generated by Gemini and rendered to PDF by jsPDF with CivicIQ branding.

### 📱 PWA
Installable on iOS and Android. Offline fallback page. Full manifest with civic branding.

---

## 5. Google Services Used

| Service | How It's Used |
|---|---|
| **Google Gemini 2.0 Flash** | Core AI: chat, translation, quiz explanations, ballot analysis, state rules, voter guide, rights summaries |
| **Gemini Search Grounding** | Live election news feed with real-time web grounding — no news API needed |
| **Google Maps JavaScript API** | Interactive polling place map |
| **Google Places API** | Nearby polling location search by zip or geolocation |
| **Google Maps Directions API** | Travel time and directions to polling places |
| **Google Calendar (deep link)** | One-click "Add to Calendar" for all key election dates |
| **Google Fonts** | DM Serif Display (headings) + DM Sans (body) |
| **Web Speech API** | Voice input for hands-free chat (browser standard, Google-originated) |
| **SpeechSynthesis API** | Text-to-speech for AI responses |

---

## 6. Architecture

```
civiciq/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout, metadata, fonts, providers
│   ├── page.tsx                  # Landing page
│   ├── chat/page.tsx             # AI Chat Assistant
│   ├── timeline/page.tsx         # Election Timeline
│   ├── polling/page.tsx          # Polling Place Locator
│   ├── quiz/page.tsx             # Civic Knowledge Quiz
│   ├── ballot/page.tsx           # Ballot Explainer
│   ├── myths/page.tsx            # Myth Buster
│   ├── rights/page.tsx           # Rights Navigator
│   ├── state-explorer/page.tsx   # State Rules Explorer
│   ├── stats/page.tsx            # Activity Stats
│   ├── passport/page.tsx         # Civic Passport
│   ├── offline/page.tsx          # PWA offline fallback
│   └── api/
│       ├── chat/route.ts         # Gemini streaming chat (edge)
│       ├── translate/route.ts    # Gemini translation (edge)
│       ├── quiz-explain/route.ts # Quiz AI explanations (edge)
│       ├── ballot/route.ts       # Ballot explainer (edge)
│       ├── news/route.ts         # Grounded news feed (edge)
│       ├── state-rules/route.ts  # State voting rules (edge)
│       └── voter-guide/route.ts  # Voter guide content (edge)
├── components/                   # Reusable UI components
├── lib/                          # Utility modules
├── tests/                        # Vitest test suites
├── public/                       # Static assets + PWA manifest
├── .env.example                  # Environment variable template
└── README.md
```

---

## 7. Assumptions Made

- **US-focused:** Election data, state rules, and timelines are US-centric. International election systems are not covered in the structured features (though the AI chat can discuss them).
- **Gemini availability:** The app assumes `GEMINI_API_KEY` is valid and has quota. All AI features degrade gracefully with user-friendly error messages if the API is unavailable.
- **Browser support:** Voice input (Web Speech API) requires Chrome or Edge. Firefox users see a graceful fallback message.
- **No user accounts:** All progress (checklist, badges, quiz scores) is stored in `localStorage`. Clearing browser data resets progress. This is intentional — no PII collected, no auth required.
- **Election dates:** Hardcoded next major US election dates (Nov 2025 state elections, Nov 2026 midterms). These would be updated via a config file in production.
- **Polling locator:** Accuracy of polling place results depends on Google Places data. Users are always advised to verify with their official state election website.
- **Rate limiting:** In-memory rate limiting (20 req/IP/min) resets on server restart. Production deployments should use Redis-backed limiting.
- **PDF generation:** Voter guide PDF is generated client-side using jsPDF. Complex layouts may vary slightly across browsers.
- **Nonpartisanship:** The AI is instructed to remain nonpartisan but Gemini's responses are probabilistic. The system prompt enforces civic framing but cannot guarantee perfect neutrality in every edge case.

---

## 8. Setup Instructions

### Prerequisites
- Node.js 18.17 or later
- npm 9+
- A Google Gemini API key ([get one free at ai.google.dev](https://ai.google.dev))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/civiciq.git
cd civiciq

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 4. Run the development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## 9. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required — Google Gemini API Key
# Get yours free at https://ai.google.dev
GEMINI_API_KEY=your_gemini_api_key_here

# Optional — Google Maps (for Polling Locator feature)
# Get at https://console.cloud.google.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key_here
```

> ⚠️ **Security:** `GEMINI_API_KEY` is never exposed to the browser. It is only used in server-side API routes. Never prefix it with `NEXT_PUBLIC_`.

---

## 10. Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Test Coverage

| Test File | What It Covers |
|---|---|
| `tests/chat.test.ts` | Streaming response, rate limiting (429), input sanitization |
| `tests/translate.test.ts` | All 8 languages, empty input handling |
| `tests/quiz-explain.test.ts` | Correct/incorrect answer explanations |
| `tests/ballot.test.ts` | Complexity scoring, JSON response shape |
| `tests/news.test.ts` | 5-item array response, grounding mock |
| `tests/state-rules.test.ts` | JSON shape validation, all 50 state codes |
| `tests/timeline.test.ts` | All 8 phases render, filter functionality |
| `tests/checklist.test.ts` | localStorage persistence, progress calculation |
| `tests/mythbuster.test.ts` | All 10 cards render, flip state toggle |

---

## 11. Accessibility

CivicIQ meets **WCAG 2.1 AA** standards throughout:

| Feature | Implementation |
|---|---|
| **Skip to content** | First focusable element on every page |
| **Keyboard navigation** | Full tab order, visible focus rings on all elements |
| **Screen reader support** | ARIA labels, roles, and landmarks on all components |
| **High contrast mode** | Toggle in accessibility toolbar, persisted in localStorage |
| **Font size control** | Increase/decrease buttons, applies site-wide via CSS variable |
| **Dyslexia-friendly font** | OpenDyslexic toggle in accessibility toolbar |
| **Text-to-speech** | All AI chat responses readable aloud via SpeechSynthesis |
| **Voice input** | Full hands-free chat via Web Speech API |
| **Color contrast** | All text/background combinations ≥ 4.5:1 ratio |
| **Touch targets** | All interactive elements minimum 44×44px |
| **Alt text** | Descriptive alt on every image and SVG |
| **Error messages** | All form errors announced to screen readers via aria-live |
| **RTL support** | Arabic language selection triggers RTL layout |

---

## 12. Scripts Reference

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm test             # Run Vitest test suite
npm run test:coverage # Run tests with coverage report
npm run type-check   # TypeScript type checking
npm run lint         # ESLint check
```

---

*Powered by Google Gemini 2.0 Flash. Built with Next.js 14.*

**Go vote. 🗳️**

---

## Author: 

**Poorvi Shetty**
