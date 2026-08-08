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
  resetProgress: () => void
}

const defaultProgress = (moduleName: Module, total = 20): Progress => ({
  user_id: '',
  module: moduleName,
  completed_lessons: 0,
  total_lessons: total,
  score: 0,
  last_updated: new Date().toISOString(),
})

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {
        foundation: defaultProgress('foundation', 24),
        ielts: defaultProgress('ielts', 40),
        toefl: defaultProgress('toefl', 30),
        gre: defaultProgress('gre', 25),
        campus: defaultProgress('campus', 20),
        corporate: defaultProgress('corporate', 15),
        interview: defaultProgress('interview', 18),
      },
      totalStudyMinutes: 0,
      weeklyStudyMinutes: 0,
      overallBand: 5.5,
      toeflPrediction: 65,
      grePrediction: 140,
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
      resetProgress: () =>
        set({
          progress: {
            foundation: defaultProgress('foundation', 24),
            ielts: defaultProgress('ielts', 40),
            toefl: defaultProgress('toefl', 30),
            gre: defaultProgress('gre', 25),
            campus: defaultProgress('campus', 20),
            corporate: defaultProgress('corporate', 15),
            interview: defaultProgress('interview', 18),
          },
          totalStudyMinutes: 0,
          weeklyStudyMinutes: 0,
          overallBand: 5.5,
          toeflPrediction: 65,
          grePrediction: 140,
        }),
    }),
    { name: 'accent-pro-progress' }
  )
)
