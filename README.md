# Accent Pro 🎯

> **Your Personal AI English Institute for IELTS Band 9, TOEFL, GRE & Global Success.**

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind-v3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald.svg)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Accent Pro is a next-generation, AI-powered English Coaching Institute platform built to help candidates achieve **IELTS Band 8.5–9.0**, **TOEFL iBT 110+**, **GRE Verbal 165+**, Campus Placement GD success, Corporate English fluency, and HR interview mastery.

---

## 🌟 Key Features

### 🎓 1. Target Exam Isolation & Scoping
- **Single Exam Focus**: Dedicated, isolated modules for IELTS, TOEFL, and GRE. Selecting IELTS hides unneeded test prep (TOEFL/GRE) while preserving access to English Foundation, Grammar Reference, Voice Practice, and Career prep.
- **Header Target Switcher**: Toggle active exam target anytime with instant dashboard & curriculum recalculation.

### 🧠 2. Adaptive Learning Engine & Graph
- **Personalized Daily Plan**: Computes daily target recommendations and explicit skip lists based on yesterday's performance, exam date countdown, and knowledge gaps.
- **Prerequisite Path Graph**: Directed Acyclic Graph (DAG) enforcing node dependency mastery (`Tenses` $\rightarrow$ `Passive Voice` $\rightarrow$ `Task 2 Essay Structuring`).

### ✍️ 3. Official Rubric Essay & Voice Evaluators
- **IELTS Band Descriptors**: Evaluates essays strictly according to official British Council / IDP criteria (25% Task Response, 25% Coherence & Cohesion, 25% Lexical Resource, 25% Grammatical Accuracy).
- **Fluency Hesitation Examiner**: Detects 10–15 second pauses or stammering before complex multi-syllable words (`filtration`, `phenomenon`) and docks Fluency scores with explicit feedback.
- **Post-Test Native Voice Synthesizer**: Unlocks Web Speech API Text-to-Speech audio guides and syllable breakdowns (`fil - TRAY - shun`) after completing speaking tests.

### 📊 4. Gamification & Learning Analytics
- **Live XP & Streak Counter**: Earn +10 XP per flashcard with real-time top navbar updates and level progression.
- **Recharts Analytics**: Visual graphs tracking Band growth, grammar accuracy, and vocabulary trends over time.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v3, Framer Motion, Lucide Icons, Glassmorphism 2.0
- **State Management**: Zustand (Persisted Stores), TanStack Query
- **Backend & Database**: Supabase (PostgreSQL, Row Level Security, Auth)
- **AI Ecosystem**: Google Gemini 2.0 Flash, Groq Llama 3.1-70b, Offline Heuristic Engine
- **Mobile App**: Capacitor (Android APK)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Nivash2006/AccentPro.git
cd AccentPro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root folder:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📄 Database Setup (Supabase)

Copy the SQL schema from `supabase/schema.sql` and run it in your [Supabase SQL Editor](https://supabase.com/).

---

## 📱 Mobile App Build (Android)

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
