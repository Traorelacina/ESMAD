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

  // Fermer le menu quand la fenêtre est redimensionnée
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && open) {
        setOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open])

  return (
    <>
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
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'clamp(64px, 8vh, 84px)',
          }}
        >
          {/* LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img 
              src={logo} 
              alt="ESMAD - Espace Médical Anador" 
              style={{ 
                height: 'clamp(40px, 6vh, 56px)', 
                width: 'auto', 
                objectFit: 'contain' 
              }} 
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'clamp(4px, 1vw, 8px)' 
          }}>
            {MENU.map((item) => {
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{
                    padding: '8px clamp(12px, 1.5vw, 18px)',
                    borderRadius: 8,
                    fontSize: 'clamp(13px, 1.2vw, 15px)',
                    fontWeight: active ? 700 : 500,
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
            onClick={() => setOpen(!open)}
            style={{ 
              padding: 10, 
              borderRadius: 10, 
              border: '1.5px solid #E5E7EB', 
              color: '#374151', 
              background: '#fff', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 'clamp(64px, 8vh, 84px)',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
            borderTop: '1px solid #F0F2F5',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            overflowY: 'auto',
            zIndex: 99,
          }}
        >
          {MENU.map((item) => {
            const active = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  padding: '14px 20px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: active ? 700 : 500,
                  color: active ? '#1565C0' : '#374151',
                  background: active ? '#EFF6FF' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          nav {
            display: flex !important;
          }
          button {
            display: none !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          nav {
            display: flex !important;
          }
          nav a {
            padding: 8px 12px !important;
            font-size: 13px !important;
          }
          button {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          nav {
            display: none !important;
          }
          button {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}