import { motion } from 'framer-motion'
import { Brain, BookOpen, Target, ShieldCheck, Zap } from 'lucide-react'
import { useState } from 'react'
import { computeExamReadiness } from '@/lib/ai/readiness'

const wordList = [
  { word: 'Abate', meaning: 'To reduce in intensity or amount', example: 'The storm abated after midnight.' },
  { word: 'Callous', meaning: 'Showing insensitive indifference to others', example: 'The callous remark shocked everyone.' },
  { word: 'Enervate', meaning: 'To weaken physically or mentally', example: 'The tropical heat enervated the hikers.' },
  { word: 'Garrulous', meaning: 'Excessively talkative', example: 'The garrulous professor extended the lecture.' },
  { word: 'Laconic', meaning: 'Using very few words', example: 'His laconic reply surprised the interviewer.' },
]

export default function GREPage() {
  const readiness = computeExamReadiness({
    exam: 'gre',
    mockTestScores: [70, 75],
    writingEvaluations: [70],
    speakingEvaluations: [],
    grammarQuizAccuracy: 82,
    vocabWordsMastered: 155,
    studyMinutes: 400,
  })

  const [quizMode, setQuizMode] = useState(false)
  const [current, setCurrent] = useState(0)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">GRE <span className="text-gradient-ai">Verbal Prep</span></h1>
        <p className="text-muted-foreground mt-1">Master Text Completion, Sentence Equivalence & Reading Comprehension</p>
      </div>

      {/* GRE Readiness Rating */}
      <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-400" />
            <h2 className="font-bold text-lg">GRE Verbal Readiness Rating</h2>
          </div>
          <span className="text-2xl font-extrabold text-purple-400">{readiness.score}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${readiness.score}%` }} />
        </div>
        <p className="text-xs text-muted-foreground glass p-3 rounded-xl border border-purple-500/20">
          💡 <strong>Actionable Recommendation:</strong> {readiness.advice}
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Text Completion', icon: Brain, color: 'purple', questions: 120, done: 34 },
          { title: 'Sentence Equiv.', icon: Target, color: 'blue', questions: 80, done: 18 },
          { title: 'Reading Comp.', icon: BookOpen, color: 'green', questions: 60, done: 10 },
        ].map((sec) => {
          const Icon = sec.icon
          const pct = Math.round((sec.done / sec.questions) * 100)
          return (
            <div key={sec.title} className="glass-card p-5 rounded-2xl card-hover cursor-pointer">
              <Icon className={`h-6 w-6 text-${sec.color}-400 mb-3`} />
              <h3 className="font-semibold">{sec.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{sec.done}/{sec.questions} done</p>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full bg-${sec.color}-500`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Vocab section */}
      <div className="glass-card p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-purple-400" />GRE High-Frequency Words</h3>
          <button onClick={() => setQuizMode(!quizMode)}
            className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors">
            {quizMode ? 'Exit Quiz' : 'Quick Quiz'}
          </button>
        </div>

        {quizMode ? (
          <div className="text-center py-8">
            <p className="text-3xl font-bold mb-2">{wordList[current].word}</p>
            <p className="text-muted-foreground text-sm mb-6">What does this word mean?</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {wordList.map((w, i) => (
                <button key={i} onClick={() => setCurrent((current + 1) % wordList.length)}
                  className={`p-3 rounded-xl text-sm border border-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all`}>
                  {w.meaning}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {wordList.map((w, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="text-sm font-bold text-purple-400 w-28 flex-shrink-0">{w.word}</span>
                <div>
                  <p className="text-sm">{w.meaning}</p>
                  <p className="text-xs text-muted-foreground italic">{w.example}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
