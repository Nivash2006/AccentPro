import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, Language } from '@/types'

interface SettingsState {
  theme: Theme
  language: Language
  notificationsEnabled: boolean
  dailyReminderTime: string
  setTheme: (theme: Theme) => void
  setLanguage: (lang: Language) => void
  toggleNotifications: () => void
  setReminderTime: (time: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'en',
      notificationsEnabled: true,
      dailyReminderTime: '09:00',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleNotifications: () =>
        set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
      setReminderTime: (time) => set({ dailyReminderTime: time }),
    }),
    { name: 'accent-pro-settings' }
  )
)
