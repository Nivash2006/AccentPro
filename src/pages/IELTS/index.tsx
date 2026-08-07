import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Headphones, BookOpen, PenTool, Mic, Award, ArrowRight, ShieldCheck } from 'lucide-react'
import { computeExamReadiness } from '@/lib/ai/readiness'

export default function IELTSHub() {
  const readiness = computeExamReadiness({
    exam: 'ielts',
    mockTestScores: [75, 80],
    writingEvaluations: [70, 75],
    speakingEvaluations: [72],
    grammarQuizAccuracy: 80,
    vocabWordsMastered: 142,
    studyMinutes: 380,
  })

  const skills = [
    { title: 'Listening', desc: '40 questions across 4 audio sections with native accents.', icon: Headphones, href: '/ielts/listening', band: '7.5', color: 'from-blue-500 to-cyan-500' },
    { title: 'Reading', desc: 'Academic & General texts with timed exam simulations.', icon: BookOpen, href: '/ielts/reading', band: '7.0', color: 'from-emerald-500 to-teal-500' },
    { title: 'Writing', desc: 'Task 1 (Graphs) & Task 2 (Essays) with AI Band 9 evaluation.', icon: PenTool, href: '/ielts/writing', band: '6.0', color: 'from-purple-500 to-pink-500' },
    { title: 'Speaking', desc: 'Part 1, 2, 3 voice analysis with AI examiner feedback.', icon: Mic, href: '/ielts/speaking', band: '6.5', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Exam Banner */}
      <div className="glass-card p-8 rounded-3xl border border-white/10 bg-gradient-hero text-center max-w-4xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          IELTS Masterclass
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
          IELTS <span className="text-gradient-gold">Band 9 Preparation</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Complete exam preparation environment modeled after British Council & IDP standards.
        </p>
      </div>

      {/* Exam Readiness Card */}
      <div className="glass-card p-6 rounded-3xl border border-emerald-500/30 space-y-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h2 className="font-bold text-lg">Official IELTS Exam Readiness Rating</h2>
          </div>
          <span className="text-2xl font-extrabold text-emerald-400">{readiness.score}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${readiness.score}%` }} />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed glass p-3.5 rounded-xl border border-emerald-500/20">
          💡 <strong>AI Advisor Recommendation:</strong> {readiness.advice}
        </p>
      </div>

      {/* Skill Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <Link key={skill.title} to={skill.href} className="glass-card p-8 rounded-3xl card-hover block border border-white/10 group relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-gradient-gold">
                  Band {skill.band}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-2">{skill.title} Section</h2>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{skill.desc}</p>

              <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Start Practice Tests
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
