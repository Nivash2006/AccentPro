import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Sparkles, Award, ArrowRight, BookOpen, Bot, Headphones, PenTool,
  CheckCircle2, Flame, Users, Shield, Zap, Globe, Star, ChevronRight,
  Mic, Play, Volume2, TrendingUp, Check, HeartHandshake, Unlock
} from 'lucide-react'

export default function Landing() {
  const { t } = useTranslation()

  const stats = [
    { value: '50,000+', label: 'Active Learners Worldwide' },
    { value: '+2.5', label: 'Average IELTS Band Boost' },
    { value: '10,000+', label: 'AI Voice & Essay Practice Lessons' },
    { value: '98.4%', label: 'AI Evaluation Precision' },
  ]

  const features = [
    {
      title: '24×7 AI Personal Tutor',
      desc: 'Real-time conversational mentor adapting to your grammar gaps and memory curve.',
      icon: Bot,
      color: 'from-emerald-500 to-cyan-500',
      glow: 'glow-emerald',
    },
    {
      title: 'IELTS Band 9 Masterclass',
      desc: 'Complete coaching for Listening, Reading, Writing Task 1 & 2, and Speaking Part 1–3.',
      icon: Headphones,
      color: 'from-blue-500 to-indigo-500',
      glow: 'glow-blue',
    },
    {
      title: 'AI Speech & Accent Coach',
      desc: 'Live voice wave evaluation for pronunciation, fluency, and discourse markers.',
      icon: Mic,
      color: 'from-purple-500 to-pink-500',
      glow: 'glow-purple',
    },
    {
      title: 'Instant Essay Band Grader',
      desc: 'Deep criteria evaluation across Task Achievement, Coherence, Lexical Resource, & Grammar.',
      icon: PenTool,
      color: 'from-amber-500 to-orange-500',
      glow: 'glow-solar',
    },
    {
      title: 'Spaced Repetition Vocab',
      desc: 'CEFR, IELTS, TOEFL & GRE word lists locked into long-term memory.',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-500',
      glow: 'glow-purple',
    },
    {
      title: 'TOEFL & GRE Modules',
      desc: 'Targeted preparation for global university admissions and higher education.',
      icon: Award,
      color: 'from-emerald-500 to-teal-500',
      glow: 'glow-emerald',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B0F19] text-foreground overflow-x-hidden relative">
      {/* Background Mesh Light Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none animate-ambient-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none animate-ambient-pulse" />

      {/* Top Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-ultra border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon-emerald">
              <span className="text-white font-extrabold text-xl">A</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-gradient-emerald">Accent Pro</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                AI Institute
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2.5 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald hover:opacity-90 transition-opacity flex items-center gap-2">
              Start Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-neon-emerald">
              <Sparkles className="h-4 w-4" />
              #1 AI English Coaching Institute for IELTS Band 8.5–9.0
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.1]">
              Score <span className="text-gradient-solar">Band 9 in IELTS</span> & Master Global English
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Personalized coaching for IELTS, TOEFL, GRE Verbal, Campus Placements, Corporate Communication, and HR Interviews powered by next-gen 24×7 AI.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/register" className="px-8 py-4 rounded-2xl bg-gradient-primary text-white font-extrabold text-base shadow-neon-emerald hover:scale-105 transition-all flex items-center gap-3">
                Begin AI Assessment
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/dashboard" className="px-8 py-4 rounded-2xl glass-ultra border border-white/10 text-foreground font-bold text-base hover:bg-white/5 transition-all flex items-center gap-2">
                Explore Demo Institute
              </Link>
            </motion.div>

            {/* Social Proof Tags */}
            <div className="flex items-center gap-6 pt-4 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> CEFR C1–C2 Aligned</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Adaptive Learning Engine</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> British Council / IDP Aligned</span>
            </div>
          </div>

          {/* Hero Live Interactive AI Demo Widget (Right 5 Cols) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-5">
            <div className="glass-ultra p-6 rounded-3xl border border-emerald-500/30 relative space-y-5 glow-emerald">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center text-white shadow-neon-purple">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">AI Voice Examiner</h3>
                    <p className="text-[10px] text-emerald-400 font-semibold">Live Speech Analysis</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs border border-emerald-500/40">
                  Band 8.5 Predicted
                </span>
              </div>

              {/* Speech Wave Simulation */}
              <div className="p-4 rounded-2xl glass border border-white/10 space-y-3">
                <p className="text-xs text-muted-foreground italic">
                  "Describe a memorable journey you took recently..."
                </p>
                <div className="flex items-center justify-center gap-1.5 h-12">
                  {[40, 75, 100, 60, 90, 45, 80, 100, 65, 85, 50, 95, 70].map((h, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: idx * 0.08 }}
                      className="w-1.5 rounded-full bg-gradient-primary"
                    />
                  ))}
                </div>
              </div>

              {/* Criteria Ratings */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl glass border border-white/5 space-y-1">
                  <span className="text-muted-foreground text-[10px]">Pronunciation</span>
                  <p className="font-bold text-emerald-400 text-sm">94% Clear</p>
                </div>
                <div className="p-3 rounded-xl glass border border-white/5 space-y-1">
                  <span className="text-muted-foreground text-[10px]">Fluency & Pacing</span>
                  <p className="font-bold text-cyan-400 text-sm">90% Natural</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/10 bg-card/20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gradient-emerald">{stat.value}</h3>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI-Powered Education Framework Banner */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="glass-ultra p-10 rounded-3xl border border-emerald-500/40 text-center space-y-4 glow-emerald">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary mx-auto flex items-center justify-center text-white shadow-neon-emerald">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-display font-extrabold text-foreground">
            Pedagogically Structured AI Learning
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            Accent Pro combines modern cognitive science, spaced repetition, and adaptive AI recommendation engines to deliver measurable score gains in IELTS, TOEFL, and GRE.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs font-semibold text-emerald-400">
            <span>✓ Complete IELTS, TOEFL & GRE Curriculum</span>
            <span>✓ AI Essay & Voice Speaking Evaluations</span>
            <span>✓ Exam-Style Timed Simulations</span>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="pb-24 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold">
            Everything You Need for <span className="text-gradient-emerald">Band 9 Fluency</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Built with modern pedagogical frameworks and AI-driven speech evaluation to guarantee rapid score improvement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <motion.div key={i} whileHover={{ y: -6 }} className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 bg-card/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="font-bold text-sm text-foreground">Accent Pro AI English Institute</span>
          </div>
          <p>© 2026 Accent Pro. AI Institute for Global Learners.</p>
        </div>
      </footer>
    </div>
  )
}
