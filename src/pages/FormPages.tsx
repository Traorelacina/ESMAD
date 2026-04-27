// src/pages/FormPages.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Clock, Send, CheckCircle, Loader2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import Hero from '@/components/home/Hero'
import { contactsApi } from '@/api/client'

// ── Image call center professionnelle (Unsplash)
const HERO_IMAGE = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=80'

// ── Coordonnées Abobo Anador, Abidjan pour l'embed Google Maps
const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0!2d-4.0160!3d5.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnMzYuMCJOIDTCsDAwJzU3LjYiVw!5e0!3m2!1sfr!2sci!4v1700000000000!5m2!1sfr!2sci'

const inputClass = [
  'w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-white outline-none',
  'transition-all duration-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.10)]',
  'placeholder-gray-400',
].join(' ')

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
        color: '#9CA3AF',
        marginBottom: 8,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {text} {required && <span style={{ color: '#EF4444' }}>*</span>}
    </label>
  )
}

export function ContactPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.06, rootMargin: '60px' })
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      toast.error('Veuillez renseigner votre nom et votre message.')
      return
    }
    setLoading(true)
    try {
      await contactsApi.create({
        name: form.name,
        email: form.email || undefined,
        phone: form.phone || undefined,
        message: form.message,
      })
      toast.success('Message envoyé avec succès.')
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* ── Hero avec image call center ── */}
      <Hero
        image={HERO_IMAGE}
        title="Nos Contacts"
        subtitle="Notre équipe est disponible pour répondre à toutes vos questions."
      />

      {/* ── CORPS : 2 colonnes ── */}
      <section style={{ background: '#F8FAFC', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}
            className="contact-grid"
          >

            {/* ──────────── GAUCHE ──────────── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              {/* Titre section */}
              <div style={{ marginBottom: 36 }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#7CB342',
                  background: '#F1F8E9',
                  padding: '4px 14px',
                  borderRadius: 20,
                  marginBottom: 14,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}>
                  Disponible 24h/24
                </span>
                <h2 style={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: '#0A1628',
                  marginBottom: 10,
                  lineHeight: 1.2,
                  fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                }}>
                  Contactez-nous
                </h2>
                <p style={{
                  color: '#6B7280',
                  fontSize: 15.5,
                  lineHeight: 1.75,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}>
                  Notre équipe est disponible pour vous accompagner dans vos démarches
                  et répondre à toutes vos questions.
                </p>
              </div>

              {/* Blocs info */}
              <div style={{
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #E8EDF5',
                padding: '28px',
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                marginBottom: 28,
              }}>
                {[
                  {
                    icon: MapPin,
                    label: 'Adresse',
                    val: 'Abobo Anador Cocoteraie',
                    sub: '(Coco Service), Abidjan, Côte d\'Ivoire',
                    color: '#2563EB', bg: '#EFF6FF',
                  },
                  {
                    icon: Phone,
                    label: 'Téléphone',
                    val: '01 01 81 92 86',
                    sub: '05 05 11 41 20',
                    color: '#16A34A', bg: '#F0FDF4',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    val: 'contact@esmad.ci',
                    sub: 'infos@esmad.ci',
                    color: '#D97706', bg: '#FFFBEB',
                  },
                  {
                    icon: Clock,
                    label: 'Urgences',
                    val: '24h/24 — 7j/7',
                    sub: 'Service disponible à toute heure',
                    color: '#DC2626', bg: '#FEF2F2',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      paddingBottom: i < 3 ? 20 : 0,
                      marginBottom: i < 3 ? 20 : 0,
                      borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none',
                    }}
                  >
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: 13,
                      background: item.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <item.icon size={21} color={item.color} strokeWidth={1.75} />
                    </div>
                    <div style={{ paddingTop: 3 }}>
                      <div style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#9CA3AF',
                        marginBottom: 3,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontSize: 15.5,
                        fontWeight: 700,
                        color: '#0A1628',
                        lineHeight: 1.4,
                        fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                      }}>
                        {item.val}
                      </div>
                      <div style={{
                        fontSize: 13,
                        color: '#6B7280',
                        marginTop: 2,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}>
                        {item.sub}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ── Google Maps iframe intégré ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: '2px solid #E8EDF5',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                }}
              >
                {/* Entête carte */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 18px',
                  background: '#fff',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MapPin size={16} color="#2563EB" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#0A1628',
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}>
                      Notre localisation
                    </div>
                    <div style={{
                      fontSize: 11.5,
                      color: '#9CA3AF',
                      fontFamily: "'Inter', system-ui, sans-serif",
                    }}>
                      Abobo Anador, Abidjan
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Abobo+Anador+Cocoteraie+Abidjan"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: 'auto',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#7CB342',
                      textDecoration: 'none',
                      padding: '5px 12px',
                      border: '1.5px solid #7CB342',
                      borderRadius: 8,
                      background: '#fff',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F8E9' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff' }}
                  >
                    Ouvrir ↗
                  </a>
                </div>

                {/* Carte Google Maps */}
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  width="100%"
                  height="260"
                  style={{ display: 'block', border: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation ESMAD – Abobo Anador, Abidjan"
                />
              </motion.div>
            </motion.div>

            {/* ──────────── DROITE : Formulaire ──────────── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 }}
              style={{ position: 'sticky', top: 100 }}
            >
              <div style={{
                background: '#fff',
                borderRadius: 22,
                border: '1px solid #E8EDF5',
                padding: '40px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
              }}>
                {/* Badge + Titre */}
                <div style={{ marginBottom: 28 }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#16A34A',
                    background: '#F0FDF4',
                    padding: '4px 12px',
                    borderRadius: 20,
                    marginBottom: 14,
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                    Réponse rapide
                  </span>
                  <h3 style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#0A1628',
                    marginBottom: 6,
                    fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                  }}>
                    Envoyez-nous un message
                  </h3>
                  <p style={{
                    color: '#9CA3AF',
                    fontSize: 14,
                    lineHeight: 1.6,
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}>
                    Notre équipe vous répondra dans les meilleurs délais.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        background: '#F0FDF4',
                        borderRadius: 16,
                        border: '1.5px solid #BBF7D0',
                      }}
                    >
                      <div style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: '#DCFCE7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 18px',
                      }}>
                        <CheckCircle size={36} color="#16A34A" />
                      </div>
                      <h4 style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: '#166534',
                        marginBottom: 8,
                        fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                      }}>
                        Message envoyé !
                      </h4>
                      <p style={{
                        color: '#166534',
                        fontSize: 14,
                        lineHeight: 1.6,
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}>
                        Nous vous répondrons dans les meilleurs délais.
                      </p>
                      <button
                        onClick={() => setSent(false)}
                        style={{
                          marginTop: 24,
                          padding: '11px 28px',
                          borderRadius: 11,
                          background: '#16A34A',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 14,
                          border: 'none',
                          cursor: 'pointer',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          boxShadow: '0 4px 12px rgba(22,163,74,0.3)',
                        }}
                      >
                        Nouveau message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {/* Nom + Email */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-two-cols">
                        <div>
                          <Label text="Nom complet" required />
                          <input
                            type="text"
                            className={inputClass}
                            placeholder="Votre nom"
                            value={form.name}
                            onChange={(e) => set('name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label text="Email" />
                          <input
                            type="email"
                            className={inputClass}
                            placeholder="votre@email.com"
                            value={form.email}
                            onChange={(e) => set('email', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Téléphone */}
                      <div>
                        <Label text="Téléphone" />
                        <input
                          type="tel"
                          className={inputClass}
                          placeholder="07 XX XX XX XX"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <Label text="Message" required />
                        <textarea
                          className={inputClass}
                          rows={5}
                          placeholder="Votre message..."
                          value={form.message}
                          onChange={(e) => set('message', e.target.value)}
                          style={{ resize: 'vertical' }}
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        onClick={handleSubmit}
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.015 }}
                        whileTap={{ scale: loading ? 1 : 0.975 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 9,
                          padding: '15px',
                          borderRadius: 13,
                          fontSize: 15,
                          fontWeight: 700,
                          color: '#fff',
                          background: loading
                            ? '#9CA3AF'
                            : 'linear-gradient(135deg, #7CB342 0%, #558B2F 100%)',
                          border: 'none',
                          cursor: loading ? 'wait' : 'pointer',
                          boxShadow: loading ? 'none' : '0 6px 20px rgba(124,179,66,0.35)',
                          fontFamily: "'Inter', 'Poppins', system-ui, sans-serif",
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          >
                            <Loader2 size={18} />
                          </motion.div>
                        ) : (
                          <>
                            <Send size={16} />
                            Envoyer le message
                          </>
                        )}
                      </motion.button>

                      {/* Note confidentialité */}
                      <p style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: '#B0B8C4',
                        fontFamily: "'Inter', system-ui, sans-serif",
                        marginTop: -4,
                      }}>
                        🔒 Vos informations restent confidentielles.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }
          .contact-grid > div:last-child {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          .form-two-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}