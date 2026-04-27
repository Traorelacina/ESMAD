import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { CheckCircle, Heart, Users, Shield, Clock, Stethoscope, Baby, FlaskConical, Search, Home as HomeIcon, HeartPulse, Loader2 } from 'lucide-react'
import Hero from '@/components/home/Hero'
import imageEsma from '@/assets/image_esma.jpeg'
import imagefontEsma from '@/assets/ImagedefondMenuLaClinique.png'
import consultationImg from '@/assets/Consultationgénérale.jpeg'
import hospitalisationImg from '@/assets/Hospitalisation.jpeg'
import laboratoireImg from '@/assets/Laboratoire.jpeg'
import echographieImg from '@/assets/Echo.jpeg'
import materniteImg from '@/assets/maternité.jpeg'
import urgencesImg from '@/assets/urgence.jpeg'
import { assurancesApi, medecinsApi, specialitesApi, type Assurance, type Medecin, type Specialite } from '@/api/client'

// ─── IMAGES PER PAGE ──────────────────────────────────────────────────────────
const IMAGES = {
  clinique:   imagefontEsma,
  services:   'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&q=80',
  medecins:   'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1600&q=80',
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

function ServicesSection() {
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
            Nos prestations
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
              style={{ 
                borderRadius: 20, 
                overflow: 'hidden', 
                background: '#fff', 
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)', 
                border: '1px solid #F0F4F8', 
                transition: 'box-shadow 0.25s ease, transform 0.25s ease' 
              }}
              onMouseEnter={(e) => { 
                const el = e.currentTarget; 
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.11)'; 
                el.style.transform = 'translateY(-4px)' 
              }}
              onMouseLeave={(e) => { 
                const el = e.currentTarget; 
                el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; 
                el.style.transform = 'translateY(0)' 
              }}
            >
              <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block', 
                    transition: 'transform 0.5s ease' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  height: 4, 
                  background: o.color 
                }} />
              </div>

              <div style={{ padding: '24px 24px 30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: 12, 
                    background: o.bg, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0 
                  }}>
                    <o.icon size={22} color={o.color} strokeWidth={1.7} />
                  </div>
                  <h3 style={{ 
                    fontSize: 18, 
                    fontWeight: 700, 
                    color: '#0A1628', 
                    lineHeight: 1.3,
                    fontFamily: "'Inter', 'Poppins', system-ui, -apple-system, sans-serif",
                  }}>{o.title}</h3>
                </div>
                <p style={{ 
                  fontSize: 15, 
                  color: '#6B7280', 
                  lineHeight: 1.65,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.services}
        title="Services & Spécialités"
        subtitle="ESMAD propose une gamme complète de soins médicaux pour toute la famille, assurés par des professionnels qualifiés."
      />
      <ServicesSection />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE MÉDECINS
// ─────────────────────────────────────────────────────────────────────────────

function DoctorSkeleton() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      border: '1px solid #E8EDF5',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    }}>
      <div style={{ height: 240, background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)' }} />
      <div style={{ padding: '20px 24px 28px' }}>
        <div style={{ height: 18, background: '#F1F5F9', borderRadius: 8, width: '70%', marginBottom: 10 }} />
        <div style={{ height: 24, background: '#F1F5F9', borderRadius: 20, width: '50%', marginBottom: 14 }} />
        <div style={{ height: 13, background: '#F1F5F9', borderRadius: 6, width: '85%' }} />
      </div>
    </div>
  )
}

