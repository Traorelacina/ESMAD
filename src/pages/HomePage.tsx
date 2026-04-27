import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Stethoscope, Baby, FlaskConical, Search, Home as HomeIcon, HeartPulse,
  Clock, Users, Shield, Award,
} from 'lucide-react'
import { assurancesApi, type Assurance } from '@/api/client'

// Imports des images pour les offres
import consultationImg from '@/assets/Consultationgénérale.jpeg'
import hospitalisationImg from '@/assets/Hospitalisation.jpeg'
import laboratoireImg from '@/assets/Laboratoire.jpeg'
import echographieImg from '@/assets/Echo.jpeg'
import materniteImg from '@/assets/maternité.jpeg'
import urgencesImg from '@/assets/urgence.jpeg'

// Imports des images pour les slides
import slide1Image from '@/assets/Slide.jpeg'
import slide2Image from '@/assets/Slide2.jpeg'
import slide3Image from '@/assets/Slide3.jpeg'

// ─── STYLES GLOBAUX ───────────────────────────────────────────────────────────
;(function injectStyles() {
  if (document.getElementById('esmad-home-styles')) return
  const el = document.createElement('style')
  el.id = 'esmad-home-styles'
  el.textContent = `
    @keyframes esmad-ticker-rtl {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .esmad-ticker {
      animation: esmad-ticker-rtl 6s linear infinite;
      will-change: transform;
    }
    .esmad-ticker:hover { animation-play-state: paused; }

    @media (max-width: 900px) {
      .esmad-offres-grid { grid-template-columns: repeat(2,1fr) !important; }
      .esmad-stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media (max-width: 600px) {
      .esmad-offres-grid { grid-template-columns: 1fr !important; }
      .esmad-stats-grid  { grid-template-columns: 1fr !important; }
    }
  `
  document.head.appendChild(el)
})()

// ─── DONNÉES SLIDER ───────────────────────────────────────────────────────────
const SLIDES = [
  { image: slide1Image, hasContent: false },
  { image: slide2Image, hasContent: false },
  { image: slide3Image, hasContent: false },
]

// ─── SLIDER PRINCIPAL ─────────────────────────────────────────────────────────
function MainSlider() {
  const [cur, setCur] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCur((s) => (s + 1) % SLIDES.length), 6500)
  }

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const slide = SLIDES[cur]

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 580, overflow: 'hidden', background: '#060D1A' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(22px) brightness(1) saturate(1.2)',
              transform: 'scale(1.08)',
            }}
          />
          <img
            src={slide.image}
            alt={`Slide ${cur + 1}`}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'contain', objectPosition: 'center', display: 'block',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {slide.hasContent && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,13,26,0.6) 35%, rgba(6,13,26,0.25) 100%)', zIndex: 2 }} />
      )}

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: 12 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCur(i); startTimer() }}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === cur ? 40 : 10, height: 10, borderRadius: 5,
              border: 'none', cursor: 'pointer',
              background: i === cur ? '#8BC34A' : 'rgba(255,255,255,0.5)',
              padding: 0, transition: 'all 0.3s ease',
              boxShadow: i === cur ? '0 0 8px rgba(139,195,74,0.5)' : 'none',
            }}
          />
        ))}
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS_DATA = [
  { icon: Award,      value: '+10 ans', label: "d'expérience",       color: '#1565C0', bg: '#EFF6FF' },
  { icon: Users,      value: '+50',     label: 'médecins qualifiés', color: '#7CB342', bg: '#F1F8E9' },
  { icon: HeartPulse, value: '+5 000',  label: 'patients satisfaits',color: '#D4A843', bg: '#FFF8E1' },
  { icon: Clock,      value: '24h/7j',  label: 'urgences',           color: '#C62828', bg: '#FFEBEE' },
]

