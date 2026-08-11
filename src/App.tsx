import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/authStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { supabase } from '@/lib/supabase'
import '@/i18n'

import AppShell from '@/components/layout/AppShell'
import Landing from '@/pages/Landing'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Dashboard from '@/pages/Dashboard'
import AITutor from '@/pages/AITutor'
import IELTSHub from '@/pages/IELTS'
import IELTSWriting from '@/pages/IELTS/Writing'
import IELTSSpeaking from '@/pages/IELTS/Speaking'
import IELTSListening from '@/pages/IELTS/Listening'
import IELTSReading from '@/pages/IELTS/Reading'
import TOEFLPage from '@/pages/TOEFL'
import GREPage from '@/pages/GRE'
import CampusPage from '@/pages/Campus'
import CorporatePage from '@/pages/Corporate'
import InterviewPage from '@/pages/Interview'
import FoundationPage from '@/pages/Foundation'
import VocabularyPage from '@/pages/Vocabulary'
import EssayPage from '@/pages/Essay'
import DictionaryPage from '@/pages/Dictionary'
import StudyPlannerPage from '@/pages/StudyPlanner'
import StudyRoomPage from '@/pages/StudyRoom'
import GrammarPage from '@/pages/Grammar'
import MockTestsPage from '@/pages/MockTests'
import AnalyticsPage from '@/pages/Analytics'
import VoicePracticePage from '@/pages/VoicePractice'
import StudyCalendarPage from '@/pages/StudyCalendar'
import LeaderboardPage from '@/pages/Leaderboard'
import AdminPage from '@/pages/Admin'
import TeacherPage from '@/pages/Teacher'
import SettingsPage from '@/pages/Settings'
import ProfilePage from '@/pages/Profile'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
})

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useSettingsStore()
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
  }, [theme])
  return <>{children}</>
}

function AuthListener() {
  const { setUser, setSession, setLoading } = useAuthStore()

  useEffect(() => {
    // Check active Supabase session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      const u = data.session?.user
      // Only set user if session exists AND email is confirmed
      if (u && (u.email_confirmed_at || u.confirmed_at)) {
        setUser({
          id: u.id,
          email: u.email ?? 'student@accentpro.ai',
          full_name: u.user_metadata?.full_name ?? 'Learner',
          role: 'student',
          cefr_level: u.user_metadata?.cefr_level ?? 'A1',
          target_exam: u.user_metadata?.target_exam ?? 'ielts',
          target_band: u.user_metadata?.target_band ?? 8.5,
          xp: 0,
          level: 1,
          streak_days: 0,
          last_activity: new Date().toISOString(),
          preferred_language: 'en',
          created_at: u.created_at,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    }).catch(() => {
      setUser(null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      const u = session?.user
      if (u && (u.email_confirmed_at || u.confirmed_at)) {
        setUser({
          id: u.id,
          email: u.email ?? 'student@accentpro.ai',
          full_name: u.user_metadata?.full_name ?? 'Learner',
          role: 'student',
          cefr_level: u.user_metadata?.cefr_level ?? 'A1',
          target_exam: u.user_metadata?.target_exam ?? 'ielts',
          target_band: u.user_metadata?.target_band ?? 8.5,
          xp: 0,
          level: 1,
          streak_days: 0,
          last_activity: new Date().toISOString(),
          preferred_language: 'en',
          created_at: u.created_at,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setSession, setLoading])

  return null
}

function ProtectedAppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">Loading Accent Pro Institute...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <AppShell>{children}</AppShell>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public landing */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main App Routes protected by Supabase Auth */}
      <Route path="/*" element={
        <ProtectedAppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/foundation/*" element={<FoundationPage />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/ielts" element={<IELTSHub />} />
            <Route path="/ielts/listening" element={<IELTSListening />} />
            <Route path="/ielts/reading" element={<IELTSReading />} />
            <Route path="/ielts/writing" element={<IELTSWriting />} />
            <Route path="/ielts/speaking" element={<IELTSSpeaking />} />
            <Route path="/toefl" element={<TOEFLPage />} />
            <Route path="/gre" element={<GREPage />} />
            <Route path="/mock-tests" element={<MockTestsPage />} />
            <Route path="/voice-practice" element={<VoicePracticePage />} />
            <Route path="/campus" element={<CampusPage />} />
            <Route path="/corporate" element={<CorporatePage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/vocabulary" element={<VocabularyPage />} />
            <Route path="/essay" element={<EssayPage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/planner" element={<StudyPlannerPage />} />
            <Route path="/study-calendar" element={<StudyCalendarPage />} />
            <Route path="/study-room" element={<StudyRoomPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </ProtectedAppLayout>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeWrapper>
          <AuthListener />
          <AppRoutes />
        </ThemeWrapper>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
