import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Shield } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-[#070E1C] text-white py-2.5 text-sm relative overflow-hidden">
      {/* Subtle animated line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124,179,66,0.5), rgba(21,101,192,0.5), transparent)',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-[1200px] mx-auto px-7">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-5 hide-mobile">
            <div className="flex items-center gap-1.5 text-white/65">
              <MapPin size={12} className="text-white/40" />
              <span>Abobo Anador Cocoteraie, Abidjan</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-1.5 text-white/65">
              <Clock size={12} className="text-white/40" />
              <span>Lun — Sam : 07h30 – 18h00</span>
            </div>
            <div className="w-px h-3 bg-white/15" />
            <div className="flex items-center gap-1.5 text-white/40 text-xs italic">
              <Shield size={11} />
              <span>ATT N°52/MSHP/DGS/DEPS/KL</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5 text-white/70">
              <Phone size={12} className="text-white/40" />
              <span className="font-semibold text-white">05 05 11 41 20</span>
            </div>

            {/* Emergency badge */}
            <motion.a
              href="tel:+2250101819286"
              className="flex items-center gap-1.5 bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Urgences : 01 01 81 92 86
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}