import React, { useState } from 'react'
import axios from 'axios'
import { Search, Image, Video } from 'lucide-react'

export default function MediaLibrary() {
  const [query, setQuery] = useState('aesthetic clinic')
  const [type, setType] = useState('photos')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function search() {
    setLoading(true)
    const { data } = await axios.get(`/api/media/${type}`, { params: { query, per_page: 12 } })
    setResults(data.results)
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Media Library</h2>
      <div className="card mb-6">
        <div className="flex gap-3">
          <input className="input flex-1" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search photos & videos..." onKeyDown={e => e.key === 'Enter' && search()} />
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setType('photos')} className={`px-4 py-2 text-sm flex items-center gap-2 ${type==='photos' ? 'bg-gold text-white' : 'text-gray-600 hover:bg-gray-50'}`}><Image size={16}/>Photos</button>
            <button onClick={() => setType('videos')} className={`px-4 py-2 text-sm flex items-center gap-2 ${type==='videos' ? 'bg-gold text-white' : 'text-gray-600 hover:bg-gray-50'}`}><Video size={16}/>Videos</button>
          </div>
          <button onClick={search} disabled={loading} className="gold-btn flex items-center gap-2"><Search size={16}/>{loading ? 'Searching...' : 'Search'}</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {results.map((item, i) => (
          <div key={i} className="card p-0 overflow-hidden group cursor-pointer">
            <img src={item.thumbnail} alt="" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs text-gray-400 capitalize">{item.source}</span>
              <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-gold hover:underline">Open</a>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <Image size={48} className="mx-auto mb-4 opacity-30" />
            <p>Search for photos and videos to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
