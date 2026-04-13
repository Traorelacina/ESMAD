import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { staggerContainer } from '@/utils/animations'
import DoctorCard, { type DoctorCardProps } from '@/components/ui/DoctorCard'

const DOCTORS: DoctorCardProps[] = [
  {
    initials: 'AK', name: 'Dr. Adama Koné', specialty: 'Médecin Généraliste',
    bio: '15 ans d\'expérience en médecine générale, maladies chroniques et médecine préventive.',
    experience: '15 ans', schedule: 'Lun — Sam',
    gradient: 'linear-gradient(135deg, #1565C0, #1976D2)',
    badge: 'Médecine Générale', badgeBg: '#E3F2FD', badgeColor: '#1565C0',
  },
  {
    initials: 'FO', name: 'Dr. Fatou Ouédraogo', specialty: 'Gynécologue-Obstétricienne',
    bio: 'Spécialiste en suivi prénatal, accouchement physiologique et pathologies gynécologiques.',
    experience: '12 ans', schedule: 'Mar, Jeu, Sam',
    gradient: 'linear-gradient(135deg, #7CB342, #558B2F)',
    badge: 'Gynécologie', badgeBg: '#F1F8E9', badgeColor: '#558B2F',
  },
  {
    initials: 'KB', name: 'Dr. Kouamé Brou', specialty: 'Pédiatre',
    bio: 'Spécialiste de la santé infantile du nouveau-né à l\'adolescent. Suivi vaccinal et nutrition.',
    experience: '10 ans', schedule: 'Lun, Mer, Ven',
    gradient: 'linear-gradient(135deg, #C62828, #AD1457)',
    badge: 'Pédiatrie', badgeBg: '#FFEBEE', badgeColor: '#C62828',
  },
]

export default function DoctorsPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-green-700 mb-2">Notre équipe</span>
            <h2 className="font-head font-bold text-[#0A1628]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Médecins qualifiés
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link to="/medecins" className="flex items-center gap-2 text-[#1565C0] font-semibold text-sm hover:gap-3 transition-all duration-200">
              Voir tous nos médecins <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {DOCTORS.map((doc) => <DoctorCard key={doc.name} {...doc} />)}
        </motion.div>
        <motion.div className="mt-10 text-center" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
          <Link to="/rendez-vous" className="btn-shine inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #7CB342, #8BC34A)', boxShadow: '0 4px 20px rgba(124,179,66,0.3)' }}>
            Prendre un rendez-vous <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}