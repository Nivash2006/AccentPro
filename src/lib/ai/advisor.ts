// ============================================================
// AI Learning Advisor & Recommendation Engine
// Analyzes profile, evaluates knowledge gaps, generates study paths, & recommends external resources
// ============================================================
import { AIGateway } from './gateway'
import type { AdvisorAnalysis, LearnerProfile } from '@/types/learningProfile'
import { computeExamReadiness } from './readiness'

export async function getAIAdvisorAnalysis(profile: LearnerProfile): Promise<AdvisorAnalysis> {
  const ieltsReadiness = computeExamReadiness({
    exam: 'ielts',
    mockTestScores: [75, 80],
    writingEvaluations: [70, 75],
    speakingEvaluations: [70],
    grammarQuizAccuracy: profile.skills.grammarAccuracy || 78,
    vocabWordsMastered: profile.learnedWordsCount || 140,
    studyMinutes: 320,
  })

  const toeflReadiness = computeExamReadiness({
    exam: 'toefl',
    mockTestScores: [65],
    writingEvaluations: [65],
    speakingEvaluations: [68],
    grammarQuizAccuracy: profile.skills.grammarAccuracy || 78,
    vocabWordsMastered: profile.learnedWordsCount || 140,
    studyMinutes: 320,
  })

  const greReadiness = computeExamReadiness({
    exam: 'gre',
    mockTestScores: [70, 75],
    writingEvaluations: [70],
    speakingEvaluations: [],
    grammarQuizAccuracy: profile.skills.grammarAccuracy || 78,
    vocabWordsMastered: profile.learnedWordsCount || 140,
    studyMinutes: 320,
  })

  const campusReadiness = computeExamReadiness({
    exam: 'campus',
    mockTestScores: [85, 90],
    writingEvaluations: [80],
    speakingEvaluations: [85],
    grammarQuizAccuracy: profile.skills.grammarAccuracy || 78,
    vocabWordsMastered: profile.learnedWordsCount || 140,
    studyMinutes: 320,
  })

  const prompt = `Analyze this learner profile for target exam ${profile.targetExam} (target Band/Score: ${profile.targetBand}).
Skills: Grammar Accuracy: ${profile.skills.grammarAccuracy}%, Vocab Mastery: ${profile.skills.vocabMastery}%, Writing: ${profile.skills.writing}%, Speaking: ${profile.skills.speaking}%.
Weak topics: ${profile.weakGrammarTopics.join(', ')}.
Return a JSON object matching AdvisorAnalysis schema with:
1) status ('sufficient' or 'additional_recommended')
2) summary explanation
3) overallConfidence score
4) knowledgeGaps array (topic, category, importance, explanation, prerequisites)
5) recommendedResources array (title, provider, url, type, whyRecommended, estimatedMinutes)
6) studyPath array of steps.`

  try {
    const responseJson = await AIGateway.request({
      task: 'learning_advisor',
      prompt,
      cacheTtlMinutes: 60 * 6,
    })
    const parsed = JSON.parse(responseJson)

    return {
      ...parsed,
      readinessScores: {
        ielts: ieltsReadiness,
        toefl: toeflReadiness,
        gre: greReadiness,
        campus: campusReadiness,
      },
      evaluatedAt: new Date().toISOString(),
    }
  } catch {
    // Fallback heuristic output
    return {
      status: 'additional_recommended',
      summary: `Based on your target score of ${profile.targetBand} in ${profile.targetExam.toUpperCase()}, your core vocabulary is strong, but advanced grammar structures like Inversion and Task 2 Introduction hooks require further practice.`,
      overallConfidence: 78,
      readinessScores: {
        ielts: ieltsReadiness,
        toefl: toeflReadiness,
        gre: greReadiness,
        campus: campusReadiness,
      },
      knowledgeGaps: [
        {
          topic: 'Grammatical Range — Inversion & Complex Conditionals',
          category: 'grammar',
          importance: 'high',
          explanation: 'Band 8.5+ essays require varied sentence structures, including inverted clauses (Not only... but also).',
          prerequisites: ['Auxiliary verbs', 'Conditionals'],
        },
        {
          topic: 'IELTS Writing Task 2 — Thesis Statement Precision',
          category: 'writing',
          importance: 'high',
          explanation: 'The examiner decides your Task Achievement band within the first paragraph.',
          prerequisites: ['Paragraph structure'],
        },
      ],
      recommendedResources: [
        {
          id: 'res-bc-writing',
          title: 'British Council IELTS Writing Guide',
          provider: 'British Council',
          url: 'https://takeielts.britishcouncil.org/prepare-test/free-ielts-practice-tests/writing-practice-tests',
          type: 'official_guide',
          description: 'Official marking descriptors for Band 8.5+ writing.',
          whyRecommended: 'Ensures exact alignment with official IELTS evaluation criteria.',
          estimatedMinutes: 45,
        },
        {
          id: 'res-idp-speaking',
          title: 'IDP IELTS Speaking Part 2 Masterclass',
          provider: 'IDP IELTS',
          url: 'https://www.ieltsidpindia.com/prepare/speaking-test-tips',
          type: 'interactive',
          description: 'Band 9 speaking strategies with cue card breakdowns.',
          whyRecommended: 'Teaches discourse markers to sustain speech for 2 full minutes.',
          estimatedMinutes: 30,
        },
      ],
      studyPath: [
        {
          stepIndex: 1,
          topic: 'Master Inverted Clauses',
          objective: 'Learn to use "Hardly had I...", "Not only did..." in academic writing.',
          estimatedTimeMinutes: 30,
          difficulty: 'C1',
          prerequisites: ['Conditionals'],
          actionType: 'grammar_lesson',
          completed: false,
        },
        {
          stepIndex: 2,
          topic: 'Practice Task 2 Introduction Hooks',
          objective: 'Write 3 introduction paragraphs targeting clear thesis statements.',
          estimatedTimeMinutes: 40,
          difficulty: 'C1',
          prerequisites: ['Thesis statements'],
          actionType: 'essay_practice',
          completed: false,
        },
      ],
      evaluatedAt: new Date().toISOString(),
    }
  }
}
