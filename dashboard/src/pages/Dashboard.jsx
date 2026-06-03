import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import { Building2, CheckCircle2, AlertTriangle, XCircle, ChevronRight, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

function StatusBadge({ status }) {
  const map = {
    ok:       { label: 'Alles OK',  bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
    hinweis:  { label: 'Hinweis',   bg: '#fffbeb', color: '#d97706', dot: '#f59e0b' },
    dringend: { label: 'Dringend',  bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' },
  }
  const s = map[status] || map['ok']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '3px 10px', borderRadius: '999px',
      background: s.bg, color: s.color,
      fontSize: '0.72rem', fontWeight: 600,
      fontFamily: "'Inter', sans-serif"
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  )
}

function StatCard({ label, value, icon, bg, accent }) {
  return (
    <div style={{
      background: 'white', border: '1px solid #e7ded0',
      borderRadius: '16px', padding: '1.2rem 1.4rem',
      display: 'flex', alignItems: 'center', gap: '1rem',
      boxShadow: '0 2px 12px rgba(183,155,108,0.06)'
    }}>
      <div style={{
        width: '46px', height: '46px', borderRadius: '12px',
        background: bg, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0, color: accent
      }}>{icon}</div>
      <div>
        <div style={{
          fontSize: '1.75rem', fontWeight: 700, color: '#2C2C2C',
          fontFamily: "'Cormorant Garamond', serif", lineHeight: 1
        }}>{value}</div>
        <div style={{
          fontSize: '0.7rem', color: '#6f6559', marginTop: '3px',
          fontFamily: "'Inter', sans-serif"
        }}>{label}</div>
      </div>
    </div>
  )
}

export default function Dashboard({ session }) {
  const [objekte, setObjekte] = useState([])
  const [loading, setLoading] = useState(true)
  const [hvName, setHvName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const { data: hvData } = await supabase
        .from('hausverwaltungen').select('id, name')
        .eq('user_id', session.user.id).single()
      if (!hvData) { setLoading(false); return }
      setHvName(hvData.name)
      const { data } = await supabase
        .from('objekte')
        .select(`id, name, adresse, status,
          protokolle ( id, datum ),
          schadensmeldungen ( id, behoben )`)
        .eq('hausverwaltung_id', hvData.id)
        .order('name')
      setObjekte(data || [])
      setLoading(false)
    }
    load()
  }, [session])

  const stats = {
    gesamt:   objekte.length,
    ok:       objekte.filter(o => o.status === 'ok').length,
    hinweis:  objekte.filter(o => o.status === 'hinweis').length,
    dringend: objekte.filter(o => o.status === 'dringend').length,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f4ee', fontFamily: "'Inter', sans-serif" }}>
      <Navbar session={session} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: '#B79B6C', marginBottom: '6px',
            fontFamily: "'Inter', sans-serif"
          }}>Objektübersicht</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2rem', fontWeight: 400,
            color: '#2C2C2C', lineHeight: 1.1
          }}>{hvName || 'Meine Objekte'}</h1>
          <p style={{ fontSize: '0.82rem', color: '#6f6559', marginTop: '4px' }}>
            Alle verwalteten Liegenschaften auf einen Blick
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <StatCard label="Objekte gesamt" value={stats.gesamt}
            icon={<Building2 size={20}/>} bg="rgba(183,155,108,0.1)" accent="#B79B6C" />
          <StatCard label="Alles OK" value={stats.ok}
            icon={<CheckCircle2 size={20}/>} bg="#f0fdf4" accent="#16a34a" />
          <StatCard label="Hinweise" value={stats.hinweis}
            icon={<AlertTriangle size={20}/>} bg="#fffbeb" accent="#d97706" />
          <StatCard label="Dringend" value={stats.dringend}
            icon={<XCircle size={20}/>} bg="#fef2f2" accent="#dc2626" />
        </div>

        {/* Tabelle */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              border: '2px solid #e7ded0', borderTopColor: '#B79B6C',
              animation: 'spin 0.8s linear infinite'
            }}/>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : objekte.length === 0 ? (
          <div style={{
            background: 'white', border: '1px solid #e7ded0', borderRadius: '16px',
            padding: '4rem', textAlign: 'center'
          }}>
            <Building2 size={36} style={{ color: '#e7ded0', margin: '0 auto 12px' }}/>
            <p style={{ color: '#6f6559', fontSize: '0.875rem' }}>Noch keine Objekte vorhanden.</p>
          </div>
        ) : (
          <div style={{
            background: 'white', border: '1px solid #e7ded0',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(183,155,108,0.07)'
          }}>
            {/* Tabellenkopf */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 120px 160px 120px 40px',
              padding: '0.75rem 1.5rem',
              background: '#faf8f4',
              borderBottom: '1px solid #e7ded0',
            }}>
              {['Objekt', 'Adresse', 'Status', 'Letzte Reinigung', 'Schäden', ''].map(h => (
                <span key={h} style={{
                  fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#B79B6C',
                  fontFamily: "'Inter', sans-serif"
                }}>{h}</span>
              ))}
            </div>

            {/* Zeilen */}
            {objekte.map((obj, i) => {
              const letztes = obj.protokolle?.sort((a,b) => new Date(b.datum)-new Date(a.datum))[0]
              const offene = obj.schadensmeldungen?.filter(s => !s.behoben).length || 0
              return (
                <div key={obj.id}
                  onClick={() => navigate(`/objekt/${obj.id}`)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 120px 160px 120px 40px',
                    padding: '1rem 1.5rem',
                    borderBottom: i < objekte.length-1 ? '1px solid #f0ece4' : 'none',
                    cursor: 'pointer', transition: 'background 0.15s',
                    alignItems: 'center'
                  }}
                  onMouseOver={e => e.currentTarget.style.background='rgba(183,155,108,0.04)'}
                  onMouseOut={e => e.currentTarget.style.background='transparent'}>
                  <span style={{ fontWeight: 600, color: '#2C2C2C', fontSize: '0.875rem' }}>{obj.name}</span>
                  <span style={{ color: '#6f6559', fontSize: '0.82rem' }}>{obj.adresse}</span>
                  <span><StatusBadge status={obj.status} /></span>
                  <span style={{ color: '#6f6559', fontSize: '0.8rem' }}>
                    {letztes ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={12} style={{ color: '#B79B6C' }}/>
                        {formatDistanceToNow(new Date(letztes.datum), { addSuffix: true, locale: de })}
                      </span>
                    ) : <span style={{ color: '#d6c9b8' }}>—</span>}
                  </span>
                  <span>
                    {offene > 0
                      ? <span style={{
                          padding: '2px 10px', borderRadius: '999px',
                          background: '#fef2f2', color: '#dc2626',
                          fontSize: '0.72rem', fontWeight: 700
                        }}>{offene}</span>
                      : <span style={{ color: '#d6c9b8', fontSize: '0.75rem' }}>Keine</span>}
                  </span>
                  <span><ChevronRight size={15} style={{ color: '#B79B6C' }}/></span>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <p style={{
          textAlign: 'center', fontSize: '0.68rem', marginTop: '3rem',
          color: '#c9b99a', fontFamily: "'Inter', sans-serif"
        }}>
          Nautilus Facility Cleaning · Berlin · nautilus-facility.de
        </p>
      </div>
    </div>
  )
}
