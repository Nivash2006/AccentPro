import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Send, Video, FileText, Calendar, Flame, Link as LinkIcon, Plus, CheckCircle2 } from 'lucide-react'

interface Message {
  id: string
  user: string
  avatar: string
  text: string
  time: string
  meetingLink?: string
}

export default function StudyRoomPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'Priya Nair', avatar: 'P', text: 'Hey team! Starting our IELTS Speaking Part 2 cue card practice session at 6:00 PM.', time: '17:45', meetingLink: 'https://meet.google.com/xyz-accent-pro' },
    { id: '2', user: 'Arjun Sharma', avatar: 'A', text: 'Awesome! I shared my band 8.5 Task 2 essay template in shared notes.', time: '17:50' },
  ])
  const [input, setInput] = useState('')
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const [meetingTopic, setMeetingTopic] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'Y',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInput('')
  }

  const handleCreateMeeting = () => {
    if (!meetingTopic.trim()) return
    const link = `https://meet.google.com/acc-${Math.floor(Math.random() * 9000 + 1000)}`
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'Y',
        text: `📅 Scheduled Study Room Voice Session: ${meetingTopic}`,
        meetingLink: link,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setShowMeetingModal(false)
    setMeetingTopic('')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center text-white shadow-neon-purple">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">IELTS & GRE Collaborative Study Room</h1>
            <p className="text-xs text-muted-foreground">Collaborate with fellow aspirants, share notes, and host live practice calls</p>
          </div>
        </div>

        <button
          onClick={() => setShowMeetingModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald flex items-center gap-2"
        >
          <Video className="h-4 w-4" /> Start Voice/Video Study Call
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Chat Room (2 Cols) */}
        <div className="lg:col-span-2 glass-card rounded-3xl border border-white/10 flex flex-col h-[560px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-border/40 flex items-center justify-between glass">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-sm">Target Band 9 Study Room (14 Online)</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {msg.avatar}
                </div>
                <div className={`p-4 rounded-2xl text-xs max-w-md space-y-1 ${msg.user === 'You' ? 'bg-primary text-white rounded-tr-none' : 'glass border border-white/10 rounded-tl-none'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold">{msg.user}</span>
                    <span className="opacity-60 text-[10px]">{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>

                  {msg.meetingLink && (
                    <a
                      href={msg.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-semibold mt-2 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                    >
                      <Video className="h-3.5 w-3.5" /> Join Study Session Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-border/40 glass flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share a thought, doubt, or essay draft..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-card/60 border border-border text-xs focus:outline-none focus:border-primary transition-colors"
            />
            <button type="submit" className="px-4 py-2.5 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-neon-emerald flex items-center justify-center">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Right Sidebar: Shared Goals & Notes */}
        <div className="space-y-6">
          {/* Shared Goals */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" /> Weekly Room Challenge
            </h3>
            <div className="p-4 rounded-2xl glass space-y-2">
              <p className="font-bold text-xs">Write 3 Task 2 Essays & Learn 50 C2 Vocab Words</p>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full w-[72%]" />
              </div>
              <p className="text-[10px] text-muted-foreground text-right">72% Completed by Team</p>
            </div>
          </div>

          {/* Shared Notes */}
          <div className="glass-card p-6 rounded-3xl space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-400" /> Shared Study Notes
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl glass hover:bg-white/5 cursor-pointer">
                <p className="font-bold text-foreground">📄 Band 9 Essay Intro Hook Formula.pdf</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Uploaded by Arjun • 2.4 MB</p>
              </div>
              <div className="p-3 rounded-xl glass hover:bg-white/5 cursor-pointer">
                <p className="font-bold text-foreground">📄 GRE 100 High-Frequency Vocab Cheat Sheet.pdf</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Uploaded by Priya • 1.8 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-6 rounded-3xl max-w-md w-full border border-white/10 space-y-4">
            <h3 className="font-bold text-lg">Schedule Live Study Session</h3>
            <p className="text-xs text-muted-foreground">Generates an instant Google Meet / Zoom session link for your study group.</p>
            <input
              type="text"
              value={meetingTopic}
              onChange={(e) => setMeetingTopic(e.target.value)}
              placeholder="e.g. IELTS Speaking Part 3 Mock Practice"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-xs focus:outline-none focus:border-primary"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowMeetingModal(false)} className="px-4 py-2 rounded-xl text-xs hover:bg-white/5">
                Cancel
              </button>
              <button onClick={handleCreateMeeting} className="px-5 py-2 rounded-xl bg-gradient-primary text-white font-bold text-xs">
                Create Session Link
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
