import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { specialitesApi, type Specialite } from '@/api/client'
import {
  Table, Tr, Td, Btn, Modal, Input, ConfirmDialog,
  ColorPicker, Toggle, Spinner, EmptyState, T,
} from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import { Plus, Pencil, Trash2, HeartPulse, RefreshCw, Users } from 'lucide-react'

interface FormState {
  name: string; key: string; description: string
  color: string; bg_color: string; is_active: boolean
}

const emptyForm = (): FormState => ({
  name: '', key: '', description: '',
  color: '#2563EB', bg_color: '#EFF6FF', is_active: true,
})

const slugify = (str: string) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

export default function SpecialitesPage() {
  const [items, setItems]               = useState<Specialite[]>([])
  const [loading, setLoading]           = useState(true)
  const [modal, setModal]               = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing]           = useState<Specialite | null>(null)
  const [form, setForm]                 = useState<FormState>(emptyForm())
  const [saving, setSaving]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Specialite | null>(null)
  const [deletingId, setDeletingId]     = useState<number | null>(null)
  const [keyAutoSet, setKeyAutoSet]     = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await specialitesApi.list()
      setItems(res.data)
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => {
    setForm(emptyForm())
    setEditing(null)
    setKeyAutoSet(true)
    setModal('create')
  }

  const openEdit = (s: Specialite) => {
    setEditing(s)
    setKeyAutoSet(false)
    setForm({ name: s.name, key: s.key, description: '', color: s.color, bg_color: s.bg_color, is_active: s.is_active })
    setModal('edit')
  }

  const handleNameChange = (v: string) => {
    set('name', v)
    if (keyAutoSet && !editing) set('key', slugify(v))
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Le nom est obligatoire.'); return }
    setSaving(true)
    try {
      const payload: Partial<Specialite> = {
        name: form.name.trim(),
        key: form.key || slugify(form.name),
        color: form.color,
        bg_color: form.bg_color,
        is_active: form.is_active,
      }
      if (form.description) (payload as any).description = form.description
      if (editing) {
        await specialitesApi.update(editing.id, payload)
        toast.success('Spécialité mise à jour.')
      } else {
        await specialitesApi.create(payload)
        toast.success('Spécialité créée.')
      }
      setModal(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeletingId(deleteTarget.id)
    try {
      await specialitesApi.delete(deleteTarget.id)
      toast.success('Spécialité supprimée.')
      setDeleteTarget(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Impossible de supprimer : des médecins sont peut-être rattachés à cette spécialité.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: T.navy }}>Spécialités médicales</h2>
          <p style={{ margin: 0, color: T.gray400, fontSize: 13 }}>
            Catégories médicales utilisées pour filtrer les médecins
            {!loading && <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 20, background: T.gray100, fontSize: 11, fontWeight: 700, color: T.gray500 }}>{items.length}</span>}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" size="sm" onClick={load} icon={<RefreshCw size={13} />}>Actualiser</Btn>
          <Btn onClick={openCreate} icon={<Plus size={15} />}>Nouvelle spécialité</Btn>
        </div>
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState icon={<HeartPulse size={28} />} title="Aucune spécialité"
          description="Créez votre première spécialité médicale."
          action={<Btn onClick={openCreate} icon={<Plus size={15} />}>Nouvelle spécialité</Btn>} />
      ) : (
        <Table headers={['Spécialité', 'Clé', 'Médecins', 'Statut', 'Actions']} empty="Aucune spécialité.">
          {items.map(s => (
            <Tr key={s.id}>
              <Td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HeartPulse size={18} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{s.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                      <span style={{ fontSize: 10, color: T.gray400 }}>{s.color}</span>
                    </div>
                  </div>
                </div>
              </Td>
              <Td>
                <code style={{ fontSize: 12, background: T.gray100, padding: '3px 8px', borderRadius: 6, color: T.gray600, fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.key}
                </code>
              </Td>
              <Td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Users size={13} color={T.gray400} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: s.medecins_count ? T.navy : T.gray300 }}>
                    {s.medecins_count ?? 0}
                  </span>
                </div>
              </Td>
              <Td>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: s.is_active ? '#166534' : T.gray400 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.is_active ? '#22C55E' : T.gray300, display: 'inline-block' }} />
                  {s.is_active ? 'Active' : 'Inactive'}
                </span>
              </Td>
              <Td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="secondary" size="sm" onClick={() => openEdit(s)} icon={<Pencil size={12} />}>Modifier</Btn>
                  <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(s)} icon={<Trash2 size={12} />}
                    disabled={!!(s.medecins_count && s.medecins_count > 0)} />
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      )}

      {/* Create/Edit Modal */}
      <Modal open={!!modal} onClose={() => !saving && setModal(null)} title={editing ? 'Modifier la spécialité' : 'Nouvelle spécialité'} width={480}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Nom de la spécialité" required value={form.name} onChange={handleNameChange} placeholder="ex: Médecine Générale" />

          <div>
            <Input label="Clé (identifiant court)" value={form.key} onChange={v => { set('key', slugify(v)); setKeyAutoSet(false) }}
              placeholder="ex: general" disabled={!!editing}
              hint={editing ? 'La clé ne peut pas être modifiée après création.' : 'Généré automatiquement depuis le nom. Utilisé pour les filtres.'} />
          </div>

          <Input label="Description (optionnel)" value={form.description} onChange={v => set('description', v)} rows={2} placeholder="Brève description de la spécialité…" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ColorPicker label="Couleur du badge" value={form.color} onChange={v => set('color', v)} />
            <ColorPicker label="Fond du badge" value={form.bg_color} onChange={v => set('bg_color', v)} />
          </div>

          {/* Preview badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: T.gray400, fontWeight: 600 }}>Aperçu :</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: form.bg_color, color: form.color, fontSize: 13, fontWeight: 600 }}>
              <HeartPulse size={14} color={form.color} />
              {form.name || 'Spécialité'}
            </span>
          </div>

          <Toggle checked={form.is_active} onChange={v => set('is_active', v)} label="Spécialité active (visible pour le filtrage)" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
            <Btn variant="secondary" onClick={() => setModal(null)} disabled={saving}>Annuler</Btn>
            <Btn onClick={handleSave} disabled={saving}>
              {saving ? 'Enregistrement…' : editing ? 'Mettre à jour' : 'Créer la spécialité'}
            </Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget} onClose={() => !deletingId && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Supprimer la spécialité"
        message={`Supprimer "${deleteTarget?.name}" ? Cette action est irréversible. Les médecins rattachés ne pourront plus être filtrés par cette spécialité.`}
        confirmLabel="Supprimer" danger loading={!!deletingId}
      />
    </div>
  )
}