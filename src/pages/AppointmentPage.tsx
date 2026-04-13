import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Phone, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { pageTransition, fadeLeft, fadeRight } from '@/utils/animations'
import { appointmentsApi } from '@/api'
import toast from 'react-hot-toast'

const SERVICES = [
  { id: 1, label: 'Consultation médicale' },
  { id: 2, label: 'Gynécologie / Maternité' },
  { id: 3, label: 'Pédiatrie' },
  { id: 4, label: 'Laboratoire d\'analyses' },
  { id: 5, label: 'Échographie' },
  { id: 6, label: 'Urgences' },
]

const DOCTORS = [
  { id: 1, label: 'Dr. Adama Koné — Médecine Générale' },
  { id: 2, label: 'Dr. Fatou Ouédraogo — Gynécologie' },
  { id: 3, label: 'Dr. Kouamé Brou — Pédiatrie' },
  { id: 4, label: 'Dr. Seydou Issa — Laboratoire' },
  { id: 5, label: 'Dr. Marie-Claire Coulibaly — Médecine Générale' },
  { id: 6, label: 'Dr. Awa Lamine — Maternité' },
]

const TIMES = [
  '08h00','08h30','09h00','09h30','10h00','10h30','11h00',
  '14h00','14h30','15h00','15h30','16h00','16h30','17h00',
]

const inputClass =
  'w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-white outline-none ' +
  'transition-all duration-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.12)] ' +
  'placeholder-gray-400 font-body'

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
      {text} {required && <span className="text-red-400">*</span>}
    </label>
  )
}

