// ============================================================
// TypeScript types for Accent Pro
// ============================================================

export type UserRole = 'student' | 'teacher' | 'admin';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type IELTSBand = 0 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9;
export type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
export type Module = 'foundation' | 'ielts' | 'toefl' | 'gre' | 'campus' | 'corporate' | 'interview';
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'ta';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  cefr_level: CEFRLevel;
  target_exam?: 'ielts' | 'toefl' | 'gre' | 'placement';
  target_band?: IELTSBand;
  target_date?: string;
  xp: number;
  level: number;
  streak_days: number;
  last_activity: string;
  preferred_language: Language;
  created_at: string;
}

export interface Progress {
  user_id: string;
  module: Module;
  skill?: Skill;
  completed_lessons: number;
  total_lessons: number;
  score: number;
  band_prediction?: IELTSBand;
  last_updated: string;
}

export interface Lesson {
  id: string;
  module: Module;
  skill?: Skill;
  title: string;
  description: string;
  content_type: 'video' | 'audio' | 'text' | 'quiz' | 'speaking' | 'writing';
  duration_minutes: number;
  xp_reward: number;
  order: number;
  is_free: boolean;
}

export interface VocabWord {
  id: string;
  word: string;
  pronunciation?: string;
  definition: string;
  example: string;
  category: 'general' | 'academic' | 'ielts' | 'gre' | 'idiom' | 'phrasal';
  difficulty: CEFRLevel;
  learned: boolean;
  next_review?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earned_at?: string;
  requirement: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    band_score?: IELTSBand;
    corrections?: GrammarCorrection[];
    vocabulary_tips?: string[];
  };
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'punctuation' | 'style';
}

export interface EssayEvaluation {
  band: IELTSBand;
  task_achievement: number;
  coherence_cohesion: number;
  lexical_resource: number;
  grammatical_range: number;
  overall_feedback: string;
  strengths: string[];
  improvements: string[];
  vocabulary_suggestions: string[];
  grammar_corrections: GrammarCorrection[];
}

export interface SpeakingEvaluation {
  band: IELTSBand;
  pronunciation: number;
  fluency: number;
  vocabulary: number;
  grammar: number;
  overall_feedback: string;
  pronunciation_errors: string[];
  fluency_tips: string[];
}

export interface StudyPlan {
  id: string;
  user_id: string;
  week_start: string;
  daily_goals: DailyGoal[];
  target_hours: number;
  focus_skills: Skill[];
}

export interface DailyGoal {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  tasks: string[];
  completed: boolean;
  hours: number;
}

export interface ForumPost {
  id: string;
  user: Pick<User, 'id' | 'full_name' | 'avatar_url'>;
  title: string;
  content: string;
  category: 'general' | 'ielts' | 'toefl' | 'gre' | 'grammar' | 'vocabulary' | 'speaking' | 'writing';
  likes: number;
  replies: number;
  created_at: string;
}

export interface Notification {
  id: string;
  type: 'reminder' | 'achievement' | 'vocab' | 'streak' | 'exam_countdown' | 'challenge';
  title: string;
  body: string;
  read: boolean;
  created_at: string;
  action_url?: string;
}

export interface LiveClass {
  id: string;
  title: string;
  teacher: Pick<User, 'id' | 'full_name' | 'avatar_url'>;
  topic: string;
  platform: 'zoom' | 'meet';
  join_url: string;
  scheduled_at: string;
  duration_minutes: number;
  enrolled: number;
  max_capacity: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: Pick<User, 'id' | 'full_name' | 'avatar_url'>;
  xp: number;
  streak: number;
  level: number;
}
