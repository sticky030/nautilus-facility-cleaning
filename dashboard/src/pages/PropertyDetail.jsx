import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { ArrowLeft, FileText, AlertTriangle, CheckCircle2, Calendar, Download, CheckCheck } from 'lucide-react'
import { generateSchadenPDF } from '../lib/generatePDF'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2.5 text-sm font-medium border-b-2 transition-all"
      style={{
        borderColor: active ? '#B79B6C' : 'transparent',
        color: active ? '#B79B6C' : '#6f6559',
      }}>
      {children}
    </button>
  )
}

export default function PropertyDetail({ session }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [objekt, setObjekt] = useState(null)
  const [protokolle, setProtokolle] = useState([])
  const [schaeden, setSchaeden] = useState([])
  const [tab, setTab] = useState('protokolle')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: obj }, { data: proto }, { data: sch }] = await Promise.all([
        supabase.from('objekte').select('*').eq('id', id).single(),
        supabase.from('protokolle').select('*').eq('objekt_id', id).order('datum', { ascending: false }),
        supabase.from('schadensmeldungen').select('*').eq('objekt_id', id).order('created_at', { ascending: false }),
      ])
      setObjekt(obj); setProtokolle(proto||[]); setSchaeden(sch||[])
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return (
    <div className="min-h-screen" style={{ background: '#f7f4ee' }}>
      <Navbar session={session} />
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: '#B79B6C', borderTopColor: 'transparent' }} />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#f7f4ee' }}>
      <Navbar session={session} />
      <div className="max-w-5xl mx-auto px-6 py-8">

        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm mb-6 transition"
          style={{ color: '#6f6559' }}
          onMouseOver={e => e.currentTarget.style.color='#B79B6C'}
          onMouseOut={e => e.currentTarget.style.color='#6f6559'}>
          <ArrowLeft size={15} /> Zurück zur Übersicht
        </button>

        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#B79B6C' }}>
            Liegenschaft
          </p>
          <h1 className="text-2xl font-bold" style={{ color: '#2C2C2C' }}>{objekt?.name}</h1>
          <p className="text-sm mt-1" style={{ color: '#6f6559' }}>{objekt?.adresse}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6" style={{ borderColor: '#e7ded0' }}>
          <Tab active={tab==='protokolle'} onClick={() => setTab('protokolle')}>
            <span className="flex items-center gap-1.5"><FileText size={14}/> Protokolle ({protokolle.length})</span>
          </Tab>
          <Tab active={tab==='schaden'} onClick={() => setTab('schaden')}>
            <span className="flex items-center gap-1.5"><AlertTriangle size={14}/> Schadensmeldungen ({schaeden.length})</span>
          </Tab>
        </div>

        {tab === 'protokolle' && (
          <div className="space-y-3">
            {protokolle.length === 0 ? <Empty icon={<FileText size={36}/>} text="Noch keine Protokolle vorhanden." />
            : protokolle.map(p => (
              <div key={p.id} className="card p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={14} style={{ color: '#B79B6C' }} />
                    <span className="font-semibold text-sm" style={{ color: '#2C2C2C' }}>
                      {format(new Date(p.datum), 'dd. MMMM yyyy', { locale: de })}
                    </span>
                  </div>
                  {p.notizen && <p className="text-sm mt-2" style={{ color: '#6f6559' }}>{p.notizen}</p>}
                  {p.mitarbeiter && <p className="text-xs mt-1" style={{ color: '#a09080' }}>Mitarbeiter: {p.mitarbeiter}</p>}
                </div>
                {p.pdf_url && (
                  <a href={p.pdf_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                    style={{ background: 'rgba(183,155,108,0.1)', color: '#B79B6C' }}>
                    <Download size={13}/> PDF
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'schaden' && (
          <div className="space-y-3">
            {schaeden.length === 0 ? <Empty icon={<CheckCircle2 size={36} style={{ color: '#86efac' }}/>} text="Keine Schadensmeldungen vorhanden." />
            : schaeden.map(s => (
              <div key={s.id} className="card p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: s.behoben ? '#22c55e' : '#ef4444' }} />
                      <span className="font-semibold text-sm" style={{ color: '#2C2C2C' }}>{s.titel}</span>
                    </div>
                    {s.beschreibung && <p className="text-sm mt-1" style={{ color: '#6f6559' }}>{s.beschreibung}</p>}
                    <p className="text-xs mt-2" style={{ color: '#a09080' }}>
                      Gemeldet: {format(new Date(s.created_at), 'dd.MM.yyyy', { locale: de })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={s.behoben
                        ? { background: '#f0fdf4', color: '#16a34a' }
                        : { background: '#fef2f2', color: '#dc2626' }}>
                      {s.behoben ? 'Behoben' : 'Offen'}
                    </span>
                    {!s.behoben && (
                      <button
                        onClick={async () => {
                          await supabase.from('schadensmeldungen').update({ behoben: true }).eq('id', s.id)
                          await supabase.from('objekte').update({ status: 'ok' }).eq('id', id)
                          setSchaeden(prev => prev.map(x => x.id === s.id ? { ...x, behoben: true } : x))
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                        style={{ background: '#f0fdf4', color: '#16a34a' }}>
                        <CheckCheck size={13}/> Als behoben markieren
                      </button>
                    )}
                    <button
                      onClick={async () => {
                        const blob = await generateSchadenPDF({
                          objekt, hausverwaltung: '', titel: s.titel,
                          beschreibung: s.beschreibung, datum: s.created_at?.split('T')[0],
                          fotoUrl: s.foto_url
                        })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url; a.download = `Schadensmeldung_${s.titel?.slice(0,20)}.pdf`
                        a.click(); URL.revokeObjectURL(url)
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                      style={{ background: 'rgba(183,155,108,0.1)', color: '#B79B6C' }}>
                      <Download size={13}/> PDF
                    </button>
                  </div>
                </div>
                {s.foto_url && <img src={s.foto_url} alt="Schaden" className="mt-4 rounded-xl w-full object-cover" style={{ maxHeight: '400px' }} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Empty({ icon, text }) {
  return (
    <div className="card p-14 text-center">
      <div className="mx-auto mb-3 flex justify-center" style={{ color: '#e7ded0' }}>{icon}</div>
      <p className="text-sm" style={{ color: '#6f6559' }}>{text}</p>
    </div>
  )
}
