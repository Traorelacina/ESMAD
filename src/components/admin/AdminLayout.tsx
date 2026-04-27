// src/components/admin/AdminLayout.tsx
import { useState, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar } from '@/components/ui'
import {
  LayoutDashboard,
  Users,
  Shield,
  Building2,
  Stethoscope,
  Mail,
  UserCog,
  Menu,
  LogOut,
  X
} from 'lucide-react'

const NAV = [
  { key: 'dashboard',   label: 'Tableau de bord', icon: LayoutDashboard },
  { key: 'medecins',    label: 'Médecins',         icon: Users },
  { key: 'assurances',  label: 'Assurances',       icon: Shield },
  { key: 'services',    label: 'Services',         icon: Building2 },
  { key: 'specialites', label: 'Spécialités',      icon: Stethoscope },
  { key: 'contacts',    label: 'Messages',         icon: Mail },
  { key: 'admins',      label: 'Admins',           icon: UserCog, superOnly: true },
]

interface AdminLayoutProps {
  children: ReactNode
  page: string
  onNavigate: (page: string) => void
  unreadContacts?: number
}

export default function AdminLayout({ children, page, onNavigate, unreadContacts = 0 }: AdminLayoutProps) {
  const { admin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [confirmLogout, setConfirmLogout] = useState(false)

  const navItems = NAV.filter(n => !n.superOnly || admin?.role === 'super_admin')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F4F9' }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside style={{
        width: sidebarOpen ? 250 : 70,
        background: '#0A1628',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 100,
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: '22px 20px 18px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', gap: 12,
          minHeight: 70,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg,#7CB342,#4CAF50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: '#fff',
            fontFamily: "'Space Mono', monospace",
            boxShadow: '0 4px 12px rgba(124,179,66,.4)',
          }}>
            E
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: "'DM Sans', system-ui, sans-serif", lineHeight: 1.1 }}>ESMAD</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10, fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: '0.1em' }}>ADMIN</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 0', overflowY: 'auto' }}>
          {navItems.map(item => {
            const active = page === item.key
            const badge  = item.key === 'contacts' && unreadContacts > 0
            const Icon = item.icon
            
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                title={!sidebarOpen ? item.label : undefined}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: sidebarOpen ? '11px 20px' : '11px 0',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  background: active ? 'rgba(124,179,66,.18)' : 'transparent',
                  border: 'none',
                  borderLeft: active ? '3px solid #7CB342' : '3px solid transparent',
                  cursor: 'pointer',
                  color: active ? '#A5D631' : 'rgba(255,255,255,.55)',
                  transition: 'all 0.18s ease',
                  position: 'relative',
                }}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && (
                  <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, fontFamily: "'DM Sans', system-ui, sans-serif", whiteSpace: 'nowrap' }}>
                    {item.label}
                  </span>
                )}
                {badge && sidebarOpen && (
                  <span style={{
                    marginLeft: 'auto', background: '#EF4444', color: '#fff',
                    borderRadius: 10, fontSize: 10, fontWeight: 700,
                    padding: '1px 7px', fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {unreadContacts}
                  </span>
                )}
                {badge && !sidebarOpen && (
                  <span style={{
                    position: 'absolute', top: 7, right: 12,
                    width: 8, height: 8, borderRadius: '50%', background: '#EF4444',
                  }} />
                )}
              </button>
            )
          })}
        </nav>

        {/* Admin profile mini */}
        {admin && (
          <div style={{
            padding: '14px 16px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Avatar src={admin.avatar} initials={admin.name.slice(0, 2).toUpperCase()} size={34} />
            {sidebarOpen && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {admin.name}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textTransform: 'capitalize', fontFamily: "'DM Sans', sans-serif" }}>
                  {admin.role.replace('_', ' ')}
                </div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? 250 : 70, transition: 'margin-left 0.25s ease', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Topbar */}
        <header style={{
          height: 64,
          background: '#fff',
          borderBottom: '1px solid #E8EDF5',
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: 16,
          position: 'sticky', top: 0, zIndex: 50,
          boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              background: '#F1F5F9', border: 'none', borderRadius: 8,
              width: 36, height: 36, cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6B7280', flexShrink: 0,
            }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              {NAV.find(n => n.key === page)?.label ?? 'Dashboard'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>
              {admin?.name}
            </span>
            <button
              onClick={() => setConfirmLogout(true)}
              style={{
                background: '#FEF2F2', border: '1.5px solid #FECACA',
                color: '#DC2626', borderRadius: 8,
                padding: '7px 14px', cursor: 'pointer',
                fontSize: 12, fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '28px', animation: 'fadeIn 0.3s ease' }}>
          {children}
        </main>
      </div>

      {/* Confirm logout modal */}
      {confirmLogout && (
        <div onClick={() => setConfirmLogout(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, padding: 28, width: 360, boxShadow: '0 20px 50px rgba(0,0,0,.15)' }}>
            <h3 style={{ margin: '0 0 10px', fontFamily: "'DM Sans', sans-serif", color: '#0A1628' }}>Se déconnecter ?</h3>
            <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 22px', fontFamily: "'DM Sans', sans-serif" }}>Votre session sera fermée.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmLogout(false)} style={{ padding: '9px 18px', borderRadius: 9, border: '1.5px solid #E2E8F0', background: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: '#374151' }}>
                Annuler
              </button>
              <button onClick={logout} style={{ padding: '9px 18px', borderRadius: 9, border: 'none', background: '#DC2626', color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <LogOut size={14} />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}