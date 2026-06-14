import React, { useState } from 'react'
import axios from 'axios'
import { Sparkles, Copy, RefreshCw } from 'lucide-react'

const TREATMENTS = ['HIFU', 'Botox', 'Filler', 'Laser', 'Microneedling', 'Chemical Peel', 'RF Skin Tightening', 'LED Therapy']
const TONES = ['luxury', 'friendly', 'clinical', 'aspirational']

export default function ContentGenerator() {
  const [form, setForm] = useState({ treatment: 'HIFU', clinic_name: 'SHAZ Clinic', tone: 'luxury' })
  const [caption, setCaption] = useState(null)
  const [script, setScript] = useState(null)
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function genCaption() {
    setLoading('caption')
    const { data } = await axios.post('/api/content/caption', form)
    setCaption(data)
    setLoading('')
  }

  async function genScript() {
    setLoading('script')
    const { data } = await axios.post('/api/content/script', { ...form, duration: 30 })
    setScript(data.script)
    setLoading('')
  }

  async function genPlan() {
    setLoading('plan')
    const { data } = await axios.post('/api/content/weekly-plan', { clinic_name: form.clinic_name, treatments: TREATMENTS.slice(0, 5) })
    setPlan(data.plan)
    setLoading('')
  }

  const copy = text => navigator.clipboard.writeText(text)

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Content Generator</h2>

      <div className="card mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Treatment</label>
            <select className="input" value={form.treatment} onChange={set('treatment')}>
              {TREATMENTS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Clinic Name</label>
            <input className="input" value={form.clinic_name} onChange={set('clinic_name')} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Tone</label>
            <select className="input" value={form.tone} onChange={set('tone')}>
              {TONES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={genCaption} disabled={loading==='caption'} className="gold-btn flex items-center gap-2">
            <Sparkles size={16} />{loading==='caption' ? 'Generating...' : 'Generate Caption'}
          </button>
          <button onClick={genScript} disabled={loading==='script'} className="gold-btn flex items-center gap-2">
            <RefreshCw size={16} />{loading==='script' ? 'Writing...' : 'Write Script'}
          </button>
          <button onClick={genPlan} disabled={loading==='plan'} className="gold-btn flex items-center gap-2">
            <RefreshCw size={16} />{loading==='plan' ? 'Planning...' : '7-Day Plan'}
          </button>
        </div>
      </div>

      {caption && (
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Caption</h3>
            <button onClick={() => copy(caption.caption + '\n\n' + caption.hashtags)} className="text-gold hover:text-gold-dark"><Copy size={16} /></button>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap mb-3">{caption.caption}</p>
          <p className="text-blue-500 text-sm">{caption.hashtags}</p>
          {caption.note && <p className="text-xs text-amber-500 mt-2">{caption.note}</p>}
        </div>
      )}

      {script && (
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Video Script</h3>
            <button onClick={() => copy(script)} className="text-gold hover:text-gold-dark"><Copy size={16} /></button>
          </div>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{script}</pre>
        </div>
      )}

      {plan && (
        <div className="card">
          <h3 className="font-semibold mb-4">7-Day Content Plan</h3>
          <div className="space-y-2">
            {plan.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gold w-24">{item.day}</span>
                <span className="text-sm text-gray-600">{item.treatment}</span>
                <span className="ml-auto text-xs bg-gold/10 text-gold px-2 py-1 rounded-full">{item.content_type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
