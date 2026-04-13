import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, Microscope, Clock, UserCheck, Award, HeartHandshake, 
  Sparkles, TrendingUp, Users, CheckCircle 
} from 'lucide-react'

const PILLARS = [
  {
    icon: Shield,
    title: 'Centre agréé',
    desc: 'Autorisation officielle ATT N°52/MSHP/DGS/DEPS/KL — garantie de conformité.',
    color: '#2563EB',
    bgLight: '#EFF6FF',
  },
  {
    icon: UserCheck,
    title: 'Personnel qualifié',
    desc: 'Médecins diplômés et expérimentés dans leurs spécialités respectives.',
    color: '#16A34A',
    bgLight: '#F0FDF4',
  },
  {
    icon: Microscope,
    title: 'Équipements modernes',
    desc: 'Matériel médical conforme aux normes internationales en vigueur.',
    color: '#D97706',
    bgLight: '#FFFBEB',
  },
  {
    icon: Clock,
    title: 'Urgences 24h/24',
    desc: 'Équipe médicale dédiée disponible à toute heure, sans aucune exception.',
    color: '#DC2626',
    bgLight: '#FEF2F2',
  },
  {
    icon: HeartHandshake,
    title: 'Soins centrés patient',
    desc: 'Approche humaine, bienveillante et entièrement personnalisée pour chaque patient.',
    color: '#DB2777',
    bgLight: '#FDF2F8',
  },
  {
    icon: Award,
    title: 'Plus de 10 ans',
    desc: 'Une décennie de pratique médicale au service des familles d\'Abobo et d\'Abidjan.',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
  },
]

const STATS = [
  { value: '10+', label: "Années d'excellence", icon: TrendingUp, color: '#2563EB' },
  { value: '15+', label: 'Médecins experts', icon: Users, color: '#16A34A' },
  { value: '5 000+', label: 'Patients satisfaits', icon: CheckCircle, color: '#D97706' },
  { value: '24/7', label: "Service d'urgence", icon: Clock, color: '#DC2626' },
]

function PillarCard({ pillar, index, inView }: { pillar: typeof PILLARS[0]; index: number; inView: boolean }) {
  const Icon = pillar.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <div className="p-5">
          {/* Icône */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: pillar.bgLight }}
          >
            <Icon size={22} color={pillar.color} strokeWidth={1.8} />
          </div>
          
          {/* Titre */}
          <h3 className="font-semibold text-gray-900 text-base mb-2">
            {pillar.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {pillar.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' })

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section gauche et droite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* GAUCHE - Texte et piliers */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={14} className="text-blue-700" />
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Pourquoi nous choisir
              </span>
            </div>
            
            {/* Titre */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-900">Nos engagements</span>
              <br />
              <span className="text-blue-600">
                envers votre santé
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Depuis notre fondation, ESMAD s'est engagé à offrir des soins de qualité,
              accessibles à tous les membres de la communauté d'Abobo et d'Abidjan.
              Notre approche allie expertise médicale et bienveillance humaine.
            </p>

            {/* Grille des piliers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map((pillar, index) => (
                <PillarCard key={pillar.title} pillar={pillar} index={index} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* DROITE - Carte visuelle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Carte principale */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 shadow-xl">
              <div className="relative p-6 sm:p-8 text-center">
                {/* Logo */}
                <div 
                  className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #7CB342, #8BC34A)',
                    boxShadow: '0 8px 20px rgba(124,179,66,0.3)',
                  }}
                >
                  <div className="relative">
                    <div className="absolute bg-white rounded-sm" style={{ width: 32, height: 10, top: -5, left: -16 }} />
                    <div className="absolute bg-white rounded-sm" style={{ width: 10, height: 32, left: -5, top: -16 }} />
                  </div>
                </div>

                {/* Titre */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  ESPACE MÉDICAL ANADOR
                </h3>
                <p className="text-blue-200 text-xs sm:text-sm mb-6">
                  Centre Médical Agréé — Abidjan, Côte d'Ivoire
                </p>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {STATS.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/10 rounded-xl p-3 backdrop-blur-sm"
                      >
                        <Icon size={20} color={stat.color} className="mx-auto mb-1" />
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] text-blue-200">{stat.label}</div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Badge année */}
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                  <Award size={14} className="text-yellow-400" />
                  <span className="text-xs text-white">Fondé en 2010</span>
                </div>
              </div>
            </div>

            {/* Badge flottant - caché sur mobile */}
            <motion.div
              className="absolute -bottom-3 -right-3 bg-white rounded-xl p-3 shadow-lg border border-gray-100 hidden sm:block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <Shield size={16} color="white" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Certification</div>
                  <div className="font-semibold text-gray-900 text-xs">ATT N°52/MSHP</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}