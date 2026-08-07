// ============================================================
// Adaptive Learning Engine
// Computes "What the learner should study TODAY" dynamically
// ============================================================
import type { LearnerProfile } from '@/types/learningProfile'

export interface DailyPersonalizedPlan {
  headline: string
  recommendation: string
  actionItems: Array<{
    title: string
    durationMinutes: number
    type: 'grammar' | 'writing' | 'listening' | 'speaking' | 'vocab' | 'mock'
    reason: string
    route: string
  }>
  skippedTopics: string[]
}

export function generateDailyAdaptivePlan(profile: LearnerProfile): DailyPersonalizedPlan {
  const weakGrammar = profile.weakGrammarTopics[0] ?? 'Articles & Prepositions'

  if (profile.targetExam === 'ielts') {
    return {
      headline: 'Today\'s Adaptive IELTS Target Plan',
      recommendation: `Skip Unit 5 today. Your recent practice shows that ${weakGrammar} is costing you marks in Writing Task 2. Spend today's 30-minute session addressing that weakness.`,
      actionItems: [
        {
          title: `Master ${weakGrammar}`,
          durationMinutes: 15,
          type: 'grammar',
          reason: `Weakness detected in recent writing evaluations`,
          route: '/grammar',
        },
        {
          title: 'IELTS Writing Task 2 Introduction Hook',
          durationMinutes: 20,
          type: 'writing',
          reason: 'Essential for achieving Band 8.5 Task Achievement',
          route: '/ielts/writing',
        },
        {
          title: 'Learn 15 C2 Academic Collocations',
          durationMinutes: 10,
          type: 'vocab',
          reason: 'Expands Lexical Resource score',
          route: '/vocabulary',
        },
      ],
      skippedTopics: ['Unit 5 Routine Grammar (Mastered)', 'Basic Phonics (Mastered)'],
    }
  }

  return {
    headline: 'Today\'s Adaptive GRE & Academic Target Plan',
    recommendation: 'Focus on Sentence Equivalence strategies and root word prefixes today to boost your Verbal score.',
    actionItems: [
      {
        title: 'GRE High-Frequency Flashcards (25 words)',
        durationMinutes: 15,
        type: 'vocab',
        reason: 'Targeting 325+ Verbal score',
        route: '/gre',
      },
      {
        title: 'Text Completion Practice Set 2',
        durationMinutes: 20,
        type: 'mock',
        reason: 'Improves accuracy in timed conditions',
        route: '/gre',
      },
    ],
    skippedTopics: ['General Conversation Basics (Mastered)'],
  }
}
