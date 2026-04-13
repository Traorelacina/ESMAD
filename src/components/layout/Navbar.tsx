import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Calendar, Phone } from 'lucide-react'
import { navDropdown } from '@/utils/animations'
import Logo from '@/components/ui/Logo'

const NAV_ITEMS = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Nos Services', href: '/services',
    dropdown: [
      { label: 'Consultation médicale', href: '/services' },
      { label: 'Hospitalisation', href: '/services' },
      { label: 'Laboratoire d\'analyses', href: '/services' },
      { label: 'Échographie', href: '/services' },
      { label: 'Maternité', href: '/services' },
      { label: 'Urgences 24h/24', href: '/services' },
    ],
  },
  {
    label: 'Médecins', href: '/medecins',
    dropdown: [
      { label: 'Notre équipe médicale', href: '/medecins' },
      { label: 'Médecine générale', href: '/medecins' },
      { label: 'Gynécologie', href: '/medecins' },
      { label: 'Pédiatrie', href: '/medecins' },
    ],
  },
  {
    label: 'Patients', href: '/patients',
    dropdown: [
      { label: 'Prendre rendez-vous', href: '/rendez-vous' },
      { label: 'Préparer votre séjour', href: '/patients' },
      { label: 'Assurances & mutuelles', href: '/patients' },
      { label: 'Charte du patient', href: '/patients' },
    ],
  },
  { label: 'La Clinique', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.94)'
            : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(229,231,235,0.8)'
            : '0 1px 0 rgba(229,231,235,0.8)',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-[1200px] mx-auto px-7 h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center h-full gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-3.5 h-full text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-brand-blue'
                      : 'text-gray-500 hover:text-navy'
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Active underline */}
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-t-full"
                    style={{ background: 'linear-gradient(90deg, #1565C0, #7CB342)' }}
                  />
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      variants={navDropdown}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 bg-white border border-gray-100 rounded-b-xl shadow-xl min-w-[220px] py-2 overflow-hidden"
                      style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                    >
                      {item.dropdown.map((drop) => (
                        <Link
                          key={drop.label}
                          to={drop.href}
                          className="flex items-center px-5 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-brand-blue border-l-[3px] border-transparent hover:border-brand-blue transition-all duration-150"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Urgences 24h</div>
              <a href="tel:+2250101819286" className="text-base font-bold text-navy hover:text-brand-blue transition-colors">
                01 01 81 92 86
              </a>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/rendez-vous"
                className="btn-shine flex items-center gap-2 bg-[#7CB342] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#6FA131] transition-colors"
                style={{ boxShadow: '0 4px 16px rgba(124,179,66,0.3)' }}
              >
                <Calendar size={15} />
                Prendre RDV
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[76px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-xl"
            style={{ backdropFilter: 'blur(16px)' }}
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={`block py-3 border-b border-gray-100 text-[15px] font-medium ${
                      location.pathname === item.href ? 'text-brand-blue' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  to="/rendez-vous"
                  className="flex items-center justify-center gap-2 w-full bg-[#7CB342] text-white py-3 rounded-lg font-semibold hover:bg-[#6FA131] transition-colors"
                >
                  <Calendar size={16} />
                  Prendre Rendez-vous
                </Link>
                <a
                  href="tel:+2250101819286"
                  className="flex items-center justify-center gap-2 w-full mt-2 border border-gray-200 text-navy py-3 rounded-lg font-semibold text-sm"
                >
                  <Phone size={15} />
                  01 01 81 92 86
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}