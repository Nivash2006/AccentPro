import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBand(band: number): string {
  return band % 1 === 0 ? band.toFixed(0) : band.toFixed(1)
}

export function bandColor(band: number): string {
  if (band >= 8) return 'text-emerald-500'
  if (band >= 7) return 'text-green-500'
  if (band >= 6) return 'text-yellow-500'
  if (band >= 5) return 'text-orange-500'
  return 'text-red-500'
}

export function xpToLevel(xp: number): { level: number; progress: number; nextLevelXP: number } {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1
  const currentLevelXP = Math.pow(level - 1, 2) * 100
  const nextLevelXP = Math.pow(level, 2) * 100
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
  return { level, progress: Math.min(progress, 100), nextLevelXP }
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}
