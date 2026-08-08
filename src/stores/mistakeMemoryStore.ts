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
  resetMistakes: () => void
}

export const useMistakeMemoryStore = create<MistakeMemoryState>()(
  persist(
    (set, get) => ({
      mistakes: [],
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
      resetMistakes: () => {
        try { localStorage.removeItem('accent-pro-mistake-memory') } catch {}
        set({ mistakes: [] })
      },
    }),
    { name: 'accent-pro-mistake-memory' }
  )
)
