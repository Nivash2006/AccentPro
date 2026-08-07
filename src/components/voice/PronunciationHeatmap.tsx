import { useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Sparkles, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { speakText } from '@/lib/audio'

interface WordPhoneme {
  word: string
  score: number // 0 to 100
  phoneme: string
  syllables: string
  pauseDuration?: number // seconds pause before word
  tip: string
  howToPronounce: string
}

interface PronunciationHeatmapProps {
  words?: WordPhoneme[]
}

const DEFAULT_WORDS: WordPhoneme[] = [
  {
    word: 'Filtration',
    score: 55,
    phoneme: '/fɪlˈtreɪ.ʃən/',
    syllables: 'fil - TRAY - shun',
    pauseDuration: 12.4,
    tip: 'Long pause of 12.4s detected! In IELTS Speaking, pauses over 3s drop Fluency to Band 5.5-6.0.',
    howToPronounce: 'Break it into 3 parts: fil (like fill) + TRAY (long A sound with main stress) + shun. Don\'t stop before the word!',
  },
  {
    word: 'Substantial',
    score: 95,
    phoneme: '/səbˈstæn.ʃəl/',
    syllables: 'sub - STAN - shal',
    pauseDuration: 0.8,
    tip: 'Natural 0.8s transition. Excellent stress on second syllable STAN.',
    howToPronounce: 'sub + STAN + shal. Smooth flow without hesitation.',
  },
  {
    word: 'Phenomenon',
    score: 65,
    phoneme: '/fəˈnɒm.ɪ.nən/',
    syllables: 'fuh - NOM - ih - nuhn',
    pauseDuration: 4.2,
    tip: '4.2s pause detected before attempt. Syllable stress placed on wrong syllable.',
    howToPronounce: 'fuh + NOM + ih + nuhn. Place the strongest voice emphasis on the second syllable NOM.',
  },
  {
    word: 'Unprecedented',
    score: 88,
    phoneme: '/ʌnˈpres.ɪ.den.tɪd/',
    syllables: 'un - PRESS - ih - den - tid',
    pauseDuration: 1.1,
    tip: 'Good pacing and clear articulation of all 5 syllables.',
    howToPronounce: 'un + PRESS + ih + den + tid. Emphasize PRESS.',
  },
]

export default function PronunciationHeatmap({ words = DEFAULT_WORDS }: PronunciationHeatmapProps) {
  const [selectedWord, setSelectedWord] = useState<WordPhoneme | null>(DEFAULT_WORDS[0])

  return (
    <div className="glass-ultra p-6 rounded-3xl border border-white/10 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> AI Speech Fluency & Pronunciation Examiner
          </h3>
          <p className="text-xs text-muted-foreground">Detects long pauses (10-15s hesitation), mispronunciations, and provides native voice audio guidance</p>
        </div>
      </div>

      {/* Word Chips Heatmap */}
      <div className="flex flex-wrap gap-2">
        {words.map((item, idx) => {
          const isGood = item.score >= 85
          const isFair = item.score >= 70 && item.score < 85
          const hasLongPause = (item.pauseDuration ?? 0) >= 3.0

          const colorClass = isGood
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : isFair
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'

          return (
            <button
              key={idx}
              onClick={() => setSelectedWord(item)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${colorClass} ${
                selectedWord?.word === item.word ? 'ring-2 ring-primary scale-105 shadow-md' : 'hover:scale-105'
              }`}
            >
              <span>{item.word}</span>
              {hasLongPause && <Clock className="h-3 w-3 text-rose-400 animate-pulse" />}
              <span className="text-[10px] opacity-75 font-mono">{item.score}%</span>
            </button>
          )
        })}
      </div>

      {/* Selected Word Details Popup */}
      {selectedWord && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-3xl glass border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xl font-extrabold text-foreground flex items-center gap-3">
                {selectedWord.word}
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-primary border border-white/10">
                  {selectedWord.phoneme}
                </span>
              </span>
              <span className="text-xs text-muted-foreground font-medium block mt-1">
                Syllable Breakdown: <span className="font-bold text-emerald-400">{selectedWord.syllables}</span>
              </span>
            </div>

            {/* Audio Synthesizer Button */}
            <button
              onClick={() => speakText(selectedWord.word, 0.75)}
              className="px-4 py-2 rounded-2xl bg-gradient-primary text-white font-bold text-xs shadow-neon-emerald flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Volume2 className="h-4 w-4" />
              Listen to Native Voice
            </button>
          </div>

          {/* Pause Hesitation Warning */}
          {(selectedWord.pauseDuration ?? 0) >= 3.0 && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold block text-sm">Long Pause Penalty: {selectedWord.pauseDuration} Seconds</span>
                <span>{selectedWord.tip}</span>
              </div>
            </div>
          )}

          {/* How to Pronounce Guidance */}
          <div className="p-4 rounded-2xl glass border border-primary/20 space-y-1.5 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">How to Pronounce & Fluency Guide</span>
            <p className="text-muted-foreground leading-relaxed font-medium">{selectedWord.howToPronounce}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
