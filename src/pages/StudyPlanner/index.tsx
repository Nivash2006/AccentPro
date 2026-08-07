import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, CheckCircle2, Clock, Sparkles } from 'lucide-react'

export default function StudyPlannerPage() {
  const schedule = [
    { day: 'Monday', task: 'IELTS Listening Practice Test 1', duration: '45 mins', status: 'Completed' },
    { day: 'Tuesday', task: 'Vocabulary Flashcards — 20 Words', duration: '30 mins', status: 'Completed' },
    { day: 'Wednesday', task: 'IELTS Task 2 Essay Writing', duration: '60 mins', status: 'Pending' },
    { day: 'Thursday', task: 'Speaking Cue Card AI Simulation', duration: '30 mins', status: 'Pending' },
    { day: 'Friday', task: 'Grammar & Tenses Review', duration: '40 mins', status: 'Pending' },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Adaptive AI Study Planner</h1>
            <p className="text-xs text-muted-foreground">Personalized schedule based on your weak areas</p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-2xl bg-gradient-ai text-white font-bold text-sm shadow-neon-purple flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Re-generate AI Plan
        </button>
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h2 className="font-bold text-lg">Weekly Schedule Overview</h2>
        <div className="space-y-3">
          {schedule.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl glass">
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-primary w-24">{item.day}</span>
                <div>
                  <p className="font-semibold text-sm">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.duration}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-muted-foreground'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
