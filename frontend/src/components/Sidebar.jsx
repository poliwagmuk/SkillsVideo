import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Sparkles, Image, Video, Share2, MessageCircle, Calendar, Settings } from 'lucide-react'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/content', icon: Sparkles, label: 'Content AI' },
  { to: '/media', icon: Image, label: 'Media Library' },
  { to: '/video', icon: Video, label: 'Video Creator' },
  { to: '/social', icon: Share2, label: 'Auto-Post' },
  { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900" style={{fontFamily:'Playfair Display, serif'}}>SHAZ</h1>
        <p className="text-xs text-gold mt-0.5">Marketing Studio</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to==='/'} className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-gold text-white' : 'text-gray-600 hover:bg-gray-50'}`
          }>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">SHAZ Clinic © 2026</p>
      </div>
    </aside>
  )
}
