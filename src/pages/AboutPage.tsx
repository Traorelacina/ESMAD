import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { 
  CheckCircle, ArrowRight, Heart, Users, Shield, Clock, 
  Sparkles, Award, MapPin, Phone, Mail, Star, 
  Building, Target, Eye, TrendingUp
} from 'lucide-react'

const VALUES = [
  { 
    icon: Heart,   
    title: 'Excellence',    
    desc: 'Des soins de la plus haute qualité médicale et humaine pour chaque patient.',
    color: '#2563EB',
    bgLight: '#EFF6FF',
    gradient: 'from-blue-50 to-blue-100',
  },
  { 
    icon: Users,   
    title: 'Accessibilité', 
    desc: 'Des soins accessibles à tous les membres de la communauté, sans discrimination.',
    color: '#16A34A',
    bgLight: '#F0FDF4',
    gradient: 'from-green-50 to-green-100',
  },
  { 
    icon: Shield,  
    title: 'Intégrité',     
    desc: 'Éthique médicale rigoureuse, transparence totale et respect du patient.',
    color: '#D97706',
    bgLight: '#FFFBEB',
    gradient: 'from-amber-50 to-amber-100',
  },
  { 
    icon: Clock,   
    title: 'Réactivité',    
    desc: 'Réponse rapide et efficace, en particulier pour les situations d\'urgence.',
    color: '#DC2626',
    bgLight: '#FEF2F2',
    gradient: 'from-red-50 to-red-100',
  },
]

const STATS = [
  { value: '10+', label: "Années d'excellence", icon: Award, color: '#2563EB' },
  { value: '15+', label: 'Médecins experts', icon: Users, color: '#16A34A' },
  { value: '5 000+', label: 'Patients satisfaits', icon: Star, color: '#D97706' },
  { value: '24/7', label: 'Service d\'urgence', icon: Clock, color: '#DC2626' },
]

const FEATURES = [
  'Centre agréé — Autorisation ATT N°52/MSHP/DGS/DEPS/KL',
  'Personnel médical qualifié et expérimenté',
  'Équipements médicaux conformes aux normes',
  'Urgences médicales disponibles 24h/24 — 7j/7',
]

function ValueCard({ value, index, inView }: { value: typeof VALUES[0]; index: number; inView: boolean }) {
  const Icon = value.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <div className="relative h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
        {/* Dégradé de fond au survol */}
        <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Bande de couleur */}
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-500"
          style={{ backgroundColor: value.color }}
        />
        
        <div className="relative z-10 p-6 text-center">
          <motion.div 
            className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: value.bgLight }}
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon size={28} color={value.color} strokeWidth={1.7} />
          </motion.div>
          
          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {value.title}
          </h4>
          
          <p className="text-sm text-gray-500 leading-relaxed">
            {value.desc}
          </p>
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
              Notre histoire
            </span>
          </div>
          
          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            La Clinique ESMAD
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-300">
            Un établissement de santé de confiance au cœur d'Abobo, Abidjan.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader />

      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Visual - Carte d'identité */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 shadow-xl">
              {/* Dégradé animé */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                animate={{ 
                  background: [
                    'linear-gradient(45deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))',
                    'linear-gradient(225deg, rgba(59,130,246,0.3), rgba(147,51,234,0.1))',
                    'linear-gradient(45deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2))'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Grille */}
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
              
              <div className="relative p-8 text-center">
                {/* Logo */}
                <motion.div 
                  className="w-24 h-24 rounded-2xl mx-auto mb-6 relative flex items-center justify-center cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #7CB342, #8BC34A)',
                    boxShadow: '0 0 40px rgba(124,179,66,0.4)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(124,179,66,0.3)',
                      '0 0 60px rgba(124,179,66,0.6)',
                      '0 0 20px rgba(124,179,66,0.3)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="absolute bg-white rounded-sm" style={{ width: 48, height: 14, borderRadius: 2 }} />
                  <div className="absolute bg-white rounded-sm" style={{ width: 14, height: 48, borderRadius: 2 }} />
                </motion.div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  ESPACE MÉDICAL ANADOR
                </h3>
                <p className="text-blue-200 text-sm mb-6">
                  Centre Médical Agréé — Abidjan, Côte d'Ivoire
                </p>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  {STATS.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                      >
                        <Icon size={24} color={stat.color} className="mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-blue-200 mt-1">{stat.label}</div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Badge année */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Award size={16} className="text-yellow-400" />
                  <span className="text-sm text-white">Fondé en 2010</span>
                </div>
              </div>
            </div>

            {/* Badge flottant */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-200 hidden sm:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Shield size={20} color="white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Certification</div>
                  <div className="font-bold text-gray-900 text-sm">ATT N°52/MSHP</div>
                  <div className="text-xs text-green-600 font-semibold">Centre agréé</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Texte - Histoire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full mb-5">
              <Building size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Notre histoire
              </span>
            </div>
            
            {/* Titre */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-900">Un engagement médical</span>
              <br />
              <span className="text-blue-600">ancré dans la communauté</span>
            </h2>
            
            {/* Description */}
            <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
              <p>
                ESPACE MÉDICAL ANADOR (ESMAD) est un établissement de santé situé à Abobo Anador, 
                dans la commune d'Abobo à Abidjan. Depuis sa création en 2010, le centre a pour 
                vocation d'offrir des soins médicaux de qualité, accessibles aux populations locales.
              </p>
              <p>
                Le centre propose des services médicaux complets : consultation, hospitalisation, 
                analyses de laboratoire, échographie et maternité. Sa mission est d'assurer des 
                soins efficaces, sûrs et centrés sur le patient grâce à un personnel médical 
                qualifié et des équipements modernes.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-3 mb-8">
              {FEATURES.map((item, idx) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100 group-hover:bg-green-200 transition-colors">
                    <CheckCircle size={12} color="#16A34A" />
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Bouton CTA */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg transition-all duration-300"
              >
                Nous contacter <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Section des valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 shadow-sm"
        >
          <div className="text-center mb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full mb-4">
              <Target size={14} className="text-purple-600" />
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                Notre mission
              </span>
            </div>
            
            {/* Titre */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Nos valeurs fondamentales
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Des principes qui guident notre action quotidienne au service de votre santé
            </p>
          </div>
          
          {/* Grille des valeurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} inView={inView} />
            ))}
          </div>
        </motion.div>
        
        {/* Section de confiance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield size={24} className="text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Centre médical agréé par le MSHP</h4>
                <p className="text-sm text-gray-500">Autorisation officielle ATT N°52/MSHP/DGS/DEPS/KL</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Award size={24} className="text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Plus de 10 ans d'expérience</h4>
                <p className="text-sm text-gray-500">Une décennie au service de la communauté</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}