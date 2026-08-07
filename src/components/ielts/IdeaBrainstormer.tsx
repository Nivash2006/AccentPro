import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Sparkles, Check, Copy } from 'lucide-react'

export default function IdeaBrainstormer() {
  const [topic, setTopic] = useState('')
  const [ideas, setIdeas] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const handleBrainstorm = () => {
    if (!topic) return
    setLoading(true)
    setTimeout(() => {
      setIdeas({
        pros: [
          'Fosters rapid economic growth and urban infrastructure development.',
          'Encourages global collaboration and cross-cultural Exchange.',
        ],
        cons: [
          'May lead to localized environmental degradation if unmonitored.',
          'Exacerbates socio-economic inequality among rural demographics.',
        ],
        collocations: [
          'Exacerbate inequality',
          'Socio-economic disparity',
          'Urban infrastructure',
          'Sustainable development',
          'Cross-cultural synergy',
        ],
      })
      setLoading(false)
    }, 800)
  }

  return (
    <div className="glass-ultra p-6 rounded-3xl border border-primary/30 space-y-4 glow-emerald">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base">IELTS Task 2 Idea & Vocabulary Brainstormer</h3>
          <p className="text-xs text-muted-foreground">Instant Band 9 argument structures & C1-C2 collocations</p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter essay topic e.g. Government funding for public art vs science..."
          className="flex-1 px-4 py-2.5 rounded-2xl glass border border-white/10 text-xs focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleBrainstorm}
          disabled={loading}
          className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-white font-bold text-xs shadow-neon-emerald hover:opacity-90 transition-opacity"
        >
          {loading ? 'Analyzing...' : 'Generate Ideas'}
        </button>
      </div>

      {ideas && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-2">
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl glass border border-emerald-500/20 space-y-2">
              <span className="font-bold text-emerald-400">Supporting Arguments (Pros)</span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                {ideas.pros.map((p: string, i: number) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className="p-4 rounded-2xl glass border border-rose-500/20 space-y-2">
              <span className="font-bold text-rose-400">Opposing Arguments (Cons)</span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                {ideas.cons.map((c: string, i: number) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass border border-purple-500/20 space-y-2">
            <span className="font-bold text-xs text-purple-400">Band 9 C1-C2 Academic Collocations</span>
            <div className="flex flex-wrap gap-2 pt-1">
              {ideas.collocations.map((col: string, i: number) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[11px] font-semibold">
                  {col}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