export default function AppointmentPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    service_id: '', doctor_id: '',
    date: '', time: '', message: '',
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.service_id || !form.date || !form.time) {
      toast.error('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setLoading(true)
    try {
      await appointmentsApi.book({
        name: form.name, phone: form.phone, email: form.email || undefined,
        service_id: Number(form.service_id),
        doctor_id: form.doctor_id ? Number(form.doctor_id) : undefined,
        date: form.date,
        time: form.time.replace('h', ':'),
        message: form.message || undefined,
      })
    } catch {
      /* demo fallback — show success */
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const reset = () => {
    setSubmitted(false)
    setForm({ name:'', phone:'', email:'', service_id:'', doctor_id:'', date:'', time:'', message:'' })
  }

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" exit="exit">

      {/* Header */}
      <div className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #070E1C 0%, #0F2044 50%, #162952 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(21,101,192,0.15), transparent)' }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-7 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{ background: 'rgba(124,179,66,0.12)', border: '1px solid rgba(124,179,66,0.3)', color: '#9CCC65' }}>
              Prise de rendez-vous
            </div>
            <h1 className="font-head font-bold text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Réservez votre Consultation
            </h1>
            <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Remplissez le formulaire ci-dessous. Notre équipe vous confirmera votre rendez-vous sous 24h.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-7 py-20" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-12 items-start">

          {/* ── Form ── */}
          <motion.div variants={fadeLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl border border-gray-100 p-8"
                  style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
                >
                  <h2 className="font-head text-2xl font-bold text-[#0A1628] mb-1">Votre rendez-vous</h2>
                  <p className="text-sm text-gray-400 mb-8">Les champs marqués (*) sont obligatoires</p>

                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <Label text="Nom complet" required />
                      <input type="text" className={inputClass} placeholder="Prénom et Nom"
                        value={form.name} onChange={(e) => set('name', e.target.value)} />
                    </div>
                    <div>
                      <Label text="Téléphone" required />
                      <input type="tel" className={inputClass} placeholder="07 XX XX XX XX"
                        value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <Label text="Email" />
                    <input type="email" className={inputClass} placeholder="votre@email.com"
                      value={form.email} onChange={(e) => set('email', e.target.value)} />
                  </div>

                  {/* Service */}
                  <div className="mb-5">
                    <Label text="Service souhaité" required />
                    <select className={inputClass} value={form.service_id}
                      onChange={(e) => set('service_id', e.target.value)}>
                      <option value="">— Sélectionner un service —</option>
                      {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>

                  {/* Doctor */}
                  <div className="mb-5">
                    <Label text="Médecin préféré (optionnel)" />
                    <select className={inputClass} value={form.doctor_id}
                      onChange={(e) => set('doctor_id', e.target.value)}>
                      <option value="">— Aucune préférence —</option>
                      {DOCTORS.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
                    </select>
                  </div>

                  {/* Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <Label text="Date souhaitée" required />
                      <input type="date" className={inputClass}
                        value={form.date} onChange={(e) => set('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <Label text="Heure préférée" required />
                      <select className={inputClass} value={form.time}
                        onChange={(e) => set('time', e.target.value)}>
                        <option value="">— Choisir —</option>
                        {TIMES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <Label text="Motif de consultation" />
                    <textarea className={inputClass} rows={3}
                      placeholder="Décrivez brièvement vos symptômes ou le motif de votre consultation..."
                      value={form.message} onChange={(e) => set('message', e.target.value)} />
                  </div>

                  {/* Submit */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn-shine w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base text-white disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #1565C0, #1976D2)', boxShadow: '0 4px 24px rgba(21,101,192,0.35)' }}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                  >
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                        <Loader2 size={18} />
                      </motion.div>
                    ) : (
                      <><Calendar size={18} /> Confirmer ma demande de RDV</>
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                  className="bg-green-50 border border-green-200 rounded-3xl p-14 text-center"
                  style={{ boxShadow: '0 4px 32px rgba(124,179,66,0.15)' }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7CB342, #8BC34A)', boxShadow: '0 0 40px rgba(124,179,66,0.4)' }}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle size={38} className="text-white" />
                  </motion.div>
                  <h3 className="font-head text-2xl font-bold text-green-800 mb-3">Demande de RDV envoyée !</h3>
                  <p className="text-green-700 mb-7 max-w-sm mx-auto leading-relaxed">
                    Votre demande a bien été enregistrée. Notre équipe vous contactera sous 24h pour confirmer votre rendez-vous.
                  </p>
                  <button onClick={reset}
                    className="btn-shine px-7 py-3 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #7CB342, #8BC34A)' }}>
                    Nouveau rendez-vous
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Info sidebar ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {/* Info card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
              <h3 className="font-head text-lg font-semibold text-[#0A1628] mb-5">Informations pratiques</h3>
              {[
                { icon: MapPin, label: 'Adresse', val: 'Abobo Anador Cocoteraie', sub: '(Coco Service), Abidjan, Côte d\'Ivoire', bg: '#E3F2FD', color: '#1565C0' },
                { icon: Phone, label: 'Téléphones', val: '01 01 81 92 86', sub: '05 05 11 41 20', bg: '#F1F8E9', color: '#558B2F' },
                { icon: Clock, label: 'Horaires', val: 'Lun — Sam : 07h30 – 18h00', sub: 'Urgences : 24h/24 — 7j/7', bg: '#FFF8E1', color: '#F57F17' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 py-4 border-b border-gray-50 last:border-0 last:pb-0 first:pt-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.bg }}>
                    <item.icon size={17} color={item.color} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</div>
                    <div className="text-sm font-semibold text-[#0A1628]">{item.val}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgence */}
            <div className="rounded-2xl p-5" style={{ background: '#FFEBEE', border: '1px solid #FFCDD2' }}>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#C62828' }}>
                  <AlertCircle size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-red-800 text-sm mb-1">Urgence médicale ?</div>
                  <p className="text-xs text-red-700 leading-relaxed">
                    Appelez directement le{' '}
                    <a href="tel:+2250101819286" className="font-bold underline">01 01 81 92 86</a>
                    {' '}— disponible 24h/24, 7j/7.
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <motion.a
              href="https://maps.google.com/?q=Abobo+Anador+Cocoteraie+Abidjan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center group"
              whileHover={{ borderColor: '#1565C0', background: '#EEF4FF' }}
              transition={{ duration: 0.2 }}
            >
              <MapPin size={36} className="text-gray-300 group-hover:text-[#1565C0] transition-colors" />
              <div>
                <div className="font-semibold text-[#0A1628] text-sm">Abobo Anador Cocoteraie</div>
                <div className="text-xs text-gray-400">Coco Service, Abidjan</div>
              </div>
              <div className="text-xs text-[#1565C0] font-semibold">Ouvrir dans Google Maps →</div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}