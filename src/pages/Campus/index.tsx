import { motion } from 'framer-motion'
import { Briefcase, CheckCircle, PenTool, Users, MessageSquare, FileText, Mail, Target } from 'lucide-react'

const modules = [
  { title: 'Aptitude English', icon: Target, color: 'emerald', topics: ['Error Spotting', 'Fill in the Blanks', 'Sentence Correction', 'Reading Comprehension'], done: true },
  { title: 'Grammar for Placements', icon: CheckCircle, color: 'blue', topics: ['Articles', 'Prepositions', 'Subject-Verb Agreement', 'Tenses in Context'], done: false },
  { title: 'Email Writing', icon: Mail, color: 'purple', topics: ['Professional Email Format', 'Subject Lines', 'Formal vs Informal', 'Email Etiquette'], done: false },
  { title: 'Resume Vocabulary', icon: FileText, color: 'amber', topics: ['Action Verbs', 'Technical Terms', 'Achievement Language', 'Industry Keywords'], done: false },
  { title: 'Group Discussion', icon: Users, color: 'pink', topics: ['Initiation Phrases', 'Agreement/Disagreement', 'Topic Management', 'Concluding Remarks'], done: false },
  { title: 'HR Communication', icon: MessageSquare, color: 'cyan', topics: ['Introduce Yourself', 'Strengths/Weaknesses', 'Behavioural Questions', 'Salary Negotiation'], done: false },
]

export default function CampusPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Campus <span className="text-gradient-primary">Placement English</span></h1>
          <p className="text-muted-foreground mt-1">Ace your campus interviews and written communication rounds</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon
            return (
              <motion.div key={mod.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="glass-card p-5 rounded-2xl card-hover cursor-pointer">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${mod.color}-500/10 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${mod.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{mod.title}</h3>
                    {mod.done && <span className="text-xs text-emerald-400">✓ Completed</span>}
                  </div>
                </div>
                <ul className="space-y-1">
                  {mod.topics.map(topic => (
                    <li key={topic} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${mod.color}-400`} />
                      {topic}
                    </li>
                  ))}
                </ul>
                <button className={`mt-4 w-full py-2 rounded-lg text-xs font-medium bg-${mod.color}-500/10 text-${mod.color}-400 hover:bg-${mod.color}-500/20 transition-all`}>
                  {mod.done ? 'Review Module' : 'Start Module →'}
                </button>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
