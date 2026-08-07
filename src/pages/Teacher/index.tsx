import { motion } from 'framer-motion'
import { UserCheck, Video, FileText, Plus, BookOpen } from 'lucide-react'

export default function TeacherPage() {
  const classes = [
    { title: 'IELTS Writing Task 2 Strategy Live', time: 'Today, 6:00 PM', enrolled: 45, platform: 'Zoom' },
    { title: 'GRE Vocabulary High Frequency Masterclass', time: 'Tomorrow, 5:00 PM', enrolled: 32, platform: 'Google Meet' },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Teacher Portal</h1>
            <p className="text-xs text-muted-foreground">Manage courses, assignments, and live classes</p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Schedule Live Class
        </button>
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h2 className="font-bold text-lg">Upcoming Live Sessions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {classes.map((cls, i) => (
            <div key={i} className="p-6 rounded-2xl glass space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">{cls.platform}</span>
                <span className="text-xs text-muted-foreground">{cls.enrolled} Students Enrolled</span>
              </div>
              <h3 className="font-bold text-base">{cls.title}</h3>
              <p className="text-xs text-muted-foreground">{cls.time}</p>
              <button className="w-full py-2.5 rounded-xl bg-primary text-white font-semibold text-xs mt-2">Start Class Session</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
