import { motion } from 'framer-motion'
import { Headphones, Clock, Brain, Mic, BookOpen, BarChart3, ChevronRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function IELTSListening() {
  const tests = [
    { title: 'Academic Test 1 — Conversations', duration: 30, difficulty: 'Medium', score: null },
    { title: 'Academic Test 2 — Lectures', duration: 30, difficulty: 'Hard', score: 28 },
    { title: 'General Training Test 1', duration: 30, difficulty: 'Easy', score: 32 },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Headphones className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">IELTS Listening</h1>
            <p className="text-muted-foreground">4 sections · 40 questions · 30 minutes</p>
          </div>
        </div>

        {/* Tips */}
        <div className="glass-card p-4 rounded-2xl border border-blue-500/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Brain className="h-4 w-4 text-blue-400" />AI Strategy Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Read questions BEFORE the audio plays</li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Answers appear in order — don't lose track</li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Check spelling carefully in transfer time</li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">•</span>Practice British, Australian, and American accents</li>
          </ul>
        </div>

        {/* Practice tests */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Practice Tests</h2>
          <div className="space-y-3">
            {tests.map((test, i) => (
              <div key={i} className="glass-card p-4 rounded-2xl flex items-center justify-between card-hover cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Play className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{test.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{test.duration} min</span>
                      <span>{test.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {test.score !== null && (
                    <span className="text-sm font-semibold text-emerald-400">{test.score}/40</span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Practice */}
        <div className="glass-card p-5 rounded-2xl">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Mic className="h-4 w-4 text-emerald-400" />Accent Practice</h2>
          <p className="text-sm text-muted-foreground mb-4">Train your ear with different English accents</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['British 🇬🇧', 'Australian 🇦🇺', 'American 🇺🇸', 'Canadian 🇨🇦'].map(accent => (
              <button key={accent} className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 text-sm transition-all text-center">{accent}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
