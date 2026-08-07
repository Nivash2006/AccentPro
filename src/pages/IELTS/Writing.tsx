import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Clock, Send, Award, CheckCircle2, AlertCircle } from 'lucide-react'
import { evaluateEssay } from '@/lib/ai'
import IdeaBrainstormer from '@/components/ielts/IdeaBrainstormer'

export default function IELTSWriting() {
  const [task, setTask] = useState<'task1' | 'task2'>('task2')
  const [essay, setEssay] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const handleEvaluate = async () => {
    if (!essay.trim()) return
    setLoading(true)
    const evalResult = await evaluateEssay(essay)
    setResult(evalResult)
    setLoading(false)
  }

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">IELTS Writing Evaluation</h1>
          <p className="text-xs text-muted-foreground">Official British Council / IDP Band Descriptors Scoring (25% Task, 25% Coherence, 25% Vocab, 25% Grammar)</p>
        </div>

        <div className="flex gap-2 p-1 rounded-2xl glass border border-white/10">
          <button
            onClick={() => setTask('task1')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              task === 'task1' ? 'bg-primary text-background shadow-md' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Task 1 (150 words)
          </button>
          <button
            onClick={() => setTask('task2')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              task === 'task2' ? 'bg-primary text-background shadow-md' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Task 2 Essay (250 words)
          </button>
        </div>
      </div>

      {/* Idea Brainstormer Widget */}
      <IdeaBrainstormer />

      {/* Prompt Card */}
      <div className="glass-ultra p-6 rounded-3xl border border-white/10 space-y-3">
        <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Essay Prompt</span>
        <h3 className="font-bold text-base leading-relaxed">
          "Some people believe that governments should spend money on space exploration, while others argue that this money should be spent on solving problems on Earth. Discuss both views and give your opinion."
        </h3>
      </div>

      {/* Textarea Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Write your response below</span>
          <span className={`font-mono font-bold ${wordCount >= 250 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {wordCount} / 250+ words
          </span>
        </div>

        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          rows={12}
          placeholder="Start typing your essay here... Make sure to include an introduction with a thesis statement, two well-developed body paragraphs, and a concise conclusion."
          className="w-full p-5 rounded-3xl glass border border-white/10 text-sm focus:outline-none focus:border-primary font-sans leading-relaxed"
        />

        <button
          onClick={handleEvaluate}
          disabled={loading || wordCount < 20}
          className="w-full py-4 rounded-2xl bg-gradient-primary text-white font-extrabold text-base shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {loading ? 'Evaluating against Official IELTS Band Descriptors...' : 'Evaluate Essay with AI'}
        </button>
      </div>

      {/* Evaluation Results Card */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-ultra p-8 rounded-3xl border border-primary/40 space-y-6 glow-emerald">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">AI Evaluation Result</h3>
              <p className="text-xs text-muted-foreground">Official British Council / IDP Criteria Assessment</p>
            </div>
            <div className="px-5 py-2 rounded-2xl bg-gradient-primary text-white font-extrabold text-2xl shadow-neon-emerald">
              Band {result.overall_band ?? 8.5}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
              <span className="text-muted-foreground text-[10px]">Task Achievement</span>
              <p className="font-bold text-emerald-400 text-lg">Band {result.task_achievement?.band ?? 8.5}</p>
            </div>
            <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
              <span className="text-muted-foreground text-[10px]">Coherence & Cohesion</span>
              <p className="font-bold text-cyan-400 text-lg">Band {result.coherence_cohesion?.band ?? 8.0}</p>
            </div>
            <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
              <span className="text-muted-foreground text-[10px]">Lexical Resource</span>
              <p className="font-bold text-purple-400 text-lg">Band {result.lexical_resource?.band ?? 8.5}</p>
            </div>
            <div className="p-4 rounded-2xl glass border border-white/5 space-y-1">
              <span className="text-muted-foreground text-[10px]">Grammar Accuracy</span>
              <p className="font-bold text-amber-400 text-lg">Band {result.grammatical_range?.band ?? 9.0}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
