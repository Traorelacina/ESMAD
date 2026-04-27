import { useEffect, useState } from 'react'
import { contactsApi, medecinsApi, assurancesApi, servicesApi, type ContactStats } from '@/api/client'
import { StatCard, T } from '@/components/ui'
import {
  Stethoscope, Shield, Hospital, Mail, BellRing, CheckCircle2,
  ArrowRight, TrendingUp, Activity,
} from 'lucide-react'

interface Counts { medecins: number; assurances: number; services: number }

export default function DashboardPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [stats, setStats]     = useState<ContactStats | null>(null)
  const [counts, setCounts]   = useState<Counts>({ medecins: 0, assurances: 0, services: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      contactsApi.stats(),
      medecinsApi.list('per_page=1'),
      assurancesApi.list('per_page=1'),
      servicesApi.list(),
    ])
      .then(([s, m, a, sv]) => {
        setStats(s)
        setCounts({
          medecins:   (m as any).meta?.total ?? 0,
          assurances: (a as any).meta?.total ?? 0,
          services:   ((sv as any).data?.length ?? 0),
        })
      })
      .catch(e => setError(e.message ?? 'Erreur de chargement'))
      .finally(() => setLoading(false))
  }, [])

  const SHORTCUTS = [
    { key: 'medecins',   icon: Stethoscope, label: 'Gérer les médecins',   desc: 'Personnel médical & disponibilités', color: T.blue,   bg: T.blueL },
    { key: 'assurances', icon: Shield,      label: 'Gérer les assurances', desc: 'Partenaires & mutuelles',            color: '#16A34A', bg: '#F0FDF4' },
    { key: 'contacts',   icon: Mail,        label: 'Lire les messages',    desc: `${stats?.nouveaux ?? 0} non lu(s)`,  color: T.purple, bg: T.purpleL },
    { key: 'services',   icon: Hospital,    label: 'Gérer les services',   desc: 'Prestations de la clinique',         color: T.amber,  bg: T.amberL },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: T.navy }}>Tableau de bord</h2>
          <p style={{ margin: 0, color: T.gray400, fontSize: 13 }}>Vue d'ensemble de la clinique ESMAD</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, background: T.white, border: `1px solid ${T.border}` }}>
          <Activity size={15} color={T.green} />
          <span style={{ fontSize: 12, color: T.gray500, fontFamily: T.font, fontWeight: 600 }}>Système opérationnel</span>
        </div>
      </div>

      {error && (
        <div style={{ background: T.redL, border: `1px solid #FECACA`, borderRadius: 12, padding: '14px 18px', color: T.red, fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="Médecins actifs"        value={counts.medecins}      icon={<Stethoscope size={20} />}  color={T.blue}   bg={T.blueL}   loading={loading} />
        <StatCard label="Assurances partenaires" value={counts.assurances}    icon={<Shield size={20} />}       color="#16A34A"  bg="#F0FDF4"   loading={loading} />
        <StatCard label="Services proposés"      value={counts.services}      icon={<Hospital size={20} />}     color={T.amber}  bg={T.amberL}  loading={loading} />
        <StatCard label="Messages reçus"         value={stats?.total ?? 0}    icon={<Mail size={20} />}         color={T.purple} bg={T.purpleL} loading={loading} />
        <StatCard label="Messages non lus"       value={stats?.nouveaux ?? 0} icon={<BellRing size={20} />}    color={T.red}    bg={T.redL}    loading={loading}
          trend={stats?.nouveaux ? `+${stats.nouveaux}` : undefined} />
        <StatCard label="Messages répondus"      value={stats?.repondus ?? 0} icon={<CheckCircle2 size={20} />} color="#059669" bg="#ECFDF5"   loading={loading} />
      </div>

      {/* Quick access */}
      <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <TrendingUp size={18} color={T.green} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>Accès rapide</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {SHORTCUTS.map(item => {
            const Icon = item.icon
            return (
              <button key={item.key} onClick={() => onNavigate?.(item.key)}
                style={{ padding: '18px', borderRadius: 14, border: `1.5px solid ${T.border}`, background: T.white, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease', fontFamily: T.font }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = item.color; el.style.background = item.bg; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = T.border; el.style.background = T.white; el.style.transform = 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                    <Icon size={18} />
                  </div>
                  <ArrowRight size={14} color={T.gray300} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: T.gray400 }}>{item.desc}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}