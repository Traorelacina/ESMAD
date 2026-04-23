// src/components/layout/TopBar.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, AlertCircle } from 'lucide-react'

export default function TopBar() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 50%, #D32F2F 100%)' }}
    >
      {/* Animated shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          
          {/* GAUCHE - Adresse et agrément */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.85)' }}>
              <MapPin size={15} color="#fff" strokeWidth={2} />
              <span className="address-full" style={{ fontSize: 13 }}>Abobo Anador Cocoteraie, Abidjan</span>
              <span className="address-short" style={{ fontSize: 12 }}>Abobo Anador, Abidjan</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>|</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontSize: 12 }}>
              Agrément ATT N°52/MSHP/DGS/DEPS/KL
            </span>
          </div>

          {/* DROITE - Numéros avec style urgence */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <motion.div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle size={17} style={{ color: '#fff' }} />
              </motion.div>
              <div style={{ color: '#fff' }}>
                <div style={{ fontWeight: 'bold', fontSize: 14 }}>Service d'urgences médicales</div>
                <div style={{ fontSize: 11, opacity: 0.85 }}>Équipe disponible 24h/24 — 7j/7</div>
              </div>
            </div>

            {[
              { num: '01 01 81 92 86', label: 'Urgences' },
              { num: '05 05 11 41 20', label: 'Accueil' },
            ].map((item) => (
              <motion.a
                key={item.num}
                href={`tel:+225${item.num.replace(/\s/g, '')}`}
                style={{ textAlign: 'center', color: '#fff', textDecoration: 'none' }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{item.num}</div>
                <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{item.label}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile */
        @media (max-width: 768px) {
          .address-full {
            display: none !important;
          }
          .address-short {
            display: inline !important;
          }
        }

        @media (min-width: 769px) {
          .address-full {
            display: inline !important;
          }
          .address-short {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}