import { motion } from 'framer-motion'
import { BookOpen, Volume2, PenTool, Mic, Target, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const modules = [
  { id: 'alphabet', title: 'Alphabet & Phonics', icon: '🔤', lessons: 8, done: 8, color: 'from-emerald-500 to-teal-500' },
  { id: 'vocabulary', title: 'Core Vocabulary', icon: '📖', lessons: 20, done: 15, color: 'from-blue-500 to-cyan-500' },
  { id: 'grammar', title: 'Grammar Fundamentals', icon: '📝', lessons: 18, done: 10, color: 'from-purple-500 to-violet-500' },
  { id: 'pronunciation', title: 'Pronunciation', icon: '🗣️', lessons: 12, done: 4, color: 'from-pink-500 to-rose-500' },
  { id: 'sentences', title: 'Sentence Formation', icon: '✍️', lessons: 10, done: 2, color: 'from-amber-500 to-orange-500' },
  { id: 'tenses', title: 'Tenses Mastery', icon: '⏰', lessons: 16, done: 6, color: 'from-indigo-500 to-blue-500' },
  { id: 'writing', title: 'Writing Skills', icon: '📄', lessons: 14, done: 0, color: 'from-green-500 to-emerald-500' },
  { id: 'listening', title: 'Listening Skills', icon: '🎧', lessons: 10, done: 0, color: 'from-sky-500 to-blue-500' },
  { id: 'speaking', title: 'Speaking Skills', icon: '🎤', lessons: 12, done: 0, color: 'from-red-500 to-pink-500' },
  { id: 'reading', title: 'Reading Skills', icon: '📰', lessons: 10, done: 0, color: 'from-teal-500 to-cyan-500' },
]

export default function FoundationPage() {
  const totalLessons = modules.reduce((s, m) => s + m.lessons, 0)
  const doneLessons = modules.reduce((s, m) => s + m.done, 0)
  const overall = Math.round((doneLessons / totalLessons) * 100)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-gradient-primary">English Foundation</h1>
            <p className="text-muted-foreground mt-1">Build your core English skills from A1 to B2</p>
          </div>
          <div className="glass-card px-4 py-3 rounded-2xl text-center">
            <p className="text-2xl font-bold text-gradient-primary">{overall}%</p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="glass-card p-4 rounded-2xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{doneLessons} / {totalLessons} lessons complete</span>
            <span className="text-primary font-semibold">{overall}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full xp-bar rounded-full" initial={{ width: 0 }} animate={{ width: `${overall}%` }} transition={{ duration: 1 }} />
          </div>
        </div>

        {/* Module grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => {
            const pct = Math.round((mod.done / mod.lessons) * 100)
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5 rounded-2xl card-hover cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-lg`}>
                    {mod.icon}
                  </div>
                  {mod.done === mod.lessons && <CheckCircle className="h-5 w-5 text-emerald-400" />}
                </div>
                <h3 className="font-semibold mb-1">{mod.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{mod.lessons} lessons</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{mod.done}/{mod.lessons}</span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${mod.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  </div>
                </div>
                <button className="mt-3 w-full py-2 rounded-lg text-xs font-medium bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
                  {pct === 0 ? 'Start →' : pct === 100 ? 'Review' : 'Continue →'}
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
