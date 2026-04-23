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
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 42,
        }}
      >
        {/* GAUCHE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
            <MapPin size={12} color="#8BC34A" strokeWidth={2} />
            <span>Abobo Anador cocoteraie, Abidjan</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 14 }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
            Agrement ATT N°52/MSHP/DGS/DEPS/KL
          </span>
        </div>

        {/* DROITE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Phone size={12} color="#8BC34A" strokeWidth={2} />
          <div style={{ lineHeight: 1.45 }}>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontWeight: 600 }}>
              05 05 11 41 20 / 01 01 81 92 86
            </div>
            <div style={{ display: 'flex', gap: 18, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              <span>Urgent 24h/7j</span>
              <span>Accueil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}