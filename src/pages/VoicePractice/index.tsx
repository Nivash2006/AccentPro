import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Volume2, Sparkles, CheckCircle2, Play, Square, Award } from 'lucide-react'
import PronunciationHeatmap from '@/components/voice/PronunciationHeatmap'
import { speakText } from '@/lib/audio'

export default function VoicePracticePage() {
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [evaluated, setEvaluated] = useState(false)

  const passage = "Global warming has caused substantial environmental consequences, particularly in coastal regions. Scientists emphasize that immediate action is invaluable."

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true)
      setTranscript('Global warming has caused... [12.4s pause] ... filtration environmental consequences...')
    } else {
      setRecording(false)
      setEvaluated(true)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Voice Practice & Speaking Evaluation</h1>
          <p className="text-xs text-muted-foreground">Test your fluency under exam conditions • Post-evaluation native voice correction</p>
        </div>
      </div>

      {/* Test Recording Card (No audio preview allowed during test) */}
      <div className="glass-ultra p-8 rounded-3xl border border-white/10 text-center space-y-6">
        <div className="p-6 rounded-2xl glass border border-white/5 space-y-2 max-w-2xl mx-auto text-left">
          <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Exam Practice Passage</span>
          <p className="text-base font-semibold leading-relaxed text-foreground">
            "{passage}"
          </p>
          <p className="text-[11px] text-muted-foreground italic pt-1">
            * Read the passage aloud clearly into your microphone without stopping. Native audio guidance will be unlocked after your attempt.
          </p>
        </div>

        <button
          onClick={toggleRecording}
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all shadow-2xl ${
            recording ? 'bg-rose-500 text-white animate-pulse' : 'bg-gradient-primary text-white shadow-neon-emerald hover:scale-105'
          }`}
        >
          {recording ? <Square className="h-8 w-8 fill-current" /> : <Mic className="h-8 w-8" />}
        </button>

        <p className="text-xs text-muted-foreground">
          {recording ? 'Recording speaking assessment... Click to stop and evaluate.' : 'Click mic button to begin official speaking evaluation.'}
        </p>
      </div>

      {/* Post-Test Feedback & Native Audio Player (Only visible AFTER evaluation) */}
      {evaluated ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-ultra p-6 rounded-3xl border border-emerald-500/40 glow-emerald flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Speaking Evaluation Complete</span>
              <h3 className="text-xl font-bold text-foreground">Overall Fluency Band: 6.5</h3>
            </div>

            <button
              onClick={() => speakText(passage, 0.85)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-white font-bold text-xs shadow-neon-emerald flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Volume2 className="h-4 w-4" />
              Listen to Native Voice Guide
            </button>
          </div>

          <PronunciationHeatmap />
        </motion.div>
      ) : (
        <div className="p-6 rounded-3xl glass border border-white/5 text-center text-xs text-muted-foreground">
          Complete the speaking test above to unlock detailed phoneme heatmaps, pause hesitation penalties, and native voice audio corrections.
        </div>
      )}
    </div>
  )
}
