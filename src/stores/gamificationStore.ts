import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { xpToLevel } from '@/lib/utils'
import type { Badge } from '@/types'

const BADGES: Badge[] = [
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', color: '#10b981', earned: true, earned_at: '2026-08-01', requirement: 'Complete 1 lesson' },
  { id: 'streak-7', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', color: '#f59e0b', earned: true, earned_at: '2026-08-07', requirement: '7 day streak' },
  { id: 'vocab-100', name: 'Word Wizard', description: 'Learn 100 vocabulary words', icon: '📚', color: '#8b5cf6', earned: false, requirement: 'Learn 100 words' },
  { id: 'essay-5', name: 'Essay Expert', description: 'Write 5 evaluated essays', icon: '✍️', color: '#3b5bdb', earned: false, requirement: 'Write 5 essays' },
  { id: 'speaking-pro', name: 'Speaking Pro', description: 'Complete 10 speaking sessions', icon: '🎤', color: '#ec4899', earned: false, requirement: '10 speaking sessions' },
  { id: 'band-7', name: 'Band 7 Achiever', description: 'Achieve Band 7 prediction', icon: '⭐', color: '#f59e0b', earned: false, requirement: 'Reach Band 7 prediction' },
  { id: 'band-8', name: 'Band 8 Master', description: 'Achieve Band 8 prediction', icon: '🏆', color: '#eab308', earned: false, requirement: 'Reach Band 8 prediction' },
  { id: 'streak-30', name: 'Monthly Maverick', description: '30-day learning streak', icon: '🦅', color: '#06b6d4', earned: false, requirement: '30 day streak' },
  { id: 'community-10', name: 'Community Star', description: 'Post 10 forum answers', icon: '💬', color: '#10b981', earned: false, requirement: '10 forum posts' },
  { id: 'perfect-score', name: 'Perfectionist', description: 'Score 100% on any test', icon: '💎', color: '#a855f7', earned: false, requirement: '100% test score' },
]

interface GamificationState {
  xp: number
  level: number
  xpProgress: number
  nextLevelXP: number
  streakDays: number
  lastActivityDate: string
  badges: Badge[]
  weeklyXP: number
  dailyGoalMinutes: number
  dailyCompletedMinutes: number
  addXP: (amount: number, reason?: string) => void
  checkAndUpdateStreak: () => void
  earnBadge: (badgeId: string) => void
  addStudyMinutes: (minutes: number) => void
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      xp: 2840,
      level: 6,
      xpProgress: 65,
      nextLevelXP: 3600,
      streakDays: 7,
      lastActivityDate: new Date().toISOString().split('T')[0],
      badges: BADGES,
      weeklyXP: 420,
      dailyGoalMinutes: 30,
      dailyCompletedMinutes: 18,
      addXP: (amount) => {
        const newXP = get().xp + amount
        const { level, progress, nextLevelXP } = xpToLevel(newXP)
        set({
          xp: newXP,
          level,
          xpProgress: progress,
          nextLevelXP,
          weeklyXP: get().weeklyXP + amount,
        })
      },
      checkAndUpdateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        const last = get().lastActivityDate
        if (last === today) return
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        if (last === yesterday) {
          set({ streakDays: get().streakDays + 1, lastActivityDate: today })
        } else {
          set({ streakDays: 1, lastActivityDate: today })
        }
      },
      earnBadge: (badgeId) =>
        set((state) => ({
          badges: state.badges.map((b) =>
            b.id === badgeId ? { ...b, earned: true, earned_at: new Date().toISOString() } : b
          ),
        })),
      addStudyMinutes: (minutes) =>
        set((state) => ({
          dailyCompletedMinutes: state.dailyCompletedMinutes + minutes,
        })),
    }),
    { name: 'accent-pro-gamification' }
  )
)
