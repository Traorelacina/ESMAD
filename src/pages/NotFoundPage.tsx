import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { pageTransition } from '@/utils/animations'

export default function NotFoundPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-[70vh] flex items-center justify-center text-center px-7 py-20"
    >
      <div>
        {/* Large 404 */}
        <motion.div
          className="font-head font-bold leading-none mb-6 select-none"
          style={{
            fontSize: 'clamp(100px, 18vw, 200px)',
            background: 'linear-gradient(135deg, #E5E7EB, #D1D5DB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-head text-3xl font-bold text-[#0A1628] mb-3">Page introuvable</h1>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/"
                className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #1565C0, #1976D2)',
                  boxShadow: '0 4px 16px rgba(21,101,192,0.3)',
                }}
              >
                <Home size={16} />
                Retour à l'accueil
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={16} />
                Page précédente
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}