import { useState, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Avatar, T } from '@/components/ui'
import {
  LayoutDashboard, Stethoscope, Shield, Hospital, HeartPulse,
  MessageSquare, Users, Menu, LogOut, ChevronLeft, Bell,
} from 'lucide-react'

const NAV = [
  { key: 'dashboard',   label: 'Tableau de bord', icon: LayoutDashboard },
  { key: 'medecins',    label: 'Médecins',         icon: Stethoscope },
  { key: 'assurances',  label: 'Assurances',       icon: Shield },
  { key: 'services',    label: 'Services',         icon: Hospital },
  { key: 'specialites', label: 'Spécialités',      icon: HeartPulse },
  { key: 'contacts',    label: 'Messages',         icon: MessageSquare },
  { key: 'admins',      label: 'Admins',           icon: Users, superOnly: true },
]

interface AdminLayoutProps {
  children: ReactNode
  page: string
  onNavigate: (page: string) => void
  unreadContacts?: number
}

export default function AdminLayout({ children, page, onNavigate, unreadContacts = 0 }: AdminLayoutProps) {
  const { admin, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)

  const navItems = NAV.filter(n => !n.superOnly || admin?.role === 'super_admin')
  const W = collapsed ? 68 : 252

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F4FA', fontFamily: T.font }}>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside style={{
        width: W, background: T.navy, display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        transition: 'width 0.22s cubic-bezier(.4,0,.2,1)', overflow: 'hidden',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: collapsed ? '20px 16px' : '20px 20px', height: 64, borderBottom: '1px solid rgba(255,255,255,.07)', flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #7CB342, #4CAF50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: T.white, letterSpacing: '-0.02em',
            boxShadow: '0 4px 14px rgba(124,179,66,.35)',
          }}>E</div>
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: T.white, fontWeight: 800, fontSize: 14, lineHeight: 1.1, whiteSpace: 'nowrap' }}>ESMAD</div>
              <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 9, letterSpacing: '0.15em', fontWeight: 600 }}>ADMINISTRATION</div>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto', overflowX: 'hidden' }}>
          {navItems.map(item => {
            const active = page === item.key
            const Icon = item.icon
            const badge = item.key === 'contacts' && unreadContacts > 0
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                title={collapsed ? item.label : undefined}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: 12, padding: collapsed ? '11px 0' : '11px 18px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: active ? 'rgba(124,179,66,.15)' : 'transparent',
                  border: 'none', borderLeft: active ? `3px solid ${T.green}` : '3px solid transparent',
                  cursor: 'pointer', color: active ? '#A5D631' : 'rgba(255,255,255,.5)',
                  transition: 'all 0.15s ease', position: 'relative',
                }}
                onMouseEnter={e => !active && (e.currentTarget.style.color = 'rgba(255,255,255,.8)')}
                onMouseLeave={e => !active && (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: 'nowrap', flex: 1, textAlign: 'left' }}>
                    {item.label}
                  </span>
                )}
                {badge && !collapsed && (
                  <span style={{ background: '#EF4444', color: T.white, borderRadius: 10, fontSize: 10, fontWeight: 800, padding: '1px 7px', marginLeft: 'auto' }}>
                    {unreadContacts}
                  </span>
                )}
                {badge && collapsed && (
                  <span style={{ position: 'absolute', top: 8, right: 14, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: `2px solid ${T.navy}` }} />
                )}
              </button>
            )
          })}
        </nav>

        {/* Admin profile */}
        {admin && (
          <div style={{ padding: collapsed ? '14px 0' : '14px 16px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
            <Avatar src={admin.avatar} initials={admin.name.slice(0, 2)} size={32} />
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.white, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin.name}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', textTransform: 'capitalize' }}>{admin.role.replace('_', ' ')}</div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, marginLeft: W, transition: 'margin-left 0.22s cubic-bezier(.4,0,.2,1)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Topbar */}
        <header style={{
          height: 64, background: T.white, borderBottom: `1px solid ${T.border}`,
          display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14,
          position: 'sticky', top: 0, zIndex: 50,
          boxShadow: '0 1px 0 rgba(0,0,0,.06)',
        }}>
          <button onClick={() => setCollapsed(c => !c)}
            style={{ width: 36, height: 36, borderRadius: 9, border: `1.5px solid ${T.border}`, background: T.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gray500, flexShrink: 0 }}>
            {collapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
          </button>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: T.navy }}>
              {NAV.find(n => n.key === page)?.label ?? 'Dashboard'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {unreadContacts > 0 && (
              <button onClick={() => onNavigate('contacts')}
                style={{ width: 36, height: 36, borderRadius: 9, border: `1.5px solid ${T.border}`, background: T.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gray500, position: 'relative' }}>
                <Bell size={16} />
                <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: `2px solid ${T.white}` }} />
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 10, background: T.gray50, border: `1px solid ${T.border}` }}>
              <Avatar src={admin?.avatar} initials={(admin?.name ?? 'U').slice(0, 2)} size={24} />
              <span style={{ fontSize: 13, color: T.gray700, fontWeight: 600 }}>{admin?.name}</span>
            </div>
            <button onClick={() => setConfirmLogout(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, height: 36, padding: '0 14px', borderRadius: 9, border: `1.5px solid #FECACA`, background: T.redL, color: T.red, cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: T.font }}>
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 28 }}>
          {children}
        </main>
      </div>

      {/* Confirm logout */}
      {confirmLogout && (
        <div onClick={() => setConfirmLogout(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,.55)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: T.white, borderRadius: 18, padding: 28, width: 380, boxShadow: '0 24px 64px rgba(0,0,0,.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: T.redL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogOut size={20} color={T.red} />
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: T.navy }}>Se déconnecter ?</h3>
            </div>
            <p style={{ margin: '0 0 22px', color: T.gray500, fontSize: 14, lineHeight: 1.6 }}>Votre session sera fermée et vous serez redirigé vers la page de connexion.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmLogout(false)} style={{ padding: '9px 18px', borderRadius: 9, border: `1.5px solid ${T.border}`, background: T.white, cursor: 'pointer', fontFamily: T.font, fontWeight: 600, fontSize: 13, color: T.gray700 }}>
                Annuler
              </button>
              <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 9, border: 'none', background: T.red, color: T.white, cursor: 'pointer', fontFamily: T.font, fontWeight: 700, fontSize: 13 }}>
                <LogOut size={14} /> Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}