// src/pages/FormPages.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone, Clock, Send, CheckCircle, Loader2, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import Hero from '@/components/home/Hero'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1600&q=80'

const inputClass = [
  'w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-white outline-none',
  'transition-all duration-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.10)]',
  'placeholder-gray-400',
].join(' ')

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 8 }}>
      {text} {required && <span style={{ color: '#EF4444' }}>*</span>}
    </label>
  )
}

export function ContactPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08, rootMargin: '50px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
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
      await new Promise((r) => setTimeout(r, 1400))
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
      <Hero
        image={HERO_IMAGE}
        title="Nos Contacts"
        subtitle="Notre équipe est disponible pour répondre à toutes vos questions."
      />

      {/* BODY : 2 colonnes */}
      <section style={{ background: '#fff', padding: '80px 0' }} ref={ref}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="contact-grid">

            {/* ── GAUCHE : Informations ── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65 }}
            >
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>
                Contactez-nous
              </h2>
              <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
                Notre équipe est disponible pour vous accompagner dans vos démarches et répondre à toutes vos questions.
              </p>

              {/* Info blocs */}
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
                  sub: 'Réponse dans les meilleurs délais',
                  color: '#D97706', bg: '#FFFBEB',
                },
                {
                  icon: Clock,
                  label: 'Horaires',
                  val: 'Lundi - Samedi : 07h30 - 18h00',
                  sub: 'Urgences : 24h/24 — 7j/7',
                  color: '#DC2626', bg: '#FEF2F2',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={22} color={item.color} strokeWidth={1.7} />
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF', marginBottom: 4 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', lineHeight: 1.4 }}>{item.val}</div>
                    <div style={{ fontSize: 13.5, color: '#6B7280', marginTop: 2 }}>{item.sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* Google Maps link */}
              <motion.a
                href="https://maps.google.com/?q=Abobo+Anador+Cocoteraie+Abidjan"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 14, fontWeight: 600, color: '#1565C0', textDecoration: 'none', background: '#fff', marginTop: 4 }}
              >
                <MapPin size={16} />
                Voir sur Google Maps
              </motion.a>
            </motion.div>

            {/* ── DROITE : Formulaire ── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E8EDF5', padding: '36px', boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>
                  Envoyez-nous un message
                </h3>
                <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 28 }}>
                  Notre équipe vous répondra dans les meilleurs délais.
                </p>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ textAlign: 'center', padding: '40px 20px', background: '#F0FDF4', borderRadius: 14, border: '1px solid #BBF7D0' }}
                    >
                      <CheckCircle size={52} color="#16A34A" style={{ margin: '0 auto 16px' }} />
                      <h4 style={{ fontSize: 20, fontWeight: 800, color: '#166534', marginBottom: 8 }}>Message envoyé</h4>
                      <p style={{ color: '#166534', fontSize: 14 }}>Nous vous répondrons dans les meilleurs délais.</p>
                      <button
                        onClick={() => setSent(false)}
                        style={{ marginTop: 20, padding: '10px 24px', borderRadius: 10, background: '#16A34A', color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}
                      >
                        Nouveau message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {/* Nom + Email */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                          <Label text="Nom complet" required />
                          <input type="text" className={inputClass} placeholder="Votre nom" value={form.name} onChange={(e) => set('name', e.target.value)} />
                        </div>
                        <div>
                          <Label text="Email" />
                          <input type="email" className={inputClass} placeholder="votre@email.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                        </div>
                      </div>

                      {/* Téléphone */}
                      <div>
                        <Label text="Téléphone" />
                        <input type="tel" className={inputClass} placeholder="07 XX XX XX XX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
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
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #1565C0, #1976D2)', border: 'none', cursor: loading ? 'wait' : 'pointer', boxShadow: '0 4px 20px rgba(21,101,192,0.3)', opacity: loading ? 0.7 : 1 }}
                      >
                        {loading
                          ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}><Loader2 size={18} /></motion.div>
                          : <><Send size={16} /> Envoyer le message</>
                        }
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  )
}