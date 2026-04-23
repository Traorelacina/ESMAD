// src/components/layout/Navbar.tsx
import React, { useState, useEffect } from 'react'
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
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 84 }}
      >
        {/* LOGO */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src={logo} alt="ESMAD - Espace Médical Anador" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* MENU DESKTOP */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden lg:flex">
          {MENU.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  padding: '10px 18px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: active ? 700 : 600,
                  color: active ? '#1565C0' : '#374151',
                  background: active ? '#EFF6FF' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.2px',
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
          style={{ padding: 10, borderRadius: 10, border: '1.5px solid #E5E7EB', color: '#374151', background: '#fff', cursor: 'pointer' }}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div
          style={{
            background: '#fff',
            borderTop: '1px solid #F0F2F5',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
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
                  padding: '14px 18px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: active ? 700 : 600,
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