import React, { useState } from 'react'
import axios from 'axios'
import { MessageCircle, Send } from 'lucide-react'

export default function WhatsAppSender() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function send() {
    setLoading(true)
    const { data } = await axios.post('/api/whatsapp/send', { to, message })
    setResult(data)
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">WhatsApp Sender</h2>
      <div className="card mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number (with country code)</label>
            <input className="input" value={to} onChange={e => setTo(e.target.value)} placeholder="+447911123456" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
            <textarea className="input h-32 resize-none" value={message} onChange={e => setMessage(e.target.value)} placeholder="Hi! Your appointment content is ready..." />
          </div>
          <button onClick={send} disabled={loading || !to || !message} className="gold-btn flex items-center gap-2">
            <Send size={16}/>{loading ? 'Sending...' : 'Send WhatsApp'}
          </button>
        </div>
      </div>
      {result && (
        <div className="card">
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          {result.demo && <p className="text-amber-600 text-sm mt-2">Demo mode — add WhatsApp credentials in Settings to send real messages.</p>}
        </div>
      )}
      <div className="card mt-4 bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2"><MessageCircle size={18}/>WhatsApp Cloud API</h3>
        <p className="text-sm text-green-700">Free tier: 1,000 conversations/month. Get your token from <strong>developers.facebook.com</strong> → WhatsApp → API Setup.</p>
      </div>
    </div>
  )
}
