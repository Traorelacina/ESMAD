// src/pages/admin/ServicesPage.tsx
import { useEffect, useState } from 'react'
import { servicesApi, type Service } from '@/api/client'
import { Table, Tr, Td, Btn, Modal, Input, ConfirmDialog, ColorPicker, ActiveDot } from '@/components/ui'
import { useToast } from '@/hooks/useToast'

const LUCIDE_ICONS = [
  'Stethoscope','Home','FlaskConical','Search','Baby','HeartPulse',
  'Heart','Shield','Users','Clock','Activity','Thermometer',
]

interface FormState {
  title: string; icon_name: string; description: string
  color: string; bg_color: string; is_active: boolean; image: File | null
}
const empty = (): FormState => ({
  title: '', icon_name: 'Stethoscope', description: '',
  color: '#2563EB', bg_color: '#EFF6FF', is_active: true, image: null,
})

export default function ServicesPage({ toast }: { toast: ReturnType<typeof useToast> }) {
  const [items, setItems]     = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal]     = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm]       = useState<FormState>(empty())
  const [saving, setSaving]   = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await servicesApi.list()
    setItems((res as any).data ?? res)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const set = (k: keyof FormState, v: any) => setForm(f => ({ ...f, [k]: v }))

  const openEdit = (s: Service) => {
    setEditing(s)
    setForm({ title: s.title, icon_name: s.icon_name, description: s.description, color: s.color, bg_color: s.bg_color, is_active: s.is_active, image: null })
    setModal('edit')
  }

  const buildFD = () => {
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('icon_name', form.icon_name)
    fd.append('description', form.description)
    fd.append('color', form.color)
    fd.append('bg_color', form.bg_color)
    fd.append('is_active', form.is_active ? '1' : '0')
    if (form.image) fd.append('image', form.image)
    if (editing) fd.append('_method', 'PUT')
    return fd
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) { toast.error('Titre et description obligatoires.'); return }
    setSaving(true)
    try {
      editing ? await servicesApi.update(editing.id, buildFD()) : await servicesApi.create(buildFD())
      toast.success(editing ? 'Service mis à jour.' : 'Service créé.')
      setModal(null); load()
    } catch (e: any) { toast.error(e.message) } finally { setSaving(false) }
  }

  const handleDelete = async (s: Service) => {
    await servicesApi.delete(s.id)
    toast.success('Service supprimé.')
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: '0 0 3px', fontSize: 20, fontWeight: 800, color: '#0A1628', fontFamily: "'DM Sans', sans-serif" }}>Services</h2>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Prestations médicales de la clinique ESMAD</p>
        </div>
        <Btn onClick={() => { setForm(empty()); setEditing(null); setModal('create') }}>+ Nouveau service</Btn>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>Chargement…</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {items.map(s => (
            <div key={s.id} style={{
              background: '#fff', borderRadius: 16, border: '1px solid #E8EDF5',
              overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)',
            }}>
              {s.image && (
                <div style={{ height: 140, overflow: 'hidden' }}>
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                    🏥
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A1628', fontFamily: "'DM Sans', sans-serif" }}>{s.title}</div>
                    <ActiveDot active={s.is_active} />
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: '0 0 14px', fontFamily: "'DM Sans', sans-serif", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {s.description}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="secondary" size="sm" onClick={() => openEdit(s)}>✏️ Modifier</Btn>
                  <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(s)}>🗑</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={editing ? 'Modifier le service' : 'Nouveau service'} width={520}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Titre du service" required value={form.title} onChange={v => set('title', v)} placeholder="ex: Consultation Médicale" />
          <Input label="Description" required value={form.description} onChange={v => set('description', v)} rows={3} placeholder="Description du service…" />

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>
              Icône Lucide
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {LUCIDE_ICONS.map(icon => (
                <button key={icon} onClick={() => set('icon_name', icon)} style={{
                  padding: '5px 10px', borderRadius: 8, fontSize: 12,
                  border: form.icon_name === icon ? '2px solid #7CB342' : '1.5px solid #E2E8F0',
                  background: form.icon_name === icon ? '#F1F8E9' : '#fff',
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                  color: form.icon_name === icon ? '#558B2F' : '#374151',
                }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>
              Image du service
            </label>
            <input type="file" accept="image/*" onChange={e => set('image', e.target.files?.[0] ?? null)} style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#374151' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ColorPicker label="Couleur" value={form.color} onChange={v => set('color', v)} />
            <ColorPicker label="Fond" value={form.bg_color} onChange={v => set('bg_color', v)} />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: '#374151' }}>
            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
            Service actif (visible sur le site)
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4, borderTop: '1px solid #F1F5F9' }}>
            <Btn variant="secondary" onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={handleSave} disabled={saving}>{saving ? 'Enregistrement…' : '💾 Enregistrer'}</Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Supprimer le service" message={`Supprimer "${deleteTarget?.title}" ?`} confirmLabel="Supprimer" danger />
    </div>
  )
}