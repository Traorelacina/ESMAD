// src/pages/admin/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { contactsApi, medecinsApi, assurancesApi, servicesApi, type ContactStats } from '@/api/client'
import { StatCard } from '@/components/ui'

export default function DashboardPage() {
  const [stats, setStats]       = useState<ContactStats | null>(null)
  const [counts, setCounts]     = useState({ medecins: 0, assurances: 0, services: 0 })
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    Promise.all([
      contactsApi.stats(),
      medecinsApi.list('per_page=1'),
      assurancesApi.list('per_page=1'),
      servicesApi.list(),
    ]).then(([s, m, a, sv]) => {
      setStats(s)
      setCounts({
        medecins:   (m as any).meta?.total ?? 0,
        assurances: (a as any).meta?.total ?? 0,
        services:   (sv as any).data?.length ?? 0,
      })
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: '#9CA3AF', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
      Chargement…
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#0A1628', fontFamily: "'DM Sans', sans-serif" }}>
          Tableau de bord
        </h2>
        <p style={{ margin: 0, color: '#9CA3AF', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          Vue d'ensemble de la clinique ESMAD
        </p>
      </div>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 32 }}>
        <StatCard label="Médecins actifs"      value={counts.medecins}         icon="👨‍⚕️" color="#2563EB" bg="#EFF6FF" />
        <StatCard label="Assurances partenaires" value={counts.assurances}     icon="🛡️" color="#16A34A" bg="#F0FDF4" />
        <StatCard label="Services proposés"    value={counts.services}         icon="🏥" color="#D97706" bg="#FFFBEB" />
        <StatCard label="Messages reçus"       value={stats?.total ?? 0}       icon="✉️" color="#7C3AED" bg="#F5F3FF" />
        <StatCard label="Nouveaux messages"    value={stats?.nouveaux ?? 0}    icon="🔔" color="#DC2626" bg="#FEF2F2" trend={stats?.nouveaux ? `+${stats.nouveaux}` : undefined} />
        <StatCard label="Messages répondus"    value={stats?.repondus ?? 0}    icon="✅" color="#059669" bg="#ECFDF5" />
      </div>

      {/* Quick access */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E8EDF5', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
        <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 800, color: '#0A1628', fontFamily: "'DM Sans', sans-serif" }}>
          Accès rapide
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[
            { icon: '👨‍⚕️', label: 'Gérer les médecins',    desc: 'Ajouter, modifier, disponibilités', color: '#2563EB', bg: '#EFF6FF' },
            { icon: '🛡️', label: 'Gérer les assurances',  desc: 'Logos, partenaires actifs',           color: '#16A34A', bg: '#F0FDF4' },
            { icon: '✉️', label: 'Lire les messages',      desc: `${stats?.nouveaux ?? 0} non lus`,    color: '#7C3AED', bg: '#F5F3FF' },
            { icon: '🏥', label: 'Gérer les services',     desc: 'Prestations de la clinique',          color: '#D97706', bg: '#FFFBEB' },
          ].map(item => (
            <div key={item.label} style={{
              padding: '16px', borderRadius: 12,
              border: `1.5px solid ${item.bg}`, background: item.bg,
              cursor: 'default',
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}