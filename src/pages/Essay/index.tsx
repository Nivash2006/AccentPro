import { motion } from 'framer-motion'
import { useState } from 'react'
import { PenTool, Brain, Clock, CheckCircle } from 'lucide-react'
import { evaluateEssay } from '@/lib/ai'
import type { EssayEvaluation } from '@/types'

const task2Prompts = [
  'Some people think that the best way to improve public health is by increasing the number of sports facilities. Others, however, think that this would have little effect on public health and that other measures are required. Discuss both views and give your own opinion.',
  'In many countries, the number of animals and plants is declining. Why do you think this is happening? What can be done to solve this problem?',
  'Some people believe that studying at university or college is the best route to a successful career, while others believe that it is better to get a job straight after school. Discuss both views and give your opinion.',
]

export default function EssayPage() {
  const [prompt] = useState(task2Prompts[0])
  const [essay, setEssay] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EssayEvaluation | null>(null)

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length

  const handleEvaluate = async () => {
    if (wordCount < 50) return
    setLoading(true)
    const evaluation = await evaluateEssay(essay)
    setResult(evaluation)
    setLoading(false)
  }

  const criteriaLabels = ['Task Achievement', 'Coherence & Cohesion', 'Lexical Resource', 'Grammar Range & Accuracy']

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="text-3xl font-display font-bold">AI <span className="text-gradient-ai">Essay Evaluator</span></h1>

        {!result ? (
          <>
            <div className="glass-card p-5 rounded-2xl border border-purple-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PenTool className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-purple-400 font-medium mb-1">IELTS Writing Task 2 — 40 minutes</p>
                  <p className="text-sm leading-relaxed">{prompt}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={essay}
                onChange={e => setEssay(e.target.value)}
                placeholder="Write your essay here... (minimum 250 words recommended)"
                className="w-full h-64 p-4 rounded-2xl bg-card/50 border border-border text-sm leading-relaxed resize-none focus:outline-none focus:border-primary/50 transition-colors"
              />
              <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                <span className={wordCount < 250 ? 'text-amber-400' : 'text-emerald-400'}>{wordCount}</span> / 250+ words
              </div>
            </div>

            <button onClick={handleEvaluate} disabled={loading || wordCount < 50}
              className="w-full py-4 rounded-2xl bg-gradient-ai text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3">
              {loading ? (
                <><span className="animate-spin text-xl">⟳</span> AI is evaluating your essay...</>
              ) : (
                <><Brain className="h-5 w-5" />Evaluate My Essay — Get Band Score</>
              )}
            </button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
            {/* Band score */}
            <div className="glass-card p-6 rounded-2xl border border-yellow-500/30 text-center">
              <p className="text-muted-foreground text-sm mb-2">Overall IELTS Band Score</p>
              <p className="text-7xl font-black text-gradient-gold mb-2">{result.band}</p>
              <p className="text-sm text-muted-foreground">{result.overall_feedback}</p>
            </div>

            {/* 4 criteria */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[result.task_achievement, result.coherence_cohesion, result.lexical_resource, result.grammatical_range].map((score, i) => (
                <div key={i} className="glass-card p-4 rounded-xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{criteriaLabels[i]}</span>
                    <span className="font-bold text-primary">{score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full bg-gradient-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${(score / 9) * 100}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & improvements */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2"><CheckCircle className="h-4 w-4" />Strengths</h4>
                <ul className="space-y-2">{result.strengths.map((s, i) => <li key={i} className="text-sm flex gap-2"><span className="text-emerald-400">✓</span>{s}</li>)}</ul>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-semibold text-amber-400 mb-3">→ Improvements</h4>
                <ul className="space-y-2">{result.improvements.map((s, i) => <li key={i} className="text-sm flex gap-2"><span className="text-amber-400">→</span>{s}</li>)}</ul>
              </div>
            </div>

            <button onClick={() => setResult(null)} className="w-full py-3 rounded-xl glass-card hover:bg-primary/10 text-sm font-medium transition-colors">
              Write Another Essay
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
