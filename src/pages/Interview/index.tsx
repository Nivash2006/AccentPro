import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mic, Play, ChevronRight, Brain, FileText, User } from 'lucide-react'
import { askAITutor } from '@/lib/ai'

const hrQuestions = [
  'Tell me about yourself.',
  'What are your greatest strengths and weaknesses?',
  'Where do you see yourself in 5 years?',
  'Why do you want to work at our company?',
  'Describe a challenge you faced and how you overcame it.',
  'Why should we hire you?',
  'What are your salary expectations?',
  'Do you have any questions for us?',
]

export default function InterviewPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  const getFeedback = async () => {
    if (!answer.trim() || selected === null) return
    setLoading(true)
    const q = hrQuestions[selected]
    const prompt = `As an HR interview coach, evaluate this answer to the question "${q}". 
Answer: "${answer}"
Provide: 1) Score/10, 2) What was good, 3) What to improve, 4) An improved model answer. Keep it concise.`
    const fb = await askAITutor(prompt)
    setFeedback(fb)
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Interview <span className="text-gradient-primary">Preparation</span></h1>
          <p className="text-muted-foreground mt-1">AI-powered mock interviews with real-time feedback</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question list */}
          <div className="space-y-2">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><User className="h-4 w-4 text-primary" />HR Questions</h3>
            {hrQuestions.map((q, i) => (
              <button key={i} onClick={() => { setSelected(i); setAnswer(''); setFeedback('') }}
                className={`w-full text-left p-3 rounded-xl text-sm transition-all ${selected === i ? 'bg-primary/10 border border-primary/30 text-primary' : 'glass-card hover:bg-white/5 text-muted-foreground'}`}>
                {i + 1}. {q}
              </button>
            ))}
          </div>

          {/* Practice area */}
          <div className="lg:col-span-2 space-y-4">
            {selected !== null ? (
              <>
                <div className="glass-card p-4 rounded-2xl border border-primary/20">
                  <p className="font-medium text-lg">{hrQuestions[selected]}</p>
                  <p className="text-xs text-muted-foreground mt-1">Answer this in 1-2 minutes as you would in a real interview</p>
                </div>

                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your answer here, or use the microphone to speak..."
                  className="w-full h-40 p-4 rounded-2xl bg-card/50 border border-border text-sm resize-none focus:outline-none focus:border-primary/50 transition-colors"
                />

                <div className="flex gap-3">
                  <button onClick={getFeedback} disabled={loading || !answer.trim()}
                    className="flex-1 py-3 rounded-xl bg-gradient-primary text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><span className="animate-spin">⟳</span> AI Evaluating...</> : <><Brain className="h-4 w-4" />Get AI Feedback</>}
                  </button>
                  <button className="p-3 rounded-xl glass-card hover:bg-primary/10 transition-colors">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {feedback && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-5 rounded-2xl border border-primary/20">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary"><Brain className="h-4 w-4" />AI Feedback</h4>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{feedback}</p>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center glass-card rounded-2xl p-12 text-center">
                <div>
                  <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a question to start practicing</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
