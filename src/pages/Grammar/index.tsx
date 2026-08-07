import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, HelpCircle, AlertTriangle, FileText, Play } from 'lucide-react'

interface GrammarTopic {
  id: string
  title: string
  category: 'Foundation' | 'Intermediate' | 'Advanced Band 9'
  explanation: string
  rule: string
  examples: string[]
  commonMistake: string
  correction: string
  videoUrl?: string
  quiz: {
    question: string
    options: string[]
    answerIndex: number
    explanation: string
  }
}

const grammarTopics: GrammarTopic[] = [
  {
    id: 'inversion',
    title: 'Inversion for Band 9 Writing & Speaking',
    category: 'Advanced Band 9',
    rule: 'When an adverbial phrase with negative or restrictive meaning is placed at the front of a sentence, the subject and auxiliary verb invert.',
    explanation: 'Inversion creates formal emphasis and is one of the fastest ways to demonstrate high Grammatical Range (Band 8.5–9.0).',
    examples: [
      'Not only did the policy reduce emissions, but it also boosted the local economy.',
      'Seldom have we witnessed such rapid technological transformation.',
      'Hardly had the meeting started when the agreement was reached.',
    ],
    commonMistake: 'Not only the policy reduced emissions...',
    correction: 'Not only DID the policy REDUCE emissions...',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Sample embedded educational video
    quiz: {
      question: 'Choose the correctly inverted sentence:',
      options: [
        'Rarely we see such dedication in young students.',
        'Rarely do we see such dedication in young students.',
        'Rarely we do see such dedication in young students.',
      ],
      answerIndex: 1,
      explanation: 'After "Rarely", place the auxiliary verb "do" before the subject "we".',
    },
  },
  {
    id: 'conditionals-type-3',
    title: 'Third & Mixed Conditionals',
    category: 'Intermediate',
    rule: 'If + past perfect, would/could/might + have + past participle.',
    explanation: 'Used to talk about hypothetical past situations and their hypothetical past or present results.',
    examples: [
      'If I had studied more systematically, I would have achieved Band 8.5 last year.',
      'Had they invested earlier, they would be market leaders today (Mixed Conditional).',
    ],
    commonMistake: 'If I would have studied, I would pass...',
    correction: 'If I HAD studied, I WOULD HAVE passed...',
    quiz: {
      question: 'Complete the sentence: "If she _____ the exam date, she would have arrived on time."',
      options: ['had checked', 'checked', 'would check'],
      answerIndex: 0,
      explanation: 'Third conditional requires "had + past participle" in the if-clause.',
    },
  },
  {
    id: 'articles-geography',
    title: 'Definite Article "The" with Proper Nouns',
    category: 'Foundation',
    rule: 'Use "the" with mountain ranges, island groups, rivers, and countries with plural names or words like Republic/Kingdom.',
    explanation: 'Article errors account for over 30% of grammatical accuracy deductions in IELTS Writing.',
    examples: [
      'The United States, The United Kingdom, The Netherlands',
      'The Himalayas, The Amazon River, The Pacific Ocean',
    ],
    commonMistake: 'He visited the Mount Everest last summer.',
    correction: 'He visited Mount Everest last summer (no "the" with individual peaks).',
    quiz: {
      question: 'Which sentence is grammatically correct?',
      options: [
        'I plan to travel to the United Kingdom next month.',
        'I plan to travel to United Kingdom next month.',
        'I plan to travel to a United Kingdom next month.',
      ],
      answerIndex: 0,
      explanation: 'Countries containing "Kingdom", "States", or "Republic" require the definite article "the".',
    },
  },
]

export default function GrammarPage() {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(grammarTopics[0])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSelectOption = (idx: number) => {
    setSelectedAnswer(idx)
    setShowExplanation(true)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-neon-emerald">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Grammar Reference Library</h1>
          <p className="text-xs text-muted-foreground">Comprehensive rules, solved examples, common mistakes, and exam practice</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Topic Selector Sidebar */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Topics Directory</h2>
          {grammarTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic)
                setSelectedAnswer(null)
                setShowExplanation(false)
              }}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                selectedTopic.id === topic.id
                  ? 'glass-card border-primary/40 bg-primary/10 shadow-lg'
                  : 'glass-card border-white/5 hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/5 text-primary mb-1 inline-block">
                {topic.category}
              </span>
              <p className="font-bold text-sm">{topic.title}</p>
            </button>
          ))}
        </div>

        {/* Selected Topic Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div>
                <span className="text-xs font-semibold text-primary">{selectedTopic.category}</span>
                <h2 className="text-2xl font-bold mt-0.5">{selectedTopic.title}</h2>
              </div>
            </div>

            {/* Rule & Explanation */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" /> Core Grammar Rule
              </h3>
              <p className="text-sm leading-relaxed glass p-4 rounded-2xl text-foreground font-medium">
                {selectedTopic.rule}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedTopic.explanation}</p>
            </div>

            {/* Solved Examples */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-emerald-400">High-Scoring Solved Examples</h3>
              <ul className="space-y-2 text-sm">
                {selectedTopic.examples.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 glass p-3 rounded-xl">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="italic">{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2">
              <h4 className="font-bold text-xs text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Common Candidate Mistake
              </h4>
              <p className="text-xs text-muted-foreground line-through">❌ {selectedTopic.commonMistake}</p>
              <p className="text-xs text-emerald-400 font-semibold">✓ {selectedTopic.correction}</p>
            </div>
          </div>

          {/* Interactive Quiz */}
          <div className="glass-card p-8 rounded-3xl border border-purple-500/20 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 text-purple-400">
              <HelpCircle className="h-5 w-5" /> Topic Quiz
            </h3>
            <p className="text-sm font-medium">{selectedTopic.quiz.question}</p>

            <div className="space-y-2">
              {selectedTopic.quiz.options.map((opt, i) => {
                let btnStyle = 'glass hover:bg-white/5 border-white/10'
                if (selectedAnswer !== null) {
                  if (i === selectedTopic.quiz.answerIndex) btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-semibold'
                  else if (i === selectedAnswer) btnStyle = 'bg-red-500/20 border-red-500/50 text-red-400'
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${btnStyle}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl glass border border-primary/20 text-xs text-muted-foreground">
                <p className="font-bold text-foreground mb-1">Answer Explanation:</p>
                {selectedTopic.quiz.explanation}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
