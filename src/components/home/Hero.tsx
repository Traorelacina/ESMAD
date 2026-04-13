import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Calendar, ChevronRight, Shield, Phone, MapPin, Clock,
  Activity, ArrowRight, Stethoscope, Baby, FlaskConical,
  HeartPulse, Microscope, Sparkles,
} from 'lucide-react'
import { useInView } from 'react-intersection-observer'

// Ajout des styles globaux responsives
const styleSheet = document.createElement("style")
styleSheet.textContent = `
  @keyframes shimmer-text {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  
  .glass-light {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  
  .btn-shine {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .btn-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s ease;
  }
  
  .btn-shine:hover::before {
    left: 100%;
  }
  
  .animate-ping-slow {
    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
  }

  .float-animation {
    animation: float 6s ease-in-out infinite;
  }

  .float-animation-delayed {
    animation: float-delayed 5s ease-in-out infinite;
  }

  /* Styles responsives */
  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr !important;
      gap: 48px !important;
    }
    
    .hero-title-medical {
      font-size: clamp(48px, 8vw, 68px) !important;
    }
    
    .hero-title-anador {
      font-size: clamp(32px, 5vw, 38px) !important;
    }
    
    .hero-subtitle {
      font-size: 14px !important;
      max-width: 100% !important;
    }
  }

  @media (max-width: 768px) {
    .hero-container {
      padding: 60px 20px 40px !important;
    }
    
    .hero-badge {
      font-size: 10px !important;
      padding: 4px 12px !important;
    }
    
    .hero-buttons {
      gap: 12px !important;
    }
    
    .hero-btn-primary {
      padding: 12px 20px !important;
      font-size: 13px !important;
    }
    
    .hero-btn-secondary {
      padding: 12px 20px !important;
      font-size: 13px !important;
    }
    
    .hero-trust-strip {
      gap: 16px !important;
      font-size: 11px !important;
    }
    
    /* Carte responsive */
    .hero-card {
      width: 100% !important;
      max-width: 320px !important;
      margin: 0 auto !important;
    }
    
    /* Badges flottants responsives */
    .floating-badge-urgent {
      top: -10px !important;
      left: -10px !important;
      padding: 8px 12px !important;
    }
    
    .floating-badge-patients {
      bottom: -10px !important;
      right: -10px !important;
      padding: 8px 12px !important;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    
    .stats-item {
      padding: 16px !important;
    }
    
    .stats-item:not(:last-child) {
      border-right: none !important;
    }
    
    .stats-item:nth-child(2) {
      border-right: none !important;
    }
  }

  @media (max-width: 480px) {
    .hero-container {
      padding: 40px 16px 32px !important;
    }
    
    .hero-buttons {
      flex-direction: column !important;
      width: 100% !important;
    }
    
    .hero-btn-primary, .hero-btn-secondary {
      width: 100% !important;
      justify-content: center !important;
    }
    
    .hero-trust-strip {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 8px !important;
    }
    
    .floating-badge-urgent, .floating-badge-patients {
      display: none !important;
    }
    
    .hero-card {
      max-width: 100% !important;
    }
    
    .stats-grid {
      grid-template-columns: 1fr !important;
    }
  }
`
document.head.appendChild(styleSheet)

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <span ref={ref} className="counter-number">
      {count.toLocaleString('fr-FR')}
      <span style={{ color: '#D4A843', fontSize: '0.65em', marginLeft: 1 }}>{suffix}</span>
    </span>
  )
}

// ─── ECG LINE SVG ─────────────────────────────────────────────────────────────
function EcgLine() {
  return (
    <svg viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 40 }}>
      <defs>
        <linearGradient id="ecgGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(124,179,66,0)" />
          <stop offset="30%" stopColor="rgba(124,179,66,0.8)" />
          <stop offset="60%" stopColor="rgba(21,101,192,0.9)" />
          <stop offset="100%" stopColor="rgba(212,168,67,0)" />
        </linearGradient>
        <filter id="ecgGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M0 30 L40 30 L55 30 L65 8 L75 52 L85 30 L95 30 L105 30 L115 30 L130 30 L145 30 L155 8 L165 52 L175 30 L185 30 L200 30 L240 30 L300 30"
        stroke="url(#ecgGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#ecgGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  )
}

