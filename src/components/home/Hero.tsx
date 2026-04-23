// src/components/layout/Hero.tsx
import { motion } from 'framer-motion'

interface HeroProps {
  /** URL de l'image de fond */
  image: string
  /** Titre principal (blanc, centré) */
  title: string
  /** Sous-titre optionnel */
  subtitle?: string
}

/**
 * Bannière héro réutilisable pour toutes les pages internes.
 * Hauteur 50-60vh, overlay sombre 52%, texte centré.
 */
export default function Hero({ image, title, subtitle }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        height: 'clamp(320px, 56vh, 520px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Image de fond avec zoom subtil */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay sombre */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6, 13, 26, 0.54)',
        }}
      />

      {/* Motif grille subtil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          pointerEvents: 'none',
        }}
      />

      {/* Contenu centré */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        {/* Trait décoratif */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            width: 48,
            height: 3,
            background: '#8BC34A',
            borderRadius: 4,
            margin: '0 auto 20px',
            transformOrigin: 'center',
          }}
        />

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            color: '#ffffff',
            fontWeight: 800,
            lineHeight: 1.15,
            fontSize: 'clamp(30px, 5vw, 58px)',
            marginBottom: subtitle ? 16 : 0,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </motion.h1>

        {/* Sous-titre */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 'clamp(14px, 2vw, 19px)',
              lineHeight: 1.65,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}