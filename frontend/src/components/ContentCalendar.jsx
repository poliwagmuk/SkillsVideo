import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const SAMPLE = [
  { day: 1, treatment: 'HIFU', type: 'Reel', color: 'bg-purple-100 text-purple-700' },
  { day: 2, treatment: 'Botox', type: 'Post', color: 'bg-blue-100 text-blue-700' },
  { day: 3, treatment: 'Filler', type: 'Story', color: 'bg-pink-100 text-pink-700' },
  { day: 5, treatment: 'Laser', type: 'Reel', color: 'bg-purple-100 text-purple-700' },
  { day: 6, treatment: 'HIFU', type: 'Post', color: 'bg-blue-100 text-blue-700' },
  { day: 7, treatment: 'Microneedling', type: 'Story', color: 'bg-pink-100 text-pink-700' },
]

export default function ContentCalendar() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = (firstDay + 6) % 7

  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' })

  function prev() { if (month === 0) { setMonth(11); setYear(y => y-1) } else setMonth(m => m-1) }
  function next() { if (month === 11) { setMonth(0); setYear(y => y+1) } else setMonth(m => m+1) }

  const cells = Array(offset).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i+1))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Content Calendar</h2>
        <button className="gold-btn flex items-center gap-2"><Plus size={16}/>Schedule Post</button>
      </div>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={18}/></button>
          <h3 className="font-semibold text-lg">{monthName} {year}</h3>
          <button onClick={next} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={18}/></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => <div key={d} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            const posts = SAMPLE.filter(s => s.day === day)
            return (
              <div key={i} className={`min-h-20 p-1.5 rounded-lg ${day ? 'hover:bg-gray-50 cursor-pointer' : ''} ${day === now.getDate() && month === now.getMonth() ? 'bg-gold/5 ring-1 ring-gold' : ''}`}>
                {day && <span className="text-sm text-gray-600 font-medium">{day}</span>}
                {posts.map((p, j) => (
                  <div key={j} className={`text-xs px-1.5 py-0.5 rounded mt-1 ${p.color}`}>{p.type}: {p.treatment}</div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
