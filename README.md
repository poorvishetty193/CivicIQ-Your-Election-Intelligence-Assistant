# CivicIQ — Your Election Intelligence Assistant

> A comprehensive, nonpartisan election education platform that empowers voters with clear, accessible, and interactive intelligence about the democratic process — powered entirely by **Google Gemini 2.0 Flash**.

---

## 1. Chosen Vertical

**Election Process Education**

CivicIQ addresses the critical gap in civic literacy by providing a one-stop platform for understanding the U.S. electoral process — from voter registration through inauguration. Rather than being a news aggregator or poll tracker, CivicIQ functions as an **educational assistant** that makes the mechanics of democracy accessible to all citizens regardless of prior knowledge, language, or ability.

**Why this vertical?** Voter turnout consistently suffers not from apathy but from confusion — citizens don't know *how* to register, *where* to vote, *what's* on the ballot, or *when* key deadlines fall. CivicIQ solves this with AI-driven Q&A, structured timelines, and guided checklists.

---

## 2. Approach & Logic

### Core Philosophy
CivicIQ is built on three pillars:

1. **AI-First Education** — Google Gemini 2.0 Flash serves as the reasoning engine behind all intelligent features. Instead of hardcoding FAQs, CivicIQ uses generative AI to provide dynamic, contextual answers to any civic question a voter might have.

2. **Single-Provider Simplicity** — The entire application runs on a single API key (`GEMINI_API_KEY`). Gemini handles both the conversational AI assistant *and* real-time translation, eliminating the need for separate translation APIs or multiple AI providers.

3. **Privacy & Accessibility by Default** — No user accounts, no databases, no tracking. All user progress (quiz scores, checklist state) is persisted in the browser via `localStorage`. The platform meets WCAG 2.1 AA standards with built-in accessibility controls.

### Technical Approach

| Decision | Rationale |
|---|---|
| **Next.js 14 App Router** | Server-side rendering for SEO, API routes for secure backend AI calls, and file-based routing for clean architecture |
| **Gemini 2.0 Flash** | Low-latency, high-quality responses ideal for real-time chat streaming and translation tasks |
| **Backend-only AI** | The `GEMINI_API_KEY` never touches the client — all AI calls go through `/api/chat` and `/api/translate` server routes |
| **Vercel AI SDK (v3)** | Handles streaming protocol between Gemini's response stream and the React frontend via `GoogleGenerativeAIStream` |
| **localStorage** | Zero-infrastructure persistence for quiz personal bests and voter checklist progress |
| **Browser SpeechSynthesis** | Built-in TTS narration without requiring any external API key |

### AI Integration Details

**Chat Assistant (`/api/chat`):**
- Messages are mapped to Gemini's `history` format (user/model roles)
- A system prompt enforces nonpartisan, educational behavior
- Responses stream in real-time using `GoogleGenerativeAIStream` → `StreamingTextResponse`
- The frontend renders tokens as they arrive for a responsive UX

**Translation (`/api/translate`):**
- Gemini acts as a translator via prompt engineering: `"Translate the following text to {language}. Only return the translated text."`
- Supports Spanish, French, Chinese, Hindi, Arabic, Korean, and more
- Short-circuits for English (returns input directly)

---

## 3. How the Solution Works

### Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   BROWSER                        │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │   Chat   │  │   Quiz   │  │   Timeline   │  │
│  │Interface │  │  Engine   │  │   Explorer   │  │
│  └────┬─────┘  └──────────┘  └──────────────┘  │
│       │         localStorage    Static Data      │
│       │                                          │
│  ┌────┴─────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Language │  │  Voter   │  │   Polling    │  │
│  │ Selector │  │ Checklist│  │   Locator    │  │
│  └────┬─────┘  └──────────┘  └──────────────┘  │
│       │         localStorage    External Links   │
└───────┼──────────────────────────────────────────┘
        │  HTTP (streaming)
┌───────┼──────────────────────────────────────────┐
│       ▼        NEXT.JS SERVER                    │
│  ┌──────────┐  ┌──────────────┐                  │
│  │ /api/chat│  │/api/translate│                   │
│  └────┬─────┘  └──────┬──────┘                   │
│       │               │                          │
│       └───────┬───────┘                          │
│               ▼                                  │
│     ┌──────────────────┐                         │
│     │   lib/gemini.ts  │                         │
│     │ (Gemini 2.0 Flash│                         │
│     │   SDK Client)    │                         │
│     └────────┬─────────┘                         │
│              │                                   │
└──────────────┼───────────────────────────────────┘
               │  HTTPS
               ▼
    ┌─────────────────────┐
    │  Google Gemini API  │
    │  (gemini-2.0-flash) │
    └─────────────────────┘
