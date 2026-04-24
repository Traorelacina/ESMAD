import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Heart, Users, Shield, Clock } from 'lucide-react'
import Hero from '@/components/home/Hero'
import imageEsma from '@/assets/image_esma.jpeg'
import imagefontEsma from '@/assets/ImagedefondMenuLaClinique.png'

// ─── IMAGES PER PAGE ──────────────────────────────────────────────────────────
const IMAGES = {
  clinique:   imagefontEsma,
  services:   'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=80',
  medecins:   'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
  assurances: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CLINIQUE (La clinique)
// ─────────────────────────────────────────────────────────────────────────────
const VALUES = [
  { icon: Heart,  title: 'EXCELLENCE',    desc: 'Des soins de la plus haute qualité médicale et humaine pour chaque patient.', color: '#2563EB' },
  { icon: Users,  title: 'ACCESSIBILITÉ', desc: 'Des soins accessibles à tous les membres de la communauté, sans discrimination.', color: '#16A34A' },
  { icon: Shield, title: 'INTÉGRITÉ',     desc: 'Éthique médicale rigoureuse, transparence totale et respect du patient.', color: '#D97706' },
  { icon: Clock,  title: 'RÉACTIVITÉ',    desc: "Réponse rapide et efficace, en particulier pour les situations d'urgence.", color: '#DC2626' },
]

const FEATURES = [
  'Centre agréé — Autorisation ATT N°52/MSHP/DGS/DEPS/KL',
  'Personnel médical qualifié et expérimenté',
  'Equipements médicaux conformes aux normes internationales',
  'Urgences médicales disponibles 24h/24 — 7j/7',
]

export function CliniqueePage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.clinique}
        title="La Clinique ESMAD"
        subtitle="Un établissement de santé de confiance au coeur d'Abobo, Abidjan."
      />

      {/* NOTRE HISTOIRE */}
      <section style={{ background: '#fff', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="clinique-grid">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}
            >
              <img
                src={imageEsma}
                alt="ESMAD - Espace Médical Anador"
                style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
              />
            </motion.div>

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '8px 28px',
                borderRadius: 60,
                background: 'rgba(124, 179, 66, 0.12)',
                border: '2px solid #7CB342',
                boxShadow: '0 0 12px rgba(124, 179, 66, 0.3)',
                marginBottom: 24,
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#7CB342',
                  boxShadow: '0 0 6px #7CB342',
                }} />
                <h2 style={{ 
                  fontSize: 'clamp(22px, 3.5vw, 32px)', 
                  fontWeight: 800, 
                  color: '#7CB342', 
                  margin: 0, 
                  lineHeight: 1.2,
                  fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
                  letterSpacing: '0.05em',
                }}>
                  NOTRE HISTOIRE
                </h2>
              </span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: '#4B5563', lineHeight: 1.8, fontSize: 15.5 }}>
                <p>
                  ESMAD (ESPACE MEDICAL ANADOR) est un établissement de santé situé à Abobo Anador,
                  dans la commune d'Abobo à Abidjan. Depuis sa création en 2010, le centre a pour
                  vocation d'offrir des soins médicaux de qualité, accessibles aux populations locales.
                </p>
                <p>
                  Le centre propose des services médicaux complets : consultation, hospitalisation,
                  analyses de laboratoire, échographie et maternité. Sa mission est d'assurer des
                  soins efficaces, sûrs et centrés sur le patient grâce à un personnel médical
                  qualifié et des équipements modernes.
                </p>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <CheckCircle size={12} color="#16A34A" />
                    </div>
                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{f}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOS VALEURS */}
      <section style={{ background: '#F8FAFD', padding: '80px 0', borderTop: '1px solid #E8EDF5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 52 }}
          >
            <span style={{ 
              display: 'block', 
              fontSize: 24, 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              color: '#7CB342', 
              marginBottom: 16, 
              fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif" 
            }}>
              NOS VALEURS
            </span>

            <p style={{ 
              color: '#6B7280', 
              fontSize: 'clamp(18px, 5vw, 22px)', 
              maxWidth: '90%', 
              margin: '0 auto', 
              lineHeight: 1.6,
              whiteSpace: 'nowrap',
              overflow: 'auto',
              paddingBottom: '8px',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Des principes qui guident notre action quotidienne au service de votre santé.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="values-grid">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ background: '#fff', borderRadius: 16, padding: '28px 22px', border: '1px solid #E8EDF5', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              >
                <div style={{ width: 70, height: 70, borderRadius: 20, background: v.color + '10', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: `1px solid ${v.color}20` }}>
                  <v.icon size={32} color={v.color} strokeWidth={1.5} />
                </div>
                <h4 style={{ 
                  fontSize: 'clamp(18px, 2vw, 22px)', 
                  fontWeight: 700, 
                  color: '#0A1628', 
                  marginBottom: 12,
                  fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
                  letterSpacing: '0.02em',
                }}>{v.title}</h4>
                <p style={{ 
                  fontSize: 'clamp(14px, 1.5vw, 15px)', 
                  color: '#6B7280', 
                  lineHeight: 1.6,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE SERVICES
// ─────────────────────────────────────────────────────────────────────────────
import { Home as HomeIcon, FlaskConical, Search, Baby, Stethoscope, HeartPulse, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const SERVICES_LIST = [
  {
    icon: Stethoscope, title: 'Consultation Médicale',
    desc: 'Consultations générales et spécialisées dispensées par des professionnels de santé qualifiés. Diagnostic, traitement et suivi médical assurés avec une attention particulière aux besoins du patient.',
    tags: ['Médecine générale', 'Suivi chronique', 'Médecine préventive'],
    color: '#2563EB', bgLight: '#EFF6FF',
  },
  {
    icon: HomeIcon, title: 'Hospitalisation',
    desc: "Service d'hospitalisation sécurisé et confortable pour les patients nécessitant une surveillance médicale continue. Personnel soignant disponible en permanence pour le bien-être de chaque patient.",
    tags: ['Chambres individuelles', 'Surveillance 24h/24', 'Soins infirmiers'],
    color: '#16A34A', bgLight: '#F0FDF4',
  },
  {
    icon: FlaskConical, title: "Laboratoire d'Analyses",
    desc: "Services de laboratoire médical offrant un large éventail d'analyses biologiques — NFS, biochimie, sérologie, microbiologie — pour appuyer un diagnostic précis et un traitement efficace.",
    tags: ['Hématologie', 'Biochimie', 'Sérologie', 'Bactériologie'],
    color: '#D97706', bgLight: '#FFFBEB',
  },
  {
    icon: Search, title: 'Echographie',
    desc: 'Imagerie médicale moderne par ultrasons pour examens abdominaux, obstétricaux et pelviens. Résultats interprétés par des praticiens spécialisés, avec compte rendu remis immédiatement.',
    tags: ['Abdominale', 'Obstétricale', 'Pelvienne', 'Gynécologique'],
    color: '#DB2777', bgLight: '#FDF2F8',
  },
  {
    icon: Baby, title: 'Maternité',
    desc: "Soins maternels complets incluant le suivi prénatal, l'accouchement physiologique ou médicalisé, et les soins postnataux. Notre équipe accompagne chaque future maman avec expertise et bienveillance.",
    tags: ['Suivi prénatal', 'Accouchement', 'Soins postnataux', 'Planification familiale'],
    color: '#059669', bgLight: '#ECFDF5',
  },
  {
    icon: HeartPulse, title: 'Urgences 24h / 7j',
    desc: "Equipe médicale disponible à toute heure pour les situations urgentes. Prise en charge immédiate et professionnelle sans rendez-vous.",
    tags: ['Disponible 24h/24', '7j/7', 'Prise en charge immédiate'],
    color: '#DC2626', bgLight: '#FEF2F2',
    urgent: true,
  },
]

export function ServicesPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.services}
        title="Services & Spécialités"
        subtitle="ESMAD propose une gamme complète de soins médicaux pour toute la famille, assurés par des professionnels qualifiés."
      />

      <section style={{ background: '#fff', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="services-grid">
            {SERVICES_LIST.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF5', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', position: 'relative' }}
              >
                <div style={{ height: 4, background: s.color }} />
                {s.urgent && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#DC2626', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>
                    24/7
                  </div>
                )}
                <div style={{ padding: '24px 26px 26px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bgLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={26} color={s.color} strokeWidth={1.7} />
                    </div>
                    <h3 style={{ 
                      fontSize: 18, 
                      fontWeight: 700, 
                      color: '#0A1628',
                      fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
                    }}>{s.title}</h3>
                  </div>
                  <p style={{ 
                    fontSize: 14, 
                    color: '#6B7280', 
                    lineHeight: 1.75, 
                    marginBottom: 16,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.tags.map((t) => (
                      <span key={t} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: s.bgLight, color: s.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Urgences banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ marginTop: 40, background: 'linear-gradient(135deg, #DC2626, #B91C1C)', borderRadius: 16, padding: '32px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}
          >
            <div style={{ color: '#fff' }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>
                Urgences médicales 24h / 7j
              </div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>Service d'urgences disponible à toute heure</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>Notre équipe est prête à vous prendre en charge immédiatement</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>Numéro d'urgence direct</div>
              <a href="tel:0101819286" style={{ display: 'block', fontSize: 28, fontWeight: 800, color: '#fff', textDecoration: 'none' }}>01 01 81 92 86</a>
              <a href="tel:0505114120" style={{ display: 'block', fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', marginTop: 2 }}>05 05 11 41 20</a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE MÉDECINS
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react'

const DOCTORS = [
  { initials: 'AK', name: 'Dr. Adama Koné',         specialty: 'Médecin Généraliste',         schedule: 'Lundi - Samedi',    color: '#1565C0', bg: '#E3F2FD' },
  { initials: 'FO', name: 'Dr. Fatou Ouédraogo',     specialty: 'Gynécologue-Obstétricienne',   schedule: 'Mardi, Jeudi, Sam', color: '#558B2F', bg: '#F1F8E9' },
  { initials: 'KB', name: 'Dr. Kouamé Brou',         specialty: 'Pédiatre',                    schedule: 'Lundi, Mercredi, Ven', color: '#C62828', bg: '#FFEBEE' },
  { initials: 'SI', name: 'Dr. Seydou Issa',         specialty: 'Biologiste Médical',           schedule: 'Lundi - Vendredi',  color: '#E65100', bg: '#FFF8E1' },
  { initials: 'MC', name: 'Dr. Marie-Claire Coulibaly', specialty: 'Médecin Généraliste',       schedule: 'Mardi, Jeudi, Sam', color: '#6A1B9A', bg: '#EDE7F6' },
  { initials: 'AL', name: 'Dr. Awa Lamine',           specialty: 'Sage-Femme Cheffe',          schedule: 'Lundi - Samedi',    color: '#006064', bg: '#E0F7FA' },
]

const FILTERS_DOC = [
  { key: 'all',     label: 'Tous' },
  { key: 'general', label: 'Médecine Générale' },
  { key: 'gyn',     label: 'Gynécologie' },
  { key: 'ped',     label: 'Pédiatrie' },
  { key: 'lab',     label: 'Laboratoire' },
]

function getDoctorCat(d: typeof DOCTORS[0]) {
  if (d.specialty.includes('Généraliste')) return 'general'
  if (d.specialty.includes('Gynéco') || d.specialty.includes('Sage')) return 'gyn'
  if (d.specialty.includes('Pédiatre')) return 'ped'
  if (d.specialty.includes('Biolog')) return 'lab'
  return 'other'
}

export function DoctorsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? DOCTORS : DOCTORS.filter((d) => getDoctorCat(d) === filter)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.medecins}
        title="Nos Médecins"
        subtitle="Des professionnels de santé expérimentés et dévoués à votre bien-être."
      />

      <section style={{ background: '#fff', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {FILTERS_DOC.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: '8px 20px', borderRadius: 30,
                  fontSize: 13.5, fontWeight: 500, cursor: 'pointer',
                  border: filter === tab.key ? '1.5px solid #0A1628' : '1.5px solid #E5E7EB',
                  background: filter === tab.key ? '#0A1628' : '#fff',
                  color: filter === tab.key ? '#fff' : '#6B7280',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="doctors-grid">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF5', padding: '28px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}
              >
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${doc.color}, ${doc.color}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
                  {doc.initials}
                </div>
                <h3 style={{ 
                  fontSize: 17, 
                  fontWeight: 700, 
                  color: '#0A1628', 
                  marginBottom: 6,
                  fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
                }}>{doc.name}</h3>
                <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: doc.bg, color: doc.color, marginBottom: 14 }}>
                  {doc.specialty}
                </div>
                <div style={{ fontSize: 13, color: '#6B7280' }}>
                  <span style={{ fontWeight: 600, color: '#374151' }}>Disponible : </span>
                  {doc.schedule}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ASSURANCES
// ─────────────────────────────────────────────────────────────────────────────
const ASSURANCES_LIST = [
  { name: 'NSIA Assurances',        color: '#2563EB', bg: '#EFF6FF' },
  { name: 'SUNU Group',             color: '#16A34A', bg: '#F0FDF4' },
  { name: 'Allianz CI',             color: '#D97706', bg: '#FFFBEB' },
  { name: "AXA Côte d'Ivoire",      color: '#DC2626', bg: '#FEF2F2' },
  { name: 'CNPS',                   color: '#7C3AED', bg: '#F5F3FF' },
  { name: 'Saham Assurance',        color: '#0891B2', bg: '#ECFEFF' },
  { name: 'UAB Assurance',          color: '#EA580C', bg: '#FFF7ED' },
  { name: 'Atlantique Assurances',  color: '#0369A1', bg: '#F0F9FF' },
  { name: 'Colina Assurances',      color: '#4F46E5', bg: '#EEF2FF' },
  { name: 'GNA Assurances',         color: '#065F46', bg: '#ECFDF5' },
  { name: 'Mutuelle CGS',           color: '#92400E', bg: '#FFFBEB' },
  { name: 'IPRES',                  color: '#6B21A8', bg: '#FAF5FF' },
]

export function AssurancesPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.assurances}
        title="Nos Assurances Partenaires"
        subtitle="ESMAD est conventionné avec les principales compagnies d'assurance et mutuelles en Côte d'Ivoire."
      />

      <section style={{ background: '#fff', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 56, maxWidth: 600, margin: '0 auto 56px' }}
          >
            <span style={{ 
              display: 'block', 
              fontSize: 24, 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              color: '#7CB342', 
              marginBottom: 16, 
              fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif" 
            }}>
              NOS ASSURANCES
            </span>
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 42px)', 
              fontWeight: 800, 
              color: '#0A1628', 
              marginBottom: 16,
              fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
            }}>
              Partenaires assurance
            </h2>
            <p style={{ 
              color: '#6B7280', 
              fontSize: 'clamp(18px, 5vw, 22px)', 
              lineHeight: 1.6,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Renseignez-vous auprès de notre accueil pour connaître les modalités de prise en charge.
            </p>
          </motion.div>

          {/* Grid logos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="assurances-grid">
            {ASSURANCES_LIST.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                style={{ borderRadius: 14, border: '1px solid #E8EDF5', padding: '24px 20px', textAlign: 'center', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 18, fontWeight: 800, color: a.color }}>
                  {a.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>{a.name}</div>
                <div style={{ display: 'inline-block', marginTop: 8, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: a.bg, color: a.color }}>
                  Partenaire agréé
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 48, background: '#F0FDF4', borderRadius: 16, padding: '24px 28px', border: '1px solid #BBDDC3', display: 'flex', alignItems: 'flex-start', gap: 14 }}
          >
            <Shield size={22} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#166534', fontSize: 15, marginBottom: 4, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>Information pratique</div>
              <p style={{ color: '#166534', fontSize: 14, lineHeight: 1.7, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                Présentez votre carte d'assurance ou de mutuelle à l'accueil lors de votre arrivée.
                Notre équipe administrative se chargera des démarches de prise en charge.
                Pour toute question, contactez-nous au <strong>01 01 81 92 86</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}