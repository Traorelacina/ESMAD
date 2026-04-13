import type { Variants } from 'framer-motion'

// ─── FADE VARIANTS ────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
}

// ─── STAGGER CONTAINER ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
}

// ─── CARD VARIANTS ────────────────────────────────────────────────────────────
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── HERO VARIANTS ────────────────────────────────────────────────────────────
export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' } },
}

export const heroCta: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: 'easeOut' } },
}

export const heroEyebrow: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' } },
}

export const heroPanel: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.92 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── FLOAT ANIMATION ─────────────────────────────────────────────────────────
export const floatAnim = {
  y: [0, -14, 0],
  transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
}

export const floatAnim2 = {
  y: [0, -10, 0],
  transition: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
}

// ─── ORB ANIMATION ────────────────────────────────────────────────────────────
export const orbAnim = {
  scale: [1, 1.15, 1],
  opacity: [0.04, 0.08, 0.04],
  transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
}

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────
export const statReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  },
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const navDropdown: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } },
}

// ─── PAGE TRANSITION ──────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
}