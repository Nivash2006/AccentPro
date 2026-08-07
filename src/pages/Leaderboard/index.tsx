import { motion } from 'framer-motion'
import { Trophy, Flame, Star, Crown, Medal } from 'lucide-react'

const leaderboard = [
  { rank: 1, name: 'Arjun Sharma', avatar: 'A', xp: 9840, streak: 45, level: 18, badge: '🏆' },
  { rank: 2, name: 'Priya Nair', avatar: 'P', xp: 8920, streak: 38, level: 16, badge: '🥈' },
  { rank: 3, name: 'Rahul Verma', avatar: 'R', xp: 7650, streak: 29, level: 14, badge: '🥉' },
  { rank: 4, name: 'Sneha Reddy', avatar: 'S', xp: 6430, streak: 22, level: 12, badge: '' },
  { rank: 5, name: 'You', avatar: 'Y', xp: 2840, streak: 7, level: 6, badge: '', isMe: true },
  { rank: 6, name: 'Karthik M', avatar: 'K', xp: 2640, streak: 5, level: 5, badge: '' },
  { rank: 7, name: 'Divya P', avatar: 'D', xp: 2100, streak: 3, level: 5, badge: '' },
]

const rankColors: Record<number, string> = { 1: 'text-yellow-400', 2: 'text-gray-400', 3: 'text-amber-600' }

export default function LeaderboardPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <span className="text-gradient-gold">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">Weekly rankings reset every Monday</p>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-4 h-40">
          {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, i) => {
            const heights = ['h-28', 'h-36', 'h-24']
            const bgColors = ['bg-gray-500/20', 'bg-yellow-500/20', 'bg-amber-600/20']
            return (
              <motion.div key={user.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center ${heights[i]} w-24 ${bgColors[i]} rounded-t-2xl border-t border-x border-white/10 justify-start pt-3`}>
                <span className="text-2xl">{user.badge}</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold mt-1">{user.avatar}</div>
                <p className="text-xs font-medium mt-1 text-center leading-tight">{user.name}</p>
                <p className="text-xs text-muted-foreground">{(user.xp / 1000).toFixed(1)}K XP</p>
              </motion.div>
            )
          })}
        </div>

        {/* Full list */}
        <div className="space-y-2">
          {leaderboard.map((user, i) => (
            <motion.div key={user.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${(user as any).isMe ? 'glass-card border border-primary/30 bg-primary/5' : 'glass-card hover:bg-white/5'}`}>
              <span className={`w-8 text-center font-bold ${rankColors[user.rank] ?? 'text-muted-foreground'}`}>
                {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{user.name} {(user as any).isMe && <span className="text-xs text-primary">(You)</span>}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-400" />{user.streak}d</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />Lv {user.level}</span>
                </div>
              </div>
              <span className="font-bold text-primary">{user.xp.toLocaleString()} XP</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