// ─── MEDICAL BACKGROUND CANVAS ────────────────────────────────────────────────
function MedicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0
    let lastTimestamp = 0

    const resize = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.width
    const H = () => canvas.height

    const dnaStrands = [
      { x: 0.08, yStart: 1.1, vy: -0.19, phase: 0.0, amp: 24, speed: 0.02 },
      { x: 0.82, yStart: 0.3, vy: -0.15, phase: 2.1, amp: 20, speed: 0.017 },
      { x: 0.52, yStart: 1.4, vy: -0.22, phase: 4.4, amp: 18, speed: 0.022 },
    ].map(d => ({ ...d, y: d.yStart }))

    const molecules = Array.from({ length: 20 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: 2 + Math.random() * 3,
      opacity: 0.12 + Math.random() * 0.15,
    }))

    const rings = Array.from({ length: 5 }, (_, i) => ({
      cx: [0.12, 0.72, 0.38, 0.88, 0.55][i]!,
      cy: [0.28, 0.58, 0.75, 0.18, 0.45][i]!,
      r: Math.random() * 40,
      maxR: 100 + Math.random() * 60,
      opacity: 0,
      speed: 0.28 + Math.random() * 0.18,
    }))

    const crosses = Array.from({ length: 8 }, () => ({
      x: Math.random(), y: Math.random(),
      size: 7 + Math.random() * 11,
      opacity: 0.04 + Math.random() * 0.06,
      vy: -(0.00008 + Math.random() * 0.0001),
      phase: Math.random() * Math.PI * 2,
    }))

    const drawHexGrid = () => {
      const size = 38
      const hx = size * Math.sqrt(3)
      const hy = size * 1.5
      ctx.save()
      for (let row = -1; row < H() / hy + 2; row++) {
        for (let col = -1; col < W() / hx + 2; col++) {
          const x = col * hx + (row % 2 === 0 ? 0 : hx / 2)
          const y = row * hy
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.5 + row * 0.45 + col * 0.65)
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6
            const px = x + (size - 2) * Math.cos(a)
            const py = y + (size - 2) * Math.sin(a)
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.strokeStyle = `rgba(66,165,245,${0.02 + pulse * 0.02})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
      ctx.restore()
    }

    const drawDNA = (s: typeof dnaStrands[0]) => {
      const steps = 38
      const segH = 24
      ctx.save()
      for (let i = 0; i < steps; i++) {
        const sy = s.y * H() + i * segH
        if (sy < -40 || sy > H() + 40) continue
        const phase = s.phase + i * 0.4 + t * s.speed
        const x1 = s.x * W() + Math.sin(phase) * s.amp
        const x2 = s.x * W() - Math.sin(phase) * s.amp
        const prog = i / steps
        const fade = Math.min(prog * 3, 1) * Math.min((1 - prog) * 3, 1)
        const alpha = fade * 0.35

        ctx.beginPath(); ctx.arc(x1, sy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,179,66,${alpha})`; ctx.fill()

        ctx.beginPath(); ctx.arc(x2, sy, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(66,165,245,${alpha})`; ctx.fill()

        if (i % 3 === 0) {
          ctx.beginPath(); ctx.moveTo(x1, sy); ctx.lineTo(x2, sy)
          ctx.strokeStyle = `rgba(212,168,67,${alpha * 0.8})`
          ctx.lineWidth = 0.9; ctx.stroke()
        }
        if (i < steps - 1) {
          const np = s.phase + (i + 1) * 0.4 + t * s.speed
          const nx1 = s.x * W() + Math.sin(np) * s.amp
          const nx2 = s.x * W() - Math.sin(np) * s.amp
          ctx.beginPath(); ctx.moveTo(x1, sy); ctx.lineTo(nx1, sy + segH)
          ctx.strokeStyle = `rgba(124,179,66,${alpha * 0.6})`; ctx.lineWidth = 0.8; ctx.stroke()
          ctx.beginPath(); ctx.moveTo(x2, sy); ctx.lineTo(nx2, sy + segH)
          ctx.strokeStyle = `rgba(66,165,245,${alpha * 0.6})`; ctx.lineWidth = 0.8; ctx.stroke()
        }
      }
      ctx.restore()
    }

    const drawMolecules = () => {
      const dist = 85
      ctx.save()
      for (let i = 0; i < molecules.length; i++) {
        for (let j = i + 1; j < molecules.length; j++) {
          const dx = (molecules[i].x - molecules[j].x) * W()
          const dy = (molecules[i].y - molecules[j].y) * H()
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < dist) {
            ctx.beginPath()
            ctx.moveTo(molecules[i].x * W(), molecules[i].y * H())
            ctx.lineTo(molecules[j].x * W(), molecules[j].y * H())
            ctx.strokeStyle = `rgba(124,179,66,${(1 - d / dist) * 0.12})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      molecules.forEach(m => {
        ctx.beginPath(); ctx.arc(m.x * W(), m.y * H(), m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(66,165,245,${m.opacity})`; ctx.fill()
        ctx.beginPath(); ctx.arc(m.x * W(), m.y * H(), m.r + 3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(66,165,245,${m.opacity * 0.3})`; ctx.lineWidth = 0.6; ctx.stroke()
      })
      ctx.restore()
    }

    const drawRings = () => {
      ctx.save()
      rings.forEach(ring => {
        if (ring.opacity <= 0) return
        for (let k = 0; k < 3; k++) {
          const r = ring.r - k * 20
          if (r < 0) continue
          ctx.beginPath()
          ctx.arc(ring.cx * W(), ring.cy * H(), r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(33,150,243,${ring.opacity * (1 - k * 0.3) * 0.3})`
          ctx.lineWidth = 0.8; ctx.stroke()
        }
      })
      ctx.restore()
    }

    const drawCrosses = () => {
      ctx.save()
      crosses.forEach(c => {
        const wobble = Math.sin(t * 0.5 + c.phase) * 8
        const x = c.x * W() + wobble
        const y = c.y * H()
        const s = c.size
        ctx.fillStyle = `rgba(212,168,67,${c.opacity})`
        ctx.fillRect(x - s / 2, y - s * 1.5, s, s * 3)
        ctx.fillRect(x - s * 1.5, y - s / 2, s * 3, s)
      })
      ctx.restore()
    }

    const drawAmbientECG = () => {
      const ecgY = H() * 0.68
      ctx.save()
      ctx.beginPath()
      const steps = 300
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * W()
        const phase = (i / steps) * 8 * Math.PI + t * 1.2
        const p = phase % (Math.PI * 2)
        let y = ecgY
        if (p > 0.8 && p < 1.05)   y = ecgY - 30 * Math.sin((p - 0.8) * Math.PI / 0.25)
        else if (p > 1.5 && p < 1.65) y = ecgY + 14
        else if (p > 1.65 && p < 1.8) y = ecgY - 65
        else if (p > 1.8 && p < 1.95) y = ecgY + 10
        else if (p > 2.3 && p < 2.7)  y = ecgY - 18 * Math.sin((p - 2.3) * Math.PI / 0.4)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      const g = ctx.createLinearGradient(0, 0, W(), 0)
      g.addColorStop(0, 'rgba(124,179,66,0)')
      g.addColorStop(0.2, 'rgba(124,179,66,0.1)')
      g.addColorStop(0.5, 'rgba(33,150,243,0.15)')
      g.addColorStop(0.8, 'rgba(212,168,67,0.1)')
      g.addColorStop(1, 'rgba(212,168,67,0)')
      ctx.strokeStyle = g
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
    }

    const cells = Array.from({ length: 8 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 20 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '33,150,243' : '124,179,66',
    }))

    const drawCells = () => {
      ctx.save()
      cells.forEach(c => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + c.phase)
        const r = c.r * (0.92 + pulse * 0.1)
        ctx.beginPath(); ctx.arc(c.x * W(), c.y * H(), r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${c.color},${0.03 + pulse * 0.03})`
        ctx.lineWidth = 1; ctx.stroke()
        ctx.beginPath(); ctx.arc(c.x * W(), c.y * H(), r * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${c.color},${0.02 + pulse * 0.02})`
        ctx.lineWidth = 0.5; ctx.stroke()
      })
      ctx.restore()
    }

    const vitalsLines = Array.from({ length: 3 }, (_, i) => ({
      yFrac: [0.35, 0.55, 0.78][i]!,
      amp: [12, 8, 20][i]!,
      freq: [3, 5, 4][i]!,
      speed: [0.8, 1.2, 1.0][i]!,
      color: ['33,150,243', '124,179,66', '212,168,67'][i]!,
      opacity: [0.08, 0.06, 0.07][i]!,
    }))

    const drawVitals = () => {
      ctx.save()
      vitalsLines.forEach(v => {
        const baseY = v.yFrac * H()
        ctx.beginPath()
        for (let i = 0; i <= 200; i++) {
          const x = (i / 200) * W()
          const phase = (i / 200) * v.freq * Math.PI * 2 + t * v.speed
          const y = baseY + Math.sin(phase) * v.amp
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(${v.color},${v.opacity})`
        ctx.lineWidth = 0.8; ctx.stroke()
      })
      ctx.restore()
    }

    const draw = (timestamp: number) => {
      if (timestamp - lastTimestamp < 16) {
        animId = requestAnimationFrame(draw)
        return
      }
      lastTimestamp = timestamp

      ctx.clearRect(0, 0, W(), H())

      dnaStrands.forEach(s => {
        s.y += s.vy * 0.016
        if (s.y * H() < -38 * 24) s.y = 1.2
      })

      molecules.forEach(m => {
        m.x += m.vx; m.y += m.vy
        if (m.x < 0) m.x = 1; if (m.x > 1) m.x = 0
        if (m.y < 0) m.y = 1; if (m.y > 1) m.y = 0
      })

      rings.forEach(ring => {
        ring.r += ring.speed * 0.96
        ring.opacity = Math.max(0, 0.7 * (1 - ring.r / ring.maxR))
        if (ring.r > ring.maxR) {
          ring.r = 0; ring.opacity = 0.7
          ring.cx = 0.1 + Math.random() * 0.8
          ring.cy = 0.1 + Math.random() * 0.8
        }
      })

      crosses.forEach(c => {
        c.y += c.vy * 0.96
        if (c.y < -0.05) { c.y = 1.05; c.x = Math.random() }
      })

      drawHexGrid()
      drawCells()
      drawVitals()
      dnaStrands.forEach(drawDNA)
      drawMolecules()
      drawRings()
      drawCrosses()
      drawAmbientECG()

      t += 0.016
      animId = requestAnimationFrame(draw)
    }

    draw(0)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 1,
        willChange: 'transform'
      }}
    />
  )
}

// ─── SERVICES DATA ────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Stethoscope, label: 'Consultation',  color: '#42A5F5', bg: 'rgba(66,165,245,0.15)',   href: '/services' },
  { icon: Baby,        label: 'Maternité',     color: '#F48FB1', bg: 'rgba(244,143,177,0.15)',  href: '/services' },
  { icon: FlaskConical,label: 'Laboratoire',   color: '#9CCC65', bg: 'rgba(156,204,101,0.15)', href: '/services' },
  { icon: Microscope,  label: 'Échographie',   color: '#FFD54F', bg: 'rgba(255,213,79,0.15)',   href: '/services' },
  { icon: HeartPulse,  label: 'Urgences 24h',  color: '#EF9A9A', bg: 'rgba(239,154,154,0.2)', href: '/urgences' },
]

