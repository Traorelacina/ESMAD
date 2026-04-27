import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { servicesApi, type Service } from '@/api/client'
import {
  Btn, Modal, Input, ConfirmDialog, ColorPicker, ActiveDot,
  FileInput, Toggle, Spinner, EmptyState, T,
} from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import {
  Plus, Pencil, Trash2, Hospital, ToggleRight, ToggleLeft,
  RefreshCw, Stethoscope, Home, FlaskConical, Search as SearchIcon,
  Baby, Heart, ShieldCheck, Users, Clock, Activity, Thermometer,
  HeartPulse, Image,
} from 'lucide-react'

// Mapping des icônes Lucide
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Stethoscope, Home, FlaskConical, Search: SearchIcon, Baby, HeartPulse,
  Heart, Shield: ShieldCheck, Users, Clock, Activity, Thermometer,
}
const LUCIDE_ICONS = Object.keys(ICON_MAP)

interface FormState {
  title: string; icon_name: string; description: string
  color: string; bg_color: string; is_active: boolean; image: File | null
}

const emptyForm = (): FormState => ({
  title: '', icon_name: 'Stethoscope', description: '',
  color: '#2563EB', bg_color: '#EFF6FF', is_active: true, image: null,
})

function ServiceIcon({ name, size = 20, color }: { name: string; size?: number; color?: string }) {
  const Icon = ICON_MAP[name]
  return Icon ? <Icon size={size} color={color} /> : <Hospital size={size} color={color} />
}

