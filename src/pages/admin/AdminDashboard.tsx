import { useState, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Calendar, Users, Heart, MessageCircle,
  LogOut, Globe, TrendingUp, CheckCircle, XCircle,
  Plus, Eye, Pencil, Trash2, Menu, X, Bell,
  Clock, Phone, AlertCircle, ChevronRight,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// ─── TYPES ────────────────────────────────────────────────────────────────────
type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
type AdminSection = 'dashboard' | 'appointments' | 'doctors' | 'services' | 'messages'

interface AppointmentRow {
  id: number
  patient: string
  phone: string
  service: string
  doctor: string
  date: string
  time: string
  status: AppointmentStatus
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const APPOINTMENTS: AppointmentRow[] = [
  { id: 1, patient: 'Aya Mensah',       phone: '07 11 22 33 44', service: 'Consultation',  doctor: 'Dr. Koné',       date: '11/04/2026', time: '09h00', status: 'confirmed' },
  { id: 2, patient: 'Ibrahim Touré',    phone: '05 44 55 66 77', service: 'Laboratoire',   doctor: 'Dr. Issa',       date: '11/04/2026', time: '10h30', status: 'pending'   },
  { id: 3, patient: 'Mariam Coulibaly', phone: '01 77 88 99 00', service: 'Gynécologie',   doctor: 'Dr. Ouédraogo',  date: '11/04/2026', time: '14h00', status: 'confirmed' },
  { id: 4, patient: 'Konan Yao',        phone: '07 22 33 44 55', service: 'Pédiatrie',     doctor: 'Dr. Brou',       date: '12/04/2026', time: '08h30', status: 'pending'   },
  { id: 5, patient: 'Adjoa Asante',     phone: '05 66 77 88 99', service: 'Échographie',   doctor: '—',              date: '12/04/2026', time: '11h00', status: 'cancelled' },
  { id: 6, patient: 'Jean-Paul D.',     phone: '01 23 45 67 89', service: 'Consultation',  doctor: 'Dr. Coulibaly',  date: '10/04/2026', time: '15h00', status: 'completed' },
]

const DOCTORS_LIST = [
  { id:1, name:'Dr. Adama Koné',          spec:'Médecine Générale',      schedule:'Lun — Sam',   exp:'15 ans', active:true },
  { id:2, name:'Dr. Fatou Ouédraogo',     spec:'Gynécologie-Obstétrique', schedule:'Mar, Jeu, Sam', exp:'12 ans', active:true },
  { id:3, name:'Dr. Kouamé Brou',         spec:'Pédiatrie',              schedule:'Lun, Mer, Ven', exp:'10 ans', active:true },
  { id:4, name:'Dr. Seydou Issa',         spec:'Biologie Médicale',      schedule:'Lun — Ven',   exp:'8 ans',  active:true },
  { id:5, name:'Dr. Marie-Claire Coulibaly',spec:'Médecine Générale',    schedule:'Mar, Jeu, Sam', exp:'9 ans',  active:true },
  { id:6, name:'Dr. Awa Lamine',          spec:'Sage-Femme',             schedule:'Lun — Sam',   exp:'18 ans', active:true },
]

const SERVICES_LIST = [
  { id:1, name:'Consultation médicale',  desc:'Consultations générales et spécialisées', active:true },
  { id:2, name:'Hospitalisation',        desc:'Surveillance médicale continue',           active:true },
  { id:3, name:"Laboratoire d'analyses", desc:'Analyses biologiques complètes',           active:true },
  { id:4, name:'Échographie',            desc:'Imagerie médicale ultrasonore',            active:true },
  { id:5, name:'Maternité',              desc:'Suivi prénatal, accouchement, postnataux', active:true },
]

const MESSAGES_LIST = [
  { id:1, name:'Aya Mensah',   contact:'07 11 22 33 44',   text:"Bonjour, je voudrais savoir les horaires du laboratoire pour les analyses de sang.", date:"Aujourd'hui", read:false },
  { id:2, name:'Kofi Boateng', contact:'kofi@email.com',   text:"Est-ce que vous faites des consultations pour les enfants de moins de 5 ans ?",      date:'Hier',        read:false },
  { id:3, name:'Marie Diallo', contact:'05 88 99 00 11',   text:"Demande de renseignements pour une échographie obstétricale, je suis enceinte.",     date:'09/04',       read:true  },
]

// ─── STATUS PILL ──────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<AppointmentStatus, { label: string; bg: string; color: string; dot: string }> = {
  pending:   { label: 'En attente', bg: '#FFF8E1', color: '#F57F17', dot: '#F59E0B' },
  confirmed: { label: 'Confirmé',   bg: '#E8F5E9', color: '#2E7D32', dot: '#4CAF50' },
  cancelled: { label: 'Annulé',     bg: '#FFEBEE', color: '#C62828', dot: '#EF5350' },
  completed: { label: 'Terminé',    bg: '#E3F2FD', color: '#1565C0', dot: '#1976D2' },
}

function StatusPill({ status }: { status: AppointmentStatus }) {
  const c = STATUS_CONFIG[status]
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
      style={{ background: c.bg, color: c.color }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.dot }} />
      {c.label}
    </span>
  )
}

