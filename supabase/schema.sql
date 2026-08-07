-- ============================================================
-- Accent Pro — Supabase Relational Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com)
-- ============================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  cefr_level TEXT DEFAULT 'B1' CHECK (cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  target_exam TEXT DEFAULT 'ielts',
  target_band NUMERIC(2,1) DEFAULT 8.5,
  target_date DATE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  module TEXT NOT NULL,
  skill TEXT,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 15,
  xp_reward INTEGER DEFAULT 50,
  order_index INTEGER DEFAULT 1,
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Student Progress Table
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module TEXT NOT NULL,
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 20,
  score NUMERIC(5,2) DEFAULT 0,
  band_prediction NUMERIC(2,1),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module)
);

-- 4. AI Feedback Table
CREATE TABLE IF NOT EXISTS public.ai_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('essay', 'speaking', 'grammar')),
  input_text TEXT,
  output_json JSONB NOT NULL,
  band_score NUMERIC(2,1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Mistake Memory Table
CREATE TABLE IF NOT EXISTS public.mistake_memory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  mistake_text TEXT NOT NULL,
  correction TEXT NOT NULL,
  grammar_rule TEXT,
  occurrence_count INTEGER DEFAULT 1,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistake_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can read own progress" ON public.progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can write own progress" ON public.progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can read own feedback" ON public.ai_feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feedback" ON public.ai_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can manage mistake memory" ON public.mistake_memory FOR ALL USING (auth.uid() = user_id);