export default function ServicesPage() {
  const [items, setItems]               = useState<Service[]>([])
  const [loading, setLoading]           = useState(true)
  const [modal, setModal]               = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing]           = useState<Service | null>(null)
  const [form, setForm]                 = useState<FormState>(emptyForm())
  const [saving, setSaving]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)
  const [deletingId, setDeletingId]     = useState<number | null>(null)
  const [togglingId, setTogglingId]     = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await servicesApi.list()
      setItems((res as any).data ?? res)
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm(f => ({ ...f, [k]: v }))

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({ title: s.title, icon_name: s.icon_name, description: s.description, color: s.color, bg_color: s.bg_color, is_active: s.is_active, image: null })
    setModal('edit')
  }

  const buildFD = () => {
    const fd = new FormData()
    fd.append('title', form.title.trim())
    fd.append('icon_name', form.icon_name)
    fd.append('description', form.description.trim())
    fd.append('color', form.color)
    fd.append('bg_color', form.bg_color)
    fd.append('is_active', form.is_active ? '1' : '0')
    if (form.image) fd.append('image', form.image)
    if (editing) fd.append('_method', 'PUT')
    return fd
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Le titre est obligatoire.'); return }
    if (!form.description.trim()) { toast.error('La description est obligatoire.'); return }
    setSaving(true)
    try {
      if (editing) {
        await servicesApi.update(editing.id, buildFD())
        toast.success('Service mis à jour.')
      } else {
        await servicesApi.create(buildFD())
        toast.success('Service créé.')
      }
      setModal(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (s: Service) => {
    setTogglingId(s.id)
    try {
      // Services API n'a pas de toggle natif, on update directement
      const fd = new FormData()
      fd.append('title', s.title)
      fd.append('icon_name', s.icon_name)
      fd.append('description', s.description)
      fd.append('is_active', s.is_active ? '0' : '1')
      fd.append('color', s.color)
      fd.append('bg_color', s.bg_color)
      fd.append('_method', 'PUT')
      await servicesApi.update(s.id, fd)
      toast.success(s.is_active ? 'Service désactivé.' : 'Service activé.')
      setItems(prev => prev.map(i => i.id === s.id ? { ...i, is_active: !i.is_active } : i))
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur.')
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeletingId(deleteTarget.id)
    try {
      await servicesApi.delete(deleteTarget.id)
      toast.success('Service supprimé.')
      setDeleteTarget(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: T.navy }}>Services médicaux</h2>
          <p style={{ margin: 0, color: T.gray400, fontSize: 13 }}>
            Prestations de la clinique ESMAD
            {!loading && <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 20, background: T.gray100, fontSize: 11, fontWeight: 700, color: T.gray500 }}>{items.length}</span>}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" size="sm" onClick={load} icon={<RefreshCw size={13} />}>Actualiser</Btn>
          <Btn onClick={() => { setForm(emptyForm()); setEditing(null); setModal('create') }} icon={<Plus size={15} />}>
            Nouveau service
          </Btn>
        </div>
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState icon={<Hospital size={28} />} title="Aucun service"
          description="Créez votre premier service médical."
          action={<Btn onClick={() => { setForm(emptyForm()); setEditing(null); setModal('create') }} icon={<Plus size={15} />}>Nouveau service</Btn>} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
          {items.map(s => (
            <div key={s.id} style={{
              background: T.white, borderRadius: 16, border: `1px solid ${T.border}`,
              overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)',
              display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)')}>
              {s.image ? (
                <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.4))' }} />
                </div>
              ) : (
                <div style={{ height: 80, background: s.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ServiceIcon name={s.icon_name} size={32} color={s.color} />
                </div>
              )}

              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {s.image ? (
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ServiceIcon name={s.icon_name} size={18} color={s.color} />
                    </div>
                  ) : null}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{s.title}</div>
                    <ActiveDot active={s.is_active} />
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, border: `2px solid ${s.bg_color}` }} />
                  </div>
                </div>

                <p style={{ margin: 0, fontSize: 12, color: T.gray500, lineHeight: 1.6, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {s.description}
                </p>
              </div>

              <div style={{ padding: '12px 16px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 8, background: T.gray50 }}>
                <Btn variant="secondary" size="sm" onClick={() => openEdit(s)} icon={<Pencil size={12} />}>Modifier</Btn>
                <Btn variant="ghost" size="sm" onClick={() => handleToggle(s)} disabled={togglingId === s.id}
                  icon={s.is_active ? <ToggleRight size={14} color={T.green} /> : <ToggleLeft size={14} />}>
                  {s.is_active ? 'Désactiver' : 'Activer'}
                </Btn>
                <div style={{ marginLeft: 'auto' }}>
                  <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(s)} icon={<Trash2 size={12} />} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal open={!!modal} onClose={() => !saving && setModal(null)} title={editing ? 'Modifier le service' : 'Nouveau service'} width={540}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input label="Titre du service" required value={form.title} onChange={v => set('title', v)} placeholder="ex: Consultation Médicale" />
          <Input label="Description" required value={form.description} onChange={v => set('description', v)} rows={3} placeholder="Description complète du service…" />

          {/* Icon picker */}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400, display: 'block', marginBottom: 8 }}>
              Icône du service
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {LUCIDE_ICONS.map(name => {
                const Icon = ICON_MAP[name]
                const selected = form.icon_name === name
                return (
                  <button key={name} onClick={() => set('icon_name', name)}
                    title={name}
                    style={{
                      width: 44, height: 44, borderRadius: 10, cursor: 'pointer',
                      border: selected ? `2px solid ${T.green}` : `1.5px solid ${T.border}`,
                      background: selected ? T.greenL : T.white,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: selected ? T.greenD : T.gray500, transition: 'all 0.12s',
                    }}>
                    <Icon size={18} />
                  </button>
                )
              })}
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 11, color: T.gray400 }}>
              Icône sélectionnée : <strong>{form.icon_name}</strong>
            </p>
          </div>

          <FileInput label="Image du service (optionnel)" onChange={f => set('image', f)} accept="image/*"
            hint="JPG, PNG, WEBP — max 3 Mo. Affichée en en-tête de la carte."
            preview={editing?.image ?? undefined} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ColorPicker label="Couleur principale" value={form.color} onChange={v => set('color', v)} />
            <ColorPicker label="Couleur de fond" value={form.bg_color} onChange={v => set('bg_color', v)} />
          </div>

          {/* Preview */}
          <div style={{ background: T.gray50, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: form.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ServiceIcon name={form.icon_name} size={22} color={form.color} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{form.title || 'Nom du service'}</div>
              <div style={{ fontSize: 11, color: T.gray400 }}>Aperçu</div>
            </div>
          </div>

          <Toggle checked={form.is_active} onChange={v => set('is_active', v)} label="Service actif (visible sur le site)" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
            <Btn variant="secondary" onClick={() => setModal(null)} disabled={saving}>Annuler</Btn>
            <Btn onClick={handleSave} disabled={saving}>
              {saving ? 'Enregistrement…' : editing ? 'Mettre à jour' : 'Créer le service'}
            </Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget} onClose={() => !deletingId && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Supprimer le service"
        message={`Supprimer le service "${deleteTarget?.title}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer" danger loading={!!deletingId}
      />
    </div>
  )
}