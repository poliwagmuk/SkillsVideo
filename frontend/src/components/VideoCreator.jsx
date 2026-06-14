import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Upload, Video } from 'lucide-react'

function DropZone({ label, onFile }) {
  const onDrop = useCallback(files => onFile(files[0]), [onFile])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false })
  return (
    <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold'}`}>
      <input {...getInputProps()} />
      <Upload size={32} className="mx-auto mb-2 text-gray-400" />
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-xs text-gray-400 mt-1">Drop image here or click to browse</p>
    </div>
  )
}

export default function VideoCreator() {
  const [before, setBefore] = useState(null)
  const [after, setAfter] = useState(null)
  const [beforePreview, setBeforePreview] = useState(null)
  const [afterPreview, setAfterPreview] = useState(null)
  const [clinicName, setClinicName] = useState('SHAZ Clinic')
  const [treatment, setTreatment] = useState('HIFU Treatment')
  const [frames, setFrames] = useState([])
  const [loading, setLoading] = useState(false)

  function handleBefore(f) { setBefore(f); setBeforePreview(URL.createObjectURL(f)) }
  function handleAfter(f) { setAfter(f); setAfterPreview(URL.createObjectURL(f)) }

  async function generate() {
    if (!before || !after) return alert('Please upload both before and after images')
    setLoading(true)
    const fd = new FormData()
    fd.append('before', before)
    fd.append('after', after)
    fd.append('clinic_name', clinicName)
    fd.append('treatment', treatment)
    const { data } = await axios.post('/api/video/before-after', fd)
    setFrames(data.frames)
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Before/After Video Creator</h2>
      <div className="card mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Clinic Name</label>
            <input className="input" value={clinicName} onChange={e => setClinicName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Treatment</label>
            <input className="input" value={treatment} onChange={e => setTreatment(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Before Image</p>
            {beforePreview ? <img src={beforePreview} className="w-full h-48 object-cover rounded-xl mb-2" /> : null}
            <DropZone label="Upload Before Photo" onFile={handleBefore} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">After Image</p>
            {afterPreview ? <img src={afterPreview} className="w-full h-48 object-cover rounded-xl mb-2" /> : null}
            <DropZone label="Upload After Photo" onFile={handleAfter} />
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="gold-btn flex items-center gap-2">
          <Video size={16} />{loading ? 'Generating...' : 'Create Before/After Frames'}
        </button>
      </div>
      {frames.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-4">Generated Frames</h3>
          <div className="grid grid-cols-2 gap-4">
            {frames.map((f, i) => (
              <div key={i}>
                <p className="text-sm text-gray-500 mb-2">{i === 0 ? 'Before Frame' : 'After Frame'}</p>
                <img src={`data:image/jpeg;base64,${f}`} className="w-full rounded-xl" />
                <a href={`data:image/jpeg;base64,${f}`} download={`frame-${i+1}.jpg`} className="text-gold text-sm hover:underline mt-2 block">Download Frame</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