export function DoctorsPage() {
  const [medecins, setMedecins]       = useState<Medecin[]>([])
  const [specialites, setSpecialites] = useState<Specialite[]>([])
  const [filter, setFilter]           = useState('all')
  const [loading, setLoading]         = useState(true)
  const { ref, inView }               = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ per_page: '100' })
        const [medecinRes, specRes] = await Promise.all([
          medecinsApi.list(params.toString()),
          specialitesApi.list(),
        ])
        setMedecins(medecinRes.data.filter(m => m.is_active))
        setSpecialites(specRes.data.filter(s => s.is_active))
      } catch (err) {
        console.error('Erreur chargement médecins:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = filter === 'all'
    ? medecins
    : medecins.filter(m => String(m.specialite_id) === filter || m.specialite?.key === filter)

  const filterTabs = [
    { key: 'all', label: 'Tous' },
    ...specialites.map(s => ({ key: s.key, label: s.name })),
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.medecins}
        title="Nos Médecins"
        subtitle="Des professionnels de santé expérimentés et dévoués à votre bien-être."
      />

      <section style={{ background: '#F8FAFD', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Titre section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <span style={{
              display: 'block',
              fontSize: 24,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#7CB342',
              marginBottom: 12,
              fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
            }}>
              Notre équipe médicale
            </span>
            <p style={{
              color: '#6B7280',
              fontSize: 'clamp(15px, 2vw, 18px)',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 1.6,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Des spécialistes qualifiés pour vous accompagner à chaque étape de votre santé.
            </p>
          </motion.div>

          {/* Filter tabs */}
          {!loading && filterTabs.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 44,
                justifyContent: 'center',
              }}
            >
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  style={{
                    padding: '9px 22px',
                    borderRadius: 40,
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: filter === tab.key ? '2px solid #0A1628' : '2px solid #E5E7EB',
                    background: filter === tab.key ? '#0A1628' : '#fff',
                    color: filter === tab.key ? '#fff' : '#6B7280',
                    transition: 'all 0.2s ease',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    boxShadow: filter === tab.key ? '0 4px 12px rgba(10,22,40,0.18)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* Chargement */}
          {loading ? (
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}
              className="doctors-grid"
            >
              {Array.from({ length: 6 }).map((_, i) => <DoctorSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 0',
              color: '#9CA3AF',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              <Stethoscope size={48} style={{ opacity: 0.25, marginBottom: 16 }} />
              <p style={{ fontSize: 16 }}>Aucun médecin disponible pour cette spécialité.</p>
            </div>
          ) : (
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}
              className="doctors-grid"
            >
              {filtered.map((m, i) => {
                // La disponibilité est maintenant déterminée par is_active
                const isDisponible = m.is_active ?? false

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 32 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    style={{
                      background: '#fff',
                      borderRadius: 20,
                      border: '1px solid #E8EDF5',
                      overflow: 'hidden',
                      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                      transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.12)'
                      e.currentTarget.style.transform = 'translateY(-5px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* ── GRANDE ZONE IMAGE / AVATAR ── */}
                    <div style={{
                      height: 260,
                      overflow: 'hidden',
                      position: 'relative',
                      background: m.photo
                        ? '#f0f0f0'
                        : `linear-gradient(135deg, ${m.color}22 0%, ${m.color}44 100%)`,
                    }}>
                      {m.photo ? (
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                            transition: 'transform 0.55s ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                        }}>
                          <div style={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${m.color}, ${m.color}bb)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 38,
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '0.02em',
                            boxShadow: `0 8px 24px ${m.color}44`,
                            fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                          }}>
                            {m.initials}
                          </div>
                          <Stethoscope size={20} color={m.color} style={{ opacity: 0.5, marginTop: 8 }} />
                        </div>
                      )}

                      {/* Bandeau coloré en bas de l'image */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: m.specialite?.color ?? m.color,
                      }} />
                    </div>

                    {/* ── INFOS ── */}
                    <div style={{ padding: '22px 24px 28px' }}>
                      {/* Nom */}
                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#0A1628',
                        marginBottom: 8,
                        lineHeight: 1.25,
                        fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                      }}>
                        {m.name}
                      </h3>

                      {/* Badge spécialité */}
                      {m.specialite && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 14px',
                          borderRadius: 24,
                          fontSize: 12.5,
                          fontWeight: 600,
                          background: m.specialite.bg_color ?? m.bg_color,
                          color: m.specialite.color ?? m.color,
                          marginBottom: 14,
                          fontFamily: "'Inter', system-ui, sans-serif",
                        }}>
                          <div style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: m.specialite.color ?? m.color,
                          }} />
                          {m.specialite.name}
                        </div>
                      )}

                      {/* Séparateur */}
                      <div style={{ height: 1, background: '#F0F4F8', marginBottom: 14 }} />

                      {/* ── BADGE DISPONIBILITÉ (géré depuis l'admin) ── */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 14px',
                        borderRadius: 24,
                        fontSize: 12.5,
                        fontWeight: 600,
                        background: isDisponible ? '#F0FDF4' : '#F9FAFB',
                        color: isDisponible ? '#16A34A' : '#9CA3AF',
                        border: `1px solid ${isDisponible ? '#BBF7D0' : '#E5E7EB'}`,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}>
                        <div style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: isDisponible ? '#16A34A' : '#D1D5DB',
                          boxShadow: isDisponible ? '0 0 5px #16A34A88' : 'none',
                        }} />
                        {isDisponible ? 'Disponible' : 'Non disponible'}
                      </div>

                      {/* Email */}
                      {m.email && (
                        <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: '#F0FDF4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7CB342" strokeWidth="2.2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <polyline points="22,6 12,13 2,6"/>
                            </svg>
                          </div>
                          <a
                            href={`mailto:${m.email}`}
                            style={{
                              fontSize: 12.5,
                              color: '#7CB342',
                              textDecoration: 'none',
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {m.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ASSURANCES
// ─────────────────────────────────────────────────────────────────────────────

function AssuranceSkeleton() {
  return (
    <div style={{
      borderRadius: 18,
      border: '1px solid #E8EDF5',
      background: '#fff',
      overflow: 'hidden',
    }}>
      <div style={{ height: 160, background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)' }} />
      <div style={{ padding: '18px 20px 22px' }}>
        <div style={{ height: 16, background: '#F1F5F9', borderRadius: 6, width: '75%', margin: '0 auto 10px' }} />
        <div style={{ height: 22, background: '#F1F5F9', borderRadius: 20, width: '50%', margin: '0 auto' }} />
      </div>
    </div>
  )
}

export function AssurancesPage() {
  const [assurances, setAssurances] = useState<Assurance[]>([])
  const [loading, setLoading]       = useState(true)
  const { ref, inView }             = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    const fetchAssurances = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ per_page: '100' })
        const res = await assurancesApi.list(params.toString())
        setAssurances(res.data.filter(a => a.is_active))
      } catch (err) {
        console.error('Erreur chargement assurances:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAssurances()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero
        image={IMAGES.assurances}
        title="Nos Assurances Partenaires"
        subtitle="ESMAD est conventionné avec les principales compagnies d'assurance et mutuelles en Côte d'Ivoire."
      />

      <section style={{ background: '#F8FAFD', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <span style={{
              display: 'block',
              fontSize: 24,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#7CB342',
              marginBottom: 16,
              fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
            }}>
              NOS ASSURANCES
            </span>
            <p style={{
              color: '#6B7280',
              fontSize: 'clamp(14px, 2vw, 17px)',
              lineHeight: 1.7,
              maxWidth: 580,
              margin: '0 auto',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Renseignez-vous auprès de notre service d'accueil pour connaître les modalités de prise en charge.
              Nos partenaires vous offrent une couverture adaptée à vos besoins.
            </p>
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
              className="assurances-grid"
            >
              {Array.from({ length: 6 }).map((_, i) => <AssuranceSkeleton key={i} />)}
            </div>
          ) : assurances.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 0',
              color: '#9CA3AF',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              <Shield size={48} style={{ opacity: 0.25, marginBottom: 16 }} />
              <p style={{ fontSize: 16 }}>Aucune assurance partenaire disponible pour le moment.</p>
            </div>
          ) : (
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
              className="assurances-grid"
            >
              {assurances.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  style={{
                    borderRadius: 18,
                    border: '1px solid #E8EDF5',
                    background: '#fff',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                    cursor: a.website ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.11)'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  onClick={() => a.website && window.open(a.website, '_blank', 'noopener,noreferrer')}
                >
                  <div style={{
                    height: 260,
                    overflow: 'hidden',
                    position: 'relative',
                    background: a.logo
                      ? (a.bg_color ?? '#F8FAFD')
                      : `linear-gradient(135deg, ${a.color ?? '#7CB342'}22 0%, ${a.color ?? '#7CB342'}44 100%)`,
                  }}>
                    {a.logo ? (
                      <img
                        src={a.logo}
                        alt={a.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          display: 'block',
                          padding: '24px',
                          boxSizing: 'border-box',
                          transition: 'transform 0.55s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                      }}>
                        <div style={{
                          width: 110,
                          height: 110,
                          borderRadius: 28,
                          background: `linear-gradient(135deg, ${a.color ?? '#7CB342'}, ${a.color ?? '#7CB342'}bb)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 36,
                          fontWeight: 800,
                          color: '#fff',
                          boxShadow: `0 8px 28px ${a.color ?? '#7CB342'}44`,
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: '-0.02em',
                        }}>
                          {a.initials}
                        </div>
                        <Shield size={20} color={a.color ?? '#7CB342'} style={{ opacity: 0.4, marginTop: 4 }} />
                      </div>
                    )}

                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: a.color ?? '#7CB342',
                    }} />
                  </div>

                  <div style={{ padding: '18px 22px 22px', textAlign: 'center' }}>
                    <div style={{
                      fontSize: 15.5,
                      fontWeight: 700,
                      color: '#0A1628',
                      marginBottom: 10,
                      lineHeight: 1.3,
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}>
                      {a.name}
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 14px',
                      borderRadius: 24,
                      fontSize: 12,
                      fontWeight: 600,
                      background: (a.bg_color ?? '#F0FDF4'),
                      color: (a.color ?? '#16A34A'),
                      fontFamily: "'Inter', system-ui, sans-serif",
                      marginBottom: a.website ? 10 : 0,
                    }}>
                      <CheckCircle size={11} />
                      Partenaire agréé
                    </div>

                    {a.website && (
                      <div style={{
                        fontSize: 11.5,
                        color: '#9CA3AF',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        marginTop: 4,
                      }}>
                        {a.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Note info pratique */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            style={{
              marginTop: 52,
              background: '#F0FDF4',
              borderRadius: 18,
              padding: '24px 32px',
              border: '1px solid #BBDDC3',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
            }}
          >
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: '#D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Shield size={20} color="#16A34A" />
            </div>
            <div>
              <div style={{
                fontWeight: 700,
                color: '#166534',
                fontSize: 15,
                marginBottom: 6,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                Information pratique
              </div>
              <p style={{
                color: '#166534',
                fontSize: 14,
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
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