import React, { useState, useRef, useEffect, ReactNode } from 'react'
import {
  Search, ChevronLeft, ChevronRight, X, Check, AlertTriangle,
  Eye, EyeOff, ChevronDown, Loader2,
} from 'lucide-react'

// ── Design tokens ────────────────────────────────────────────────────────────
const T = {
  navy:    '#0A1628',
  navyL:   '#1A2842',
  green:   '#7CB342',
  greenD:  '#558B2F',
  greenL:  '#F1F8E9',
  blue:    '#2563EB',
  blueL:   '#EFF6FF',
  red:     '#DC2626',
  redL:    '#FEF2F2',
  amber:   '#D97706',
  amberL:  '#FFFBEB',
  purple:  '#7C3AED',
  purpleL: '#F5F3FF',
  gray50:  '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray400: '#94A3B8',
  gray500: '#64748B',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1E293B',
  white:   '#FFFFFF',
  border:  '#E8EDF5',
  font:    "'DM Sans', system-ui, -apple-system, sans-serif",
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
}

// ── Avatar ────────────────────────────────────────────────────────────────────
interface AvatarProps {
  src?: string | null
  initials?: string
  size?: number
  color?: string
  bg?: string
}
export function Avatar({ src, initials = '?', size = 36, color = T.blue, bg = T.blueL }: AvatarProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, flexShrink: 0, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `2px solid ${T.white}`,
      boxShadow: `0 0 0 1px ${T.border}`,
    }}>
      {src
        ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ fontSize: size * 0.35, fontWeight: 700, color, fontFamily: T.font, lineHeight: 1 }}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
      }
    </div>
  )
}

// ── Btn ───────────────────────────────────────────────────────────────────────
interface BtnProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit'
  icon?: ReactNode
  fullWidth?: boolean
}
export function Btn({ children, onClick, variant = 'primary', size = 'md', disabled, type = 'button', icon, fullWidth }: BtnProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: T.green, color: T.white, border: 'none', boxShadow: `0 2px 8px ${T.green}44` },
    secondary: { background: T.gray100, color: T.gray700, border: `1.5px solid ${T.border}` },
    danger: { background: T.redL, color: T.red, border: `1.5px solid #FECACA` },
    ghost: { background: 'transparent', color: T.gray500, border: 'none' },
  }
  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 12, borderRadius: 8, gap: 5 },
    md: { padding: '9px 18px', fontSize: 13, borderRadius: 10, gap: 7 },
    lg: { padding: '12px 24px', fontSize: 14, borderRadius: 12, gap: 8 },
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: T.font, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1, transition: 'all 0.15s ease',
        width: fullWidth ? '100%' : undefined,
        ...styles[variant], ...sizes[size],
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  )
}

// ── Input ─────────────────────────────────────────────────────────────────────
interface InputProps {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  type?: string
  rows?: number
  error?: string
  hint?: string
  icon?: ReactNode
  disabled?: boolean
}
export function Input({ label, value, onChange, placeholder, required, type = 'text', rows, error, hint, icon, disabled }: InputProps) {
  const [focused, setFocused] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const baseStyle: React.CSSProperties = {
    width: '100%', fontFamily: T.font, fontSize: 14, color: T.gray800,
    background: disabled ? T.gray50 : T.white,
    border: `1.5px solid ${error ? T.red : focused ? T.green : T.border}`,
    borderRadius: 10, outline: 'none', transition: 'border-color 0.15s ease',
    boxSizing: 'border-box', resize: rows ? 'vertical' : undefined,
  }
  const inputStyle: React.CSSProperties = {
    ...baseStyle,
    padding: icon ? '10px 12px 10px 38px' : '10px 14px',
    paddingRight: type === 'password' ? 40 : 14,
    height: rows ? undefined : 42,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray500, fontFamily: T.font }}>
          {label}{required && <span style={{ color: T.red, marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.gray400, display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}
        {rows ? (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...inputStyle, padding: '10px 14px', height: undefined }}
          />
        ) : (
          <input
            type={type === 'password' ? (showPw ? 'text' : 'password') : type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={inputStyle}
          />
        )}
        {type === 'password' && (
          <button type="button" onClick={() => setShowPw(s => !s)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.gray400, padding: 0, display: 'flex' }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <span style={{ fontSize: 12, color: T.red, fontFamily: T.font }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: T.gray400, fontFamily: T.font }}>{hint}</span>}
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────────────────
interface SelectProps {
  label?: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  required?: boolean
  error?: string
}
export function Select({ label, value, onChange, options, required, error }: SelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray500, fontFamily: T.font }}>
          {label}{required && <span style={{ color: T.red, marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', height: 42, padding: '0 36px 0 14px', fontFamily: T.font,
            fontSize: 14, color: T.gray800, background: T.white,
            border: `1.5px solid ${error ? T.red : T.border}`, borderRadius: 10,
            outline: 'none', cursor: 'pointer', appearance: 'none',
          }}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: T.gray400, pointerEvents: 'none' }} />
      </div>
      {error && <span style={{ fontSize: 12, color: T.red, fontFamily: T.font }}>{error}</span>}
    </div>
  )
}

