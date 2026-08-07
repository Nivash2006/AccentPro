import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, User, Sparkles, Mic, RefreshCw } from 'lucide-react'
import { askAITutor } from '@/lib/ai'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I am your **Accent Pro AI English Tutor**. I am specialized in helping you achieve **IELTS Band 9**, master TOEFL/GRE vocabulary, or prepare for corporate interviews. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await askAITutor(input)
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
    } catch {
      // Handled internally by fallback
    } finally {
      setLoading(false)
    }
  }

  const suggestedPrompts = [
    "How do I structure an IELTS Task 2 essay?",
    "Give me 5 high-level academic words for environment.",
    "Correct this sentence: 'He don't know nothing about it.'",
    "Simulate an IELTS Speaking Part 1 interview with me.",
  ]

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col bg-background">
      {/* Top Header */}
      <div className="p-4 border-b border-border/40 glass flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center text-white shadow-neon-purple">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-gradient-ai">AI Personal English Tutor</h1>
            <p className="text-xs text-muted-foreground">Powered by Gemini & Groq AI • Available 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gradient-ai text-white'}`}>
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'glass-card border border-white/10 rounded-tl-none'}`}>
              <div className="prose dark:prose-invert text-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <span className="text-[10px] opacity-60 mt-2 block text-right">{msg.timestamp}</span>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs p-2">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
            AI Mentor is generating feedback...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (if few messages) */}
      {messages.length < 3 && (
        <div className="p-4 flex gap-2 overflow-x-auto scrollbar-thin max-w-4xl mx-auto w-full">
          {suggestedPrompts.map((prompt, i) => (
            <button key={i} onClick={() => { setInput(prompt); }} className="px-3 py-1.5 rounded-full text-xs glass-card border border-white/10 text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-4 border-t border-border/40 glass">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask your AI tutor anything about IELTS, grammar, or vocabulary..."
            className="flex-1 px-4 py-3 rounded-2xl bg-card/60 border border-border text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button type="submit" disabled={!input.trim() || loading} className="px-5 py-3 rounded-2xl bg-gradient-primary text-white font-bold shadow-neon-emerald hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
