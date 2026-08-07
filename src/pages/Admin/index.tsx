import { motion } from 'framer-motion'
import { Users, GraduationCap, BookOpen, Shield, BarChart2, CheckCircle2 } from 'lucide-react'

export default function AdminPage() {
  const stats = [
    { label: 'Total Students', value: '1,247', change: '+14% this week' },
    { label: 'Active Today', value: '89', change: '+8%' },
    { label: 'Total Revenue', value: '₹24,500', change: 'Free Tier Ecosystem' },
    { label: 'Avg IELTS Band', value: '6.8', change: '+0.4 improvement' },
  ]

  const recentUsers = [
    { name: 'Arjun Sharma', email: 'arjun@example.com', exam: 'IELTS', band: '8.0' },
    { name: 'Priya Nair', email: 'priya@example.com', exam: 'GRE', band: '320' },
    { name: 'Rahul Verma', email: 'rahul@example.com', exam: 'TOEFL', band: '102' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Admin Management Console</h1>
          <p className="text-xs text-muted-foreground">Accent Pro Institute Dashboard</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="glass-card p-6 rounded-3xl space-y-2">
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
            <p className="text-3xl font-extrabold">{s.value}</p>
            <span className="text-[10px] text-emerald-400 font-semibold">{s.change}</span>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 rounded-3xl space-y-4">
        <h2 className="font-bold text-lg">Recent Registered Students</h2>
        <div className="space-y-3">
          {recentUsers.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl glass">
              <div>
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{u.exam}</span>
                <p className="text-xs text-muted-foreground mt-1">Target: {u.band}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