// ── SearchBar ─────────────────────────────────────────────────────────────────
interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}
export function SearchBar({ value, onChange, placeholder = 'Rechercher…' }: SearchBarProps) {
  return (
    <div style={{ position: 'relative' }}>
      <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.gray400 }} />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', height: 40, padding: '0 36px 0 38px', fontFamily: T.font,
          fontSize: 13, color: T.gray700, background: T.white,
          border: `1.5px solid ${T.border}`, borderRadius: 10, outline: 'none',
          boxSizing: 'border-box', transition: 'border-color 0.15s',
        }}
      />
      {value && (
        <button onClick={() => onChange('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: T.gray400, padding: 2, display: 'flex' }}>
          <X size={14} />
        </button>
      )}
    </div>
  )
}

// ── ColorPicker ───────────────────────────────────────────────────────────────
interface ColorPickerProps {
  label?: string
  value: string
  onChange: (v: string) => void
}
export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray500, fontFamily: T.font }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1.5px solid ${T.border}`, borderRadius: 10, padding: '6px 12px', background: T.white, cursor: 'pointer' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flex: 1 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: value, border: `2px solid ${T.border}`, flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontFamily: T.mono, color: T.gray700, letterSpacing: '0.04em' }}>{value}</span>
          <input type="color" value={value} onChange={e => onChange(e.target.value)} style={{ width: 0, height: 0, opacity: 0, position: 'absolute' }} />
        </label>
      </div>
    </div>
  )
}

// ── ActiveDot ─────────────────────────────────────────────────────────────────
export function ActiveDot({ active }: { active: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: T.font, fontWeight: 600, color: active ? '#166534' : T.gray500 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? '#22C55E' : T.gray300, display: 'inline-block' }} />
      {active ? 'Actif' : 'Inactif'}
    </span>
  )
}

// ── StatusBadge ───────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  nouveau:  { label: 'Nouveau',  color: '#1E40AF', bg: '#DBEAFE' },
  lu:       { label: 'Lu',       color: T.gray600, bg: T.gray100 },
  repondu:  { label: 'Répondu',  color: '#166534', bg: '#DCFCE7' },
  archive:  { label: 'Archivé',  color: T.gray400, bg: T.gray50  },
}
export function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: T.gray500, bg: T.gray100 }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: T.font, background: cfg.bg, color: cfg.color, letterSpacing: '0.03em' }}>
      {status === 'nouveau' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />}
      {cfg.label}
    </span>
  )
}

// ── Table ─────────────────────────────────────────────────────────────────────
interface TableProps {
  headers: string[]
  children: ReactNode
  empty?: string
}
export function Table({ headers, children, empty = 'Aucun résultat.' }: TableProps) {
  return (
    <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: T.gray50, borderBottom: `1px solid ${T.border}` }}>
            {headers.map(h => (
              <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray500, fontFamily: T.font, whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {React.Children.count(children) === 0
            ? <tr><td colSpan={headers.length} style={{ textAlign: 'center', padding: '40px 16px', color: T.gray400, fontSize: 13, fontFamily: T.font }}>{empty}</td></tr>
            : children
          }
        </tbody>
      </table>
    </div>
  )
}

export function Tr({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr onClick={onClick} style={{ borderBottom: `1px solid ${T.border}`, cursor: onClick ? 'pointer' : undefined, transition: 'background 0.12s' }}
      onMouseEnter={e => onClick && ((e.currentTarget as HTMLElement).style.background = T.gray50)}
      onMouseLeave={e => onClick && ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
      {children}
    </tr>
  )
}

export function Td({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <td style={{ padding: '13px 16px', fontSize: 13, color: muted ? T.gray400 : T.gray700, fontFamily: T.font, verticalAlign: 'middle' }}>
      {children}
    </td>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  width?: number
}
export function Modal({ open, onClose, title, children, width = 480 }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,.6)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(2px)' }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.white, borderRadius: 18, width: '100%', maxWidth: width,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 64px rgba(0,0,0,.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: T.navy, fontFamily: T.font }}>{title}</h3>
          <button onClick={onClose} style={{ background: T.gray100, border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gray500 }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── ConfirmDialog ─────────────────────────────────────────────────────────────
interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  loading?: boolean
}
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirmer', danger, loading }: ConfirmDialogProps) {
  if (!open) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(2px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.white, borderRadius: 18, padding: 28, width: '100%', maxWidth: 380, boxShadow: '0 24px 64px rgba(0,0,0,.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: danger ? T.redL : T.amberL, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={20} color={danger ? T.red : T.amber} />
          </div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: T.navy, fontFamily: T.font }}>{title}</h3>
        </div>
        <p style={{ margin: '0 0 22px', color: T.gray600, fontSize: 14, lineHeight: 1.6, fontFamily: T.font }}>{message}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn variant="secondary" onClick={onClose} disabled={loading}>Annuler</Btn>
          <Btn variant={danger ? 'danger' : 'primary'} onClick={onConfirm} disabled={loading}
            icon={loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : undefined}>
            {loading ? 'Suppression…' : confirmLabel}
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────
interface PaginationProps {
  page: number
  lastPage: number
  onChange: (p: number) => void
  total?: number
}
export function Pagination({ page, lastPage, onChange, total }: PaginationProps) {
  if (lastPage <= 1) return null
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2 || p === 1 || p === lastPage)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
      {total != null && <span style={{ fontSize: 12, color: T.gray400, fontFamily: T.font }}>{total} résultats</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
        <button onClick={() => onChange(page - 1)} disabled={page === 1}
          style={{ width: 34, height: 34, borderRadius: 9, border: `1.5px solid ${T.border}`, background: T.white, cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gray600 }}>
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) => {
          const prev = pages[i - 1]
          return (
            <React.Fragment key={p}>
              {prev && p - prev > 1 && <span style={{ color: T.gray400, fontSize: 13 }}>…</span>}
              <button onClick={() => onChange(p)}
                style={{ width: 34, height: 34, borderRadius: 9, border: `1.5px solid ${p === page ? T.green : T.border}`, background: p === page ? T.green : T.white, color: p === page ? T.white : T.gray600, fontWeight: p === page ? 700 : 500, fontSize: 13, fontFamily: T.font, cursor: 'pointer' }}>
                {p}
              </button>
            </React.Fragment>
          )
        })}
        <button onClick={() => onChange(page + 1)} disabled={page === lastPage}
          style={{ width: 34, height: 34, borderRadius: 9, border: `1.5px solid ${T.border}`, background: T.white, cursor: page === lastPage ? 'not-allowed' : 'pointer', opacity: page === lastPage ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gray600 }}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: number | string
  icon: ReactNode
  color: string
  bg: string
  trend?: string
  loading?: boolean
}
export function StatCard({ label, value, icon, color, bg, trend, loading }: StatCardProps) {
  return (
    <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: '20px 22px', boxShadow: '0 2px 8px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          {icon}
        </div>
        {trend && (
          <span style={{ fontSize: 11, fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '3px 8px', borderRadius: 20, fontFamily: T.font }}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: loading ? 20 : 28, fontWeight: 800, color: T.navy, fontFamily: T.font, lineHeight: 1 }}>
          {loading ? '—' : value}
        </div>
        <div style={{ fontSize: 12, color: T.gray500, fontFamily: T.font, marginTop: 4, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  )
}

// ── FileInput ─────────────────────────────────────────────────────────────────
interface FileInputProps {
  label?: string
  onChange: (f: File | null) => void
  accept?: string
  hint?: string
  preview?: string | null
}
export function FileInput({ label, onChange, accept = 'image/*', hint, preview }: FileInputProps) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray500, fontFamily: T.font }}>{label}</label>}
      <div onClick={() => ref.current?.click()} style={{ border: `2px dashed ${T.border}`, borderRadius: 12, padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, background: T.gray50, transition: 'border-color 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = T.green)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
        {preview && <img src={preview} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover', border: `1px solid ${T.border}` }} />}
        <div>
          <div style={{ fontSize: 13, color: T.gray600, fontFamily: T.font, fontWeight: 600 }}>Choisir un fichier</div>
          {hint && <div style={{ fontSize: 11, color: T.gray400, fontFamily: T.font, marginTop: 2 }}>{hint}</div>}
        </div>
        <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} onChange={e => onChange(e.target.files?.[0] ?? null)} />
      </div>
    </div>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}
export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <div onClick={() => onChange(!checked)} style={{ width: 42, height: 24, borderRadius: 12, background: checked ? T.green : T.gray300, position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 3, left: checked ? 21 : 3, width: 18, height: 18, borderRadius: '50%', background: T.white, boxShadow: '0 1px 4px rgba(0,0,0,.2)', transition: 'left 0.2s' }} />
      </div>
      {label && <span style={{ fontSize: 14, color: T.gray700, fontFamily: T.font, userSelect: 'none' }}>{label}</span>}
    </label>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────────
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
      <Loader2 size={size} color={T.green} style={{ animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px', gap: 16 }}>
      <div style={{ width: 60, height: 60, borderRadius: 16, background: T.gray100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.gray400 }}>{icon}</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, fontFamily: T.font }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: T.gray400, fontFamily: T.font, marginTop: 4 }}>{description}</div>}
      </div>
      {action}
    </div>
  )
}

export { T }