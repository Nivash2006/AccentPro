// ============================================================
// AI Output Cache Layer (SHA-256 style hash string lookup)
// Reduces free-tier API consumption by caching deterministic calls
// ============================================================

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresInMs: number
}

class AICacheManager {
  private memoryCache = new Map<string, CacheEntry<any>>()
  private STORAGE_KEY = 'accent_pro_ai_cache_v1'

  constructor() {
    this.loadFromStorage()
  }

  private hashKey(key: string): string {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash |= 0
    }
    return `aicache_${Math.abs(hash)}`
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        const now = Date.now()
        Object.entries(parsed).forEach(([k, v]: [string, any]) => {
          if (v.timestamp + v.expiresInMs > now) {
            this.memoryCache.set(k, v)
          }
        })
      }
    } catch {
      // Ignore storage read errors
    }
  }

  private saveToStorage() {
    try {
      const obj: Record<string, any> = {}
      this.memoryCache.forEach((val, key) => {
        obj[key] = val
      })
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(obj))
    } catch {
      // Ignore storage write errors
    }
  }

  public get<T>(rawKey: string): T | null {
    const key = this.hashKey(rawKey)
    const entry = this.memoryCache.get(key)
    if (!entry) return null

    if (Date.now() > entry.timestamp + entry.expiresInMs) {
      this.memoryCache.delete(key)
      this.saveToStorage()
      return null
    }

    return entry.data as T
  }

  public set<T>(rawKey: string, data: T, ttlMinutes = 60 * 24): void {
    const key = this.hashKey(rawKey)
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresInMs: ttlMinutes * 60 * 1000,
    }
    this.memoryCache.set(key, entry)
    this.saveToStorage()
  }

  public clear(): void {
    this.memoryCache.clear()
    localStorage.removeItem(this.STORAGE_KEY)
  }
}

export const AICache = new AICacheManager()
