import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────────
export function useScrollReveal(threshold = 0.15, triggerOnce = true) {
  const { ref, inView } = useInView({ threshold, triggerOnce })
  return { ref, inView }
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}

// ─── PARALLAX ─────────────────────────────────────────────────────────────────
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setOffset(center * speed)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return { ref, offset }
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
export function useAnimatedCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, end, duration])

  return { ref, count }
}

// ─── STICKY OBSERVER ──────────────────────────────────────────────────────────
export function useSticky(threshold = 10) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return isSticky
}

// ─── MOUSE POSITION ───────────────────────────────────────────────────────────
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return pos
}

// ─── SECTION IN VIEW ──────────────────────────────────────────────────────────
export function useSectionReveal() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  })
  return { ref, inView }
}