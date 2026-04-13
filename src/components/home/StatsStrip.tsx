import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Stethoscope, Users, Clock, HeartPulse } from 'lucide-react'

const STATS = [
  { icon: Stethoscope, value: 5, suffix: '+', label: 'Spécialités médicales', color: '#7CB342' },
  { icon: Users, value: 15, suffix: '+', label: 'Médecins qualifiés', color: '#1565C0' },
  { icon: Clock, value: 24, suffix: 'h', label: 'Urgences disponibles', color: '#D4A843' },
  { icon: HeartPulse, value: 5000, suffix: '+', label: 'Patients pris en charge', color: '#7CB342' },
]

function AnimatedNumber({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    const duration = 1800

    const step = (ts: number) => {
      if (!start) start = ts
      const prog = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - prog, 3)
      setCount(Math.floor(eased * end))
      if (prog < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, end])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('fr-FR')}
      <span style={{ color: '#D4A843', fontSize: '0.68em', marginLeft: 1 }}>{suffix}</span>
    </span>
  )
}

export default function StatsStrip() {
  return (
    <div
      className="relative z-10 border-t"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.032)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative px-6 py-7 text-center border-r last:border-r-0 col-span-1"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              {/* Icon */}
              <motion.div
                className="flex justify-center mb-2"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <stat.icon size={20} color={stat.color} strokeWidth={1.6} />
              </motion.div>

              {/* Number */}
              <div
                className="font-head font-bold leading-none mb-1.5"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#ffffff' }}
              >
                <AnimatedNumber end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div
                className="text-[11px] uppercase tracking-wider font-medium"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}