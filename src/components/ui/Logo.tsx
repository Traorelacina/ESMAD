import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'default' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizes = { sm: 38, md: 48, lg: 60 }
  const s = sizes[size]
  const textColor = variant === 'white' ? '#fff' : '#0A1628'
  const subColor = variant === 'white' ? 'rgba(255,255,255,0.55)' : '#6B7280'

  return (
    <div className="flex items-center gap-3">
      {/* Cross mark */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex items-center justify-center rounded-lg flex-shrink-0"
        style={{
          width: s,
          height: s,
          background: 'linear-gradient(135deg, #7CB342, #8BC34A)',
          boxShadow: '0 4px 16px rgba(124,179,66,0.4)',
        }}
      >
        {/* Horizontal bar */}
        <div
          className="absolute bg-white rounded-sm"
          style={{ width: s * 0.6, height: s * 0.22, borderRadius: 2 }}
        />
        {/* Vertical bar */}
        <div
          className="absolute bg-white rounded-sm"
          style={{ width: s * 0.22, height: s * 0.6, borderRadius: 2 }}
        />
      </motion.div>

      {/* Text */}
      <div>
        <div
          className="font-head font-bold leading-tight"
          style={{
            fontSize: size === 'sm' ? 16 : size === 'md' ? 19 : 24,
            color: textColor,
          }}
        >
          ESMAD
        </div>
        <div
          className="font-body font-normal uppercase tracking-wider"
          style={{ fontSize: 10, color: subColor, letterSpacing: '0.06em' }}
        >
          Espace Médical Anador
        </div>
      </div>
    </div>
  )
}