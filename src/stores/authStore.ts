import { create } from 'zustand'
import type { User } from '@/types'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: unknown | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setSession: (session: unknown) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
  clearSession: () => void
}

export const purgeAllStores = () => {
  try {
    localStorage.removeItem('accent-pro-auth')
    localStorage.removeItem('accent-pro-gamification')
    localStorage.removeItem('accent-pro-progress')
    localStorage.removeItem('accent-pro-learning-profile')
    localStorage.removeItem('accent-pro-mistake-memory')
    localStorage.clear()
  } catch {}
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  signOut: async () => {
    try { await supabase.auth.signOut() } catch {}
    purgeAllStores()
    set({ user: null, session: null, isAuthenticated: false })
  },
  clearSession: () => {
    purgeAllStores()
    set({ user: null, session: null, isAuthenticated: false })
  },
}))
