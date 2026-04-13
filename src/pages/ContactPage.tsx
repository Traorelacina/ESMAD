import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MapPin, Phone, Clock, Send, CheckCircle, Loader2, 
  Mail, MessageCircle, Sparkles, Building, Calendar,
  Globe, Facebook, Twitter, Linkedin
} from 'lucide-react'
import toast from 'react-hot-toast'

const inputClass =
  'w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-white outline-none ' +
  'transition-all duration-300 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] ' +
  'placeholder-gray-400 font-body'

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  )
}

function InfoCard({ icon: Icon, label, val, sub, bg, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group"
    >
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300">
        <motion.div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: bg }}
          whileHover={{ rotate: 5 }}
        >
          <Icon size={22} color={color} strokeWidth={1.7} />
        </motion.div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
        <div className="text-sm font-bold text-gray-900">{val}</div>
        <div className="text-xs text-gray-500 mt-1">{sub}</div>
      </div>
    </motion.div>
  )
}

function PageHeader() {
  return (
    <div
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #070E1C 0%, #0F2044 50%, #162952 100%)' }}
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        
        {/* Orbes flottants */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(33,150,243,0.15), transparent)' }}
          animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,179,66,0.1), transparent)' }}
          animate={{ scale: [1, 1.3, 1], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5 border border-white/20">
            <Sparkles size={14} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-green-400">
              Contactez-nous
            </span>
          </div>
          
          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nous sommes à votre écoute
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-300">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      toast.error('Veuillez renseigner votre nom et votre message.')
      return
    }
    setLoading(true)
    try {
      // Simuler l'envoi - à remplacer par votre API
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Message envoyé avec succès !')
      setSent(true)
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader />

      {/* Cartes d'information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <InfoCard 
            icon={MapPin} label="Adresse" val="Abobo Anador Cocoteraie" sub="(Coco Service), Abidjan"
            bg="#EFF6FF" color="#2563EB" delay={0.1}
          />
          <InfoCard 
            icon={Phone} label="Téléphone" val="01 01 81 92 86" sub="05 05 11 41 20"
            bg="#F0FDF4" color="#16A34A" delay={0.2}
          />
          <InfoCard 
            icon={Clock} label="Horaires" val="Lun-Sam : 07h30–18h00" sub="Urgences : 24h/24"
            bg="#FFFBEB" color="#D97706" delay={0.3}
          />
          <InfoCard 
            icon={Mail} label="Courrier" val="08 BP 270" sub="Abidjan 08"
            bg="#FEF2F2" color="#DC2626" delay={0.4}
          />
        </div>
      </div>

      {/* Formulaire + Carte */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" ref={ref}>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-lg">
              {/* En-tête du formulaire */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full mb-4">
                  <MessageCircle size={14} className="text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    Envoyez-nous un message
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Prenez contact avec nous</h2>
                <p className="text-sm text-gray-500">
                  Notre équipe vous répondra dans les meilleurs délais.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message envoyé !</h3>
                    <p className="text-green-700 text-sm">Nous vous répondrons dans les meilleurs délais.</p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg transition-all duration-300"
                    >
                      Nouveau message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div>
                      <Label text="Message" required />
                      <textarea
                        className={inputClass}
                        rows={5}
                        placeholder="Votre message..."
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                      />
                    </div>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Carte + WhatsApp + Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Carte Google Maps */}
            <motion.a
              href="https://maps.google.com/?q=Abobo+Anador+Cocoteraie+Abidjan"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              whileHover={{ y: -4 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center border border-gray-200 shadow-lg">
                {/* Effet de brillance */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                
                <MapPin size={48} className="text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2">ESMAD — Abobo Anador</h3>
                <p className="text-gray-300 text-sm mb-4">Cocoteraie (Coco Service), Abidjan</p>
                <div className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Voir sur Google Maps</span>
                  <MapPin size={14} />
                </div>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/2250101819286"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              whileHover={{ y: -4 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-600 to-green-700 p-8 text-center shadow-lg">
                <MessageCircle size={48} className="text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp direct</h3>
                <p className="text-green-100 text-sm mb-4">Une réponse rapide à vos questions</p>
                <div className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Écrire sur WhatsApp</span>
                  <Send size={14} />
                </div>
              </div>
            </motion.a>

            {/* Horaires supplémentaires */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Horaires d'ouverture</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lundi - Vendredi</span>
                  <span className="font-medium text-gray-900">07:30 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Samedi</span>
                  <span className="font-medium text-gray-900">08:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dimanche & Jours fériés</span>
                  <span className="font-medium text-red-600">Urgences uniquement</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}