const STATS = [
  { value: 5,    suffix: '+', label: 'Spécialités' },
  { value: 15,   suffix: '+', label: 'Médecins' },
  { value: 5000, suffix: '+', label: 'Patients' },
  { value: 24,   suffix: 'h', label: 'Urgences' },
]

const TICKER_ITEMS = [
  '✦ Consultation Générale', '✦ Maternité & Obstétrique',
  '✦ Analyses de Laboratoire', '✦ Échographie',
  '✦ Urgences 24h/7j', '✦ Hospitalisation',
  '✦ Centre Agréé MSHP', '✦ Soins de Qualité',
]

function Ticker() {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)', padding: '12px 0' }}>
      <motion.div
        style={{ display: 'inline-flex', gap: 48 }}
        animate={{ x: [0, -2000] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', flexShrink: 0 }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── MAIN HERO RESPONSIVE ─────────────────────────────────────────────────────
export default function Hero() {
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveService(s => (s + 1) % SERVICES.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#060D1A', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Deep gradient base */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(33,150,243,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(124,179,66,0.08) 0%, transparent 55%), #060D1A',
        zIndex: 0,
      }} />

      <MedicalBackground />

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        zIndex: 2,
      }} />

      <div className="absolute pointer-events-none" style={{ right: '-60px', top: '50%', transform: 'translateY(-52%)', opacity: 0.025, zIndex: 2 }}>
        <svg width="700" height="700" viewBox="0 0 700 700" fill="white">
          <rect x="280" y="0" width="140" height="700" rx="30" />
          <rect x="0" y="280" width="700" height="140" rx="30" />
        </svg>
      </div>

      <motion.div className="absolute pointer-events-none"
        style={{ width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, transparent 70%)', top: -100, right: 100, zIndex: 2 }}
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,179,66,0.08) 0%, transparent 70%)', bottom: 60, left: -80, zIndex: 2 }}
        animate={{ scale: [1, 1.15, 1] }} 
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* MAIN CONTENT RESPONSIVE */}
      <div className="relative flex-1 flex items-center" style={{ zIndex: 10 }}>
        <div className="hero-container" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 48px', width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

            {/* LEFT SECTION */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} style={{ marginBottom: 28 }}>
                <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 100, background: 'rgba(124,179,66,0.12)', border: '1px solid rgba(124,179,66,0.3)', color: '#9CCC65', fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
                  <Sparkles size={11} />
                  Centre Médical Agréé — Abidjan
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }} style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(18px, 2.8vw, 32px)', letterSpacing: '0.35em', textTransform: 'uppercase', lineHeight: 1.2 }}>
                  Espace
                </div>
                <div style={{ position: 'relative', lineHeight: 0.9, marginBottom: 4 }}>
                  <span className="hero-title-medical" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 'clamp(68px, 10.5vw, 128px)', background: 'linear-gradient(135deg, #D4A843 0%, #FFD54F 30%, #FFE082 50%, #FFD54F 70%, #D4A843 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer-text 3s linear infinite', display: 'block', letterSpacing: '-0.01em' }}>
                    Médical
                  </span>
                </div>
                <div className="hero-title-anador" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 'clamp(38px, 6vw, 76px)', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>
                  Anador
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.4 } } }} style={{ margin: '20px 0' }}>
                <EcgLine />
              </motion.div>

              <motion.p className="hero-subtitle" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } } }} style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, fontSize: 15, maxWidth: 460, marginBottom: 36 }}>
                Un centre de santé moderne dédié à des soins médicaux accessibles,
                fiables et de haute qualité à Abobo, Abidjan — depuis 2010.
              </motion.p>

              <motion.div className="hero-buttons" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.45 } } }} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ flex: '1 0 auto' }}>
                  <Link to="/rendez-vous" className="hero-btn-primary btn-shine" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 14, fontSize: 14, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #1565C0, #1E88E5, #42A5F5)', backgroundSize: '200% auto', boxShadow: '0 4px 28px rgba(33,150,243,0.45)', textDecoration: 'none' }}>
                    <Calendar size={16} />
                    Prendre Rendez-vous
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ flex: '1 0 auto' }}>
                  <Link to="/services" className="hero-btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 14, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', textDecoration: 'none' }}>
                    Nos Services <ChevronRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div className="hero-trust-strip" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.6 } } }} style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { icon: Shield, text: 'ATT N°52/MSHP', color: '#7CB342' },
                  { icon: MapPin,  text: 'Abobo, Abidjan', color: '#42A5F5' },
                  { icon: Phone,   text: '+225 07 00 00 00', color: '#D4A843' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                    <Icon size={12} color={color} /><span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT SECTION - Carte responsive */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            >
              {/* Floating badges - cachés sur mobile */}
              <div className="floating-badge-urgent float-animation"
                style={{ position: 'absolute', top: -20, left: -16, zIndex: 20, borderRadius: 14, padding: '10px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 20px rgba(76,175,80,0.3)', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ position: 'relative', width: 10, height: 10 }}>
                    <div style={{ position: 'absolute', inset: 0, background: '#4CAF50', borderRadius: '50%', boxShadow: '0 0 8px #4CAF50' }} />
                    <div className="animate-ping-slow" style={{ position: 'absolute', inset: 0, background: '#4CAF50', borderRadius: '50%', opacity: 0.5 }} />
                  </div>
                  <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 13 }}>Urgences actives</span>
                </div>
                <p style={{ color: '#6B7280', fontSize: 11, margin: '2px 0 0', letterSpacing: '0.02em' }}>Service 24h / 7j</p>
              </div>

              <div className="floating-badge-patients float-animation-delayed"
                style={{ position: 'absolute', bottom: 10, right: -20, zIndex: 20, borderRadius: 14, padding: '10px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)' }}
              >
                <p style={{ color: '#6B7280', fontSize: 11, margin: '0 0 2px' }}>Depuis l'ouverture</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#0A1628' }}>+5 000</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#558B2F', fontSize: 11, fontWeight: 600, marginTop: 2 }}>
                  <Activity size={10} />
                  Patients pris en charge
                </div>
              </div>

              {/* Main card responsive */}
              <div className="hero-card"
                style={{ width: 320, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, padding: 24, boxShadow: '0 0 80px rgba(33,150,243,0.15), inset 0 1px 0 rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}
              >
                <motion.div style={{ position: 'absolute', inset: -1, borderRadius: 24, zIndex: -1, background: 'linear-gradient(135deg, rgba(33,150,243,0.4), rgba(124,179,66,0.3), rgba(212,168,67,0.25), rgba(33,150,243,0.4))', backgroundSize: '300% 300%' }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />

                <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <motion.div
                    style={{ width: 52, height: 52, borderRadius: 14, margin: '0 auto 12px', background: 'linear-gradient(135deg, #7CB342, #8BC34A)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0, boxShadow: '0 0 28px rgba(124,179,66,0.5)' }}
                    animate={{ boxShadow: ['0 0 16px rgba(124,179,66,0.4)', '0 0 48px rgba(124,179,66,0.7)', '0 0 16px rgba(124,179,66,0.4)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div style={{ position: 'absolute', background: 'white', borderRadius: 2, width: 28, height: 9 }} />
                    <div style={{ position: 'absolute', background: 'white', borderRadius: 2, width: 9, height: 28 }} />
                  </motion.div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>ESMAD</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2, letterSpacing: '0.04em' }}>Espace Médical Anador</div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Nos services</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {SERVICES.map((svc, i) => {
                      const Icon = svc.icon
                      const isActive = activeService === i
                      return (
                        <motion.div key={svc.label} onClick={() => setActiveService(i)}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, cursor: 'pointer', background: isActive ? svc.bg : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? svc.color + '40' : 'rgba(255,255,255,0.06)'}`, transition: 'all 0.25s ease' }}
                          initial={false} animate={{ scale: isActive ? 1.02 : 1 }}
                          whileHover={{ scale: 1.02, backgroundColor: svc.bg }}
                        >
                          <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: isActive ? svc.color + '20' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={14} color={isActive ? svc.color : 'rgba(255,255,255,0.5)'} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                            {svc.label}
                          </span>
                          {isActive && (
                            <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} style={{ marginLeft: 'auto' }}>
                              <Link to={svc.href} style={{ color: svc.color, display: 'flex' }}><ArrowRight size={14} /></Link>
                            </motion.div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/rendez-vous" className="btn-shine"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 12, fontSize: 13, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg, #7CB342, #8BC34A)', boxShadow: '0 4px 24px rgba(124,179,66,0.5)', textDecoration: 'none' }}
                  >
                    <Calendar size={14} />
                    Réserver une consultation
                  </Link>
                </motion.div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
                  <Clock size={11} style={{ color: 'rgba(255,255,255,0.35)' }} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Lun – Sam · 08h00 – 18h00</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Ticker />
      </div>

      {/* Stats bar responsive */}
      <div className="relative" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.08)', zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} className="stats-item"
                style={{ padding: '20px 32px', textAlign: 'center', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: 6, fontSize: 'clamp(26px, 3.5vw, 40px)' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}