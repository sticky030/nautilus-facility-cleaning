import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== password2) { setError('Passwörter stimmen nicht überein.'); return }
    if (password.length < 8) { setError('Passwort muss mindestens 8 Zeichen haben.'); return }
    setLoading(true)
    const { error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) {
      setError(signUpError.message)
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(183,155,108,0.25)',
    borderRadius: '10px', color: '#f0e8d5',
    fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  }
  const labelStyle = {
    display: 'block', fontSize: '0.6rem', fontWeight: 600,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#B79B6C', marginBottom: '6px',
    fontFamily: "'Inter', sans-serif"
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1a1510 0%, #231a0d 50%, #1a1510 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', fontFamily: "'Inter', sans-serif"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"/>

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 300, letterSpacing: '0.3em',
          background: 'linear-gradient(135deg, #c9a96e 0%, #f0d898 50%, #B79B6C 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '4px'
        }}>NAUTILUS</p>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6f6559' }}>
          Facility Cleaning
        </p>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(42,32,18,0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(183,155,108,0.2)',
        borderRadius: '20px', padding: '2.5rem'
      }}>
        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: '#f0e8d5', marginBottom: '0.75rem' }}>
              Fast geschafft!
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#a09080', lineHeight: 1.6 }}>
              Wir haben dir eine Bestätigungsmail an <strong style={{ color: '#c9a96e' }}>{email}</strong> geschickt.
              Bitte bestätige deine E-Mail-Adresse — danach kannst du dich einloggen.
            </p>
            <button onClick={() => navigate('/')} style={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #c9a96e, #B79B6C)',
              border: 'none', borderRadius: '10px',
              color: '#1a1510', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              cursor: 'pointer'
            }}>Zum Login</button>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 300, color: '#f0e8d5', marginBottom: '0.4rem' }}>
              Konto erstellen
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#6f6559', marginBottom: '1.8rem' }}>
              Registriere dich mit der E-Mail, die dein Dienstleister hinterlegt hat.
            </p>

            {error && (
              <div style={{
                padding: '0.75rem 1rem', marginBottom: '1rem',
                background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
                borderRadius: '10px', color: '#fca5a5', fontSize: '0.78rem'
              }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>E-Mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ihre@email.de" required style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Passwort</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Mindestens 8 Zeichen" required style={inputStyle}/>
              </div>
              <div>
                <label style={labelStyle}>Passwort bestätigen</label>
                <input type="password" value={password2} onChange={e => setPassword2(e.target.value)}
                  placeholder="Passwort wiederholen" required style={inputStyle}/>
              </div>

              <button type="submit" disabled={loading} style={{
                marginTop: '0.5rem',
                padding: '0.9rem', border: 'none', borderRadius: '10px',
                background: loading ? 'rgba(183,155,108,0.3)' : 'linear-gradient(135deg, #c9a96e, #B79B6C)',
                color: loading ? '#6f6559' : '#1a1510',
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Inter', sans-serif"
              }}>{loading ? 'Registrieren...' : 'Konto erstellen'}</button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.75rem', color: '#6f6559' }}>
              Bereits registriert?{' '}
              <button onClick={() => navigate('/')} style={{
                background: 'none', border: 'none', color: '#c9a96e',
                cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline'
              }}>Zum Login</button>
            </p>
          </>
        )}
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.65rem', color: '#3d3028', letterSpacing: '0.1em' }}>
        kontakt@nautilus-facility.de
      </p>
    </div>
  )
}
