import React, { useState } from 'react'
import axios from 'axios'
import { Share2, Instagram, Facebook } from 'lucide-react'

export default function SocialPoster() {
  const [platform, setPlatform] = useState('instagram')
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function post() {
    setLoading(true)
    try {
      const endpoint = platform === 'facebook' ? '/api/social/facebook' : '/api/social/instagram'
      const payload = platform === 'facebook' ? { message: caption, image_url: imageUrl } : { image_url: imageUrl, caption }
      const { data } = await axios.post(endpoint, payload)
      setResult(data)
    } catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Auto-Post to Social Media</h2>
      <div className="card mb-6">
        <div className="flex gap-3 mb-4">
          {['instagram','facebook'].map(p => (
            <button key={p} onClick={() => setPlatform(p)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium capitalize ${platform===p ? 'bg-gold text-white' : 'bg-gray-100 text-gray-600'}`}>
              {p === 'instagram' ? <Instagram size={16}/> : <Facebook size={16}/>} {p}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Image/Video URL</label>
            <input className="input" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Caption</label>
            <textarea className="input h-32 resize-none" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Write your caption..." />
          </div>
          <button onClick={post} disabled={loading} className="gold-btn flex items-center gap-2">
            <Share2 size={16}/>{loading ? 'Posting...' : `Post to ${platform}`}
          </button>
        </div>
      </div>
      {result && (
        <div className={`card ${result.error ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          {result.demo && <p className="text-amber-600 text-sm mt-2">Demo mode — add Meta API credentials in Settings to post for real.</p>}
        </div>
      )}
    </div>
  )
}
