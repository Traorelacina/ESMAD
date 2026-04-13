import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { cardReveal } from '@/utils/animations'

export interface DoctorCardProps {
  initials: string
  name: string
  specialty: string
  bio: string
  experience: string
  schedule: string
  gradient: string
  badge: string
  badgeBg: string
  badgeColor: string
}

export default function DoctorCard({
  initials,
  name,
  specialty,
  bio,
  experience,
  schedule,
  gradient,
  badge,
  badgeBg,
  badgeColor,
}: DoctorCardProps) {
  return (
    <motion.div
      variants={cardReveal}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="rounded-2xl border border-gray-100 overflow-hidden bg-white group"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      {/* Photo area */}
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Initials */}
        <motion.span
          className="font-head text-5xl font-bold select-none"
          style={{ color: 'rgba(255,255,255,0.82)' }}
          whileHover={{ scale: 1.08 }}
        >
          {initials}
        </motion.span>

        {/* Specialty badge */}
        <div
          className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
          style={{ background: badgeBg, color: badgeColor }}
        >
          {badge}
        </div>

        {/* Animated shimmer overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), transparent 60%)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-head text-[18px] font-semibold text-[#0A1628] mb-0.5 leading-snug">
          {name}
        </h3>
        <div className="text-sm font-medium mb-3" style={{ color: '#1565C0' }}>
          {specialty}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{bio}</p>

        {/* Meta */}
        <div
          className="flex items-center gap-3 text-xs text-gray-400 mb-4 bg-gray-50 rounded-lg px-3 py-2.5"
        >
          <div className="flex items-center gap-1.5">
            <Clock size={11} />
            <span>{schedule}</span>
          </div>
          <span className="text-gray-200">|</span>
          <span>{experience} d'expérience</span>
        </div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/rendez-vous"
            className="btn-shine flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #1565C0, #1976D2)',
              boxShadow: '0 2px 12px rgba(21,101,192,0.25)',
            }}
          >
            <Calendar size={13} />
            Prendre RDV
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}