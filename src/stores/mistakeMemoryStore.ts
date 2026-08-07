import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface MistakeRecord {
  id: string
  mistake: string
  correction: string
  reason: string
  rule: string
  extraExample: string
  topic: string
  errorCount: number
  lastOccurred: string
}

interface MistakeMemoryState {
  mistakes: MistakeRecord[]
  recordMistake: (data: Omit<MistakeRecord, 'id' | 'errorCount' | 'lastOccurred'>) => void
  getRepeatedMistakes: () => MistakeRecord[]
}

const seedMistakes: MistakeRecord[] = [
  {
    id: 'm1',
    mistake: 'There is many reasons for this phenomenon.',
    correction: 'There are many reasons for this phenomenon.',
    reason: 'Subject-verb agreement: "reasons" is plural, requiring the plural verb "are".',
    rule: 'Always match the verb form (is/are, has/have) to the plural noun following "there".',
    extraExample: 'There ARE several factors to consider when preparing for IELTS.',
    topic: 'Subject-Verb Agreement',
    errorCount: 5,
    lastOccurred: new Date().toISOString(),
  },
  {
    id: 'm2',
    mistake: 'In the other hand, some people argue...',
    correction: 'On the other hand, some people argue...',
    reason: 'Fixed prepositional collocation.',
    rule: 'The correct English contrastive marker is always "ON the other hand".',
    extraExample: 'ON the one hand, technology saves time; ON the other hand, it distorts focus.',
    topic: 'Fixed Collocations',
    errorCount: 3,
    lastOccurred: new Date().toISOString(),
  },
]

export const useMistakeMemoryStore = create<MistakeMemoryState>()(
  persist(
    (set, get) => ({
      mistakes: seedMistakes,
      recordMistake: (data) =>
        set((state) => {
          const existingIdx = state.mistakes.findIndex((m) => m.mistake.toLowerCase() === data.mistake.toLowerCase())
          if (existingIdx !== -1) {
            const updated = [...state.mistakes]
            updated[existingIdx] = {
              ...updated[existingIdx],
              errorCount: updated[existingIdx].errorCount + 1,
              lastOccurred: new Date().toISOString(),
            }
            return { mistakes: updated }
          } else {
            return {
              mistakes: [
                ...state.mistakes,
                {
                  ...data,
                  id: `mistake_${Date.now()}`,
                  errorCount: 1,
                  lastOccurred: new Date().toISOString(),
                },
              ],
            }
          }
        }),
      getRepeatedMistakes: () => get().mistakes.filter((m) => m.errorCount >= 2),
    }),
    { name: 'accent-pro-mistake-memory' }
  )
)
