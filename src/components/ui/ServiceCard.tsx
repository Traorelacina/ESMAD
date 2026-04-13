import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cardReveal } from '@/utils/animations'

export interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
  iconBg: string
  iconColor: string
  dark?: boolean
  href?: string
  action?: string
  delay?: number
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  badge,
  iconBg,
  iconColor,
  dark = false,
  href = '/services',
  action,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={cardReveal}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="relative overflow-hidden rounded-2xl border flex flex-col group"
      style={{
        background: dark
          ? 'linear-gradient(135deg, #0A1628 0%, #0F2044 100%)'
          : '#ffffff',
        borderColor: dark ? 'transparent' : '#E5E7EB',
        boxShadow: dark
          ? '0 4px 24px rgba(0,0,0,0.2)'
          : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: dark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.04), transparent 60%)'
            : 'linear-gradient(135deg, rgba(21,101,192,0.03), transparent 60%)',
        }}
      />

      {/* Dark card inner glow */}
      {dark && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: 'inset 0 0 40px rgba(198,40,40,0.15)' }}
        />
      )}

      {/* Body */}
      <div className="p-7 flex-1 relative z-10">
        <motion.div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
          style={{ background: iconBg }}
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Icon size={26} color={iconColor} strokeWidth={1.7} />
        </motion.div>

        <h3
          className="font-head text-xl font-semibold mb-3 leading-snug"
          style={{ color: dark ? '#ffffff' : '#0A1628' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: dark ? 'rgba(255,255,255,0.58)' : '#6B7280' }}
        >
          {description}
        </p>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 px-7 py-4 border-t flex items-center justify-between"
        style={{
          borderColor: dark ? 'rgba(255,255,255,0.07)' : '#F3F4F6',
          background: dark ? 'rgba(255,255,255,0.03)' : '#FAFAFA',
        }}
      >
        {dark ? (
          <>
            {action && (
              <span className="font-bold text-base" style={{ color: '#EF9A9A' }}>
                {action}
              </span>
            )}
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Appel direct
            </span>
          </>
        ) : (
          <>
            <Link
              to={href}
              className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200"
              style={{ color: '#1565C0' }}
            >
              En savoir plus
              <ArrowRight size={13} />
            </Link>
            {badge && (
              <span className="text-xs" style={{ color: '#9CA3AF' }}>
                {badge}
              </span>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}