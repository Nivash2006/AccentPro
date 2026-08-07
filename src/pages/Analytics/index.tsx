import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, BookOpen, Mic, PenTool, Award, ShieldCheck } from 'lucide-react'

const bandTrendData = [
  { week: 'Wk 1', band: 6.0, accuracy: 62 },
  { week: 'Wk 2', band: 6.5, accuracy: 68 },
  { week: 'Wk 3', band: 7.0, accuracy: 75 },
  { week: 'Wk 4', band: 7.5, accuracy: 82 },
  { week: 'Wk 5', band: 8.0, accuracy: 88 },
]

const skillAccuracyData = [
  { skill: 'Reading', accuracy: 88 },
  { skill: 'Listening', accuracy: 92 },
  { skill: 'Writing', accuracy: 78 },
  { skill: 'Speaking', accuracy: 82 },
  { skill: 'Grammar', accuracy: 85 },
  { skill: 'Vocab', accuracy: 80 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-neon-emerald">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Learning Analytics & Band Growth</h1>
          <p className="text-xs text-muted-foreground">Detailed metrics tracking vocabulary, grammar accuracy, and score trends over time</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chart 1: Band Improvement Trend */}
        <div className="glass-ultra p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-400" /> IELTS Band Progress Over Time
            </h3>
            <span className="text-xs font-semibold text-emerald-400">Band 6.0 → 8.0</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bandTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis domain={[5, 9]} stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0E1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="band" stroke="#00F5A0" strokeWidth={3} dot={{ r: 6, fill: '#00F5A0' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Skill Accuracy Breakdown */}
        <div className="glass-ultra p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" /> Skill Accuracy (%) Breakdown
            </h3>
            <span className="text-xs font-semibold text-cyan-400">Avg Accuracy: 84%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="skill" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={{ background: '#0E1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="accuracy" fill="#00D2FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
