import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('E-Mail oder Passwort nicht korrekt.')
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400;500;600&display=swap');

        .login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #1a1510;
          background-image:
            radial-gradient(ellipse at 15% 20%, rgba(183,155,108,0.13) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 80%, rgba(183,155,108,0.09) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(93,70,35,0.15) 0%, transparent 70%);
        }

        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 2.8rem;
          letter-spacing: 0.3em;
          margin-left: 0.3em;
          line-height: 1;
          text-transform: uppercase;
          background: linear-gradient(135deg, #e8d5a3 0%, #B79B6C 40%, #d4b87a 70%, #c9a96e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 12px rgba(183,155,108,0.25));
        }

        .brand-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.42em;
          margin-left: 0.42em;
          text-transform: uppercase;
          color: rgba(183,155,108,0.7);
          margin-top: 0.75rem;
        }

        .portal-label {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1.4rem;
          letter-spacing: 0.18em;
          margin-left: 0.18em;
          color: rgba(232,213,163,0.35);
          margin-top: 1.2rem;
        }

        .gold-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 1.5rem;
        }
        .gold-line::before,
        .gold-line::after {
          content: '';
          height: 1px;
          width: 56px;
          background: linear-gradient(90deg, transparent, rgba(183,155,108,0.55), transparent);
        }
        .gold-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: radial-gradient(circle, #e8d5a3, #B79B6C);
          box-shadow: 0 0 8px rgba(183,155,108,0.9), 0 0 16px rgba(183,155,108,0.4);
        }

        .login-card {
          background: rgba(42,32,18,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(183,155,108,0.22);
          border-top: 1px solid rgba(232,213,163,0.18);
          border-radius: 20px;
          padding: 2.2rem;
          margin-top: 2rem;
          box-shadow:
            0 32px 64px rgba(0,0,0,0.5),
            0 0 0 1px rgba(183,155,108,0.05) inset;
        }

        .field-label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(183,155,108,0.65);
          margin-bottom: 0.5rem;
        }

        .login-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255,248,235,0.05);
          border: 1px solid rgba(183,155,108,0.2);
          border-radius: 10px;
          color: #f0e6cc;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.25s;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: rgba(183,155,108,0.25); }
        .login-input:focus {
          border-color: rgba(183,155,108,0.55);
          background: rgba(255,248,235,0.08);
          box-shadow: 0 0 0 3px rgba(183,155,108,0.1);
        }

        .gold-btn {
          width: 100%;
          padding: 0.85rem;
          margin-top: 0.5rem;
          background: linear-gradient(135deg, #c9a96e 0%, #B79B6C 45%, #9a7d4a 100%);
          border: none;
          border-radius: 10px;
          color: #1a1510;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(183,155,108,0.35);
        }
        .gold-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(183,155,108,0.5);
          background: linear-gradient(135deg, #d4b47a 0%, #c4a86e 45%, #a88a52 100%);
        }
        .gold-btn:active:not(:disabled) { transform: translateY(0); }
        .gold-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .error-box {
          background: rgba(220,38,38,0.1);
          border: 1px solid rgba(220,38,38,0.25);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #fca5a5;
          font-size: 0.8rem;
          margin-bottom: 1.2rem;
          font-family: 'Inter', sans-serif;
        }

        .footer-link {
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          color: rgba(183,155,108,0.3);
          margin-top: 1.6rem;
        }
        .footer-link a { color: rgba(183,155,108,0.55); text-decoration: none; transition: color 0.2s; }
        .footer-link a:hover { color: #B79B6C; }
      `}</style>

      <div className="login-bg">
        <div style={{ width: '100%', maxWidth: '360px' }}>

          <div style={{ textAlign: 'center' }}>
            <div className="brand-name">Nautilus</div>
            <div className="brand-sub">Facility Cleaning</div>
            <div className="gold-line"><div className="gold-dot" /></div>
            <div className="portal-label">Kundenportal</div>
          </div>

          <div className="login-card">
            {error && <div className="error-box">{error}</div>}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <label className="field-label">E-Mail</label>
                <input type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ihre@email.de"
                  className="login-input" />
              </div>
              <div style={{ marginBottom: '1.2rem' }}>
                <label className="field-label">Passwort</label>
                <input type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="login-input" />
              </div>
              <button type="submit" disabled={loading} className="gold-btn">
                {loading ? 'Anmelden...' : 'Anmelden'}
              </button>
            </form>
          </div>

          <div className="footer-link">
            Bei Problemen:{' '}
            <a href="mailto:kontakt@nautilus-facility.de">
              kontakt@nautilus-facility.de
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
