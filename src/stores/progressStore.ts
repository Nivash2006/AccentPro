import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Progress, Module, Skill, IELTSBand } from '@/types'

interface ProgressState {
  progress: Record<string, Progress>
  totalStudyMinutes: number
  weeklyStudyMinutes: number
  overallBand: IELTSBand
  toeflPrediction: number
  grePrediction: number
  updateProgress: (module: Module, skill?: Skill, data?: Partial<Progress>) => void
  addStudyTime: (minutes: number) => void
}

const defaultProgress = (): Progress => ({
  user_id: '',
  module: 'foundation',
  completed_lessons: 0,
  total_lessons: 20,
  score: 0,
  last_updated: new Date().toISOString(),
})

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {
        foundation: { ...defaultProgress(), module: 'foundation', total_lessons: 24, completed_lessons: 6, score: 72 },
        ielts: { ...defaultProgress(), module: 'ielts', total_lessons: 40, completed_lessons: 12, score: 65, band_prediction: 6.5 },
        toefl: { ...defaultProgress(), module: 'toefl', total_lessons: 30, completed_lessons: 4, score: 58 },
        gre: { ...defaultProgress(), module: 'gre', total_lessons: 25, completed_lessons: 2, score: 45 },
        campus: { ...defaultProgress(), module: 'campus', total_lessons: 20, completed_lessons: 0, score: 0 },
        corporate: { ...defaultProgress(), module: 'corporate', total_lessons: 15, completed_lessons: 0, score: 0 },
        interview: { ...defaultProgress(), module: 'interview', total_lessons: 18, completed_lessons: 0, score: 0 },
      },
      totalStudyMinutes: 1240,
      weeklyStudyMinutes: 180,
      overallBand: 6.5,
      toeflPrediction: 88,
      grePrediction: 152,
      updateProgress: (module, _skill, data) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [module]: { ...state.progress[module], ...data, last_updated: new Date().toISOString() },
          },
        })),
      addStudyTime: (minutes) =>
        set((state) => ({
          totalStudyMinutes: state.totalStudyMinutes + minutes,
          weeklyStudyMinutes: state.weeklyStudyMinutes + minutes,
        })),
    }),
    { name: 'accent-pro-progress' }
  )
)
