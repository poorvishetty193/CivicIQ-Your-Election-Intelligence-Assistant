# CivicIQ — Your Election Intelligence Assistant

CivicIQ is a comprehensive, nonpartisan election education platform designed to empower voters with clear, accessible, and interactive intelligence about the democratic process.

## 1. Vertical Chosen
**Election Process Education** — CivicIQ focuses on bridging the information gap in the electoral cycle, from registration to inauguration.

## 2. Approach & Logic
CivicIQ leverages **Google Gemini 2.0 Flash** for a unified AI experience:
- **AI Reasoning:** Using Gemini 2.0 Flash to provide nonpartisan answers to complex voting queries.
- **Unified Intelligence:** Translation and civic data interpretation are handled by a single high-performance model.
- **Privacy-First:** User progress (checklists, quiz scores) is persisted locally in the browser.

## 3. How It Works
- **Architecture:** Next.js 14 App Router.
- **Single API Key:** The system is powered exclusively by the `GEMINI_API_KEY`.
- **Backend-Only AI:** All AI requests are routed through server-side API endpoints to ensure key security.
- **AI Streaming:** Real-time chat interaction using the Gemini SDK.

## 4. Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd civiciq
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env.local` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_key_here
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 5. Google Services Used
| Service | Purpose |
|---|---|
| **Google Gemini 2.0 Flash** | Core AI Assistant + Translation |
| **Google Fonts** | Typography (DM Serif Display + DM Sans) |
| **Google Calendar (Link)** | Election reminders |

## 6. Accessibility Features
Implemented WCAG 2.1 AA standards:
- **Floating Accessibility Toolbar:** Contrast, font size, and dyslexia-friendly font toggles.
- **Text-to-Speech:** Integrated browser-based TTS for chat narration.
- **Keyboard Navigation:** Full focus management and skip-to-content links.

## 7. License
MIT
