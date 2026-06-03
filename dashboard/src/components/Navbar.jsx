import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { LogOut, Settings } from 'lucide-react'

export default function Navbar({ session }) {
  const navigate = useNavigate()
  const isAdmin = session?.user?.email === import.meta.env.VITE_ADMIN_EMAIL

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>
      <nav style={{
        background: '#1a1510',
        borderBottom: '1px solid rgba(183,155,108,0.3)',
        padding: '0 1.5rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 20px rgba(0,0,0,0.15)'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}>
          <img src="/logo.png" alt="Nautilus" style={{
            width: '52px', height: '52px', objectFit: 'contain',
            filter: 'drop-shadow(0 1px 6px rgba(183,155,108,0.5))'
          }}/>
          <div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.1rem', fontWeight: 400,
              letterSpacing: '0.15em',
              background: 'linear-gradient(135deg, #e8d5a3, #B79B6C)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>NAUTILUS</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.6rem', fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'rgba(183,155,108,0.5)',
              marginLeft: '8px', textTransform: 'uppercase'
            }}>Facility Cleaning</span>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isAdmin && (
            <button onClick={() => navigate('/admin')} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '6px 12px', borderRadius: '8px', border: 'none',
              background: 'transparent', cursor: 'pointer',
              color: 'rgba(183,155,108,0.7)',
              fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
              fontWeight: 500, transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.background='rgba(183,155,108,0.1)'; e.currentTarget.style.color='#B79B6C' }}
            onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(183,155,108,0.7)' }}>
              <Settings size={13}/> Admin
            </button>
          )}
          <div style={{
            width: '1px', height: '16px',
            background: 'rgba(183,155,108,0.2)', margin: '0 4px'
          }}/>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.3)', padding: '0 8px'
          }}>{session?.user?.email}</span>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 12px', borderRadius: '8px', border: 'none',
            background: 'transparent', cursor: 'pointer',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
            fontWeight: 500, transition: 'all 0.2s'
          }}
          onMouseOver={e => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }}
          onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.35)' }}>
            <LogOut size={13}/> Abmelden
          </button>
        </div>
      </nav>
    </>
  )
}
