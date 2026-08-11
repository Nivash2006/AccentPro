import { createClient } from '@supabase/supabase-js'

const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Matching Supabase project URL and anon key for zkcpnhcgatwdfjnkuolb
const defaultUrl = 'https://zkcpnhcgatwdfjnkuolb.supabase.co'
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprY3BuaGNnYXR3ZGZqbmt1b2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMTI1NjIsImV4cCI6MjEwMTY4ODU2Mn0.-A--3XWlTzs3jjnQhMCIA0-5RYF0NkOBh4dhlj5Tnm0'

const supabaseUrl = (envUrl && !envUrl.includes('placeholder') && !envUrl.includes('your-project')) ? envUrl : defaultUrl
const supabaseAnonKey = (envKey && !envKey.includes('placeholder')) ? envKey : defaultAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
