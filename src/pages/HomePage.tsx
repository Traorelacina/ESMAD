import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ChevronLeft, ChevronRight,
  Stethoscope, Baby, FlaskConical, Search, Home as HomeIcon, HeartPulse,
  Clock, Users, Shield, Award,
} from 'lucide-react'

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
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
    pretitle: 'Centre Medical Agree — Abidjan',
    title: 'Espace Medical Anador',
    subtitle: "Un etablissement de sante moderne au service de votre bien-etre depuis 2010, au coeur d'Abobo.",
  },
  {
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80',
    pretitle: 'Laboratoire medical',
    title: 'Analyses de laboratoire',
    subtitle: 'Des examens biologiques precis et rapides — hematologie, biochimie, serologie — pour un diagnostic fiable.',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80',
    pretitle: 'Notre equipe',
    title: 'Des professionnels a votre service',
    subtitle: 'Des medecins qualifies et bienveillants, disponibles pour vous accompagner a chaque etape de votre sante.',
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

      {/* Image avec fondu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cur}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Overlay dégradé */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,13,26,0.75) 40%, rgba(6,13,26,0.35) 100%)', zIndex: 2 }} />

      {/* Motif grille */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Contenu */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.65 }}
              style={{ maxWidth: 640 }}
            >
              {/* Pretitle */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 30, background: 'rgba(139,195,74,0.15)', border: '1px solid rgba(139,195,74,0.35)', color: '#A5D46A', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8BC34A', display: 'inline-block' }} />
                {slide.pretitle}
              </div>

              {/* Titre */}
              <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(34px, 5.5vw, 68px)', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>
                {slide.title}
              </h1>

              {/* Sous-titre */}
              <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(14px, 1.8vw, 18px)', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                {slide.subtitle}
              </p>

              {/* Boutons */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 14, color: '#fff', background: 'linear-gradient(135deg,#1565C0,#1E88E5)', boxShadow: '0 4px 24px rgba(21,101,192,0.4)', textDecoration: 'none' }}>
                  Prendre rendez-vous
                </Link>
                <Link to="/services"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.07)', textDecoration: 'none' }}>
                  Nos services
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Flèches */}
      {(['prev','next'] as const).map((dir) => (
        <button
          key={dir}
          onClick={() => { go(cur + (dir === 'next' ? 1 : -1)); startTimer() }}
          aria-label={dir === 'prev' ? 'Precedent' : 'Suivant'}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            [dir === 'prev' ? 'left' : 'right']: 24, zIndex: 20,
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
        >
          {dir === 'prev' ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
      ))}

      {/* Indicateurs */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: 8 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCur(i); startTimer() }}
            aria-label={`Slide ${i + 1}`}
            style={{ width: i === cur ? 32 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', background: i === cur ? '#fff' : 'rgba(255,255,255,0.32)', padding: 0, transition: 'all 0.3s ease' }}
          />
        ))}
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS_DATA = [
  { icon: Award,      value: '+10 ans',  label: "d'experience",         color: '#1565C0', bg: '#EFF6FF' },
  { icon: Users,      value: '+50',      label: 'medecins qualifies',    color: '#7CB342', bg: '#F1F8E9' },
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
              style={{ padding: '26px 20px', display: 'flex', alignItems: 'center', gap: 16, borderRight: i < 3 ? '1px solid #E8EDF5' : 'none' }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 0 0 1px ${s.color}22` }}>
                <s.icon size={24} color={s.color} strokeWidth={1.7} />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 800, color: '#0A1628', lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: '#6B7280', marginTop: 3 }}>{s.label}</div>
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
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80',
    title: 'Consultation Medicale',
    desc: 'Consultations generales et specialisees asssurees par des professionnels qualifies pour un diagnostic et un suivi de qualite.',
  },
  {
    icon: HomeIcon, color: '#16A34A', bg: '#F0FDF4',
    image: 'https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?w=600&q=80',
    title: 'Hospitalisation',
    desc: 'Chambres confortables avec surveillance medicale continue et personnel soignant disponible en permanence pour votre bien-etre.',
  },
  {
    icon: FlaskConical, color: '#D97706', bg: '#FFFBEB',
    image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&q=80',
    title: "Laboratoire d'Analyses",
    desc: 'Analyses biologiques completes — hematologie, biochimie, serologie — pour un diagnostic precis avec des resultats rapides.',
  },
  {
    icon: Search, color: '#DB2777', bg: '#FDF2F8',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80',
    title: 'Echographie',
    desc: 'Imagerie medicale moderne par ultrasons pour examens abdominaux, obstetricaux et pelviens avec compte rendu immediat.',
  },
  {
    icon: Baby, color: '#059669', bg: '#ECFDF5',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
    title: 'Maternite',
    desc: 'Suivi prenatal, accouchement et soins postnataux assures par une equipe de sages-femmes et gynecologues experimentes.',
  },
  {
    icon: HeartPulse, color: '#DC2626', bg: '#FEF2F2',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80',
    title: 'Urgences 24h / 7j',
    desc: 'Equipe medicale disponible a toute heure pour les situations urgentes. Prise en charge immediate et professionnelle.',
  },
]

function OffresSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06 })
  return (
    <section ref={ref} style={{ background: '#fff', padding: '84px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* En-tete */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7CB342', marginBottom: 12 }}>
            Nos prestations
          </span>
          <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, color: '#0A1628', lineHeight: 1.15, marginBottom: 14 }}>
            Offres de soins
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            ESMAD vous propose une gamme complete de services medicaux pour toute la famille.
          </p>
        </motion.div>

        {/* Grille 3 colonnes */}
        <div className="esmad-offres-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {OFFRES.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.55 }}
              style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #F0F4F8', transition: 'box-shadow 0.25s ease, transform 0.25s ease' }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.11)'; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; el.style.transform = 'translateY(0)' }}
            >
              {/* Image */}
              <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
                {/* Barre couleur en bas de l'image */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: o.color }} />
              </div>

              {/* Contenu */}
              <div style={{ padding: '20px 22px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: o.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <o.icon size={19} color={o.color} strokeWidth={1.7} />
                  </div>
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, color: '#0A1628', lineHeight: 1.3 }}>{o.title}</h3>
                </div>
                <p style={{ fontSize: 13.5, color: '#6B7280', lineHeight: 1.75 }}>{o.desc}</p>
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
  'NSIA Assurances', 'SUNU Group', 'Allianz CI', "AXA Cote d'Ivoire",
  'CNPS', 'Saham Assurance', 'UAB Assurance', 'Atlantique Assurances',
  'Colina Assurances', 'GNA Assurances',
]

function AssurancesStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} style={{ background: '#F8FAFD', padding: '72px 0', borderTop: '1px solid #E8EDF5' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* En-tete */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#7CB342', marginBottom: 10 }}>
            Couverture sante
          </span>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>
            Nos assurances partenaires
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 460, margin: '0 auto' }}>
            ESMAD est conventionne avec les principales compagnies d'assurance et mutuelles de Cote d'Ivoire.
          </p>
        </motion.div>

        {/* Ticker auto-scroll */}
        <div style={{ overflow: 'hidden', position: 'relative', marginBottom: 32 }}>
          {/* Fondu bords */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 72, background: 'linear-gradient(to right, #F8FAFD, transparent)', zIndex: 10, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 72, background: 'linear-gradient(to left, #F8FAFD, transparent)', zIndex: 10, pointerEvents: 'none' }} />

          <div
            className="esmad-ticker"
            style={{ display: 'flex', gap: 16, width: 'max-content', padding: '8px 0' }}
          >
            {[...ASSURANCES_NAMES, ...ASSURANCES_NAMES].map((name, i) => (
              <div
                key={i}
                style={{ padding: '13px 22px', borderRadius: 10, background: '#fff', border: '1px solid #E5E7EB', fontSize: 14, fontWeight: 600, color: '#374151', whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
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
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 30px', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#1565C0', border: '1.5px solid #1565C0', textDecoration: 'none', background: '#fff', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#EFF6FF' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff' }}
          >
            Consulter la liste complete
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