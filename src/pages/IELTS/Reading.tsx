import { motion } from 'framer-motion'
import { BookOpen, Clock, AlignLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const samplePassage = `The concept of sustainable architecture has gained significant momentum in recent decades. 
As environmental concerns have moved to the forefront of global discourse, architects and urban planners 
have increasingly sought to design buildings that minimize their ecological footprint while maximizing 
functionality and aesthetic appeal.

Sustainable architecture encompasses a wide range of practices, from the use of renewable energy sources 
such as solar panels and wind turbines to the incorporation of natural ventilation systems that reduce 
the need for artificial air conditioning. Green roofs, which are covered with vegetation, help insulate 
buildings and reduce urban heat island effects.`

export default function IELTSReading() {
  const [activeType, setActiveType] = useState<'academic' | 'general'>('academic')

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">IELTS Reading</h1>
              <p className="text-muted-foreground">3 passages · 40 questions · 60 minutes</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(['academic', 'general'] as const).map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${activeType === t ? 'bg-primary text-white' : 'glass-card text-muted-foreground'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Sample passage */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><AlignLeft className="h-4 w-4 text-green-400" />Passage 1</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">Environmental Science</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{samplePassage}</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Questions 1–13</h3>
            {[
              'The writer suggests that sustainable architecture has become more popular because...',
              'Green roofs are beneficial because they...',
              'According to the passage, architects are increasingly focused on...',
            ].map((q, i) => (
              <div key={i} className="glass-card p-4 rounded-xl">
                <p className="text-sm font-medium mb-2">{i + 1}. {q}</p>
                {['reducing costs', 'minimizing ecological impact', 'improving aesthetics', 'meeting regulations'].map((opt, j) => (
                  <label key={j} className="flex items-center gap-2 text-sm text-muted-foreground py-1 cursor-pointer hover:text-foreground transition-colors">
                    <input type="radio" name={`q${i}`} className="accent-emerald-500" />
                    {opt}
                  </label>
                ))}
              </div>
            ))}
            <button className="w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold hover:opacity-90 transition-opacity">
              Submit & Get AI Feedback
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