function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <section ref={ref} style={{ background: '#F8FAFD', borderBottom: '1px solid #E8EDF5' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="esmad-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {STATS_DATA.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ padding: '30px 20px', display: 'flex', alignItems: 'center', gap: 18, borderRight: i < 3 ? '1px solid #E8EDF5' : 'none' }}
            >
              <div style={{ width: 60, height: 60, borderRadius: 16, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 0 1px ${s.color}22` }}>
                <s.icon size={28} color={s.color} strokeWidth={1.7} />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 800, color: '#0A1628', lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 16, color: '#6B7280', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── OFFRES DE SOINS ──────────────────────────────────────────────────────────
const OFFRES = [
  { icon: Stethoscope, color: '#2563EB', bg: '#EFF6FF', image: consultationImg, title: 'Consultation Médicale', desc: 'Consultations générales et spécialisées assurées par des professionnels qualifiés pour un diagnostic et un suivi de qualité.' },
  { icon: HomeIcon,    color: '#16A34A', bg: '#F0FDF4', image: hospitalisationImg, title: 'Hospitalisation', desc: 'Chambres confortables avec surveillance médicale continue et personnel soignant disponible en permanence pour votre bien-être.' },
  { icon: FlaskConical,color: '#D97706', bg: '#FFFBEB', image: laboratoireImg, title: "Laboratoire d'Analyses", desc: 'Analyses biologiques complètes — hématologie, biochimie, sérologie — pour un diagnostic précis avec des résultats rapides.' },
  { icon: Search,      color: '#DB2777', bg: '#FDF2F8', image: echographieImg, title: 'Échographie', desc: 'Imagerie médicale moderne par ultrasons pour examens abdominaux, obstétricaux et pelviens avec compte rendu immédiat.' },
  { icon: Baby,        color: '#059669', bg: '#ECFDF5', image: materniteImg, title: 'Maternité', desc: 'Suivi prénatal, accouchement et soins postnataux assurés par une équipe de sages-femmes et gynécologues expérimentés.' },
  { icon: HeartPulse,  color: '#DC2626', bg: '#FEF2F2', image: urgencesImg, title: 'Urgences 24h / 7j', desc: 'Équipe médicale disponible à toute heure pour les situations urgentes. Prise en charge immédiate et professionnelle.' },
]

function OffresSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 })
  return (
    <section ref={ref} style={{ background: '#fff', padding: '90px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span style={{ display: 'block', fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7CB342', marginBottom: 16, fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif" }}>
            Nos prestations
          </span>
          <p style={{ color: '#6B7280', fontSize: 'clamp(18px, 5vw, 22px)', maxWidth: '90%', margin: '0 auto', lineHeight: 1.6, whiteSpace: 'nowrap', overflow: 'auto', paddingBottom: '8px', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
            ESMAD vous propose une gamme complète de services médicaux pour toute la famille.
          </p>
        </motion.div>

        <div className="esmad-offres-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {OFFRES.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.55 }}
              style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4F8', transition: 'box-shadow 0.25s ease, transform 0.25s ease' }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.11)'; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(0)' }}
            >
              <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
                <img src={o.image} alt={o.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: o.color }} />
              </div>
              <div style={{ padding: '24px 24px 30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: o.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <o.icon size={22} color={o.color} strokeWidth={1.7} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', lineHeight: 1.3, fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif" }}>{o.title}</h3>
                </div>
                <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ASSURANCES STRIP — DYNAMIQUE ─────────────────────────────────────────────

/** Une carte d'assurance dans le ticker */
function AssuranceTickerCard({ a }: { a: Assurance }) {
  return (
    <div
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        padding: '0 8px',
        transition: 'transform 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Logo rond — grand, sans contour */}
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: '50%',
          background: a.bg_color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {a.logo ? (
          <img
            src={a.logo}
            alt={a.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
          />
        ) : (
          <span
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: a.color,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '-0.02em',
            }}
          >
            {a.initials}
          </span>
        )}
      </div>

      {/* Nom sous le cercle */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#374151',
          textAlign: 'center',
          lineHeight: 1.3,
          fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
          maxWidth: 120,
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {a.name}
      </span>
    </div>
  )
}

/** Skeleton d'une carte dans le ticker */
function TickerSkeleton() {
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '0 8px',
    }}>
      <div style={{ width: 130, height: 130, borderRadius: '50%', background: '#E9EEF4' }} />
      <div style={{ width: 90, height: 13, borderRadius: 6, background: '#E9EEF4' }} />
    </div>
  )
}

function AssurancesStrip() {
  const [assurances, setAssurances] = useState<Assurance[]>([])
  const [loading, setLoading]       = useState(true)
  const { ref, inView }             = useInView({ triggerOnce: true, threshold: 0.15 })

  useEffect(() => {
    assurancesApi
      .list(new URLSearchParams({ per_page: '100' }).toString())
      .then(res => setAssurances(res.data.filter(a => a.is_active)))
      .catch(err => console.error('Erreur chargement assurances:', err))
      .finally(() => setLoading(false))
  }, [])

  // Dupliquer pour boucle continue
  const items = assurances.length > 0 ? [...assurances, ...assurances] : []
  // Skeletons de remplacement pendant le chargement
  const skeletonCount = 8

  return (
    <section ref={ref} style={{ background: '#F8FAFD', padding: '80px 0', borderTop: '1px solid #E8EDF5' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span style={{
            display: 'block', fontSize: 24, fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.2em', color: '#7CB342', marginBottom: 16,
            fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
          }}>
            Couverture santé
          </span>
          <p style={{
            color: '#6B7280', fontSize: 'clamp(18px, 5vw, 22px)',
            maxWidth: '90%', margin: '0 auto', lineHeight: 1.6,
            whiteSpace: 'nowrap', overflow: 'auto', paddingBottom: '8px',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
            ESMAD est conventionné avec les principales compagnies d'assurance et mutuelles de Côte d'Ivoire.
          </p>
        </motion.div>

        {/* Ticker */}
        <div style={{ overflow: 'hidden', position: 'relative', marginBottom: 40 }}>
          {/* Masques dégradés gauche / droite */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, #F8FAFD, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, #F8FAFD, transparent)', zIndex: 10, pointerEvents: 'none' }} />

          {loading ? (
            <div style={{ display: 'flex', gap: 40, padding: '16px 0' }}>
              {Array.from({ length: skeletonCount }).map((_, i) => <TickerSkeleton key={i} />)}
            </div>
          ) : (
            /* 
              Technique boucle infinie :
              - items = [...original, ...original]  (doublé)
              - animation translateX(0) → translateX(-50%)
              - à -50% le 2e bloc est aligné exactement sur le 1er → saut invisible → repart
              - résultat : défilement continu de droite à gauche sans coupure
            */
            <div
              className="esmad-ticker"
              style={{ display: 'flex', gap: 40, width: 'max-content', padding: '16px 0' }}
            >
              {items.map((a, i) => (
                <AssuranceTickerCard key={`${a.id}-${i}`} a={a} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/assurances"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 700,
              color: '#7CB342', border: '2px solid #7CB342', textDecoration: 'none',
              background: '#fff', transition: 'all 0.2s ease',
              fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F1F8E9' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
          >
            <Shield size={16} />
            Consulter la liste complète
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ACCUEIL ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      <MainSlider />
      <StatsSection />
      <OffresSection />
      <AssurancesStrip />
    </div>
  )
}