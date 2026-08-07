import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Volume2, CheckCircle2, RotateCw, Sparkles, Star } from 'lucide-react'
import { getDailyVocab } from '@/lib/ai'
import { useGamificationStore } from '@/stores/gamificationStore'

export default function VocabularyPage() {
  const [words, setWords] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showXpToast, setShowXpToast] = useState(false)
  const { addXP } = useGamificationStore()

  useEffect(() => {
    getDailyVocab().then(data => setWords(data))
  }, [])

  if (words.length === 0) return <div className="p-8 text-center text-muted-foreground">Loading vocabulary flashcards...</div>

  const current = words[currentIndex]

  const handleGotIt = () => {
    addXP(10)
    setShowXpToast(true)
    setTimeout(() => setShowXpToast(false), 1500)
    setFlipped(false)
    setCurrentIndex((currentIndex + 1) % words.length)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 relative">
      {/* XP Toast Notification */}
      {showXpToast && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed top-20 right-8 z-50 px-4 py-2 rounded-2xl bg-gradient-primary text-white font-extrabold text-sm shadow-neon-emerald flex items-center gap-2">
          <Star className="h-4 w-4 fill-current text-yellow-300" />
          +10 XP Earned!
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Vocabulary Flashcards</h1>
          <p className="text-xs text-muted-foreground">Spaced Repetition System • Word {currentIndex + 1} of {words.length}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          CEFR C1-C2 Master Words
        </div>
      </div>

      {/* Flashcard container */}
      <div className="perspective-1000 min-h-[320px] flex items-center justify-center">
        <motion.div
          onClick={() => setFlipped(!flipped)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg h-80 glass-ultra rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer border border-white/10 relative shadow-2xl glow-emerald"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {!flipped ? (
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase text-muted-foreground tracking-widest">{current.pronunciation}</span>
              <h2 className="text-4xl font-extrabold text-gradient-emerald">{current.word}</h2>
              <p className="text-xs text-muted-foreground mt-4">(Click to reveal definition & example)</p>
            </div>
          ) : (
            <div className="space-y-4 [transform:rotateY(180deg)]">
              <h3 className="text-xl font-bold text-foreground">{current.word}</h3>
              <p className="text-sm font-medium leading-relaxed">{current.definition}</p>
              <p className="text-xs text-muted-foreground italic">"{current.example}"</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => { setFlipped(false); setCurrentIndex((currentIndex + 1) % words.length); }}
          className="px-6 py-3 rounded-2xl glass-card border border-white/10 text-sm font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
        >
          <RotateCw className="h-4 w-4" />
          Next Word
        </button>

        <button
          onClick={handleGotIt}
          className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Got It (+10 XP)
        </button>
      </div>
    </div>
  )
}