```

### Feature Breakdown

#### 🤖 AI Chat Assistant (`/chat`)
- **What:** A conversational interface where users ask any question about voting, registration, elections, or civic rights.
- **How:** User messages are sent to `/api/chat`, which forwards them to Gemini with a nonpartisan system prompt. Responses stream back in real-time, token by token.
- **Extra features:** Copy any response to clipboard, export full chat history as PDF, per-message text-to-speech button, auto-TTS when accessibility mode is enabled.

#### 📅 Election Timeline Explorer (`/timeline`)
- **What:** An interactive, step-by-step visual timeline of the 8 phases of an election cycle (Candidate Filing → Inauguration).
- **How:** Uses curated static data in `lib/election-data.ts`. Each phase includes dates, description, and specific voter actions. Filterable by election type (Presidential, Midterm, Local). Includes "Add to Google Calendar" links.
- **Phases tracked:** Candidate Filing, Primary Elections, Registration Deadline, Early Voting, Absentee Ballot Deadline, Election Day, Vote Counting & Certification, Inauguration.

#### 🗺️ Polling Locator (`/polling`)
- **What:** A resource guide that helps voters find their official polling place.
- **How:** Links to authoritative sources (Vote.org, state election offices) rather than embedding a map API — ensuring zero additional API keys and always-current data from official sources.

#### 🧠 Civic Knowledge Quiz (`/quiz`)
- **What:** A 15-question quiz testing knowledge of the electoral process, voting rights, constitutional amendments, and civic procedures.
- **How:** Multiple choice with instant feedback and explanations for each answer. Tracks personal best score via `localStorage`. Categorized difficulty with a final score badge (Democracy Champion / Strong Citizen / etc.).

#### ✅ Voter Readiness Checklist (`/` — homepage)
- **What:** A 10-item interactive checklist (registration, ID, polling location, sample ballot, etc.) with progress tracking.
- **How:** Checkbox state persists across sessions via `localStorage`. Includes visual progress bar, print functionality, reset option, and a "Set Election Day Reminder" button that opens Google Calendar with pre-filled event details.

#### 🌍 Language Selector (Navbar)
- **What:** Translates the page content into 8 languages (English, Spanish, French, Chinese, Hindi, Arabic, Korean, Vietnamese).
- **How:** Sends visible text to `/api/translate` which uses Gemini as a translation engine. No separate Google Translate API needed.

#### ♿ Accessibility Bar (Floating toolbar)
- **What:** WCAG 2.1 AA accessibility controls available on every page.
- **Features:**
  - Font size toggle (normal/large)
  - High contrast mode
  - Dyslexia-friendly font option
  - Text-to-speech toggle (uses native browser `speechSynthesis` API)

---

## 4. Assumptions Made

| Area | Assumption |
|---|---|
| **Target audience** | U.S. voters and prospective voters who need guidance on the electoral process, not political news or candidate endorsements |
| **AI behavior** | Gemini 2.0 Flash reliably follows the nonpartisan system prompt and does not inject political opinions; responses are educational in nature |
| **Gemini availability** | The Gemini API is available and responsive; no local fallback model is provided for offline scenarios |
| **Polling data** | Official polling place data changes frequently and is best sourced from authoritative sites (Vote.org, state SOS websites) rather than a static embedded map |
| **Browser support** | Users have a modern browser (Chrome, Firefox, Safari, Edge) that supports `localStorage`, `speechSynthesis`, and ES2015+ |
| **No authentication** | No user accounts are needed — privacy is maintained by keeping all state client-side in `localStorage` |
| **Single language per session** | Translation is applied to visible page content; the AI assistant always responds in English unless explicitly asked otherwise |
| **Election data** | Timeline phases are representative of a typical U.S. election cycle; actual dates vary by state and election year |
| **Environment** | The `GEMINI_API_KEY` is set as a server-side environment variable (`.env.local`) and never exposed to the browser |

---

## 5. Setup Instructions

### Prerequisites
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repository
git clone https://github.com/poorvishetty193/CivicIQ-Your-Election-Intelligence-Assistant.git
cd CivicIQ-Your-Election-Intelligence-Assistant

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and add your Gemini API key:
#   GEMINI_API_KEY=your_key_here

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm test` | Run test suite (Vitest) |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---

## 6. Google Services Used

| Service | Purpose | Integration Method |
|---|---|---|
| **Google Gemini 2.0 Flash** | Core AI assistant for chat Q&A and text translation | `@google/generative-ai` SDK via backend API routes |
| **Google Fonts** | Typography — DM Serif Display (headings) + DM Sans (body) | `next/font/google` (self-hosted, no external requests at runtime) |
| **Google Calendar** | Election Day reminders | URL-based link (no API key needed) |

---

## 7. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | Shadcn/UI pattern (Radix UI + CVA) |
| **AI SDK** | Vercel AI SDK v3 + `@google/generative-ai` |
| **Animation** | Framer Motion |
| **PDF Export** | jsPDF |
| **Testing** | Vitest + React Testing Library |
| **Icons** | Lucide React |

---

## 8. Project Structure

```
civiciq/
├── app/
│   ├── layout.tsx              # Root layout with fonts, navbar, a11y bar
│   ├── page.tsx                # Landing page with hero + checklist
│   ├── chat/page.tsx           # AI Chat Assistant page
│   ├── timeline/page.tsx       # Election Timeline page
│   ├── polling/page.tsx        # Polling Locator page
│   ├── quiz/page.tsx           # Civic Quiz page
│   └── api/
│       ├── chat/route.ts       # Gemini streaming chat endpoint
│       ├── translate/route.ts  # Gemini translation endpoint
│       └── places/route.ts     # Polling places endpoint
├── components/
│   ├── ChatInterface.tsx       # Chat UI with streaming, TTS, PDF export
│   ├── ElectionTimeline.tsx    # Interactive timeline with filters
│   ├── QuizEngine.tsx          # 15-question quiz with scoring
│   ├── PollingMap.tsx          # Polling resource guide
│   ├── VoterChecklist.tsx      # Persistent voter readiness checklist
│   ├── Navbar.tsx              # Navigation bar
│   ├── LanguageSelector.tsx    # Translation dropdown
│   ├── AccessibilityBar.tsx    # Floating a11y toolbar
│   └── ui/                     # Reusable UI primitives (Button, Input)
├── lib/
│   ├── gemini.ts               # Gemini SDK client initialization
│   ├── election-data.ts        # Static election phase data
│   └── utils.ts                # Utility functions (cn)
├── tests/                      # Vitest test suite (10 tests)
└── .env.example                # Environment variable template
```

---

## 9. License

MIT
