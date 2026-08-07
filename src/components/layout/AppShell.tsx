import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  BookOpen, Headphones, Award, Sparkles, TrendingUp, Briefcase, Users,
  Bot, PenTool, BookMarked, Calendar, Trophy, Settings, Shield, ChevronLeft,
  ChevronRight, Flame, User, LogOut, Menu, X, Mic, Layers, Lock, Target
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useGamificationStore } from '@/stores/gamificationStore'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()
  const { xp, streakDays } = useGamificationStore()

  const targetExam = user?.target_exam ?? 'ielts'

  const allNavItems = [
    { label: 'Dashboard', icon: Layers, href: '/dashboard' },
    { label: 'Learning Analytics', icon: TrendingUp, href: '/analytics' },
    { label: 'English Foundation', icon: BookOpen, href: '/foundation' },
    { label: 'Grammar Reference', icon: BookMarked, href: '/grammar' },
    
    // Exam specific items (locked depending on target_exam selection)
    { label: 'IELTS Prep', icon: Headphones, href: '/ielts', exam: 'ielts' },
    { label: 'TOEFL Prep', icon: Award, href: '/toefl', exam: 'toefl' },
    { label: 'GRE Verbal', icon: Sparkles, href: '/gre', exam: 'gre' },

    { label: 'Exam Simulations', icon: Shield, href: '/mock-tests' },
    { label: 'Voice Practice', icon: Mic, href: '/voice-practice' },
    { label: 'Campus Placement', icon: TrendingUp, href: '/campus' },
    { label: 'Corporate English', icon: Briefcase, href: '/corporate' },
    { label: 'Interview Prep', icon: Users, href: '/interview' },
  ]

  const toolNavItems = [
    { label: 'AI Tutor', icon: Bot, href: '/ai-tutor' },
    { label: 'Vocabulary', icon: BookOpen, href: '/vocabulary' },
    { label: 'Essay Evaluator', icon: PenTool, href: '/essay' },
    { label: 'Dictionary', icon: BookMarked, href: '/dictionary' },
  ]

  const communityNavItems = [
    { label: 'Collaborative Study Room', icon: Users, href: '/study-room' },
    { label: 'Exam Countdown Calendar', icon: Calendar, href: '/study-calendar' },
    { label: 'Leaderboard', icon: Trophy, href: '/leaderboard' },
  ]

  // Filter navigation items to ONLY show the student's selected target exam!
  const filteredNavItems = allNavItems.filter(item => {
    if (!item.exam) return true // general items available for all
    return item.exam === targetExam // only show matching exam module
  })

  const switchTargetExam = (exam: 'ielts' | 'toefl' | 'gre') => {
    if (user) {
      setUser({ ...user, target_exam: exam })
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-foreground flex overflow-x-hidden">
      {/* Sidebar Desktop */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 glass-ultra border-r border-white/10 transition-all duration-300 flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex`}
      >
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon-emerald">
              <span className="text-white font-extrabold text-xl">A</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-display font-bold text-lg text-gradient-emerald">Accent Pro</span>
                <span className="block text-[9px] text-emerald-400 uppercase tracking-widest font-semibold">AI Institute</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* User Target Exam Status Badge */}
        {sidebarOpen && (
          <div className="p-4 mx-4 mt-4 rounded-2xl glass border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary" /> Active Target
              </span>
              <span className="uppercase font-bold text-primary text-[10px]">{targetExam}</span>
            </div>
            {/* Target Exam Switcher Dropdown */}
            <div className="grid grid-cols-3 gap-1 pt-1">
              {(['ielts', 'toefl', 'gre'] as const).map(ex => (
                <button
                  key={ex}
                  onClick={() => switchTargetExam(ex)}
                  className={`py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                    targetExam === ex ? 'bg-primary text-background shadow-sm' : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nav list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
          <div className="space-y-1">
            {sidebarOpen && <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Curriculum</p>}
            {filteredNavItems.map(item => {
              const Icon = item.icon
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-gradient-primary text-white font-bold shadow-neon-emerald'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>

          <div className="space-y-1">
            {sidebarOpen && <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">AI Tools</p>}
            {toolNavItems.map(item => {
              const Icon = item.icon
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-gradient-ai text-white font-bold shadow-neon-purple'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>

          <div className="space-y-1">
            {sidebarOpen && <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Community</p>}
            {communityNavItems.map(item => {
              const Icon = item.icon
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Top Navbar */}
        <header className="h-20 glass-ultra border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl glass border border-white/10">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold hidden sm:block">Accent Pro Institute</h1>
          </div>

          {/* User Stats & Badges */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-orange-500/30 text-orange-400 font-bold text-xs">
              <Flame className="h-4 w-4 fill-current text-orange-500" />
              <span>{streakDays} Day Streak</span>
            </div>

            {/* Total XP Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{xp} XP</span>
            </div>

            {/* Profile Avatar */}
            <Link to="/profile" className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
              {user?.full_name?.charAt(0) ?? 'B'}
            </Link>
          </div>
        </header>

        <main className="flex-1 pb-12">{children}</main>
      </div>
    </div>
  )
}
