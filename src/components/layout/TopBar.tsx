// src/components/layout/TopBar.tsx
import React from 'react'
import { Phone, MapPin } from 'lucide-react'

export default function TopBar() {
  return (
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
        className="topbar-container"
      >
        {/* GAUCHE */}
        <div className="topbar-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)' }}>
            <MapPin size={16} color="#8BC34A" strokeWidth={2} />
            <span className="address-full">Abobo Anador cocoteraie, Abidjan</span>
            <span className="address-short">Abobo Anador, Abidjan</span>
          </div>
          <span className="separator" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 16 }}>|</span>
          <span className="agrement" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
            Agrement ATT N°52/MSHP/DGS/DEPS/KL
          </span>
        </div>

        {/* DROITE */}
        <div className="topbar-right">
          <Phone size={16} color="#8BC34A" strokeWidth={2} />
          <div style={{ lineHeight: 1.4 }}>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, letterSpacing: '0.3px' }}>
              <span className="phone-full">05 05 11 41 20 / 01 01 81 92 86</span>
              <span className="phone-short">05 05 11 41 20</span>
            </div>
            <div className="phone-labels" style={{ display: 'flex', gap: 20, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              <span>Urgent 24h/7j</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 24;
        }

        .topbar-left > div {
          display: flex;
          align-items: center;
          gap: 10;
          color: rgba(255,255,255,0.6);
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12;
        }

        .topbar-right > div {
          line-height: 1.4;
        }

        .address-short,
        .phone-short {
          display: none;
        }

        .phone-labels {
          display: flex;
        }

        /* Tablette */
        @media (min-width: 768px) and (max-width: 1023px) {
          .topbar-container {
            padding: 0 16px !important;
          }
          
          .topbar-left {
            gap: 12 !important;
          }
          
          .topbar-left > div {
            font-size: 12px !important;
          }
          
          .separator {
            font-size: 14px !important;
          }
          
          .agrement {
            font-size: 11px !important;
          }
          
          .topbar-right {
            gap: 8 !important;
          }
          
          .topbar-right > div > div:first-child {
            font-size: 13px !important;
          }
          
          .phone-labels {
            gap: 12 !important;
            font-size: 11px !important;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .topbar-container {
            padding: 10px 16px !important;
            flex-direction: column !important;
            height: auto !important;
            gap: 8 !important;
          }
          
          .topbar-left {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 8 !important;
          }
          
          .topbar-left > div {
            font-size: 11px !important;
          }
          
          .address-full {
            display: none !important;
          }
          
          .address-short {
            display: inline !important;
          }
          
          .separator {
            display: none !important;
          }
          
          .agrement {
            font-size: 10px !important;
          }
          
          .topbar-right {
            width: 100% !important;
            justify-content: center !important;
            gap: 8 !important;
          }
          
          .phone-full {
            display: none !important;
          }
          
          .phone-short {
            display: inline !important;
            font-size: 14px !important;
          }
          
          .phone-labels {
            justify-content: center !important;
            gap: 16 !important;
            font-size: 10px !important;
            margin-top: 4px !important;
          }
        }

        /* Tres petits mobiles */
        @media (max-width: 480px) {
          .topbar-left {
            flex-direction: column !important;
            text-align: center !important;
            gap: 4 !important;
          }
          
          .agrement {
            font-size: 9px !important;
          }
        }
      `}</style>
    </div>
  )
}