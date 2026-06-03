import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import SignaturePad from './SignaturePad'
import { generateProtocolPDF } from '../lib/generatePDF'
import { Check, X } from 'lucide-react'

const BEREICHE = [
  { key: 'eingang',      label: 'Eingangsbereich / Haustür' },
  { key: 'treppenhaus',  label: 'Treppenhaus' },
  { key: 'aufzug',       label: 'Aufzug / Fahrstuhl' },
  { key: 'keller',       label: 'Keller / Kellergang' },
  { key: 'muellraum',    label: 'Müllraum' },
  { key: 'fahrradraum',  label: 'Fahrradraum' },
  { key: 'aussenanlage', label: 'Außenanlage / Gehweg' },
  { key: 'tiefgarage',   label: 'Tiefgarage / Stellplätze' },
  { key: 'waschraum',    label: 'Wasch- / Trockenraum' },
  { key: 'dachboden',    label: 'Dachboden / Gemeinschaftsraum' },
]


export default function ProtocolForm({ objekte, hausverwaltungen, onSuccess }) {
  const [selectedHV, setSelectedHV] = useState('')
  const [selectedObjekt, setSelectedObjekt] = useState('')
  const [filteredObjekte, setFilteredObjekte] = useState([])
  const [datum, setDatum] = useState(new Date().toISOString().split('T')[0])
  const [zeitVon, setZeitVon] = useState('')
  const [zeitBis, setZeitBis] = useState('')
  const [mitarbeiter, setMitarbeiter] = useState('')
  const [bereiche, setBereiche] = useState(
    Object.fromEntries(BEREICHE.map(b => [b.key, { erledigt: false, notiz: '' }]))
  )
  const [gesamtNotizen, setGesamtNotizen] = useState('')
  const [maengel, setMaengel] = useState('')
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1=Grunddaten, 2=Bereiche, 3=Unterschrift
  const sigRef = useRef(null)

  function handleHVChange(hvId) {
    setSelectedHV(hvId)
    setSelectedObjekt('')
    const hv = hausverwaltungen.find(h => h.id === hvId)
    // filter objekte by HV
    supabase.from('objekte').select('id, name, adresse')
      .eq('hausverwaltung_id', hvId)
      .then(({ data }) => setFilteredObjekte(data || []))
  }

  function toggleBereich(key) {
    setBereiche(prev => ({ ...prev, [key]: { ...prev[key], erledigt: !prev[key].erledigt } }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedObjekt) return alert('Bitte ein Objekt auswählen.')
    if (sigRef.current?.isEmpty()) return alert('Bitte unterschreiben.')
    setLoading(true)

    try {
      const objekt = filteredObjekte.find(o => o.id === selectedObjekt)
      const signatureDataURL = sigRef.current.getDataURL()

      // Fotos hochladen
      const fotoUrls = []
      for (const foto of fotos) {
        const path = `protokolle/${selectedObjekt}/${Date.now()}_${foto.name}`
        const { data: up } = await supabase.storage.from('fotos').upload(path, foto)
        if (up) {
          const { data: url } = supabase.storage.from('fotos').getPublicUrl(path)
          fotoUrls.push(url.publicUrl)
        }
      }

      // PDF generieren
      const pdfBlob = await generateProtocolPDF({
        objekt, datum, zeitVon, zeitBis, mitarbeiter,
        bereiche, gesamtNotizen, maengel,
        signatureDataURL, fotoUrls
      })

      // PDF hochladen
      const pdfPath = `protokolle/${selectedObjekt}/protokoll_${datum}_${Date.now()}.pdf`
      await supabase.storage.from('fotos').upload(pdfPath, pdfBlob, { contentType: 'application/pdf' })
      const { data: pdfUrl } = supabase.storage.from('fotos').getPublicUrl(pdfPath)

      // Protokoll in DB speichern
      await supabase.from('protokolle').insert({
        objekt_id: selectedObjekt,
        datum,
        mitarbeiter,
        notizen: gesamtNotizen,
        pdf_url: pdfUrl.publicUrl,
      })

      // Objekt-Status updaten
      const hatMaengel = maengel.trim().length > 0
      await supabase.from('objekte').update({
        status: hatMaengel ? 'hinweis' : 'ok'
      }).eq('id', selectedObjekt)

      onSuccess?.()
    } catch (err) {
      console.error(err)
      alert('Fehler beim Speichern: ' + err.message)
    }
    setLoading(false)
  }

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
    <div>
      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        {['Grunddaten', 'Bereiche', 'Abschluss'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: step > i+1 ? '#B79B6C' : step === i+1 ? '#2C2C2C' : '#e7ded0',
              color: step >= i+1 ? 'white' : '#6f6559',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 700, flexShrink: 0
            }}>
              {step > i+1 ? <Check size={12}/> : i+1}
            </div>
            <span style={{
              fontSize: '0.72rem', fontWeight: step === i+1 ? 600 : 400,
              color: step === i+1 ? '#2C2C2C' : '#6f6559',
              fontFamily: "'Inter', sans-serif"
            }}>{s}</span>
            {i < 2 && <div style={{ width: '24px', height: '1px', background: '#e7ded0' }}/>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>

        {/* Step 1: Grunddaten */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Hausverwaltung</label>
                <select value={selectedHV} onChange={e => handleHVChange(e.target.value)}
                  required style={inputStyle}>
                  <option value="">Wählen...</option>
                  {hausverwaltungen.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Objekt</label>
                <select value={selectedObjekt} onChange={e => setSelectedObjekt(e.target.value)}
                  required disabled={!selectedHV} style={inputStyle}>
                  <option value="">Wählen...</option>
                  {filteredObjekte.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Datum</label>
                <input type="date" value={datum} onChange={e => setDatum(e.target.value)}
                  required style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Zeit von</label>
                <input type="time" value={zeitVon} onChange={e => setZeitVon(e.target.value)}
                  style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Zeit bis</label>
                <input type="time" value={zeitBis} onChange={e => setZeitBis(e.target.value)}
                  style={inputStyle}/>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Mitarbeiter</label>
              <input type="text" value={mitarbeiter} onChange={e => setMitarbeiter(e.target.value)}
                placeholder="Name des Reinigungsmitarbeiters" required style={inputStyle}/>
            </div>
            <button type="button" onClick={() => setStep(2)} style={{
              marginTop: '0.5rem', padding: '0.75rem',
              background: 'linear-gradient(135deg, #c9a96e, #B79B6C)',
              border: 'none', borderRadius: '10px', color: '#1a1510',
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
            }}>Weiter → Bereiche</button>
          </div>
        )}

        {/* Step 2: Bereiche */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem' }}>
              {BEREICHE.map(b => (
                <div key={b.key} style={{
                  padding: '0.75rem 1rem', borderRadius: '10px',
                  border: `1px solid ${bereiche[b.key].erledigt ? 'rgba(183,155,108,0.4)' : '#e7ded0'}`,
                  background: bereiche[b.key].erledigt ? 'rgba(183,155,108,0.05)' : '#faf8f4',
                  transition: 'all 0.15s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button type="button" onClick={() => toggleBereich(b.key)} style={{
                      width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                      border: `2px solid ${bereiche[b.key].erledigt ? '#B79B6C' : '#d6c9b8'}`,
                      background: bereiche[b.key].erledigt ? '#B79B6C' : 'white',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {bereiche[b.key].erledigt && <Check size={13} color="white"/>}
                    </button>
                    <span style={{
                      flex: 1, fontSize: '0.82rem', fontWeight: 500,
                      color: bereiche[b.key].erledigt ? '#2C2C2C' : '#6f6559',
                      fontFamily: "'Inter', sans-serif"
                    }}>{b.label}</span>
                    {bereiche[b.key].erledigt && (
                      <input
                        type="text"
                        placeholder="Notiz (optional)..."
                        value={bereiche[b.key].notiz}
                        onChange={e => setBereiche(prev => ({ ...prev, [b.key]: { ...prev[b.key], notiz: e.target.value } }))}
                        style={{
                          marginLeft: '8px', flex: 1,
                          padding: '3px 8px', borderRadius: '6px',
                          border: '1px solid #e7ded0', background: 'white',
                          fontSize: '0.75rem', color: '#2C2C2C',
                          fontFamily: "'Inter', sans-serif", outline: 'none'
                        }}
                        onClick={e => e.stopPropagation()}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Mängel / Besonderheiten</label>
              <textarea value={maengel} onChange={e => setMaengel(e.target.value)}
                placeholder="Beschädigungen, Auffälligkeiten, offene Punkte..."
                rows={3} style={{ ...inputStyle, resize: 'none' }}/>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Allgemeine Notizen</label>
              <textarea value={gesamtNotizen} onChange={e => setGesamtNotizen(e.target.value)}
                placeholder="Sonstige Hinweise..." rows={2}
                style={{ ...inputStyle, resize: 'none' }}/>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Fotos (optional)</label>
              <input type="file" accept="image/*" multiple
                onChange={e => setFotos(Array.from(e.target.files))}
                style={{ fontSize: '0.8rem', color: '#6f6559', fontFamily: "'Inter', sans-serif" }}/>
              {fotos.length > 0 && (
                <p style={{ fontSize: '0.72rem', color: '#B79B6C', marginTop: '4px' }}>
                  {fotos.length} Foto{fotos.length > 1 ? 's' : ''} ausgewählt
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setStep(1)} style={{
                flex: 1, padding: '0.75rem', background: 'white',
                border: '1px solid #e7ded0', borderRadius: '10px',
                color: '#6f6559', fontSize: '0.75rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif"
              }}>← Zurück</button>
              <button type="button" onClick={() => setStep(3)} style={{
                flex: 2, padding: '0.75rem',
                background: 'linear-gradient(135deg, #c9a96e, #B79B6C)',
                border: 'none', borderRadius: '10px', color: '#1a1510',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Inter', sans-serif"
              }}>Weiter → Unterschrift</button>
            </div>
          </div>
        )}

        {/* Step 3: Unterschrift + Abschluss */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{
              padding: '1rem', background: '#faf8f4',
              border: '1px solid #e7ded0', borderRadius: '10px',
              fontSize: '0.8rem', color: '#6f6559',
              fontFamily: "'Inter', sans-serif", lineHeight: 1.6
            }}>
              <strong style={{ color: '#2C2C2C' }}>Zusammenfassung</strong>
              <div style={{ marginTop: '6px' }}>
                📍 {filteredObjekte.find(o => o.id === selectedObjekt)?.name || '—'}<br/>
                📅 {datum}{zeitVon && ` · ${zeitVon}–${zeitBis}`}<br/>
                👤 {mitarbeiter}<br/>
                ✅ {Object.values(bereiche).filter(b => b.erledigt).length} von {BEREICHE.length} Bereichen erledigt
                {maengel && <><br/>⚠️ Mängel vermerkt</>}
              </div>
            </div>

            <SignaturePad ref={sigRef} label="Unterschrift Mitarbeiter" />

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setStep(2)} style={{
                flex: 1, padding: '0.75rem', background: 'white',
                border: '1px solid #e7ded0', borderRadius: '10px',
                color: '#6f6559', fontSize: '0.75rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif"
              }}>← Zurück</button>
              <button type="submit" disabled={loading} style={{
                flex: 2, padding: '0.75rem',
                background: loading ? '#e7ded0' : 'linear-gradient(135deg, #c9a96e, #B79B6C)',
                border: 'none', borderRadius: '10px',
                color: loading ? '#6f6559' : '#1a1510',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Inter', sans-serif"
              }}>
                {loading ? 'PDF wird erstellt...' : '✓ Protokoll abschließen + PDF'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