// ─── TABLE WRAPPER ────────────────────────────────────────────────────────────
function TableCard({ title, subtitle, action, children }: {
  title: string; subtitle?: string; action?: ReactNode; children: ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="font-head text-lg font-semibold text-[#0A1628]">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardView() {
  const METRICS = [
    { val:'28', label:"RDV aujourd'hui", trend:'+4 depuis hier',  icon:Calendar,       bg:'#E3F2FD', color:'#1565C0' },
    { val:'6',  label:'Médecins actifs',  trend:'Tous disponibles', icon:Users,          bg:'#F1F8E9', color:'#558B2F' },
    { val:'312',label:'Patients ce mois', trend:'+12 ce mois',    icon:TrendingUp,      bg:'#FFF8E1', color:'#F57F17' },
    { val:'7',  label:'Messages non lus', trend:'Non lus',         icon:MessageCircle,  bg:'#FFEBEE', color:'#C62828' },
  ]

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <motion.div key={m.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: m.bg }}>
              <m.icon size={22} color={m.color} strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0A1628]">{m.val}</div>
              <div className="text-xs font-semibold" style={{ color: m.color }}>{m.trend}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent appointments */}
      <TableCard title="Rendez-vous récents" subtitle="Les 5 dernières réservations"
        action={
          <button className="text-xs font-semibold text-[#1565C0] flex items-center gap-1 hover:gap-2 transition-all">
            Voir tous <ChevronRight size={13} />
          </button>
        }>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Patient', 'Service', 'Médecin', 'Date', 'Heure', 'Statut'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {APPOINTMENTS.slice(0, 5).map((a, i) => (
              <motion.tr key={a.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-semibold text-[#0A1628]">{a.patient}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{a.service}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{a.doctor}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{a.date}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500">{a.time}</td>
                <td className="px-5 py-3.5"><StatusPill status={a.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* Urgence reminder */}
      <div className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg,#B71C1C,#C62828)' }}>
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="font-head text-lg font-bold text-white">Urgences — 24h/24 — 7j/7</div>
          <div className="text-white/75 text-sm">Ligne directe : <strong className="text-white">01 01 81 92 86</strong></div>
        </div>
        <a href="tel:+2250101819286"
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
          <Phone size={14} /> Appeler
        </a>
      </div>
    </div>
  )
}

