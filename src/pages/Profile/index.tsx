import { motion } from 'framer-motion'
import { User, Award, Flame, Star, Shield, Mail } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useGamificationStore } from '@/stores/gamificationStore'
import { useProgressStore } from '@/stores/progressStore'
import { formatBand } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const { xp, level, streakDays } = useGamificationStore()
  const { overallBand } = useProgressStore()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl">
          {(user?.full_name ?? 'U')[0].toUpperCase()}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{user?.full_name ?? 'Learner'}</h1>
          <p className="text-sm text-muted-foreground">{user?.email ?? 'student@accentpro.ai'}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">Level {level}</span>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold">{streakDays} Day Streak</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">Predicted Band {formatBand(overallBand)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
