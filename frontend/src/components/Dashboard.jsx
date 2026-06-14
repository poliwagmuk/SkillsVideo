import React, { useEffect, useState } from 'react'
import { Sparkles, Image, Share2, MessageCircle, CheckCircle, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const cards = [
  { to: '/content', icon: Sparkles, label: 'Generate Content', desc: 'AI captions, scripts & hashtags', color: 'bg-purple-50 text-purple-600' },
  { to: '/media', icon: Image, label: 'Media Library', desc: 'Search Pexels & Pixabay', color: 'bg-blue-50 text-blue-600' },
  { to: '/social', icon: Share2, label: 'Auto-Post', desc: 'Post to Instagram & Facebook', color: 'bg-pink-50 text-pink-600' },
  { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp', desc: 'Send content to clients', color: 'bg-green-50 text-green-600' },
]

export default function Dashboard() {
  const [health, setHealth] = useState({})
  useEffect(() => { axios.get('/api/health').then(r => setHealth(r.data)).catch(() => {}) }, [])

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Welcome back</h2>
        <p className="text-gray-500 mt-1">SHAZ Clinic Marketing Studio — your AI-powered content engine</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {cards.map(({ to, icon: Icon, label, desc, color }) => (
          <Link key={to} to={to} className="card hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-gold transition-colors">{label}</h3>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
          </Link>
        ))}
      </div>

      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">API Connection Status</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(health).map(([key, connected]) => (
            <div key={key} className="flex items-center gap-2">
              {connected ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />}
              <span className="text-sm text-gray-600 capitalize">{key}</span>
              <span className={`text-xs ml-auto ${connected ? 'text-green-500' : 'text-red-400'}`}>{connected ? 'Connected' : 'Not set'}</span>
            </div>
          ))}
        </div>
        {Object.keys(health).length === 0 && <p className="text-sm text-gray-400">Checking connections...</p>}
      </div>
    </div>
  )
}
