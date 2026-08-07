import { motion } from 'framer-motion'
import { TrendingUp, Mail, Presentation, Users, MessageCircle } from 'lucide-react'

const topics = [
  { title: 'Business Emails', icon: Mail, color: 'blue', count: '12 templates', desc: 'Professional email formats for every occasion' },
  { title: 'Presentation Skills', icon: Presentation, color: 'purple', count: '8 modules', desc: 'Structure, delivery, and slide language' },
  { title: 'Meeting English', icon: Users, color: 'emerald', count: '10 scenarios', desc: 'Agenda, minutes, action items vocabulary' },
  { title: 'Workplace Communication', icon: MessageCircle, color: 'amber', count: '15 lessons', desc: 'Emails, reports, memos, and feedback' },
]

export default function CorporatePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Corporate <span className="text-gradient-primary">English</span></h1>
          <p className="text-muted-foreground mt-1">Professional communication for the modern workplace</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {topics.map((t, i) => {
            const Icon = t.icon
            return (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-5 rounded-2xl card-hover cursor-pointer">
                <div className={`w-10 h-10 rounded-xl bg-${t.color}-500/10 flex items-center justify-center mb-3`}>
                  <Icon className={`h-5 w-5 text-${t.color}-400`} />
                </div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">{t.count}</span>
                <button className="block mt-3 w-full py-2 rounded-lg text-xs font-medium bg-white/5 hover:bg-primary/10 hover:text-primary transition-all">
                  Start Learning →
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
