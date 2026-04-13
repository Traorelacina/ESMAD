import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PhoneCall, CheckCircle2, Stethoscope, HeartPulse } from 'lucide-react'

const STEPS = [
  {
    num: '01', icon: PhoneCall,
    title: 'Prenez contact',
    desc: 'Appelez-nous ou remplissez le formulaire en ligne pour initier votre démarche de soin.',
    color: '#1565C0', bg: '#E3F2FD', ringColor: 'rgba(21,101,192,0.2)',
  },
  {
    num: '02', icon: CheckCircle2,
    title: 'Confirmation',
    desc: 'Notre équipe confirme votre rendez-vous et vous communique toutes les informations nécessaires.',
    color: '#558B2F', bg: '#F1F8E9', ringColor: 'rgba(85,139,47,0.2)',
  },
  {
    num: '03', icon: Stethoscope,
    title: 'Consultation',
    desc: 'Vous êtes accueilli et pris en charge par un professionnel de santé qualifié et attentionné.',
    color: '#F57F17', bg: '#FFF8E1', ringColor: 'rgba(245,127,23,0.2)',
  },
  {
    num: '04', icon: HeartPulse,
    title: 'Suivi médical',
    desc: 'Un suivi personnalisé est assuré pour garantir votre rétablissement et votre bien-être durable.',
    color: '#C62828', bg: '#FFEBEE', ringColor: 'rgba(198,40,40,0.2)',
  },
]

export default function ProcessSteps() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-7">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-xs font-bold uppercase tracking-[0.12em] text-green-700 mb-3">
            Comment ça marche
          </span>
          <h2
            className="font-head font-bold text-[#0A1628] leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Votre prise en charge<br />
            <span style={{
              background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              en 4 étapes simples
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[47px] left-[12.5%] right-[12.5%] h-px overflow-hidden">
            <div className="w-full h-full" style={{ background: '#E5E7EB' }} />
            <motion.div
              className="absolute inset-0 origin-left"
              style={{ background: 'linear-gradient(90deg, #1565C0, #7CB342, #D4A843)' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 44 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.15 + i * 0.18,
                  duration: 0.65,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Circle */}
                <motion.div
                  className="relative w-24 h-24 mb-6"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Pulsing outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${step.color}`, opacity: 0.2 }}
                    animate={inView ? { scale: [1, 1.14, 1], opacity: [0.2, 0.5, 0.2] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  />
                  {/* Middle ring */}
                  <div
                    className="absolute inset-2 rounded-full"
                    style={{ background: step.bg, border: `2px solid ${step.color}33` }}
                  />
                  {/* Inner */}
                  <div
                    className="absolute inset-4 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, white, ${step.bg})`,
                      border: `2px solid ${step.color}28`,
                    }}
                  >
                    <span
                      className="font-head text-xl font-bold leading-none"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Icon badge (top-right) */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: step.color }}
                    animate={inView ? { y: [0, -4, 0] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35 }}
                  >
                    <step.icon size={14} color="white" strokeWidth={2} />
                  </motion.div>
                </motion.div>

                {/* Text */}
                <h3 className="font-head text-[17px] font-semibold text-[#0A1628] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[190px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}