// ─── APPOINTMENTS VIEW ────────────────────────────────────────────────────────
function AppointmentsView() {
  const [data, setData] = useState(APPOINTMENTS)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const confirm = (id: number) => setData((d) => d.map((a) => a.id === id ? { ...a, status: 'confirmed' as const } : a))
  const cancel  = (id: number) => setData((d) => d.map((a) => a.id === id ? { ...a, status: 'cancelled' as const } : a))

  const filtered = filterStatus === 'all' ? data : data.filter((a) => a.status === filterStatus)

  return (
    <TableCard title="Tous les rendez-vous" subtitle={`${filtered.length} rendez-vous`}
      action={
        <div className="flex items-center gap-3">
          <select
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-blue-400 bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="cancelled">Annulé</option>
            <option value="completed">Terminé</option>
          </select>
        </div>
      }>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['Patient', 'Téléphone', 'Service', 'Médecin', 'Date / Heure', 'Statut', 'Actions'].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {filtered.map((a, i) => (
              <motion.tr key={a.id}
                layout
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/70 transition-colors">
                <td className="px-5 py-3.5 text-sm font-semibold text-[#0A1628]">{a.patient}</td>
                <td className="px-5 py-3.5 text-xs text-gray-400">{a.phone}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{a.service}</td>
                <td className="px-5 py-3.5 text-sm text-gray-600">{a.doctor}</td>
                <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{a.date} — {a.time}</td>
                <td className="px-5 py-3.5"><StatusPill status={a.status} /></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {a.status === 'pending' && (
                      <button onClick={() => confirm(a.id)}
                        className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors hover:opacity-80"
                        style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                        <CheckCircle size={11} /> Confirmer
                      </button>
                    )}
                    {(a.status === 'pending' || a.status === 'confirmed') && (
                      <button onClick={() => cancel(a.id)}
                        className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors hover:opacity-80"
                        style={{ background: '#FFEBEE', color: '#C62828' }}>
                        <XCircle size={11} /> Annuler
                      </button>
                    )}
                    {a.status === 'cancelled' && (
                      <span className="text-xs text-gray-400 italic">—</span>
                    )}
                    {a.status === 'completed' && (
                      <span className="text-xs text-gray-400 italic">Terminé</span>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </TableCard>
  )
}

// ─── DOCTORS VIEW ─────────────────────────────────────────────────────────────
function DoctorsView() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <TableCard title="Médecins & Spécialistes" subtitle={`${DOCTORS_LIST.length} médecins actifs`}
        action={
          <button onClick={() => setShowModal(true)}
            className="btn-shine flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2.5 rounded-xl"
            style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)', boxShadow: '0 2px 12px rgba(21,101,192,0.25)' }}>
            <Plus size={15} /> Ajouter un médecin
          </button>
        }>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Médecin', 'Spécialité', 'Planning', 'Expérience', 'Statut', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOCTORS_LIST.map((d, i) => (
              <motion.tr key={d.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-head font-bold text-xs text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)' }}>
                      {d.name.split(' ').slice(-1)[0].charAt(0)}{d.name.split(' ').slice(-2)[0].charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-[#0A1628]">{d.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{d.spec}</td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-gray-400" />
                    {d.schedule}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{d.exp}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Actif
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#1565C0] transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </TableCard>

      {/* Add Doctor Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-lg p-8"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-head text-xl font-bold text-[#0A1628]">Ajouter un médecin</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Nom complet', placeholder: 'Dr. Prénom Nom' },
                  { label: 'Spécialité', placeholder: 'Ex: Médecine Générale' },
                  { label: 'Planning', placeholder: 'Ex: Lundi — Vendredi' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">{field.label}</label>
                    <input type="text" placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.12)] transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Biographie</label>
                  <textarea rows={3} placeholder="Présentation du médecin..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.12)] transition-all resize-none" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-gray-100">
                <button onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button onClick={() => setShowModal(false)}
                  className="btn-shine px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)', boxShadow: '0 2px 12px rgba(21,101,192,0.25)' }}>
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── SERVICES VIEW ────────────────────────────────────────────────────────────
function ServicesView() {
  return (
    <TableCard title="Services médicaux" subtitle={`${SERVICES_LIST.length} services actifs`}
      action={
        <button className="btn-shine flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2.5 rounded-xl"
          style={{ background: 'linear-gradient(135deg,#7CB342,#8BC34A)', boxShadow: '0 2px 12px rgba(124,179,66,0.25)' }}>
          <Plus size={15} /> Ajouter un service
        </button>
      }>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {['#', 'Nom du service', 'Description', 'Statut', 'Actions'].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SERVICES_LIST.map((s, i) => (
            <motion.tr key={s.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4 text-sm font-bold text-gray-400">{s.id}</td>
              <td className="px-5 py-4 text-sm font-semibold text-[#0A1628]">{s.name}</td>
              <td className="px-5 py-4 text-sm text-gray-500 max-w-[260px]">{s.desc}</td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Actif
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#1565C0] transition-colors"><Pencil size={14} /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </TableCard>
  )
}

// ─── MESSAGES VIEW ────────────────────────────────────────────────────────────
function MessagesView() {
  const [msgs, setMsgs] = useState(MESSAGES_LIST)
  const [selected, setSelected] = useState<typeof MESSAGES_LIST[0] | null>(null)

  const markRead = (id: number) => setMsgs((m) => m.map((msg) => msg.id === id ? { ...msg, read: true } : msg))
  const deleteMsg = (id: number) => setMsgs((m) => m.filter((msg) => msg.id !== id))

  const unread = msgs.filter((m) => !m.read).length

  return (
    <>
      <TableCard title="Messages reçus"
        subtitle={`${msgs.length} messages — ${unread} non lu${unread > 1 ? 's' : ''}`}
        action={
          unread > 0 ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: '#FFEBEE', color: '#C62828' }}>
              <Bell size={11} /> {unread} non lu{unread > 1 ? 's' : ''}
            </span>
          ) : null
        }>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['', 'Expéditeur', 'Contact', 'Message', 'Date', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {msgs.map((m, i) => (
                <motion.tr key={m.id}
                  layout
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`border-b border-gray-50 last:border-0 transition-colors cursor-pointer ${!m.read ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'}`}
                  onClick={() => setSelected(m)}>
                  <td className="px-4 py-4 w-8">
                    {!m.read && <span className="block w-2.5 h-2.5 rounded-full bg-[#1565C0] mx-auto" />}
                  </td>
                  <td className="px-5 py-4 text-sm text-[#0A1628]" style={{ fontWeight: m.read ? 400 : 700 }}>{m.name}</td>
                  <td className="px-5 py-4 text-xs text-gray-400">{m.contact}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 max-w-[220px] truncate">{m.text}</td>
                  <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">{m.date}</td>
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(m)} className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-[#1565C0] transition-colors"><Eye size={14} /></button>
                      {!m.read && (
                        <button onClick={() => markRead(m.id)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="Marquer comme lu">
                          <CheckCircle size={14} />
                        </button>
                      )}
                      <button onClick={() => deleteMsg(m.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </TableCard>

      {/* Message detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setSelected(null); markRead(selected.id) }}>
            <motion.div className="bg-white rounded-2xl w-full max-w-lg p-8"
              style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-head text-xl font-bold text-[#0A1628]">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.contact} · {selected.date}</p>
                </div>
                <button onClick={() => { setSelected(null); markRead(selected.id) }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <p className="text-sm text-gray-700 leading-relaxed">{selected.text}</p>
              </div>
              <div className="flex items-center gap-3">
                {selected.contact.includes('@') ? (
                  <a href={`mailto:${selected.contact}`}
                    className="btn-shine flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-1 justify-center"
                    style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)' }}>
                    Répondre par email
                  </a>
                ) : (
                  <a href={`tel:${selected.contact.replace(/\s/g, '')}`}
                    className="btn-shine flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex-1 justify-center"
                    style={{ background: 'linear-gradient(135deg,#7CB342,#8BC34A)' }}>
                    <Phone size={14} /> Appeler
                  </a>
                )}
                <button onClick={() => { deleteMsg(selected.id); setSelected(null) }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS: { key: AdminSection; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { key: 'dashboard',    label: 'Tableau de bord', icon: LayoutDashboard },
  { key: 'appointments', label: 'Rendez-vous',      icon: Calendar,        badge: 5 },
  { key: 'doctors',      label: 'Médecins',          icon: Users },
  { key: 'services',     label: 'Services',          icon: Heart },
  { key: 'messages',     label: 'Messages',          icon: MessageCircle,   badge: 7 },
]

function Sidebar({ active, onNav, onClose }: { active: AdminSection; onNav: (s: AdminSection) => void; onClose?: () => void }) {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  return (
    <div className="h-full flex flex-col" style={{ background: '#07101F' }}>
      {/* Accent bar */}
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg,#1565C0,#7CB342,#D4A843)' }} />

      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#7CB342,#8BC34A)', boxShadow: '0 0 20px rgba(124,179,66,0.35)' }}>
            <div className="absolute bg-white rounded-sm" style={{ width: 22, height: 7, borderRadius: 1.5 }} />
            <div className="absolute bg-white rounded-sm" style={{ width: 7, height: 22, borderRadius: 1.5 }} />
          </div>
          <div>
            <div className="font-head text-[15px] font-bold text-white">ESMAD</div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>Administration</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] px-3 pb-2"
          style={{ color: 'rgba(255,255,255,0.3)' }}>Principal</div>

        {SIDEBAR_ITEMS.map((item) => (
          <motion.button
            key={item.key}
            onClick={() => { onNav(item.key); onClose?.() }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left relative"
            animate={{
              background: active === item.key ? 'rgba(21,101,192,0.22)' : 'transparent',
              color: active === item.key ? '#ffffff' : 'rgba(255,255,255,0.55)',
            }}
            whileHover={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.9)' }}
          >
            {/* Active indicator */}
            {active === item.key && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-[#1565C0]"
              />
            )}
            <item.icon size={16} />
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                style={{ background: '#C62828' }}>
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}

        {/* Divider */}
        <div className="border-t my-4" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] px-3 pb-2"
          style={{ color: 'rgba(255,255,255,0.3)' }}>Compte</div>

        <motion.button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          whileHover={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.85)' }}
        >
          <Globe size={16} /> Voir le site public
        </motion.button>

        <motion.button
          onClick={() => { logout(); navigate('/admin/login') }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          whileHover={{ background: 'rgba(239,68,68,0.12)', color: '#EF9A9A' }}
        >
          <LogOut size={16} /> Déconnexion
        </motion.button>
      </nav>
    </div>
  )
}

// ─── PAGE TITLES ──────────────────────────────────────────────────────────────
const PAGE_INFO: Record<AdminSection, { title: string; sub: string }> = {
  dashboard:    { title: 'Tableau de bord',    sub: "Vue d'ensemble — ESMAD" },
  appointments: { title: 'Rendez-vous',         sub: 'Gestion des rendez-vous patients' },
  doctors:      { title: 'Médecins',             sub: 'Gestion du corps médical' },
  services:     { title: 'Services médicaux',   sub: 'Gestion des services ESMAD' },
  messages:     { title: 'Messages',             sub: 'Demandes et messages reçus' },
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user }    = useAuth()
  const [section, setSection]       = useState<AdminSection>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const info = PAGE_INFO[section]

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F4F6]">

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[252px] flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar active={section} onNav={setSection} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed left-0 top-0 bottom-0 w-[252px] z-50 lg:hidden overflow-y-auto"
              initial={{ x: -252 }} animate={{ x: 0 }} exit={{ x: -252 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}>
              <Sidebar active={section} onNav={setSection} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Topbar */}
        <div className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 flex-shrink-0"
          style={{ boxShadow: '0 1px 0 rgba(229,231,235,1)' }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <div className="font-head text-lg font-semibold text-[#0A1628]">{info.title}</div>
              <div className="text-xs text-gray-400 hidden sm:block">{info.sub}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Urgence badge */}
            <a href="tel:+2250101819286"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: '#FFEBEE', color: '#C62828' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Urgences : 01 01 81 92 86
            </a>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-[#0A1628]">{user?.name ?? 'Administrateur'}</div>
                <div className="text-xs text-gray-400">{user?.email ?? 'admin@esmad.ci'}</div>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-head font-bold text-sm text-white"
                style={{ background: 'linear-gradient(135deg,#1565C0,#1976D2)' }}>
                {(user?.name ?? 'A').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              {section === 'dashboard'    && <DashboardView />}
              {section === 'appointments' && <AppointmentsView />}
              {section === 'doctors'      && <DoctorsView />}
              {section === 'services'     && <ServicesView />}
              {section === 'messages'     && <MessagesView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}