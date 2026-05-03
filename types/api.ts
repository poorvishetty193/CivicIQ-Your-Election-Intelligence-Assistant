export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface PlaceResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  open_now?: boolean;
  place_id: string;
}

export interface StateRules {
  state: string;
  id_required: string;
  registration_deadline: string;
  early_voting_days: string;
  mail_ballot_info: string;
}

export interface BallotExplanation {
  plain_english: string;
  yes_means: string;
  no_means: string;
  complexity: 'Simple' | 'Moderate' | 'Complex';
}

export interface QuizScore {
  uid: string;
  score: number;
  badge: string;
  timestamp: unknown;
}

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
}

export interface ApiError {
  error: string;
  code?: number;
}

export interface LeaderboardEntry {
  uid: string;
  score: number;
  badge: string;
  displayName?: string;
}

export interface VoterGuideContent {
  state: string;
  registration_tip: string;
  key_dates: string[];
  rights_summary: string;
  encouragement_message: string;
}

export interface DirectionsResult {
  duration: string;
  distance: string;
  steps: string[];
  polyline: string;
}
