import { motion } from 'framer-motion'
import { GraduationCap, Headphones, BookOpen, PenTool, Mic, Target, ShieldCheck } from 'lucide-react'
import { computeExamReadiness } from '@/lib/ai/readiness'

const sections = [
  { title: 'Reading', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10', score: 22, max: 30, description: '3 passages, 20 questions each' },
  { title: 'Listening', icon: Headphones, color: 'text-green-400', bg: 'bg-green-500/10', score: 20, max: 30, description: '4-6 audio lectures/conversations' },
  { title: 'Speaking', icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/10', score: 18, max: 30, description: '6 independent & integrated tasks' },
  { title: 'Writing', icon: PenTool, color: 'text-amber-400', bg: 'bg-amber-500/10', score: 16, max: 30, description: 'Integrated + independent essay' },
]

export default function TOEFLPage() {
  const readiness = computeExamReadiness({
    exam: 'toefl',
    mockTestScores: [65],
    writingEvaluations: [65],
    speakingEvaluations: [68],
    grammarQuizAccuracy: 78,
    vocabWordsMastered: 140,
    studyMinutes: 320,
  })

  const total = sections.reduce((s, sec) => s + sec.score, 0)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">TOEFL <span className="text-gradient-primary">iBT Prep</span></h1>
          <p className="text-muted-foreground mt-1">Complete preparation for TOEFL iBT — target score 100+</p>
        </div>
        <div className="glass-card px-4 py-3 rounded-2xl text-center">
          <p className="text-2xl font-bold text-blue-400">{total}/120</p>
          <p className="text-xs text-muted-foreground">Predicted Score</p>
        </div>
      </div>

      {/* TOEFL Readiness Card */}
      <div className="glass-card p-6 rounded-3xl border border-blue-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-400" />
            <h2 className="font-bold text-lg">TOEFL Readiness Rating</h2>
          </div>
          <span className="text-2xl font-extrabold text-blue-400">{readiness.score}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${readiness.score}%` }} />
        </div>
        <p className="text-xs text-muted-foreground glass p-3 rounded-xl border border-blue-500/20">
          💡 <strong>Actionable Feedback:</strong> {readiness.advice}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((sec, i) => {
          const Icon = sec.icon
          const pct = Math.round((sec.score / sec.max) * 100)
          return (
            <motion.div key={sec.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card p-5 rounded-2xl card-hover cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${sec.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${sec.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{sec.title}</h3>
                  <p className="text-xs text-muted-foreground">{sec.description}</p>
                </div>
                <span className={`ml-auto font-bold ${sec.color}`}>{sec.score}/{sec.max}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500`}
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
