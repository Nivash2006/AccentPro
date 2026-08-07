import { motion } from 'framer-motion'
import { Sparkles, Bot, ArrowRight, Zap, Target, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useLearningProfileStore } from '@/stores/learningProfileStore'
import { generateDailyAdaptivePlan } from '@/lib/ai/adaptiveEngine'
import { getGreeting } from '@/lib/utils'
import { useMistakeMemoryStore } from '@/stores/mistakeMemoryStore'

export default function DailyAICoach() {
  const { user } = useAuthStore()
  const { profile } = useLearningProfileStore()
  const { getRepeatedMistakes } = useMistakeMemoryStore()
  const adaptivePlan = generateDailyAdaptivePlan(profile)
  const greeting = getGreeting()
  const repeatedMistakes = getRepeatedMistakes()

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-ultra p-8 rounded-3xl border border-primary/30 relative overflow-hidden space-y-6">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
            <Bot className="h-4 w-4" /> Personal AI Learning Coach
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground">
            {greeting}, {user?.full_name ?? 'Learner'}!
          </h2>
          <p className="text-xs text-muted-foreground">
            Yesterday you improved your writing evaluation score! Here is today's tailored action plan:
          </p>
        </div>

        <span className="text-xs font-bold text-gradient-solar px-4 py-2 rounded-2xl glass border border-amber-500/30">
          🎯 Target: {profile.targetExam.toUpperCase()} Band {profile.targetBand}
        </span>
      </div>

      {/* Adaptive Recommendation Card */}
      <div className="glass p-5 rounded-2xl border border-emerald-500/20 space-y-2 relative z-10">
        <p className="text-xs font-bold text-primary uppercase tracking-wider">{adaptivePlan.headline}</p>
        <p className="text-sm font-medium leading-relaxed text-foreground">{adaptivePlan.recommendation}</p>
      </div>

      {/* Repeated Mistake Alert if any */}
      {repeatedMistakes.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1 relative z-10">
          <p className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4" /> Mistake Memory Alert:
          </p>
          <p className="text-xs text-muted-foreground">
            You have made the grammar mistake <strong className="text-foreground">"{repeatedMistakes[0].mistake}"</strong> {repeatedMistakes[0].errorCount} times. Let's fix it in today's grammar session!
          </p>
        </div>
      )}

      {/* Action Items List */}
      <div className="grid sm:grid-cols-3 gap-4 relative z-10">
        {adaptivePlan.actionItems.map((item, i) => (
          <a
            key={i}
            href={item.route}
            className="p-4 rounded-2xl glass-card hover:border-primary/40 transition-all flex flex-col justify-between group space-y-3"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                {item.type} • {item.durationMinutes} mins
              </span>
              <p className="font-bold text-sm text-foreground mt-2">{item.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{item.reason}</p>
            </div>

            <div className="flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform pt-2">
              Start Session <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  )
}
