// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '@/assets/logo.png'

const MENU = [
  { label: 'Accueil',                    href: '/' },
  { label: 'La clinique',                href: '/clinique' },
  { label: 'Nos services',               href: '/services' },
  { label: 'Nos assurances partenaires', href: '/assurances' },
  { label: 'Nos médecins',               href: '/medecins' },
  { label: 'Nos contacts',               href: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header
      style={{
        background: '#ffffff',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}
      >
        {/* LOGO */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src={logo} alt="ESMAD - Espace Médical Anador" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* MENU DESKTOP */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden lg:flex">
          {MENU.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#1565C0' : '#374151',
                  background: active ? '#EFF6FF' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#1565C0'
                    e.currentTarget.style.background = '#F8FAFF'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = '#374151'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* HAMBURGER MOBILE */}
        <button
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #E5E7EB', color: '#374151', background: '#fff' }}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid #F3F4F6',
            padding: '12px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          className="lg:hidden"
        >
          {MENU.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? '#1565C0' : '#374151',
                  background: active ? '#EFF6FF' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}