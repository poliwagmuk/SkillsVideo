import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ContentGenerator from './components/ContentGenerator'
import MediaLibrary from './components/MediaLibrary'
import VideoCreator from './components/VideoCreator'
import SocialPoster from './components/SocialPoster'
import WhatsAppSender from './components/WhatsAppSender'
import ContentCalendar from './components/ContentCalendar'
import Settings from './components/Settings'

export default function App() {
  return (
    <div className="flex h-screen bg-clinic-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/content" element={<ContentGenerator />} />
          <Route path="/media" element={<MediaLibrary />} />
          <Route path="/video" element={<VideoCreator />} />
          <Route path="/social" element={<SocialPoster />} />
          <Route path="/whatsapp" element={<WhatsAppSender />} />
          <Route path="/calendar" element={<ContentCalendar />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}
