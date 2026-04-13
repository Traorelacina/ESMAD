import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, ArrowRight } from 'lucide-react'
import { staggerContainer, cardReveal } from '@/utils/animations'

const NEWS = [
  {
    cat: 'Consultation', catColor: '#1565C0', catBg: '#E3F2FD',
    headerBg: 'linear-gradient(135deg, #1565C0, #1976D2)',
    title: 'L\'importance du suivi médical régulier pour prévenir les maladies chroniques',
    excerpt: 'Un check-up annuel permet de détecter précocement le diabète, l\'hypertension ou les maladies cardiovasculaires avant qu\'elles ne s\'aggravent.',
    date: 'Mars 2026',
  },
  {
    cat: 'Maternité', catColor: '#558B2F', catBg: '#F1F8E9',
    headerBg: 'linear-gradient(135deg, #7CB342, #558B2F)',
    title: 'Grossesse : l\'importance du suivi prénatal dès le premier trimestre',
    excerpt: 'Un suivi prénatal précoce et régulier permet d\'assurer la santé de la mère et du bébé, et de détecter les grossesses à risque.',
    date: 'Février 2026',
  },
  {
    cat: 'Pédiatrie', catColor: '#E65100', catBg: '#FFF3E0',
    headerBg: 'linear-gradient(135deg, #E65100, #F57F17)',
    title: 'Calendrier vaccinal de l\'enfant : guide complet pour les parents',
    excerpt: 'La vaccination protège votre enfant contre de nombreuses maladies graves. Retrouvez le calendrier recommandé par notre pédiatre.',
    date: 'Janvier 2026',
  },
]

export default function NewsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-7">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="block text-xs font-bold uppercase tracking-[0.12em] text-green-700 mb-2">Conseils santé</span>
            <h2 className="font-head font-bold text-[#0A1628]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Actualités médicales
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <button className="flex items-center gap-2 text-[#1565C0] font-semibold text-sm hover:gap-3 transition-all duration-200">
              Voir tous les articles <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {NEWS.map((n) => (
            <motion.div
              key={n.title}
              variants={cardReveal}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="rounded-2xl border border-gray-100 overflow-hidden bg-white cursor-pointer"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              {/* Header banner */}
              <div className="relative h-36 flex items-end p-5 overflow-hidden" style={{ background: n.headerBg }}>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), transparent)' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <span className="relative z-10 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: n.catBg, color: n.catColor }}>
                  {n.cat}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-head text-base font-semibold text-[#0A1628] mb-2 leading-snug">
                  {n.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{n.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Clock size={11} />{n.date}
                  </span>
                  <button className="text-xs text-[#1565C0] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Lire <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}