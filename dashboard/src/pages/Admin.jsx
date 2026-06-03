import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { generateSchadenPDF } from '../lib/generatePDF'
import Navbar from '../components/Navbar'
import ProtocolForm from '../components/ProtocolForm'
import { FileText, AlertTriangle, Building2, Users, Check, ArrowLeft } from 'lucide-react'

export default function Admin({ session }) {
  const [activeSection, setActiveSection] = useState('protokoll')
  const [hausverwaltungen, setHausverwaltungen] = useState([])
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Schaden form
  const [selectedHV, setSelectedHV] = useState('')
  const [selectedObjekt, setSelectedObjekt] = useState('')
  const [objekte, setObjekte] = useState([])
  const [schadenTitel, setSchadenTitel] = useState('')
  const [schadenBeschreibung, setSchadenBeschreibung] = useState('')
  const [schadenFoto, setSchadenFoto] = useState(null)

  // HV form
  const [hvName, setHvName] = useState('')
  const [hvEmail, setHvEmail] = useState('')
  const [hvRegistrierLink, setHvRegistrierLink] = useState('')

  // Objekt form
  const [objektName, setObjektName] = useState('')
  const [objektAdresse, setObjektAdresse] = useState('')

  useEffect(() => {
    supabase.from('hausverwaltungen').select('id, name').then(({ data }) => setHausverwaltungen(data || []))
  }, [])

  useEffect(() => {
    if (!selectedHV) { setObjekte([]); setSelectedObjekt(''); return }
    supabase.from('objekte').select('id, name').eq('hausverwaltung_id', selectedHV)
      .then(({ data }) => setObjekte(data || []))
  }, [selectedHV])

  function showSuccess(msg) {
    setSuccess(msg)
    setTimeout(() => setSuccess(''), 4000)
  }

  async function handleSchadenseintrag(e) {
    e.preventDefault(); setLoading(true)
    try {
      let fotoUrl = null
      if (schadenFoto) {
        const path = `schaeden/${selectedObjekt}/${Date.now()}.${schadenFoto.name.split('.').pop()}`
        const { data: up } = await supabase.storage.from('fotos').upload(path, schadenFoto)
        if (up) fotoUrl = supabase.storage.from('fotos').getPublicUrl(path).data.publicUrl
      }

      const objekt = objekte.find(o => o.id === selectedObjekt)
      const hv = hausverwaltungen.find(h => h.id === selectedHV)

      // PDF generieren
      const pdfBlob = await generateSchadenPDF({
        objekt,
        hausverwaltung: hv?.name,
        titel: schadenTitel,
        beschreibung: schadenBeschreibung,
        datum: new Date().toISOString().split('T')[0],
        fotoUrl,
      })

      // PDF hochladen
      const pdfPath = `schaeden/${selectedObjekt}/schaden_${Date.now()}.pdf`
      await supabase.storage.from('fotos').upload(pdfPath, pdfBlob, { contentType: 'application/pdf' })
      const { data: pdfUrlData } = supabase.storage.from('fotos').getPublicUrl(pdfPath)

      await supabase.from('schadensmeldungen').insert({
        objekt_id: selectedObjekt, titel: schadenTitel,
        beschreibung: schadenBeschreibung, foto_url: fotoUrl, behoben: false
      })
      await supabase.from('objekte').update({ status: 'dringend' }).eq('id', selectedObjekt)

      setSchadenTitel(''); setSchadenBeschreibung(''); setSchadenFoto(null)
      showSuccess('Schadensmeldung + PDF gespeichert!')
    } catch(err) {
      showSuccess('Fehler: ' + err.message)
    }
    setLoading(false)
  }

  async function handleNeueHV(e) {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('hausverwaltungen').insert({ name: hvName, email: hvEmail })
    if (!error) {
      const link = `${window.location.origin}/signup`
      setHvRegistrierLink(link)
      showSuccess('Hausverwaltung angelegt! Link zum Registrieren kopieren.')
    } else {
      showSuccess('Fehler: ' + (error?.message || 'Unbekannt'))
    }
    setLoading(false)
  }

  async function handleNeuesObjekt(e) {
    e.preventDefault(); setLoading(true)
    await supabase.from('objekte').insert({
      hausverwaltung_id: selectedHV, name: objektName, adresse: objektAdresse, status: 'ok'
    })
    setObjektName(''); setObjektAdresse('')
    showSuccess('Objekt angelegt!')
    setLoading(false)
  }

  const sections = [
    { id: 'protokoll', label: 'Protokoll erstellen', icon: <FileText size={15}/> },
    { id: 'schaden',   label: 'Schaden melden',     icon: <AlertTriangle size={15}/> },
    { id: 'objekt',    label: 'Neues Objekt',        icon: <Building2 size={15}/> },
    { id: 'hv',        label: 'Neue Hausverwaltung', icon: <Users size={15}/> },
  ]

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem',
    background: '#faf8f4', border: '1px solid #e7ded0',
    borderRadius: '8px', color: '#2C2C2C',
    fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box'
  }
  const labelStyle = {
    display: 'block', fontSize: '0.62rem', fontWeight: 600,
    letterSpacing: '0.18em', textTransform: 'uppercase',
    color: '#6f6559', marginBottom: '6px',
    fontFamily: "'Inter', sans-serif"
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f4ee', fontFamily: "'Inter', sans-serif" }}>
      <Navbar session={session} />
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        <button onClick={() => navigate('/dashboard')} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#6f6559', fontSize: '0.8rem', marginBottom: '1.5rem', padding: 0
        }}>
          <ArrowLeft size={14}/> Zurück zur Übersicht
        </button>

        <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#B79B6C', marginBottom: '6px' }}>Admin</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: '#2C2C2C', marginBottom: '0.4rem' }}>Verwaltung</h1>
        <p style={{ fontSize: '0.82rem', color: '#6f6559', marginBottom: '2rem' }}>Protokolle erstellen, Schäden melden, Kunden verwalten</p>

        {success && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '0.75rem 1rem', marginBottom: '1.5rem',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
            borderRadius: '10px', color: '#16a34a', fontSize: '0.82rem'
          }}>
            <Check size={15}/> {success}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '8px 16px', borderRadius: '10px', cursor: 'pointer',
              border: activeSection === s.id ? 'none' : '1px solid #e7ded0',
              background: activeSection === s.id
                ? 'linear-gradient(135deg, #c9a96e, #B79B6C)' : 'white',
              color: activeSection === s.id ? '#1a1510' : '#6f6559',
              fontSize: '0.78rem', fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              boxShadow: activeSection === s.id ? '0 4px 12px rgba(183,155,108,0.3)' : 'none',
              transition: 'all 0.15s'
            }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{
          background: 'white', border: '1px solid #e7ded0',
          borderRadius: '16px', padding: '1.8rem',
          boxShadow: '0 2px 16px rgba(183,155,108,0.07)'
        }}>

          {/* Protokoll */}
          {activeSection === 'protokoll' && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: '#2C2C2C', marginBottom: '1.2rem' }}>
                Reinigungsprotokoll erstellen
              </h2>
              <ProtocolForm
                hausverwaltungen={hausverwaltungen}
                onSuccess={() => showSuccess('Protokoll erstellt und PDF gespeichert!')}
              />
            </div>
          )}

          {/* Schaden */}
          {activeSection === 'schaden' && (
            <form onSubmit={handleSchadenseintrag} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: '#2C2C2C', marginBottom: '0.2rem' }}>
                Schadensmeldung erfassen
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Hausverwaltung</label>
                  <select value={selectedHV} onChange={e => setSelectedHV(e.target.value)} required style={inputStyle}>
                    <option value="">Wählen...</option>
                    {hausverwaltungen.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Objekt</label>
                  <select value={selectedObjekt} onChange={e => setSelectedObjekt(e.target.value)} required disabled={!selectedHV} style={inputStyle}>
                    <option value="">Wählen...</option>
                    {objekte.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Titel</label>
                <input type="text" value={schadenTitel} onChange={e => setSchadenTitel(e.target.value)}
                  placeholder="z.B. Riss in Treppenhauswand" required style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Beschreibung</label>
                <textarea value={schadenBeschreibung} onChange={e => setSchadenBeschreibung(e.target.value)}
                  rows={3} style={{ ...inputStyle, resize: 'none' }}/>
              </div>
              <div>
                <label style={labelStyle}>Foto</label>
                <input type="file" accept="image/*" onChange={e => setSchadenFoto(e.target.files[0])}
                  style={{ fontSize: '0.8rem', color: '#6f6559' }}/>
              </div>
              <button type="submit" disabled={loading} style={{
                padding: '0.8rem', background: loading ? '#e7ded0' : '#dc2626',
                border: 'none', borderRadius: '10px', color: 'white',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', cursor: 'pointer'
              }}>{loading ? 'Speichern...' : 'Schaden melden'}</button>
            </form>
          )}

          {/* Neues Objekt */}
          {activeSection === 'objekt' && (
            <form onSubmit={handleNeuesObjekt} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: '#2C2C2C' }}>
                Neues Objekt anlegen
              </h2>
              <div>
                <label style={labelStyle}>Hausverwaltung</label>
                <select value={selectedHV} onChange={e => setSelectedHV(e.target.value)} required style={inputStyle}>
                  <option value="">Wählen...</option>
                  {hausverwaltungen.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Objektname</label>
                <input type="text" value={objektName} onChange={e => setObjektName(e.target.value)}
                  placeholder="z.B. Musterstraße 12" required style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Adresse</label>
                <input type="text" value={objektAdresse} onChange={e => setObjektAdresse(e.target.value)}
                  placeholder="Straße, PLZ Berlin" required style={inputStyle}/>
              </div>
              <GoldButton loading={loading} label="Objekt anlegen"/>
            </form>
          )}

          {/* Neue HV */}
          {activeSection === 'hv' && (
            <form onSubmit={handleNeueHV} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: '#2C2C2C' }}>
                Neue Hausverwaltung anlegen
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#6f6559', background: '#faf8f4', borderRadius: '8px', padding: '0.75rem 1rem', border: '1px solid #e7ded0' }}>
                Trage Firmenname und E-Mail ein. Der Kunde registriert sich dann selbst über den Registrierungslink.
              </p>
              <div>
                <label style={labelStyle}>Firmenname</label>
                <input type="text" value={hvName} onChange={e => setHvName(e.target.value)}
                  placeholder="Muster Hausverwaltung GmbH" required style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>E-Mail des Kunden</label>
                <input type="email" value={hvEmail} onChange={e => setHvEmail(e.target.value)}
                  placeholder="kunde@hausverwaltung.de" required style={inputStyle}/>
              </div>
              <GoldButton loading={loading} label="Hausverwaltung anlegen"/>
              {hvRegistrierLink && (
                <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#16a34a', marginBottom: '6px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Registrierungslink für Kunden:</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <code style={{ fontSize: '0.78rem', background: 'white', padding: '6px 10px', borderRadius: '6px', border: '1px solid #bbf7d0', flex: 1, wordBreak: 'break-all' }}>
                      {hvRegistrierLink}
                    </code>
                    <button type="button" onClick={() => navigator.clipboard.writeText(hvRegistrierLink)} style={{
                      padding: '6px 12px', background: '#16a34a', border: 'none', borderRadius: '6px',
                      color: 'white', fontSize: '0.72rem', cursor: 'pointer', whiteSpace: 'nowrap'
                    }}>Kopieren</button>
                  </div>
                  <p style={{ fontSize: '0.68rem', color: '#6f6559', marginTop: '6px' }}>
                    Der Kunde registriert sich mit der E-Mail <strong>{hvEmail}</strong> — das System verbindet ihn automatisch.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function GoldButton({ loading, label }) {
  return (
    <button type="submit" disabled={loading} style={{
      padding: '0.8rem', border: 'none', borderRadius: '10px',
      background: loading ? '#e7ded0' : 'linear-gradient(135deg, #c9a96e, #B79B6C)',
      color: loading ? '#6f6559' : '#1a1510',
      fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
      textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
      fontFamily: "'Inter', sans-serif"
    }}>{loading ? 'Speichern...' : label}</button>
  )
}
