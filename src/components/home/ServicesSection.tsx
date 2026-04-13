import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Heart, Home, FlaskConical, Search, Baby, Phone, 
  ArrowRight, Shield, Clock, Star, Sparkles, Activity,
  Stethoscope, Microscope, Ambulance
} from 'lucide-react'

const SERVICES = [
  {
    icon: Stethoscope,
    title: 'Consultation Médicale',
    desc: 'Consultations générales et spécialisées par des professionnels qualifiés. Diagnostic, traitement et suivi personnalisé.',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    badge: 'Générale & Spécialisée',
  },
  {
    icon: Home,
    title: 'Hospitalisation',
    desc: 'Service sécurisé et confortable avec surveillance médicale continue et personnel disponible en permanence.',
    color: '#16A34A',
    bgLight: '#F0FDF4',
    badge: 'Chambres équipées',
  },
  {
    icon: Microscope,
    title: 'Laboratoire d\'Analyses',
    desc: 'Analyses biologiques complètes — hématologie, biochimie, sérologie — pour un diagnostic précis et rapide.',
    color: '#D97706',
    bgLight: '#FFFBEB',
    badge: 'Résultats rapides',
  },
  {
    icon: Search,
    title: 'Échographie',
    desc: 'Imagerie médicale moderne par ultrasons pour examens abdominaux, obstétricaux et pelviens.',
    color: '#DB2777',
    bgLight: '#FDF2F8',
    badge: 'Technologie moderne',
  },
  {
    icon: Baby,
    title: 'Maternité',
    desc: 'Suivi prénatal, accouchement et soins postnataux par une équipe de sages-femmes et gynécologues.',
    color: '#059669',
    bgLight: '#ECFDF5',
    badge: 'Suivi complet',
  },
  {
    icon: Ambulance,
    title: 'Urgences 24h / 7j',
    desc: 'Équipe médicale disponible à toute heure pour les situations urgentes. Prise en charge immédiate.',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    badge: 'Service d\'urgence',
    urgent: true,
  },
]

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Bande de couleur en haut */}
        <div 
          className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
          style={{ backgroundColor: service.color }}
        />
        
        {/* Badge urgent */}
        {service.urgent && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1.5 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
              <Activity size={10} />
              <span>24/7</span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {/* Icône */}
          <motion.div 
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
            style={{ backgroundColor: service.bgLight }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <service.icon size={28} color={service.color} strokeWidth={1.7} />
          </motion.div>
          
          {/* Titre */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {service.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {service.desc}
          </p>
          
          {/* Badge */}
          <div 
            className="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: service.bgLight, color: service.color }}
          >
            {service.badge}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <Link 
            to={service.urgent ? '/urgences' : '/services'}
            className="flex items-center justify-between text-sm font-medium group/link"
          >
            <span className="flex items-center gap-2 text-gray-700 group-hover/link:text-blue-600 transition-colors">
              {service.urgent ? 'Appeler le 01 01 81 92 86' : 'En savoir plus'}
              <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </span>
            {!service.urgent && (
              <Clock size={12} className="text-gray-400" />
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full mb-5">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Notre offre de soins
            </span>
          </div>
          
          {/* Titre */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Des soins complets</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              pour toute la famille
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-gray-500 text-lg leading-relaxed">
            ESMAD propose une gamme complète de services médicaux innovants,
            avec une équipe dédiée à votre bien-être et à celui de vos proches.
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
        
        {/* Stats */}
        <motion.div 
          className="mt-20 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '15+', label: 'Médecins', icon: Heart },
              { value: '5 000+', label: 'Patients', icon: Star },
              { value: '24/7', label: 'Urgences', icon: Clock },
              { value: '100%', label: 'Satisfaction', icon: Shield },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 mb-1">
                  <stat.icon size={20} className="text-blue-500" />
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Prendre rendez-vous</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}