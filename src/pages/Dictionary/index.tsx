import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Volume2, BookOpen, Heart, Clock } from 'lucide-react'
import { lookupWord } from '@/lib/ai'

interface DictEntry {
  word: string
  phonetics: Array<{ text?: string; audio?: string }>
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{ definition: string; example?: string }>
    synonyms: string[]
  }>
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<DictEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<string[]>(['ubiquitous', 'eloquent', 'pragmatic'])

  const search = async (word: string = query) => {
    if (!word.trim()) return
    setLoading(true)
    setError('')
    try {
      const data = await lookupWord(word.trim())
      setResult(data[0])
      setHistory(prev => [word, ...prev.filter(w => w !== word)].slice(0, 10))
    } catch {
      setError('Word not found. Try another word.')
      setResult(null)
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h1 className="text-3xl font-display font-bold">English <span className="text-gradient-primary">Dictionary</span></h1>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
              placeholder="Search any English word..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card/50 border border-border focus:outline-none focus:border-primary/50 transition-colors text-sm"
            />
          </div>
          <button onClick={() => search()} className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
            Search
          </button>
        </div>

        {/* History */}
        {!result && !loading && (
          <div>
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Recent searches</p>
            <div className="flex flex-wrap gap-2">
              {history.map(w => (
                <button key={w} onClick={() => { setQuery(w); search(w) }}
                  className="px-3 py-1.5 rounded-lg text-sm glass-card hover:bg-primary/10 hover:text-primary transition-colors capitalize">{w}</button>
              ))}
            </div>
          </div>
        )}

        {loading && <div className="text-center py-12 text-muted-foreground">Looking up word...</div>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gradient-primary">{result.word}</h2>
                  {result.phonetics?.[0]?.text && <p className="text-muted-foreground mt-1">{result.phonetics[0].text}</p>}
                </div>
                <div className="flex gap-2">
                  {result.phonetics?.find(p => p.audio) && (
                    <button onClick={() => new Audio(result.phonetics.find(p => p.audio)!.audio!).play()}
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <Volume2 className="h-4 w-4" />
                    </button>
                  )}
                  <button className="p-2 rounded-lg glass-card hover:bg-red-500/10 hover:text-red-400 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {result.meanings?.map((meaning, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl">
                <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium mb-3 capitalize">{meaning.partOfSpeech}</span>
                <ol className="space-y-3">
                  {meaning.definitions.slice(0, 3).map((def, j) => (
                    <li key={j} className="text-sm">
                      <p>{j + 1}. {def.definition}</p>
                      {def.example && <p className="text-muted-foreground italic mt-1">"{def.example}"</p>}
                    </li>
                  ))}
                </ol>
                {meaning.synonyms?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Synonyms:</p>
                    <div className="flex flex-wrap gap-2">
                      {meaning.synonyms.slice(0, 6).map(syn => (
                        <button key={syn} onClick={() => { setQuery(syn); search(syn) }}
                          className="px-2 py-1 rounded-lg bg-white/5 text-xs hover:bg-primary/10 hover:text-primary transition-colors">{syn}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
