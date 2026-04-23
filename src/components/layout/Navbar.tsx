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

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Verrouiller le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Fermer le menu si redimensionnement vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header className="navbar-header" style={{
        background: '#ffffff',
        boxShadow: scrolled
          ? '0 4px 24px rgba(21, 101, 192, 0.10), 0 1px 0 rgba(0,0,0,0.04)'
          : '0 1px 0 rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'box-shadow 0.35s ease',
      }}>
        <div style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 28px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: 'clamp(90px, 14vh, 110px)',
        }}>

          {/* ── LOGO (colonne gauche) - Sans contour, plus grand ── */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textDecoration: 'none',
              flexShrink: 0,
            }}
            aria-label="ESMAD – Accueil"
          >
            <img
              src={logo}
              alt="ESMAD – Espace Médical Anador"
              style={{
                height: 'clamp(80px, 12vh, 100px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          {/* ── MENU DESKTOP (colonne centrale, parfaitement centré par grid) ── */}
          <nav className="desktop-nav" aria-label="Menu principal" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(4px, 1vw, 12px)',
          }}>
            {MENU.map((item) => {
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{
                    padding: 'clamp(10px, 1.5vh, 14px) clamp(14px, 1.5vw, 22px)',
                    borderRadius: 10,
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#1565C0' : '#374151',
                    background: active
                      ? 'linear-gradient(135deg, #EFF6FF, #DBEAFE)'
                      : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.22s ease',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.2px',
                    border: active ? '1px solid rgba(21,101,192,0.15)' : '1px solid transparent',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#1565C0'
                      el.style.background = '#F0F7FF'
                      el.style.border = '1px solid rgba(21,101,192,0.12)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#374151'
                      el.style.background = 'transparent'
                      el.style.border = '1px solid transparent'
                    }
                  }}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* ── DROITE : espace pour équilibrer + hamburger (mobile) ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
          }}>
            {/* Hamburger mobile */}
            <button
              className="hamburger-btn"
              onClick={() => setOpen(!open)}
              style={{
                padding: 10,
                borderRadius: 10,
                border: '1.5px solid #E5E7EB',
                color: '#374151',
                background: open ? '#F0F7FF' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MENU MOBILE ── */}
      <div
        className="mobile-menu"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 'clamp(90px, 14vh, 110px)',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          borderTop: '1px solid #EEF2F7',
          padding: '24px 20px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          overflowY: 'auto',
          zIndex: 99,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Logo dans le menu mobile - plus grand */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 24,
          paddingBottom: 24,
          borderBottom: '1px solid #F0F4F8',
        }}>
          <img
            src={logo}
            alt="ESMAD"
            style={{
              height: 85,
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>

        {MENU.map((item) => {
          const active = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              style={{
                padding: '16px 20px',
                borderRadius: 12,
                fontSize: 17,
                fontWeight: active ? 700 : 500,
                color: active ? '#1565C0' : '#374151',
                background: active
                  ? 'linear-gradient(135deg, #EFF6FF, #DBEAFE)'
                  : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                border: active ? '1px solid rgba(21,101,192,0.15)' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <span style={{
                  width: 4,
                  height: 20,
                  background: '#1565C0',
                  borderRadius: 2,
                  marginRight: 12,
                  flexShrink: 0,
                }} />
              )}
              {item.label}
            </Link>
          )
        })}
      </div>

      <style>{`
        /* ── DESKTOP ≥ 1024px ── */
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
          .mobile-menu   { display: none !important; }
        }

        /* ── TABLETTE 768–1023px ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
          .mobile-menu   { display: none !important; }
        }

        /* ── MOBILE < 768px ── */
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-menu   { display: flex !important; }
        }

        /* Focus accessible */
        .desktop-nav a:focus-visible,
        .hamburger-btn:focus-visible {
          outline: 2px solid #1565C0;
          outline-offset: 3px;
        }
      `}</style>
    </>
  )
}