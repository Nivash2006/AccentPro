import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ThumbsUp, MessageCircle, Plus, Search } from 'lucide-react'

export default function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Priya Nair',
      tag: 'IELTS Writing',
      title: 'How I scored Band 8.5 in Task 2 using PEEL method',
      likes: 24,
      comments: 8,
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'Karthik M',
      tag: 'GRE Verbal',
      title: 'Mnemonic list for top 100 GRE Barron words',
      likes: 42,
      comments: 15,
      time: '5 hours ago',
    },
  ])

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">Student Community Forum</h1>
            <p className="text-xs text-muted-foreground">Share notes, ask doubts, and discuss preparation strategies</p>
          </div>
        </div>

        <button className="px-5 py-2.5 rounded-2xl bg-gradient-primary text-white font-bold text-sm shadow-neon-emerald flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ask Question
        </button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="glass-card p-6 rounded-3xl space-y-3 border border-white/10 card-hover">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">{post.tag}</span>
              <span className="text-xs text-muted-foreground">{post.time}</span>
            </div>
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-xs text-muted-foreground">Posted by {post.author}</p>
            <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <ThumbsUp className="h-4 w-4" /> {post.likes} Likes
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" /> {post.comments} Comments
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
