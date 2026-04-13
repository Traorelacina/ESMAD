import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

// ─── SCROLL-TRIGGERED ANIMATION ───────────────────────────────────────────────
export function useScrollReveal(threshold = 0.15) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true })
  return { ref, inView }
}

// ─── COUNTER ANIMATION ────────────────────────────────────────────────────────
export function useCounter(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
      setCount(Math.floor(eased * (end - start) + start))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, start, duration])

  return { ref, count }
}

// ─── MOUSE PARALLAX ───────────────────────────────────────────────────────────
export function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left - rect.width / 2) / rect.width) * strength
      const y = ((e.clientY - rect.top - rect.height / 2) / rect.height) * strength
      setOffset({ x, y })
    }
    const el = ref.current
    el?.addEventListener('mousemove', handleMove)
    return () => el?.removeEventListener('mousemove', handleMove)
  }, [strength])

  return { ref, offset }
}

// ─── TILT EFFECT ──────────────────────────────────────────────────────────────
export function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.transform = `perspective(800px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`
    }
    const reset = () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [maxDeg])

  return ref
}