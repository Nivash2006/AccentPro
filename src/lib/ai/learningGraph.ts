// ============================================================
// Learning Path Graph (Directed Acyclic Graph for Curriculum)
// Controls prerequisite mastery before unlocking downstream topics
// ============================================================

export interface GraphNode {
  id: string
  title: string
  category: 'Foundation' | 'Grammar' | 'Writing' | 'Speaking' | 'Reading' | 'Listening'
  prerequisites: string[]
  masteryRequired: number // 0 - 100
  description: string
  route: string
}

export const CURRICULUM_GRAPH: GraphNode[] = [
  {
    id: 'node-tenses',
    title: 'Tenses & Aspect Mastery',
    category: 'Foundation',
    prerequisites: [],
    masteryRequired: 70,
    description: 'Master present perfect vs past simple, past continuous, and future perfect.',
    route: '/foundation',
  },
  {
    id: 'node-passive-voice',
    title: 'Passive Voice in Academic Tone',
    category: 'Grammar',
    prerequisites: ['node-tenses'],
    masteryRequired: 75,
    description: 'Use passive structures to sound objective in IELTS Task 1 and Academic Writing.',
    route: '/grammar',
  },
  {
    id: 'node-reported-speech',
    title: 'Reported Speech & Subjunctive',
    category: 'Grammar',
    prerequisites: ['node-passive-voice'],
    masteryRequired: 75,
    description: 'Structure indirect quotations for campus GDs and business meetings.',
    route: '/grammar',
  },
  {
    id: 'node-inversion',
    title: 'Inversion & Emphatic Structures (Band 9)',
    category: 'Grammar',
    prerequisites: ['node-reported-speech'],
    masteryRequired: 80,
    description: 'Write "Not only did...", "Hardly had..." to achieve Band 8.5+ Grammatical Range.',
    route: '/grammar',
  },
  {
    id: 'node-essay-writing',
    title: 'IELTS Task 2 Essay Structuring',
    category: 'Writing',
    prerequisites: ['node-inversion'],
    masteryRequired: 80,
    description: 'Compose thesis statements, PEEL body paragraphs, and nuanced conclusions.',
    route: '/ielts/writing',
  },
]

export function checkNodeUnlocked(nodeId: string, completedNodeIds: string[]): boolean {
  const node = CURRICULUM_GRAPH.find((n) => n.id === nodeId)
  if (!node) return true
  if (node.prerequisites.length === 0) return true
  return node.prerequisites.every((prereq) => completedNodeIds.includes(prereq))
}
