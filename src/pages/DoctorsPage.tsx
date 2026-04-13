import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition, staggerContainer } from '@/utils/animations'
import DoctorCard, { type DoctorCardProps } from '@/components/ui/DoctorCard'
import CtaBanner from '@/components/home/CtaBanner'

const ALL_DOCTORS: (DoctorCardProps & { cat: string })[] = [
  {
    cat: 'gen', initials: 'AK', name: 'Dr. Adama Koné', specialty: 'Médecin Généraliste',
    bio: '15 ans d\'expérience en médecine générale, maladies chroniques et médecine préventive. Prise en charge globale du patient.',
    experience: '15 ans', schedule: 'Lun — Sam',
    gradient: 'linear-gradient(135deg, #1565C0, #1976D2)',
    badge: 'Médecine Générale', badgeBg: '#E3F2FD', badgeColor: '#1565C0',
  },
  {
    cat: 'gyn', initials: 'FO', name: 'Dr. Fatou Ouédraogo', specialty: 'Gynécologue-Obstétricienne',
    bio: 'Spécialiste en suivi prénatal, accouchement physiologique, pathologies gynécologiques et planification familiale.',
    experience: '12 ans', schedule: 'Mar, Jeu, Sam',
    gradient: 'linear-gradient(135deg, #7CB342, #558B2F)',
    badge: 'Gynécologie', badgeBg: '#F1F8E9', badgeColor: '#558B2F',
  },
  {
    cat: 'ped', initials: 'KB', name: 'Dr. Kouamé Brou', specialty: 'Pédiatre',
    bio: 'Spécialiste de la santé infantile du nouveau-né à l\'adolescent. Suivi vaccinal, nutrition pédiatrique et maladies infantiles.',
    experience: '10 ans', schedule: 'Lun, Mer, Ven',
    gradient: 'linear-gradient(135deg, #C62828, #AD1457)',
    badge: 'Pédiatrie', badgeBg: '#FFEBEE', badgeColor: '#C62828',
  },
  {
    cat: 'lab', initials: 'SI', name: 'Dr. Seydou Issa', specialty: 'Biologiste Médical',
    bio: 'Responsable du laboratoire d\'analyses. Expert en hématologie, biochimie, sérologie et microbiologie.',
    experience: '8 ans', schedule: 'Lun — Ven',
    gradient: 'linear-gradient(135deg, #F57F17, #E65100)',
    badge: 'Laboratoire', badgeBg: '#FFF8E1', badgeColor: '#E65100',
  },
  {
    cat: 'gen', initials: 'MC', name: 'Dr. Marie-Claire Coulibaly', specialty: 'Médecin Généraliste',
    bio: 'Spécialisée en médecine familiale, hypertension et diabète. Approche centrée sur le patient et la prévention.',
    experience: '9 ans', schedule: 'Mar, Jeu, Sam',
    gradient: 'linear-gradient(135deg, #6A1B9A, #4A148C)',
    badge: 'Médecine Générale', badgeBg: '#EDE7F6', badgeColor: '#6A1B9A',
  },
  {
    cat: 'gyn', initials: 'AL', name: 'Dr. Awa Lamine', specialty: 'Sage-Femme Cheffe',
    bio: 'Responsable de la maternité ESMAD. 18 ans d\'expérience en suivi de grossesse à risque, accouchement et soins au nouveau-né.',
    experience: '18 ans', schedule: 'Lun — Sam',
    gradient: 'linear-gradient(135deg, #00838F, #006064)',
    badge: 'Sage-Femme', badgeBg: '#E0F7FA', badgeColor: '#006064',
  },
]

const FILTERS = [
  { key: 'all', label: 'Tous les médecins' },
  { key: 'gen',  label: 'Médecine Générale' },
  { key: 'gyn',  label: 'Gynécologie' },
  { key: 'ped',  label: 'Pédiatrie' },
  { key: 'lab',  label: 'Laboratoire' },
]

export default function DoctorsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? ALL_DOCTORS : ALL_DOCTORS.filter((d) => d.cat === filter)

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" exit="exit">

      {/* Page header */}
      <div
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #070E1C 0%, #0F2044 50%, #162952 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,179,66,0.1), transparent)' }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-7 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: 'rgba(124,179,66,0.12)', border: '1px solid rgba(124,179,66,0.3)', color: '#9CCC65' }}>
              Notre corps médical
            </div>
            <h1 className="font-head font-bold text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Médecins & Spécialistes
            </h1>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Des professionnels de santé expérimentés et dévoués à votre bien-être.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-7 py-16">

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="px-5 py-2.5 rounded-full text-sm font-medium border transition-colors duration-200 outline-none"
              animate={{
                background: filter === tab.key ? '#0A1628' : '#ffffff',
                borderColor: filter === tab.key ? '#0A1628' : '#E5E7EB',
                color: filter === tab.key ? '#ffffff' : '#6B7280',
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {tab.label}
              {tab.key !== 'all' && (
                <span className="ml-2 text-xs opacity-60">
                  ({ALL_DOCTORS.filter((d) => d.cat === tab.key).length})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((doc) => {
              const { cat: _cat, ...cardProps } = doc
              return (
                <motion.div
                  key={doc.name}
                  layout
                  initial={{ opacity: 0, scale: 0.88, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -16 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                >
                  <DoctorCard {...cardProps} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-gray-300 text-6xl mb-4">👨‍⚕️</div>
            <p className="text-gray-400">Aucun médecin trouvé pour cette spécialité.</p>
          </motion.div>
        )}
      </div>

      <CtaBanner />
    </motion.div>
  )
}