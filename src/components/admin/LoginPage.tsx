// src/pages/admin/LoginPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ApiError } from '@/api/client'

export default function LoginPage() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPwd, setShowPwd]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/', { replace: true })
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #0D2040 50%, #0A1628 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background circles */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,179,66,0.08) 0%, transparent 70%)', top: -100, right: -100, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', bottom: -100, left: -100, pointerEvents: 'none' }} />

      <div style={{
        width: '100%', maxWidth: 420,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        padding: '40px 40px 36px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 32px 80px rgba(0,0,0,.5)',
        animation: 'fadeIn 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16, margin: '0 auto 16px',
            background: 'linear-gradient(135deg,#7CB342,#4CAF50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 800, color: '#fff',
            fontFamily: "'Space Mono', monospace",
            boxShadow: '0 8px 24px rgba(124,179,66,.4)',
          }}>
            E
          </div>
          <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: '#fff' }}>
            ESMAD Admin
          </h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,.4)', fontSize: 13 }}>
            Espace d'administration de la clinique
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {error && (
            <div style={{
              padding: '11px 14px', borderRadius: 10,
              background: 'rgba(220,38,38,.15)', border: '1px solid rgba(220,38,38,.3)',
              color: '#FCA5A5', fontSize: 13, fontWeight: 500,
            }}>
              ⚠ {error}
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.5)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@esmad.ci"
              required
              style={{
                width: '100%', padding: '12px 14px',
                background: 'rgba(255,255,255,.07)',
                border: '1.5px solid rgba(255,255,255,.1)',
                borderRadius: 10, fontSize: 14,
                color: '#fff', outline: 'none',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                boxSizing: 'border-box',
                transition: 'border 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = '#7CB342' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,.1)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.5)' }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '12px 44px 12px 14px',
                  background: 'rgba(255,255,255,.07)',
                  border: '1.5px solid rgba(255,255,255,.1)',
                  borderRadius: 10, fontSize: 14,
                  color: '#fff', outline: 'none',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  boxSizing: 'border-box',
                  transition: 'border 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = '#7CB342' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,.1)' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,.4)', fontSize: 16, padding: 2,
                }}
              >
                {showPwd ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: loading ? 'rgba(124,179,66,.5)' : 'linear-gradient(135deg,#7CB342,#558B2F)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxShadow: loading ? 'none' : '0 6px 20px rgba(124,179,66,.35)',
              transition: 'all 0.25s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⟳</span>
                Connexion...
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.25)', fontSize: 12, marginTop: 24, marginBottom: 0 }}>
          Clinique ESMAD — Abobo Anador, Abidjan
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes spin   { to { transform:rotate(360deg); } }
        * { box-sizing:border-box; }
        ::placeholder { color: rgba(255,255,255,.25) !important; }
      `}</style>
    </div>
  )
}