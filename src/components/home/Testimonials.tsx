import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, MapPin } from 'lucide-react'
import { staggerContainer, cardReveal } from '@/utils/animations'

const TESTIMONIALS = [
  {
    text: "Le Dr. Koné a été d'une grande attention et d'un grand professionnalisme. Le diagnostic a été rapide, le traitement efficace. ESMAD est une clinique de confiance où je n'hésite pas à revenir.",
    author: 'Aya Mensah',
    city: 'Abobo',
    initials: 'AM',
    bg: '#E3F2FD',
    color: '#1565C0',
    service: 'Consultation médicale',
  },
  {
    text: "Excellent service de maternité. La Dr. Ouédraogo a suivi ma grossesse avec beaucoup de sérieux et de bienveillance. Mon accouchement s'est déroulé dans les meilleures conditions de sécurité.",
    author: 'Marie Kouyaté',
    city: 'Adjamé',
    initials: 'MK',
    bg: '#F1F8E9',
    color: '#558B2F',
    service: 'Maternité',
  },
  {
    text: "Service d'urgence très réactif. Nous avons été pris en charge rapidement à 3h du matin. Le personnel est compétent, humain et particulièrement bienveillant dans les moments les plus difficiles.",
    author: 'Jean-Paul Diabaté',
    city: 'Cocody',
    initials: 'JD',
    bg: '#FCE4EC',
    color: '#880E4F',
    service: 'Urgences',
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-7">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-xs font-bold uppercase tracking-[0.12em] text-green-700 mb-3">
            Témoignages
          </span>
          <h2
            className="font-head font-bold text-[#0A1628] mb-3"
            style={{ fontSize: 'clamp(28px,4vw,44px)' }}
          >
            La confiance de nos patients
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base leading-relaxed">
            Des centaines de familles nous font confiance pour leurs soins de santé
            à Abidjan. Voici ce qu'ils disent.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              variants={cardReveal}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="relative bg-white rounded-2xl border border-gray-100 p-7 overflow-hidden flex flex-col"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute top-4 right-4 pointer-events-none select-none"
                style={{ color: t.bg, opacity: 0.6 }}
              >
                <Quote size={56} />
              </div>

              {/* Animated border top accent */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: t.color, opacity: 0.6 }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0, rotate: -20 }}
                    animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.06, type: 'spring', stiffness: 300 }}
                  >
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  </motion.div>
                ))}
              </div>

              {/* Service badge */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide mb-4 w-fit"
                style={{ background: t.bg, color: t.color }}
              >
                {t.service}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 leading-[1.82] italic mb-6 flex-1 relative z-10">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-head font-bold text-sm flex-shrink-0"
                  style={{ background: t.bg, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0A1628]">{t.author}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} />
                    Patient — {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-gray-400">
            Plus de <span className="font-bold text-gray-600">5 000 patients</span> pris en charge depuis l'ouverture d'ESMAD.
          </p>
        </motion.div>
      </div>
    </section>
  )
}