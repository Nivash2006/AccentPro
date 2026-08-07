import { motion } from 'framer-motion'
import { useState } from 'react'
import { Settings, Moon, Sun, Globe, Bell, User, Shield, Palette, Smartphone, ChevronRight } from 'lucide-react'
import { useSettingsStore } from '@/stores/settingsStore'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { theme, setTheme, language, setLanguage, notificationsEnabled, toggleNotifications } = useSettingsStore()
  const { i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState('appearance')

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  ]

  const handleLanguageChange = (lang: 'en' | 'ta') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="text-3xl font-display font-bold">Settings</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-1">
            {sections.map(sec => {
              const Icon = sec.icon
              return (
                <button key={sec.id} onClick={() => setActiveSection(sec.id)}
                  className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                    activeSection === sec.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground')}>
                  <Icon className="h-4 w-4" />
                  {sec.label}
                  {activeSection === sec.id && <ChevronRight className="ml-auto h-3 w-3" />}
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            {activeSection === 'appearance' && (
              <div className="glass-card p-5 rounded-2xl space-y-5">
                <h3 className="font-semibold">Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'dark', 'system'] as const).map(t => (
                    <button key={t} onClick={() => setTheme(t)}
                      className={cn('flex flex-col items-center gap-2 p-4 rounded-xl border transition-all capitalize',
                        theme === t ? 'border-primary bg-primary/10' : 'border-border glass-card hover:border-primary/50')}>
                      {t === 'light' ? <Sun className="h-6 w-6" /> : t === 'dark' ? <Moon className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
                      <span className="text-sm font-medium">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold">App Language</h3>
                <div className="space-y-2">
                  {[{ code: 'en', label: 'English', flag: '🇬🇧' }, { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' }].map(lang => (
                    <button key={lang.code} onClick={() => handleLanguageChange(lang.code as 'en' | 'ta')}
                      className={cn('w-full flex items-center gap-3 p-4 rounded-xl border transition-all',
                        language === lang.code ? 'border-primary bg-primary/10' : 'border-border glass-card hover:border-primary/50')}>
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                      {language === lang.code && <span className="ml-auto text-primary text-sm">✓ Active</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold">Notification Preferences</h3>
                {[
                  { label: 'All Notifications', desc: 'Master notification toggle', active: notificationsEnabled, toggle: toggleNotifications },
                  { label: 'Daily Reminder', desc: 'Remind me to practice every day', active: true, toggle: () => {} },
                  { label: 'Word of the Day', desc: 'New vocabulary every morning', active: true, toggle: () => {} },
                  { label: 'Streak Alerts', desc: "Don't break your streak!", active: true, toggle: () => {} },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <button onClick={item.toggle}
                      className={cn('w-11 h-6 rounded-full transition-colors relative', item.active ? 'bg-primary' : 'bg-muted')}>
                      <span className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform', item.active ? 'left-[22px]' : 'left-0.5')} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'account' && (
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold">Account Details</h3>
                <div className="space-y-3">
                  {[{ label: 'Full Name', value: 'Student User' }, { label: 'Email', value: 'student@example.com' }, { label: 'Target Exam', value: 'IELTS' }, { label: 'Target Band', value: '8.0' }].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-gradient-primary text-white font-medium text-sm">Update Profile</button>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="glass-card p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold">Privacy & Security</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Your data is protected with Supabase Row-Level Security</p>
                  <p>• We never sell your data to third parties</p>
                  <p>• AI conversations are not stored permanently</p>
                  <p>• GDPR-compliant data architecture</p>
                </div>
                <div className="pt-2 border-t border-border space-y-2">
                  <button className="w-full py-2.5 rounded-xl text-sm text-amber-400 hover:bg-amber-500/10 transition-colors">Download My Data</button>
                  <button className="w-full py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
