import { createClient } from '@supabase/supabase-js'

const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isMock = !envUrl || envUrl.includes('your-project') || envUrl.includes('placeholder')

const supabaseUrl = isMock ? 'https://demo.supabase.co' : envUrl
const supabaseAnonKey = isMock ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder' : envKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})
