import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearnerProfile, AdvisorAnalysis, ExamType } from '@/types/learningProfile'
import { computeExamReadiness } from '@/lib/ai/readiness'

interface LearningProfileState {
  profile: LearnerProfile
  advisorAnalysis: AdvisorAnalysis | null
  updateSkills: (skills: Partial<LearnerProfile['skills']>) => void
  addWeakGrammarTopic: (topic: string) => void
  removeWeakGrammarTopic: (topic: string) => void
  setAdvisorAnalysis: (analysis: AdvisorAnalysis) => void
  getReadiness: (exam: ExamType) => number
  resetProfile: () => void
}

const freshProfile: LearnerProfile = {
  id: 'user-fresh-1',
  cefrLevel: 'A1',
  targetExam: 'ielts',
  targetBand: 8.5,
  targetToeflScore: 100,
  targetGreScore: 320,
  skills: {
    reading: 0,
    listening: 0,
    writing: 0,
    speaking: 0,
    pronunciation: 0,
    fluency: 0,
    grammarAccuracy: 0,
    vocabMastery: 0,
  },
  weakGrammarTopics: [],
  weakVocabCategories: [],
  completedMockTests: 0,
  evaluatedEssaysCount: 0,
  evaluatedSpeakingCount: 0,
  learnedWordsCount: 0,
  confidenceLevel: 0,
}

export const useLearningProfileStore = create<LearningProfileState>()(
  persist(
    (set, get) => ({
      profile: freshProfile,
      advisorAnalysis: null,
      updateSkills: (newSkills) =>
        set((state) => ({
          profile: {
            ...state.profile,
            skills: { ...state.profile.skills, ...newSkills },
          },
        })),
      addWeakGrammarTopic: (topic) =>
        set((state) => ({
          profile: {
            ...state.profile,
            weakGrammarTopics: Array.from(new Set([...state.profile.weakGrammarTopics, topic])),
          },
        })),
      removeWeakGrammarTopic: (topic) =>
        set((state) => ({
          profile: {
            ...state.profile,
            weakGrammarTopics: state.profile.weakGrammarTopics.filter((t) => t !== topic),
          },
        })),
      setAdvisorAnalysis: (advisorAnalysis) => set({ advisorAnalysis }),
      getReadiness: (exam) => {
        const p = get().profile
        if (p.completedMockTests === 0 && p.learnedWordsCount === 0) return 0
        const res = computeExamReadiness({
          exam,
          mockTestScores: [],
          writingEvaluations: [],
          speakingEvaluations: [],
          grammarQuizAccuracy: p.skills.grammarAccuracy,
          vocabWordsMastered: p.learnedWordsCount,
          studyMinutes: 0,
        })
        return res.score
      },
      resetProfile: () => {
        try { localStorage.removeItem('accent-pro-learning-profile') } catch {}
        set({ profile: freshProfile, advisorAnalysis: null })
      },
    }),
    { name: 'accent-pro-learning-profile' }
  )
)
