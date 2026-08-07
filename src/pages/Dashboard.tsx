import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Flame, Award, BookOpen, Headphones, PenTool, Mic, Bot,
  TrendingUp, Calendar, ChevronRight, Play, CheckCircle2, Sparkles, Star,
  ShieldCheck, AlertCircle, ExternalLink, ArrowUpRight, BarChart2, GitCommit, Lock, Target
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useProgressStore } from '@/stores/progressStore'
import { useGamificationStore } from '@/stores/gamificationStore'
import { useLearningProfileStore } from '@/stores/learningProfileStore'
import { formatBand } from '@/lib/utils'
import { getAIAdvisorAnalysis } from '@/lib/ai/advisor'
import DailyAICoach from '@/components/dashboard/DailyAICoach'
import { CURRICULUM_GRAPH, checkNodeUnlocked } from '@/lib/ai/learningGraph'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { progress, overallBand } = useProgressStore()
  const { xp, level, streakDays, dailyGoalMinutes, dailyCompletedMinutes } = useGamificationStore()
  const { profile, advisorAnalysis, setAdvisorAnalysis } = useLearningProfileStore()

  const targetExam = user?.target_exam ?? 'ielts'

  useEffect(() => {
    getAIAdvisorAnalysis(profile).then((res) => setAdvisorAnalysis(res))
  }, [profile, setAdvisorAnalysis])

  const allModules = [
    { key: 'foundation', name: 'English Foundation', icon: BookOpen, href: '/foundation', color: 'from-emerald-500 to-cyan-500' },
    { key: 'ielts', name: 'IELTS Band 9 Prep', icon: Headphones, href: '/ielts', color: 'from-blue-500 to-indigo-500', exam: 'ielts' },
    { key: 'toefl', name: 'TOEFL Prep', icon: Award, href: '/toefl', color: 'from-purple-500 to-pink-500', exam: 'toefl' },
    { key: 'gre', name: 'GRE Verbal', icon: Sparkles, href: '/gre', color: 'from-amber-500 to-orange-500', exam: 'gre' },
    { key: 'campus', name: 'Campus Placement', icon: TrendingUp, href: '/campus', color: 'from-rose-500 to-red-500' },
  ]

  // Filter modules based on student's target exam (hide other test prep modules)
  const modules = allModules.filter(mod => {
    if (!mod.exam) return true // general modules available for all
    return mod.exam === targetExam // only show student's chosen exam
  })

  const readinessScores = advisorAnalysis?.readinessScores
  const completedNodes = ['node-tenses', 'node-passive-voice']

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* 1. Daily AI Coach Personal Header */}
      <DailyAICoach />

      {/* 2. Target Exam Readiness Score (Filtered & Focused) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" /> Target Exam Readiness Score
          </h2>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold px-3 py-1 rounded-full glass border border-emerald-500/30">
            <Target className="h-3.5 w-3.5" /> Target: {targetExam.toUpperCase()}
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {targetExam === 'ielts' && (
            <div className="glass-ultra p-6 rounded-3xl border border-primary/40 space-y-3 relative overflow-hidden glow-emerald md:col-span-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-foreground">IELTS Academic Target Score</span>
                <span className="text-3xl font-extrabold text-gradient-emerald">
                  {readinessScores?.ielts?.score ?? 82}% Readiness
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full transition-all duration-700" style={{ width: `${readinessScores?.ielts?.score ?? 82}%` }} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {readinessScores?.ielts?.advice ?? 'IELTS Readiness: 82% — Focus on Writing Task 2 Lexical Resource and Speaking Part 2 cues before exam date.'}
              </p>
            </div>
          )}

          {targetExam === 'toefl' && (
            <div className="glass-ultra p-6 rounded-3xl border border-cyan-500/40 space-y-3 relative overflow-hidden md:col-span-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-foreground">TOEFL iBT Target Score</span>
                <span className="text-3xl font-extrabold text-cyan-400">
                  {readinessScores?.toefl?.score ?? 68}% Readiness
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full transition-all duration-700" style={{ width: `${readinessScores?.toefl?.score ?? 68}%` }} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {readinessScores?.toefl?.advice ?? 'TOEFL Readiness: 68% — Focus on integrated writing lecture summaries and listening note-taking.'}
              </p>
            </div>
          )}

          {targetExam === 'gre' && (
            <div className="glass-ultra p-6 rounded-3xl border border-purple-500/40 space-y-3 relative overflow-hidden md:col-span-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-foreground">GRE Verbal Target Score</span>
                <span className="text-3xl font-extrabold text-purple-400">
                  {readinessScores?.gre?.score ?? 75}% Readiness
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${readinessScores?.gre?.score ?? 75}%` }} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {readinessScores?.gre?.advice ?? 'GRE Verbal Readiness: 75% — Improve text completion accuracy and academic vocabulary.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Learning Path Graph Chain */}
      <div className="glass-ultra p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold flex items-center gap-2">
            <GitCommit className="h-5 w-5 text-primary" /> Adaptive Learning Path Graph
          </h2>
          <span className="text-xs text-muted-foreground">Prerequisite Node Dependencies</span>
        </div>

        <div className="grid sm:grid-cols-5 gap-3">
          {CURRICULUM_GRAPH.map((node, i) => {
            const isUnlocked = checkNodeUnlocked(node.id, completedNodes)
            const isCompleted = completedNodes.includes(node.id)
            return (
              <Link
                key={node.id}
                to={node.route}
                className={`p-4 rounded-2xl glass-card border transition-all flex flex-col justify-between space-y-2 ${
                  isCompleted ? 'border-primary/40 bg-primary/5' : isUnlocked ? 'border-white/10' : 'opacity-50 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary">Node 0{i + 1}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : !isUnlocked ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : null}
                </div>
                <p className="font-bold text-xs text-foreground line-clamp-2">{node.title}</p>
                <span className="text-[9px] uppercase px-2 py-0.5 rounded-md glass font-semibold text-muted-foreground">
                  {node.category}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 4. Main Programs Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold">Active Programs</h2>
              <span className="text-xs text-muted-foreground">{modules.length} modules available</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {modules.map((mod) => {
                const prog = progress[mod.key]
                const Icon = mod.icon
                const pct = prog ? Math.round((prog.completed_lessons / prog.total_lessons) * 100) : 0
                return (
                  <Link key={mod.key} to={mod.href} className="glass-card p-5 rounded-2xl card-hover block border border-white/10 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-base mb-1">{mod.name}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{prog?.completed_lessons ?? 0} / {prog?.total_lessons ?? 20} lessons</span>
                      <span className="font-semibold text-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="glass-ultra p-6 rounded-3xl space-y-4">
            <h3 className="font-display font-bold text-lg">Daily Learning Goal</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Practice Time</span>
              <span className="font-semibold text-primary">{dailyCompletedMinutes} / {dailyGoalMinutes} min</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" style={{ width: `${(dailyCompletedMinutes / dailyGoalMinutes) * 100}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">12 minutes remaining to complete today's streak.</p>
          </div>

          <div className="glass-ultra p-6 rounded-3xl space-y-3">
            <h3 className="font-display font-bold text-lg mb-2">Quick Shortcuts</h3>
            <Link to="/analytics" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-primary flex items-center justify-center">
                <BarChart2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Learning Analytics</p>
                <p className="text-xs text-muted-foreground">Track band score growth graph</p>
              </div>
            </Link>
            <Link to="/voice-practice" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <Mic className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Voice Practice</p>
                <p className="text-xs text-muted-foreground">Read aloud & pronunciation feedback</p>
              </div>
            </Link>
            <Link to="/study-calendar" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Study Countdown Calendar</p>
                <p className="text-xs text-muted-foreground">Exam countdown study plan</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
