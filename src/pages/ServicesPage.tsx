import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import {
  Heart, Home, FlaskConical, Search, Baby, Phone, Calendar,
  ArrowRight, Clock, Shield, Star, Users, Award,
  Stethoscope, Microscope, Ambulance, Sparkles
} from 'lucide-react'

const SERVICES = [
  {
    icon: Heart,
    title: 'Consultation Médicale',
    desc: 'Consultations générales et spécialisées dispensées par des professionnels de santé qualifiés. Diagnostic, traitement et suivi médical assurés avec une attention particulière aux besoins du patient.',
    tags: ['Médecine générale', 'Suivi chronique', 'Médecine préventive'],
    color: '#2563EB',
    bgLight: '#EFF6FF',
    gradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Home,
    title: 'Hospitalisation',
    desc: "Service d'hospitalisation sécurisé et confortable pour les patients nécessitant une surveillance médicale continue. Personnel soignant disponible en permanence pour le bien-être de chaque patient.",
    tags: ['Chambres individuelles', 'Surveillance 24h/24', 'Soins infirmiers'],
    color: '#16A34A',
    bgLight: '#F0FDF4',
    gradient: 'from-green-50 to-green-100',
  },
  {
    icon: FlaskConical,
    title: "Laboratoire d'Analyses",
    desc: "Services de laboratoire médical offrant un large éventail d'analyses biologiques — NFS, biochimie, sérologie, microbiologie — pour appuyer un diagnostic précis et un traitement efficace.",
    tags: ['Hématologie', 'Biochimie', 'Sérologie', 'Bactériologie'],
    color: '#D97706',
    bgLight: '#FFFBEB',
    gradient: 'from-amber-50 to-amber-100',
  },
  {
    icon: Search,
    title: 'Échographie',
    desc: 'Imagerie médicale moderne par ultrasons pour examens abdominaux, obstétricaux et pelviens. Résultats interprétés par des praticiens spécialisés, avec compte rendu remis immédiatement.',
    tags: ['Abdominale', 'Obstétricale', 'Pelvienne', 'Gynécologique'],
    color: '#DB2777',
    bgLight: '#FDF2F8',
    gradient: 'from-pink-50 to-pink-100',
  },
  {
    icon: Baby,
    title: 'Maternité',
    desc: "Soins maternels complets incluant le suivi prénatal, l'accouchement physiologique ou médicalisé, et les soins postnataux. Notre équipe accompagne chaque future maman avec expertise et bienveillance.",
    tags: ['Suivi prénatal', 'Accouchement', 'Soins postnataux', 'Planification familiale'],
    color: '#059669',
    bgLight: '#ECFDF5',
    gradient: 'from-emerald-50 to-emerald-100',
  },
]

const STATS = [
  { value: '15+', label: 'Médecins experts', icon: Users, color: '#2563EB' },
  { value: '5 000+', label: 'Patients satisfaits', icon: Star, color: '#D97706' },
  { value: '10+', label: "Années d'excellence", icon: Award, color: '#16A34A' },
  { value: '24/7', label: "Service d'urgence", icon: Clock, color: '#DC2626' },
]

function ServiceCard({ service, index, inView }: { service: typeof SERVICES[0]; index: number; inView: boolean }) {
  const Icon = service.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Bande de couleur animée */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
          style={{ backgroundColor: service.color }}
        />
        
        {/* Dégradé de fond au survol */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative p-6">
          {/* En-tête avec icône et titre */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Icône animée */}
              <motion.div 
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                style={{ backgroundColor: service.bgLight }}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon size={28} color={service.color} strokeWidth={1.7} />
              </motion.div>
              
              {/* Titre */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
            </div>
            
            {/* Bouton RDV */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/rendez-vous"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
                style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)` }}
              >
                <Calendar size={12} /> Prendre RDV
              </Link>
            </motion.div>
          </div>
          
          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {service.desc}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300"
                style={{ backgroundColor: service.bgLight, color: service.color }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
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
              Nos prestations médicales
            </span>
          </div>
          
          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Services & Spécialités
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-300">
            ESMAD vous propose une gamme complète de soins médicaux pour toute la famille,
            assurés par des professionnels qualifiés.
          </p>
          
          {/* Statistiques rapides */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <Icon size={16} color={stat.color} />
                  <span className="text-sm font-semibold text-white">{stat.value}</span>
                  <span className="text-xs text-gray-300">{stat.label}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader />

      {/* Section des services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" ref={ref}>
        {/* Grille des services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} inView={inView} />
          ))}
        </div>

        {/* Bloc Urgences */}
        <motion.div
          className="mt-12 rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 p-8 md:p-10 overflow-hidden">
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Motif de fond */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Ambulance size={32} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-200 mb-1">
                    Urgences médicales 24/7
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Service d'urgences disponible à toute heure
                  </h3>
                  <p className="text-red-100 text-sm mt-1">
                    Notre équipe est prête à vous prendre en charge immédiatement
                  </p>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-red-200 mb-1">Numéro d'urgence direct</div>
                <div className="flex flex-col items-center md:items-end gap-1">
                  <a href="tel:0101819286" className="text-2xl md:text-3xl font-bold text-white hover:text-red-100 transition-colors">
                    01 01 81 92 86
                  </a>
                  <a href="tel:0505114120" className="text-lg md:text-xl font-semibold text-red-200 hover:text-red-100 transition-colors">
                    05 05 11 41 20
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Section de confiance */}
        <motion.div
          className="mt-12 bg-gray-50 rounded-2xl p-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <Shield size={32} className="text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Centre médical agréé par le MSHP
          </h3>
          <p className="text-gray-500 text-sm">
            Autorisation officielle ATT N°52/MSHP/DGS/DEPS/KL — Garantie de conformité et de qualité des soins
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}