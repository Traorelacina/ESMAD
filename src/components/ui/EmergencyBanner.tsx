import { motion } from 'framer-motion'
import { Phone, AlertCircle } from 'lucide-react'

export default function EmergencyBanner() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #B71C1C 0%, #C62828 50%, #D32F2F 100%)' }}
    >
      {/* Animated shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-[1200px] mx-auto px-7 py-5">
        <div className="flex items-center justify-between flex-wrap gap-5">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle size={20} className="text-white" />
            </motion.div>
            <div className="text-white">
              <div className="font-head text-xl font-bold">Service d'urgences médicales</div>
              <div className="text-sm opacity-85">
                Équipe dédiée disponible 24h/24 — 7j/7 pour toute situation d'urgence
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {[
              { num: '01 01 81 92 86', label: 'Urgences' },
              { num: '05 05 11 41 20', label: 'Accueil' },
            ].map((item) => (
              <motion.a
                key={item.num}
                href={`tel:+225${item.num.replace(/\s/g, '')}`}
                className="text-center text-white"
                whileHover={{ scale: 1.05 }}
              >
                <div className="font-head text-2xl font-bold">{item.num}</div>
                <div className="text-xs opacity-70 uppercase tracking-wider">{item.label}</div>
              </motion.a>
            ))}

            <motion.a
              href="/rendez-vous"
              className="flex items-center gap-2 border-2 border-white/50 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={15} />
              Appeler
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}