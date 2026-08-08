import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      signOut: async () => {
        try { await supabase.auth.signOut() } catch {}
        try { localStorage.clear() } catch {}
        set({ user: null, session: null, isAuthenticated: false })
      },
      clearSession: () => {
        try { localStorage.clear() } catch {}
        set({ user: null, session: null, isAuthenticated: false })
      },
    }),
    {
      name: 'accent-pro-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
