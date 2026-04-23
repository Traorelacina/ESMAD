// src/components/layout/TopBar.tsx
import { Phone, MapPin } from 'lucide-react'

export default function TopBar() {
  return (
    <div
      className="hidden md:block w-full"
      style={{ background: '#0A1628', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 32px',
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
  )
}