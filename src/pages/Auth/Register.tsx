import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, CheckCircle2, Send, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useGamificationStore } from '@/stores/gamificationStore'
import { useProgressStore } from '@/stores/progressStore'
import { useLearningProfileStore } from '@/stores/learningProfileStore'
import { useMistakeMemoryStore } from '@/stores/mistakeMemoryStore'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const { clearSession } = useAuthStore()
  const { resetToBasics } = useGamificationStore()
  const { resetProgress } = useProgressStore()
  const { resetProfile } = useLearningProfileStore()
  const { resetMistakes } = useMistakeMemoryStore()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [targetExam, setTargetExam] = useState<'ielts' | 'toefl' | 'gre' | 'placement'>('ielts')
  const [targetBand, setTargetBand] = useState('8.5')
  const [loading, setLoading] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    // 1. Purge all local session stores
    clearSession()
    resetToBasics()
    resetProgress()
    resetProfile()
    resetMistakes()

    try {
      // 2. Call Supabase Auth signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            target_exam: targetExam,
            target_band: parseFloat(targetBand),
            cefr_level: 'A1',
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })

      if (error) {
        if (error.status === 429 || error.message.includes('rate limit')) {
          setErrorMessage('⚠️ Email Send Rate Limit Exceeded (429): Supabase free tier limits email sends per hour. Please wait 15-30 minutes before trying again, or disable "Confirm Email" in your Supabase Auth settings.')
        } else {
          setErrorMessage(error.message)
        }
        setLoading(false)
        return
      }

      // 3. Force sign out immediately so registration NEVER auto-logs in
      await supabase.auth.signOut()
      clearSession()
      resetToBasics()

      // 4. Display mandatory verification screen
      setVerificationSent(true)
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to register account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-purple-500/15 to-blue-500/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card p-8 rounded-3xl border border-white/10 relative z-10">
        {!verificationSent ? (
          <>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center mb-4 shadow-neon-emerald">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <h1 className="text-2xl font-display font-bold">Register Learner Account</h1>
              <p className="text-sm text-muted-foreground mt-1">Start from Level 1 basics towards Band 8.5+</p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium leading-relaxed flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegister} autoComplete="off" className="space-y-4">
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
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" autoComplete="new-password" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
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

              <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2">
                {loading ? 'Creating Account & Sending Email...' : 'Register Account'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              Already registered?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In Here
              </Link>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-neon-emerald">
              <Send className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-foreground">Verification Email Sent!</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We sent a confirmation link to <span className="font-bold text-primary">{email}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass border border-white/10 text-xs text-muted-foreground text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="h-4 w-4" /> Email Confirmation Required
              </div>
              <p className="leading-relaxed">
                Please open your email inbox (and check your Spam folder if needed), then click the <strong className="text-foreground">"Confirm Your Account"</strong> link.
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                After confirming your email, return here and sign in to start your level 1 lessons.
              </p>
            </div>

            <Link to="/login" className="block w-full py-3.5 rounded-xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity text-center">
              Proceed to Sign In
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
