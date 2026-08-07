import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Square, Play, Brain, RefreshCw, Flame } from 'lucide-react'
import { evaluateSpeaking } from '@/lib/ai'
import type { SpeakingEvaluation } from '@/types'

export default function IELTSSpeaking() {
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SpeakingEvaluation | null>(null)

  const topicCard = {
    title: "Describe a memorable journey you took.",
    points: [
      "Where you went",
      "Who you went with",
      "What you did there",
      "And explain why it was memorable to you"
    ]
  }

  const handleStartRecord = () => {
    setRecording(true)
    setResult(null)
  }

  const handleStopRecord = async () => {
    setRecording(false)
    setLoading(true)
    const evalData = await evaluateSpeaking()
    setResult(evalData)
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
          <Mic className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">IELTS Speaking Simulator</h1>
          <p className="text-xs text-muted-foreground">Part 2 Cue Card & AI Voice Analysis</p>
        </div>
      </div>

      {/* Cue Card */}
      <div className="glass-card p-8 rounded-3xl border border-orange-500/20 space-y-4">
        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold">Part 2 Cue Card</span>
        <h2 className="text-2xl font-bold">{topicCard.title}</h2>
        <p className="text-sm text-muted-foreground">You should say:</p>
        <ul className="space-y-2 text-sm">
          {topicCard.points.map((pt, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              {pt}
            </li>
          ))}
        </ul>
      </div>

      {/* Recording Control */}
      <div className="glass-card p-8 rounded-3xl text-center space-y-6">
        <div className="flex justify-center">
          {!recording ? (
            <button onClick={handleStartRecord} className="w-20 h-20 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-neon-emerald hover:scale-105 transition-transform">
              <Mic className="h-8 w-8" />
            </button>
          ) : (
            <button onClick={handleStopRecord} className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center animate-pulse shadow-lg hover:scale-105 transition-transform">
              <Square className="h-8 w-8" />
            </button>
          )}
        </div>

        <p className="text-sm text-muted-foreground font-medium">
          {recording ? "Recording your response... Click stop when finished." : "Click the microphone to begin speaking."}
        </p>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-xs text-primary font-medium">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Analyzing pronunciation & speech fluency...
          </div>
        )}
      </div>

      {/* Speaking Evaluation */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-6">
            <div>
              <h3 className="text-xl font-bold">Speaking Evaluation</h3>
              <p className="text-xs text-muted-foreground">Voice analysis feedback</p>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-extrabold text-2xl">
              Band {result.band}
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Pronunciation</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">{result.pronunciation}%</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Fluency</p>
              <p className="text-lg font-bold text-blue-400 mt-1">{result.fluency}%</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Vocabulary</p>
              <p className="text-lg font-bold text-purple-400 mt-1">{result.vocabulary}%</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Grammar</p>
              <p className="text-lg font-bold text-orange-400 mt-1">{result.grammar}%</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{result.overall_feedback}</p>
        </motion.div>
      )}
    </div>
  )
}
