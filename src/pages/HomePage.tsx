import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ChevronLeft, ChevronRight,
  Stethoscope, Baby, FlaskConical, Search, Home as HomeIcon, HeartPulse,
  Clock, Users, Shield, Award,
} from 'lucide-react'
import imageEsma from '@/assets/image_esma.jpeg'

// Imports des images pour les offres
import consultationImg from '@/assets/Consultationgénérale.jpeg'
import hospitalisationImg from '@/assets/Hospitalisation.jpeg'
import laboratoireImg from '@/assets/Laboratoire.jpeg'
import echographieImg from '@/assets/Echo.jpeg'
import materniteImg from '@/assets/maternité.jpeg'
import urgencesImg from '@/assets/urgence.jpeg'

// ─── STYLES GLOBAUX ───────────────────────────────────────────────────────────
;(function injectStyles() {
  if (document.getElementById('esmad-home-styles')) return
  const el = document.createElement('style')
  el.id = 'esmad-home-styles'
  el.textContent = `
    @keyframes esmad-ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .esmad-ticker { animation: esmad-ticker 32s linear infinite; }
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
  {
    image: imageEsma,
    pretitle: 'Centre Médical Agréé — Abidjan',
    title: 'ESPACE MÉDICAL ANADOR',
    subtitle: "Un établissement de santé moderne au service de votre bien-être depuis 2010, au cœur d'Abobo.",
  },
  {
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80',
    pretitle: 'Laboratoire médical',
    title: 'ANALYSES DE LABORATOIRE',
    subtitle: 'Des examens biologiques précis et rapides — hématologie, biochimie, sérologie — pour un diagnostic fiable.',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80',
    pretitle: 'Notre équipe',
    title: 'DES PROFESSIONNELS À VOTRE SERVICE',
    subtitle: 'Des médecins qualifiés et bienveillants, disponibles pour vous accompagner à chaque étape de votre santé.',
  },
]

// ─── SLIDER PRINCIPAL ─────────────────────────────────────────────────────────
function MainSlider() {
  const [cur, setCur] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  const go = (idx: number) => setCur((idx + SLIDES.length) % SLIDES.length)

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => setCur((s) => (s + 1) % SLIDES.length), 6500)
  }

  useEffect(() => { 
    startTimer() 
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const slide = SLIDES[cur]

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 580, overflow: 'hidden', background: '#060D1A' }}>

      {/* Image avec fondu - object-fit cover pour remplir tout l'espace */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
          }}
        >
          <img
            src={typeof slide.image === 'string' ? slide.image : slide.image}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay dégradé */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,13,26,0.6) 35%, rgba(6,13,26,0.25) 100%)', zIndex: 2 }} />

      {/* Motif grille - allégé */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Contenu - Centré */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%', textAlign: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65 }}
              style={{ maxWidth: '100%', margin: '0 auto' }}
            >
              {/* Pretitle */}
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 10, 
                padding: '8px 20px', 
                borderRadius: 40, 
                background: 'rgba(139,195,74,0.15)', 
                border: '1px solid rgba(139,195,74,0.35)', 
                color: '#A5D46A', 
                fontSize: 15, 
                fontWeight: 700, 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase', 
                marginBottom: 28,
                fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8BC34A', display: 'inline-block' }} />
                {slide.pretitle}
              </div>

              {/* Titre en majuscules avec la même police que le pretitle */}
              <h1 style={{ 
                color: '#fff', 
                fontWeight: 800, 
                fontSize: 'clamp(44px, 7vw, 85px)', 
                lineHeight: 1.15, 
                marginBottom: 28, 
                letterSpacing: '0.05em',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
                textTransform: 'uppercase',
              }}>
                {slide.title}
              </h1>

              {/* Sous-titre */}
              <p style={{ 
                color: 'rgba(255,255,255,0.92)', 
                fontSize: 'clamp(17px, 2.2vw, 21px)', 
                lineHeight: 1.7, 
                marginBottom: 0, 
                maxWidth: 750, 
                margin: '0 auto',
                textShadow: '0 1px 5px rgba(0,0,0,0.2)',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicateurs */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: 12 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCur(i); startTimer() }}
            aria-label={`Slide ${i + 1}`}
            style={{ 
              width: i === cur ? 40 : 10, 
              height: 10, 
              borderRadius: 5, 
              border: 'none', 
              cursor: 'pointer', 
              background: i === cur ? '#8BC34A' : 'rgba(255,255,255,0.5)', 
              padding: 0, 
              transition: 'all 0.3s ease',
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
  { icon: Award,      value: '+10 ans',  label: "d'expérience",         color: '#1565C0', bg: '#EFF6FF' },
  { icon: Users,      value: '+50',      label: 'médecins qualifiés',    color: '#7CB342', bg: '#F1F8E9' },
  { icon: HeartPulse, value: '+5 000',   label: 'patients satisfaits',   color: '#D4A843', bg: '#FFF8E1' },
  { icon: Clock,      value: '24h/7j',   label: 'urgences',              color: '#C62828', bg: '#FFEBEE' },
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
  {
    icon: Stethoscope, color: '#2563EB', bg: '#EFF6FF',
    image: consultationImg,
    title: 'Consultation Médicale',
    desc: 'Consultations générales et spécialisées assurées par des professionnels qualifiés pour un diagnostic et un suivi de qualité.',
  },
  {
    icon: HomeIcon, color: '#16A34A', bg: '#F0FDF4',
    image: hospitalisationImg,
    title: 'Hospitalisation',
    desc: 'Chambres confortables avec surveillance médicale continue et personnel soignant disponible en permanence pour votre bien-être.',
  },
  {
    icon: FlaskConical, color: '#D97706', bg: '#FFFBEB',
    image: laboratoireImg,
    title: "Laboratoire d'Analyses",
    desc: 'Analyses biologiques complètes — hématologie, biochimie, sérologie — pour un diagnostic précis avec des résultats rapides.',
  },
  {
    icon: Search, color: '#DB2777', bg: '#FDF2F8',
    image: echographieImg,
    title: 'Échographie',
    desc: 'Imagerie médicale moderne par ultrasons pour examens abdominaux, obstétricaux et pelviens avec compte rendu immédiat.',
  },
  {
    icon: Baby, color: '#059669', bg: '#ECFDF5',
    image: materniteImg,
    title: 'Maternité',
    desc: 'Suivi prénatal, accouchement et soins postnataux assurés par une équipe de sages-femmes et gynécologues expérimentés.',
  },
  {
    icon: HeartPulse, color: '#DC2626', bg: '#FEF2F2',
    image: urgencesImg,
    title: 'Urgences 24h / 7j',
    desc: 'Équipe médicale disponible à toute heure pour les situations urgentes. Prise en charge immédiate et professionnelle.',
  },
]

function OffresSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 })
  return (
    <section ref={ref} style={{ background: '#fff', padding: '90px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span
  style={{
    display: 'block',
    fontSize: 22,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
    color: '#7CB342',
    marginBottom: 18
  }}
>
  Nos prestations
</span>
         
          <p style={{ color: '#6B7280', fontSize: 18, maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
            ESMAD vous propose une gamme complète de services médicaux pour toute la famille.
          </p>
        </motion.div>

        {/* Grille 3 colonnes */}
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
              {/* Image */}
              <div style={{ height: 230, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
                {/* Barre couleur en bas de l'image */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5, background: o.color }} />
              </div>

              {/* Contenu */}
              <div style={{ padding: '28px 28px 34px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: o.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <o.icon size={26} color={o.color} strokeWidth={1.7} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', lineHeight: 1.3 }}>{o.title}</h3>
                </div>
                <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.65 }}>{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ASSURANCES PARTENAIRES ───────────────────────────────────────────────────
const ASSURANCES_NAMES = [
  'NSIA Assurances', 'SUNU Group', 'Allianz CI', "AXA Côte d'Ivoire",
  'CNPS', 'Saham Assurance', 'UAB Assurance', 'Atlantique Assurances',
  'Colina Assurances', 'GNA Assurances',
]

function AssurancesStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

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
          <span style={{ display: 'block', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7CB342', marginBottom: 12 }}>
            Couverture santé
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>
            Nos assurances partenaires
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            ESMAD est conventionné avec les principales compagnies d'assurance et mutuelles de Côte d'Ivoire.
          </p>
        </motion.div>

        {/* Ticker auto-scroll */}
        <div style={{ overflow: 'hidden', position: 'relative', marginBottom: 36 }}>
          {/* Fondu bords */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 72, background: 'linear-gradient(to right, #F8FAFD, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 72, background: 'linear-gradient(to left, #F8FAFD, transparent)', zIndex: 10, pointerEvents: 'none' }} />

          <div
            className="esmad-ticker"
            style={{ display: 'flex', gap: 18, width: 'max-content', padding: '10px 0' }}
          >
            {[...ASSURANCES_NAMES, ...ASSURANCES_NAMES].map((name, i) => (
              <div
                key={i}
                style={{ padding: '14px 24px', borderRadius: 12, background: '#fff', border: '1px solid #E5E7EB', fontSize: 15, fontWeight: 600, color: '#374151', whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Bouton */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/assurances"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 700, color: '#1565C0', border: '2px solid #1565C0', textDecoration: 'none', background: '#fff', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#EFF6FF' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff' }}
          >
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