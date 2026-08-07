import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Target, Award, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export default function Register() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [targetExam, setTargetExam] = useState<'ielts' | 'toefl' | 'gre' | 'placement'>('ielts')
  const [targetBand, setTargetBand] = useState('8.5')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({
      id: 'demo-user-123',
      email: email || 'student@accentpro.ai',
      full_name: fullName || 'New Student',
      role: 'student',
      cefr_level: 'B1',
      target_exam: targetExam,
      target_band: parseFloat(targetBand) as any,
      xp: 100,
      level: 1,
      streak_days: 1,
      last_activity: new Date().toISOString(),
      preferred_language: 'en',
      created_at: new Date().toISOString(),
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-purple-500/15 to-blue-500/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card p-8 rounded-3xl border border-white/10 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center mb-4 shadow-neon-emerald">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-display font-bold">Create Free Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Start your journey towards IELTS Band 9</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Primary Goal</label>
              <select value={targetExam} onChange={e => setTargetExam(e.target.value as any)} className="w-full px-3 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors">
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL</option>
                <option value="gre">GRE Verbal</option>
                <option value="placement">Campus Placement</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Target Band / Score</label>
              <select value={targetBand} onChange={e => setTargetBand(e.target.value)} className="w-full px-3 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors">
                <option value="9.0">Band 9.0</option>
                <option value="8.5">Band 8.5</option>
                <option value="8.0">Band 8.0</option>
                <option value="7.5">Band 7.5</option>
                <option value="7.0">Band 7.0</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2">
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Already registered?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
