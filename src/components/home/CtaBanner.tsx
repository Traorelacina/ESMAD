import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #070E1C 0%, #0F2044 50%, #1a3a6e 100%)' }}
      ref={ref}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Orbs */}
      <motion.div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(21,101,192,0.22), transparent)' }}
        animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity }} />
      <motion.div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,179,66,0.16), transparent)' }}
        animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-7 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-7"
            style={{ background: 'rgba(124,179,66,0.12)', border: '1px solid rgba(124,179,66,0.3)', color: '#9CCC65' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Votre santé nous engage
          </div>

          {/* Title */}
          <h2 className="font-head font-bold text-white mb-5 leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 54px)' }}>
            Prenez soin de votre santé<br />
            <span style={{
              background: 'linear-gradient(135deg, #D4A843, #FFD54F, #D4A843)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer-text 3s linear infinite',
            }}>
              dès aujourd'hui
            </span>
          </h2>

          {/* Sub */}
          <p className="text-base max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}>
            Nos professionnels de santé sont disponibles pour vous accompagner.
            Réservez votre consultation maintenant.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/rendez-vous"
                className="btn-shine flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base"
                style={{ background: 'linear-gradient(135deg, #7CB342, #8BC34A)', boxShadow: '0 4px 24px rgba(124,179,66,0.42)' }}>
                <Calendar size={18} />
                Prendre Rendez-vous
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base"
                style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.04)' }}>
                Nous contacter
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}