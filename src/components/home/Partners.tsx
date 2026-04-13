
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield } from 'lucide-react'

const PARTNERS = [
  { name: 'NSIA Assurances',      initial: 'NI' },
  { name: 'SUNU Group',           initial: 'SU' },
  { name: 'Allianz CI',           initial: 'AL' },
  { name: "AXA Côte d'Ivoire",    initial: 'AX' },
  { name: 'CNPS',                 initial: 'CN' },
  { name: 'Saham Assurance',      initial: 'SA' },
]

export default function Partners() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="py-14 bg-white border-y border-gray-100" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-7">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield size={14} className="text-gray-400" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
              Assurances & Mutuelles partenaires
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            ESMAD est conventionné avec les principales compagnies d'assurance et mutuelles en Côte d'Ivoire.
          </p>
        </motion.div>

        {/* Partner logos */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.name}
              className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 cursor-default select-none overflow-hidden"
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.06, borderColor: '#1565C0', backgroundColor: '#EEF4FF' }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at center, rgba(21,101,192,0.06), transparent 70%)' }}
              />

              {/* Initial badge */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-200"
                style={{ background: '#E3F2FD', color: '#1565C0' }}
              >
                {p.initial}
              </div>

              {/* Name */}
              <span className="text-sm font-semibold text-gray-600 group-hover:text-[#1565C0] transition-colors duration-200 whitespace-nowrap">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          className="text-center text-xs text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Renseignez-vous auprès de notre accueil pour connaître les modalités de prise en charge.
        </motion.p>
      </div>
    </section>
  )
}
