// src/components/layout/TopBar.tsx
import React from 'react'
import { Phone, MapPin } from 'lucide-react'

export default function TopBar() {
  return (
    <>
      {/* Version Desktop et Tablette */}
      <div
        style={{
          background: '#0A1628',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 52,
          }}
        >
          {/* GAUCHE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              <MapPin size={16} color="#8BC34A" strokeWidth={2} />
              <span style={{ fontWeight: 500 }}>Abobo Anador cocoteraie, Abidjan</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>|</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>
              Agrement ATT N°52/MSHP/DGS/DEPS/KL
            </span>
          </div>

          {/* DROITE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Phone size={16} color="#8BC34A" strokeWidth={2} />
            <div style={{ lineHeight: 1.4 }}>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, fontWeight: 700, letterSpacing: '0.3px' }}>
                05 05 11 41 20 / 01 01 81 92 86
              </div>
              <div style={{ display: 'flex', gap: 20, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 2 }}>
                <span>Urgent 24h/7j</span>
                <span>Accueil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version Mobile */}
      <div
        style={{
          background: '#0A1628',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          width: '100%',
          padding: '10px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
            <MapPin size={12} color="#8BC34A" strokeWidth={2} />
            <span>Abobo Anador, Abidjan</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={12} color="#8BC34A" strokeWidth={2} />
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 700 }}>
              05 05 11 41 20
            </div>
          </div>
        </div>
        <div style={{ marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
          Agrement ATT N°52/MSHP/DGS/DEPS/KL
        </div>
      </div>

      <style>{`
        /* Cache la version mobile sur desktop/tablette */
        @media (min-width: 768px) {
          .topbar-desktop {
            display: block;
          }
          .topbar-mobile {
            display: none;
          }
        }

        /* Afficher la version desktop sur tablette */
        @media (min-width: 768px) {
          div[style*="background: #0A1628"]:first-of-type {
            display: block;
          }
          div[style*="background: #0A1628"]:last-of-type {
            display: none;
          }
        }

        /* Afficher la version mobile seulement sur telephone */
        @media (max-width: 767px) {
          div[style*="background: #0A1628"]:first-of-type {
            display: none;
          }
          div[style*="background: #0A1628"]:last-of-type {
            display: block;
          }
        }
      `}</style>
    </>
  )
}