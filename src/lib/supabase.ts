import { createClient } from '@supabase/supabase-js'

// Direct matching Supabase project URL and anon key for zkcpnhcgatwdfjnkuolb
export const SUPABASE_PROJECT_URL = 'https://zkcpnhcgatwdfjnkuolb.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprY3BuaGNnYXR3ZGZqbmt1b2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMTI1NjIsImV4cCI6MjEwMTY4ODU2Mn0.-A--3XWlTzs3jjnQhMCIA0-5RYF0NkOBh4dhlj5Tnm0'

const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If envUrl contains zkcpnhcgatwdfjnkuolb use it, otherwise fall back to SUPABASE_PROJECT_URL
const supabaseUrl = (envUrl && envUrl.includes('zkcpnhcgatwdfjnkuolb')) ? envUrl : SUPABASE_PROJECT_URL
const supabaseAnonKey = (envKey && envKey.length > 50) ? envKey : SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
