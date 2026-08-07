import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Award, Play, CheckCircle2, BarChart2, ShieldAlert, RotateCcw } from 'lucide-react'

interface MockTest {
  id: string
  exam: 'IELTS' | 'TOEFL' | 'GRE'
  title: string
  durationMinutes: number
  sections: string[]
  totalQuestions: number
}

const availableMocks: MockTest[] = [
  {
    id: 'mock-ielts-1',
    exam: 'IELTS',
    title: 'Full IELTS Academic Mock Exam 1',
    durationMinutes: 160,
    sections: ['Listening (30m)', 'Reading (60m)', 'Writing (60m)', 'Speaking (14m)'],
    totalQuestions: 82,
  },
  {
    id: 'mock-toefl-1',
    exam: 'TOEFL',
    title: 'TOEFL iBT Full Test Simulation',
    durationMinutes: 120,
    sections: ['Reading (35m)', 'Listening (36m)', 'Speaking (16m)', 'Writing (29m)'],
    totalQuestions: 56,
  },
  {
    id: 'mock-gre-1',
    exam: 'GRE',
    title: 'GRE Verbal Reasoning Practice Test',
    durationMinutes: 60,
    sections: ['Text Completion', 'Sentence Equivalence', 'Reading Comprehension'],
    totalQuestions: 40,
  },
]

export default function MockTestsPage() {
  const [activeMock, setActiveMock] = useState<MockTest | null>(null)
  const [inProgress, setInProgress] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    let timer: any
    if (inProgress && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    } else if (inProgress && timeLeft === 0) {
      setInProgress(false)
      setCompleted(true)
    }
    return () => clearInterval(timer)
  }, [inProgress, timeLeft])

  const startTest = (mock: MockTest) => {
    setActiveMock(mock)
    setTimeLeft(mock.durationMinutes * 60)
    setInProgress(true)
    setCompleted(false)
  }

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs > 0 ? `${hrs}:` : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center text-white shadow-neon-purple">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Official Exam Mock Simulations</h1>
          <p className="text-xs text-muted-foreground">Realistic timed exam environments with section-wise AI diagnostics</p>
        </div>
      </div>

      {!inProgress && !completed && (
        <div className="grid md:grid-cols-3 gap-6">
          {availableMocks.map((mock) => (
            <div key={mock.id} className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between card-hover">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{mock.exam}</span>
                <h3 className="text-lg font-bold">{mock.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{mock.durationMinutes} Mins</span>
                  <span>{mock.totalQuestions} Questions</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Sections Included:</p>
                <div className="flex flex-wrap gap-1.5">
                  {mock.sections.map((sec) => (
                    <span key={sec} className="text-[10px] px-2 py-0.5 rounded-md glass text-foreground">{sec}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => startTest(mock)} className="w-full py-3 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Play className="h-4 w-4" /> Start Official Simulation
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Test Execution Screen */}
      {inProgress && activeMock && (
        <div className="glass-card p-8 rounded-3xl border border-primary/30 space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <div>
              <span className="text-xs font-bold text-primary">{activeMock.exam} Official Mock Mode</span>
              <h2 className="text-xl font-bold">{activeMock.title}</h2>
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 animate-pulse" />
              {formatTimer(timeLeft)}
            </div>
          </div>

          <div className="p-8 glass rounded-2xl space-y-4">
            <h3 className="font-bold text-base">Section 1: Academic Reading & Context Comprehension</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Read the following passage and answer the questions. The passage discusses ecological impacts of renewable urban infrastructure.
            </p>
            <div className="p-4 rounded-xl bg-card/60 border border-border text-sm space-y-3">
              <p className="font-medium">1. According to the text, what is the primary cause of urban heat island effects?</p>
              {['High building density', 'Absence of vegetative roofs', 'Vehicular emissions'].map((opt, i) => (
                <label key={i} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  <input type="radio" name="q1" className="accent-emerald-500" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setInProgress(false)} className="px-4 py-2 text-xs text-red-400 hover:underline">
              Exit Simulation
            </button>
            <button onClick={() => { setInProgress(false); setCompleted(true); }} className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald">
              Submit & Get AI Diagnostic
            </button>
          </div>
        </div>
      )}

      {/* Test Completion Diagnostic Report */}
      {completed && activeMock && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 rounded-3xl border border-emerald-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400">Mock Exam Complete</span>
              <h2 className="text-2xl font-bold">{activeMock.title} Diagnostic Report</h2>
            </div>
            <div className="text-center px-6 py-3 rounded-2xl bg-gradient-primary text-white font-extrabold text-2xl shadow-neon-emerald">
              {activeMock.exam === 'IELTS' ? 'Band 8.0' : activeMock.exam === 'TOEFL' ? '106/120' : '324/340'}
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Reading</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">88%</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Listening</p>
              <p className="text-lg font-bold text-blue-400 mt-1">92%</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Writing</p>
              <p className="text-lg font-bold text-purple-400 mt-1">78%</p>
            </div>
            <div className="p-4 rounded-2xl glass">
              <p className="text-xs text-muted-foreground">Speaking</p>
              <p className="text-lg font-bold text-orange-400 mt-1">80%</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-sm text-primary">AI Diagnostic Recommendation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed glass p-4 rounded-2xl">
              Your overall exam readiness is high. To push your score to IELTS Band 8.5–9.0, focus on varying your sentence structures in Writing Task 2 and reviewing advanced academic vocabulary in Reading Passage 3.
            </p>
          </div>

          <button onClick={() => { setCompleted(false); setActiveMock(null); }} className="px-6 py-3 rounded-2xl glass-card text-sm font-semibold hover:bg-white/5">
            Back to Mock Exam Catalog
          </button>
        </motion.div>
      )}
    </div>
  )
}
