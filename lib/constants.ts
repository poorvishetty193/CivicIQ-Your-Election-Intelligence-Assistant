export const GEMINI_MODEL = 'gemini-2.0-flash' as const;

export const CIVIC_SYSTEM_PROMPT = `You are CivicIQ, a nonpartisan election education assistant.
Explain voting registration, polling procedures, election timelines, ballot types, and civic rights
clearly and accessibly. Never give partisan opinions. Always encourage civic participation.` as const;

export const ELECTION_DATES = {
  STATE_2025: '2025-11-04',
  MIDTERMS_2026: '2026-11-03',
} as const;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', rtl: false },
  { code: 'es', label: 'Español', rtl: false },
  { code: 'fr', label: 'Français', rtl: false },
  { code: 'hi', label: 'हिन्दी', rtl: false },
  { code: 'zh', label: '中文', rtl: false },
  { code: 'ar', label: 'العربية', rtl: true },
  { code: 'pt', label: 'Português', rtl: false },
  { code: 'tl', label: 'Tagalog', rtl: false },
] as const;

export const QUIZ_BADGES = {
  NOVICE:   { label: 'Civic Novice',        min: 0,  max: 5,  emoji: '🌱' },
  LEARNER:  { label: 'Civic Learner',        min: 6,  max: 10, emoji: '📚' },
  EXPERT:   { label: 'Civic Expert',         min: 11, max: 13, emoji: '🎓' },
  CHAMPION: { label: 'Democracy Champion',   min: 14, max: 15, emoji: '🏆' },
} as const;

export const RATE_LIMIT = {
  MAX_REQUESTS: 20,
  WINDOW_MS: 60_000,
} as const;

export const PASSPORT_BADGES = [
  { id: 'quiz',      label: 'Quiz Master',      emoji: '🎓', description: 'Complete the civic quiz' },
  { id: 'voice',     label: 'Voice Voter',       emoji: '🎙️', description: 'Use voice chat' },
  { id: 'checklist', label: 'Ready to Vote',     emoji: '✅', description: 'Complete voter checklist' },
  { id: 'ballot',    label: 'Ballot Decoder',    emoji: '🗳️', description: 'Use ballot explainer' },
  { id: 'myths',     label: 'Myth Buster',       emoji: '💡', description: 'Bust 5 election myths' },
  { id: 'rights',    label: 'Rights Navigator',  emoji: '🧭', description: 'Complete rights tree' },
] as const;

export const TIMELINE_PHASES = [
  { id: 1, title: 'Candidate Filing',             description: 'Candidates declare and register to run', voterAction: 'Research candidates in your area',    type: ['presidential', 'midterm', 'local'] },
  { id: 2, title: 'Primary Elections',             description: 'Parties select their nominees',          voterAction: 'Vote in your party primary',           type: ['presidential', 'midterm'] },
  { id: 3, title: 'Voter Registration Deadline',   description: 'Last day to register in most states',   voterAction: 'Confirm your registration is active',  type: ['presidential', 'midterm', 'local'] },
  { id: 4, title: 'Early Voting Opens',            description: 'In-person early voting begins',          voterAction: 'Find your early voting location',      type: ['presidential', 'midterm', 'local'] },
  { id: 5, title: 'Mail Ballot Deadline',          description: 'Request and return mail ballots',        voterAction: 'Request your mail ballot now',         type: ['presidential', 'midterm', 'local'] },
  { id: 6, title: 'Election Day',                  description: 'General election — polls open 6am–8pm', voterAction: 'Go vote! Bring valid ID',              type: ['presidential', 'midterm', 'local'] },
  { id: 7, title: 'Vote Counting & Certification', description: 'Official results are tallied',           voterAction: 'Track results on official sources',    type: ['presidential', 'midterm', 'local'] },
  { id: 8, title: 'Inauguration',                  description: 'Winners are sworn into office',          voterAction: 'Engage with your new representatives', type: ['presidential', 'midterm'] },
] as const;

export const ELECTION_MYTHS = [
  { myth: "My vote doesn't count",                      fact: 'Many elections are decided by fewer than 100 votes. Every vote matters.' },
  { myth: 'You need a photo ID everywhere to vote',      fact: 'ID requirements vary by state. Many states allow alternatives like utility bills.' },
  { myth: 'Felons can never vote',                       fact: 'Most states restore voting rights after sentence completion. Some never remove them.' },
  { myth: 'You must vote at your assigned polling place',fact: 'Many states allow you to vote at any polling place in your county.' },
  { myth: 'Voting by mail is unreliable',                fact: 'Mail ballots have multiple security features and are used safely across all 50 states.' },
  { myth: "You can't vote if you moved recently",        fact: 'You can update your registration or vote at your old address in many cases.' },
  { myth: 'Write-in votes are never counted',            fact: 'Write-in votes are always counted — they just rarely win.' },
  { myth: 'Non-citizens can vote in federal elections',  fact: 'Federal law prohibits non-citizen voting in federal elections.' },
  { myth: 'You need to be registered with a party',      fact: 'Many states allow independent voters to participate in primaries.' },
  { myth: 'Election results are final on Election Night',fact: 'Official results take days or weeks after all ballots are verified and counted.' },
] as const;
