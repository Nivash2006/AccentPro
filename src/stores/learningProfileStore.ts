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
}

const initialProfile: LearnerProfile = {
  id: 'user-default-1',
  cefrLevel: 'B2',
  targetExam: 'ielts',
  targetBand: 8.5,
  targetToeflScore: 105,
  targetGreScore: 325,
  skills: {
    reading: 78,
    listening: 82,
    writing: 70,
    speaking: 72,
    pronunciation: 76,
    fluency: 74,
    grammarAccuracy: 80,
    vocabMastery: 75,
  },
  weakGrammarTopics: ['Inversion', 'Conditionals Type 3', 'Subjunctive Mood', 'Articles with Geographical Names'],
  weakVocabCategories: ['Academic Words List (AWL)', 'GRE High Frequency'],
  completedMockTests: 3,
  evaluatedEssaysCount: 4,
  evaluatedSpeakingCount: 3,
  learnedWordsCount: 142,
  confidenceLevel: 82,
}

export const useLearningProfileStore = create<LearningProfileState>()(
  persist(
    (set, get) => ({
      profile: initialProfile,
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
        const res = computeExamReadiness({
          exam,
          mockTestScores: [75, 80],
          writingEvaluations: [70, 75],
          speakingEvaluations: [72],
          grammarQuizAccuracy: get().profile.skills.grammarAccuracy,
          vocabWordsMastered: get().profile.learnedWordsCount,
          studyMinutes: 380,
        })
        return res.score
      },
    }),
    { name: 'accent-pro-learning-profile' }
  )
)
