import React from 'react'
import { ExternalLink } from 'lucide-react'

const KEYS = [
  { key: 'OPENAI_API_KEY', label: 'OpenAI API Key', link: 'https://platform.openai.com/api-keys', desc: 'For AI captions, scripts & content' },
  { key: 'PEXELS_API_KEY', label: 'Pexels API Key', link: 'https://www.pexels.com/api/', desc: 'Free stock photos & videos' },
  { key: 'PIXABAY_API_KEY', label: 'Pixabay API Key', link: 'https://pixabay.com/api/docs/', desc: 'Free stock photos & videos' },
  { key: 'META_ACCESS_TOKEN', label: 'Meta Access Token', link: 'https://developers.facebook.com/', desc: 'For Instagram & Facebook posting' },
  { key: 'META_PAGE_ID', label: 'Facebook Page ID', link: 'https://developers.facebook.com/', desc: 'Your Facebook business page ID' },
  { key: 'META_INSTAGRAM_ID', label: 'Instagram Business ID', link: 'https://developers.facebook.com/', desc: 'Your Instagram business account ID' },
  { key: 'WHATSAPP_TOKEN', label: 'WhatsApp Token', link: 'https://developers.facebook.com/', desc: 'WhatsApp Cloud API token' },
  { key: 'WHATSAPP_PHONE_NUMBER_ID', label: 'WhatsApp Phone ID', link: 'https://developers.facebook.com/', desc: 'Your WhatsApp phone number ID' },
]

export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Settings & API Keys</h2>
      <div className="card mb-6">
        <h3 className="font-semibold mb-1">How to configure</h3>
        <p className="text-sm text-gray-600">Copy <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env.example</code> to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env</code> in the backend folder, then add your API keys. Restart the backend to apply.</p>
        <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl mt-3">cp .env.example backend/.env{'\n'}# Edit backend/.env with your keys{'\n'}cd backend && uvicorn main:app --reload</pre>
      </div>
      <div className="space-y-3">
        {KEYS.map(({ key, label, link, desc }) => (
          <div key={key} className="card flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{label}</p>
                <a href={link} target="_blank" rel="noreferrer" className="text-gold hover:text-gold-dark"><ExternalLink size={14}/></a>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              <code className="text-xs text-gray-500 mt-1 block">{key}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
