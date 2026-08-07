import type { CEFRLevel, IELTSBand } from '@/types'

export type ExamType = 'ielts' | 'toefl' | 'gre' | 'campus'

export interface SkillBreakdown {
  reading: number     // 0 - 100
  listening: number   // 0 - 100
  writing: number     // 0 - 100
  speaking: number    // 0 - 100
  pronunciation: number
  fluency: number
  grammarAccuracy: number
  vocabMastery: number
}

export interface ExamReadiness {
  exam: ExamType
  score: number         // 0 - 100 %
  predictedBand?: IELTSBand
  predictedToefl?: number
  predictedGre?: number
  advice: string
  lastUpdated: string
  breakdown: {
    mockTestsWeight: number
    evaluationsWeight: number
    grammarWeight: number
    vocabWeight: number
    practiceVolumeWeight: number
  }
}

export interface ExternalResource {
  id: string
  title: string
  provider: 'British Council' | 'IDP IELTS' | 'ETS TOEFL' | 'ETS GRE' | 'Cambridge English' | 'Academic Word List' | 'YouTube Education' | 'BBC Learning'
  url: string
  type: 'video' | 'article' | 'pdf' | 'interactive' | 'official_guide'
  description: string
  whyRecommended: string
  estimatedMinutes: number
}

export interface StudyPathStep {
  stepIndex: number
  topic: string
  objective: string
  estimatedTimeMinutes: number
  difficulty: CEFRLevel
  prerequisites: string[]
  recommendedResource?: ExternalResource
  actionType: 'grammar_lesson' | 'vocab_review' | 'essay_practice' | 'speaking_simulation' | 'mock_test' | 'external_study'
  completed: boolean
}

export interface AdvisorAnalysis {
  status: 'sufficient' | 'additional_recommended'
  summary: string
  overallConfidence: number // 0-100%
  readinessScores: Record<ExamType, ExamReadiness>
  knowledgeGaps: Array<{
    topic: string
    category: 'grammar' | 'vocab' | 'writing' | 'speaking' | 'reading' | 'listening'
    importance: 'high' | 'medium' | 'low'
    explanation: string
    prerequisites: string[]
  }>
  recommendedResources: ExternalResource[]
  studyPath: StudyPathStep[]
  evaluatedAt: string
}

export interface LearnerProfile {
  id: string
  cefrLevel: CEFRLevel
  targetExam: ExamType
  targetBand: IELTSBand
  targetToeflScore: number
  targetGreScore: number
  targetExamDate?: string
  skills: SkillBreakdown
  weakGrammarTopics: string[]
  weakVocabCategories: string[]
  completedMockTests: number
  evaluatedEssaysCount: number
  evaluatedSpeakingCount: number
  learnedWordsCount: number
  confidenceLevel: number // 0 - 100%
}
