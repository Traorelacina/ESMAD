import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { 
  CheckCircle, Calendar, Clock, Shield, FileText, CreditCard, 
  Sparkles, Heart, Users, Phone, Mail, MapPin, Award,
  ClipboardList, Stethoscope, Syringe, Activity
} from 'lucide-react'

const PARTNERS = [
  { name: 'NSIA Assurances', color: '#2563EB', bg: '#EFF6FF' },
  { name: 'SUNU Group', color: '#16A34A', bg: '#F0FDF4' },
  { name: 'Allianz CI', color: '#D97706', bg: '#FFFBEB' },
  { name: 'AXA Côte d\'Ivoire', color: '#DC2626', bg: '#FEF2F2' },
  { name: 'CNPS', color: '#7C3AED', bg: '#F5F3FF' },
  { name: 'Saham Assurance', color: '#0891B2', bg: '#ECFEFF' },
]

const DOCUMENTS = [
  'Carte d\'identité ou passeport',
  'Carnet de santé ou dossier médical',
  'Carte d\'assurance maladie ou mutuelle',
  'Ordonnances et résultats d\'analyses récents',
  'Liste de vos médicaments en cours',
]

const RIGHTS = [
  'Droit à un accueil respectueux et bienveillant',
  'Information claire sur votre état de santé',
  'Confidentialité totale de votre dossier médical',
  'Consentement éclairé avant tout acte médical',
  'Accès à votre dossier médical sur demande',
]

function PageHeader() {
  return (
    <div
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #070E1C 0%, #0F2044 50%, #162952 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        
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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5 border border-white/20">
            <Sparkles size={14} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-green-400">
              Informations patients
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Votre séjour à ESMAD
          </h1>
          
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-300">
            Tout ce que vous devez savoir pour préparer votre visite ou hospitalisation.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, title, items, bg, color, delay }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <div className="h-full bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-5">
          <motion.div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: bg }}
            whileHover={{ rotate: 5 }}
          >
            <Icon size={22} color={color} strokeWidth={1.7} />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <ul className="space-y-3">
          {items.map((item: string, idx: number) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.1 + idx * 0.05 }}
              className="flex items-start gap-3 text-sm text-gray-600"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: bg }}>
                <CheckCircle size={11} color={color} />
              </div>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function PartnersSection({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
          <CreditCard size={22} color="#D97706" strokeWidth={1.7} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Assurances & Mutuelles</h3>
          <p className="text-sm text-gray-500 mt-1">
            ESMAD est partenaire de plusieurs compagnies d'assurance et mutuelles
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Renseignez-vous auprès de notre accueil pour connaître les modalités de prise en charge.
        Nos partenaires vous offrent une couverture adaptée à vos besoins.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PARTNERS.map((partner, idx) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + idx * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="text-center"
          >
            <div 
              className="px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300"
              style={{ backgroundColor: partner.bg, color: partner.color }}
            >
              {partner.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function HospitalisationCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Clock size={22} color="#2563EB" strokeWidth={1.7} />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Votre hospitalisation</h3>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Des chambres confortables sont mises à disposition. Le personnel soignant assure votre confort
        et votre sécurité en permanence.
      </p>
      
      <div className="bg-white rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={14} className="text-blue-600" />
          <span className="font-semibold text-gray-900 text-sm">Horaires de visite</span>
        </div>
        <p className="text-gray-600 text-sm">Tous les jours de 10h00 à 20h00</p>
      </div>
      
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/rendez-vous"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg transition-all duration-300"
        >
          <Calendar size={14} />
          Prendre Rendez-vous
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default function PatientsPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" ref={ref}>
        
        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InfoCard 
            icon={FileText}
            title="Préparer votre visite"
            items={DOCUMENTS}
            bg="#EFF6FF"
            color="#2563EB"
            delay={0.1}
          />
          
          <InfoCard 
            icon={Shield}
            title="Vos droits en tant que patient"
            items={RIGHTS}
            bg="#F0FDF4"
            color="#16A34A"
            delay={0.2}
          />
        </div>

        {/* Section assurances */}
        <div className="mb-8">
          <PartnersSection inView={inView} />
        </div>

        {/* Section hospitalisation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HospitalisationCard inView={inView} />
          
          {/* Conseils supplémentaires */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Heart size={22} color="#7C3AED" strokeWidth={1.7} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Conseils pratiques</h3>
            </div>
            
            <ul className="space-y-3">
              {[
                'Arrivez 15 minutes avant votre rendez-vous',
                'Prévoyez un accompagnant si nécessaire',
                'Apportez vos lunettes si vous en portez',
                'Informez-nous de vos allergies',
                'N\'hésitez pas à poser toutes vos questions',
              ].map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={11} color="#7C3AED" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bandeau d'information supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-center text-white"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone size={24} className="text-white" />
              <div className="text-left">
                <p className="text-sm opacity-90">Besoin d'aide ?</p>
                <p className="font-semibold">Contactez notre accueil</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={24} className="text-white" />
              <div className="text-left">
                <p className="text-sm opacity-90">Par email</p>
                <p className="font-semibold">contact@esmad.ci</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={24} className="text-white" />
              <div className="text-left">
                <p className="text-sm opacity-90">Nous trouver</p>
                <p className="font-semibold">Abobo Anador, Abidjan</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}