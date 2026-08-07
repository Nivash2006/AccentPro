import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, CheckCircle2, Award, Flame } from 'lucide-react'

const calendarDays = [
  { day: 'Mon', date: 'Oct 12', task: 'Writing Task 2 Practice', type: 'writing', done: true },
  { day: 'Tue', date: 'Oct 13', task: 'Vocabulary Flashcard Spaced Revision', type: 'vocab', done: true },
  { day: 'Wed', date: 'Oct 14', task: 'IELTS Academic Reading Simulation', type: 'mock', done: false },
  { day: 'Thu', date: 'Oct 15', task: 'Inversion & Complex Grammar Session', type: 'grammar', done: false },
  { day: 'Fri', date: 'Oct 16', task: 'Speaking Part 2 Cue Card Voice Practice', type: 'speaking', done: false },
  { day: 'Sat', date: 'Oct 17', task: 'Full Exam-Style Mock Simulation', type: 'mock', done: false },
  { day: 'Sun', date: 'Oct 18', task: 'Rest & Strategic Revision', type: 'rest', done: false },
]

export default function StudyCalendarPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center text-white shadow-neon-purple">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">Exam Date Countdown Study Calendar</h1>
            <p className="text-xs text-muted-foreground">Automated daily study path synchronized to your target exam date</p>
          </div>
        </div>

        <div className="px-5 py-3 rounded-2xl glass border border-amber-500/30 text-center">
          <p className="text-xs text-muted-foreground uppercase font-bold">Exam Countdown</p>
          <p className="text-xl font-extrabold text-gradient-solar">45 Days Remaining</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-7 gap-4">
        {calendarDays.map((d, i) => (
          <div key={i} className={`p-4 rounded-2xl glass-card flex flex-col justify-between space-y-3 ${d.done ? 'border-primary/40 bg-primary/5' : ''}`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-primary">{d.day}</span>
                <span className="text-[10px] text-muted-foreground">{d.date}</span>
              </div>
              <p className="font-bold text-xs text-foreground mt-2">{d.task}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[9px] uppercase px-2 py-0.5 rounded-md glass font-bold">{d.type}</span>
              {d.done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
