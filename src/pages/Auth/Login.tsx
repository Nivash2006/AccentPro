import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Phone, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [method, setMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMessage(error.message)
        setLoading(false)
        return
      }

      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? email,
          full_name: data.user.user_metadata?.full_name ?? 'Learner',
          role: 'student',
          cefr_level: data.user.user_metadata?.cefr_level ?? 'A1',
          target_exam: data.user.user_metadata?.target_exam ?? 'ielts',
          target_band: data.user.user_metadata?.target_band ?? 8.5,
          xp: 0,
          level: 1,
          streak_days: 0,
          last_activity: new Date().toISOString(),
          preferred_language: 'en',
          created_at: data.user.created_at,
        })
        navigate('/dashboard')
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-purple-500/15 to-blue-500/15 blur-[120px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-card p-8 rounded-3xl border border-white/10 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center mb-4 shadow-neon-emerald">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-display font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your Accent Pro institute account</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-card/60 rounded-xl mb-6 border border-border">
          <button onClick={() => setMethod('email')} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${method === 'email' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
            Email & Password
          </button>
          <button onClick={() => setMethod('phone')} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${method === 'phone' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
            Phone OTP
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {method === 'email' ? (
            <>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="student@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+91 98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/50 border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Enter 6-digit OTP</label>
                  <input type="text" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} placeholder="123456" className="w-full text-center tracking-widest text-lg font-mono py-3 rounded-xl bg-card/50 border border-border focus:outline-none focus:border-primary transition-colors" />
                </div>
              )}

              {!otpSent && (
                <button type="button" onClick={() => setOtpSent(true)} className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors">
                  Send Verification OTP
                </button>
              )}
            </>
          )}

          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            {loading ? 'Signing In...' : 'Sign In to Account'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register Here
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
