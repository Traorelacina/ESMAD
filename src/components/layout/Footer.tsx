import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Shield } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const LINKS = {
  Navigation: [
    { label: 'Accueil', to: '/' },
    { label: 'Nos Services', to: '/services' },
    { label: 'Notre Équipe', to: '/medecins' },
    { label: 'Informations Patients', to: '/patients' },
    { label: 'La Clinique', to: '/a-propos' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: [
    { label: 'Consultation médicale', to: '/services' },
    { label: 'Hospitalisation', to: '/services' },
    { label: 'Laboratoire', to: '/services' },
    { label: 'Échographie', to: '/services' },
    { label: 'Maternité', to: '/services' },
    { label: 'Urgences 24h/24', to: '/services' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#07101F' }}>
      {/* Animated top border */}
      <div
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #1565C0, #7CB342, #D4A843, #1565C0, transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-7 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Brand */}
          <div>
            <Logo variant="white" size="md" />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Centre de santé agréé, dédié à fournir des soins médicaux accessibles,
              fiables et de haute qualité à Abidjan, Côte d'Ivoire.
            </p>
            <div className="mt-3 text-xs italic" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Autorisation ATT N°52/MSHP/DGS/DEPS/KL
            </div>
            {/* WhatsApp link */}
            <motion.a
              href="https://wa.me/2250101819286"
              target="_blank"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg text-white text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              WhatsApp Direct
            </motion.a>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="text-xs font-bold uppercase tracking-[0.1em] mb-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                {title}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.1em] mb-4"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              Coordonnées
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <MapPin size={14} className="flex-shrink-0 mt-0.5 opacity-40" />
                <div>Abobo Anador Cocoteraie<br />(Coco Service), Abidjan<br />08 BP 270 Abidjan 08</div>
              </div>
              <div className="flex gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <Phone size={14} className="flex-shrink-0 mt-0.5 opacity-40" />
                <div>01 01 81 92 86<br />05 05 11 41 20</div>
              </div>
              <div className="flex gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <Clock size={14} className="flex-shrink-0 mt-0.5 opacity-40" />
                <div>Lun — Sam : 07h30 – 18h00<br />
                  <span style={{ color: 'rgba(239,154,154,0.9)' }}>Urgences : 24h/24 — 7j/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span>© 2026 Espace Médical Anador (ESMAD). Tous droits réservés.</span>
          <span>08 BP 270 Abidjan 08 — Côte d'Ivoire</span>
        </div>
      </div>
    </footer>
  )
}