import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { assurancesApi, type Assurance } from '@/api/client'
import {
  Table, Tr, Td, Btn, Modal, Input, SearchBar, ActiveDot,
  ConfirmDialog, Pagination, ColorPicker, FileInput, Toggle, Spinner, EmptyState, T,
} from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import {
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Shield,
  ExternalLink, GripVertical, RefreshCw,
} from 'lucide-react'

interface FormState {
  name: string; logo_url: string; description: string
  website: string; color: string; bg_color: string
  is_active: boolean; logo: File | null
}

const emptyForm = (): FormState => ({
  name: '', logo_url: '', description: '', website: '',
  color: '#2563EB', bg_color: '#EFF6FF', is_active: true, logo: null,
})

export default function AssurancesPage() {
  const [items, setItems]               = useState<Assurance[]>([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [page, setPage]                 = useState(1)
  const [lastPage, setLastPage]         = useState(1)
  const [total, setTotal]               = useState(0)
  const [modal, setModal]               = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing]           = useState<Assurance | null>(null)
  const [form, setForm]                 = useState<FormState>(emptyForm())
  const [saving, setSaving]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Assurance | null>(null)
  const [deletingId, setDeletingId]     = useState<number | null>(null)
  const [togglingId, setTogglingId]     = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), per_page: '12' })
      if (search) params.set('search', search)
      const res = await assurancesApi.list(params.toString())
      setItems(res.data)
      setLastPage(res.meta.last_page)
      setTotal(res.meta.total)
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => { load() }, [load])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => { setForm(emptyForm()); setEditing(null); setModal('create') }
  const openEdit = (a: Assurance) => {
    setEditing(a)
    setForm({
      name: a.name, logo_url: (a as any).logo_url ?? '',
      description: a.description ?? '', website: a.website ?? '',
      color: a.color, bg_color: a.bg_color, is_active: a.is_active, logo: null,
    })
    setModal('edit')
  }

  const buildFD = () => {
    const fd = new FormData()
    fd.append('name', form.name.trim())
    if (form.logo_url) fd.append('logo_url', form.logo_url)
    if (form.description) fd.append('description', form.description)
    if (form.website) fd.append('website', form.website)
    fd.append('color', form.color)
    fd.append('bg_color', form.bg_color)
    fd.append('is_active', form.is_active ? '1' : '0')
    if (form.logo) fd.append('logo', form.logo)
    if (editing) fd.append('_method', 'PUT')
    return fd
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Le nom est obligatoire.'); return }
    setSaving(true)
    try {
      if (editing) {
        await assurancesApi.update(editing.id, buildFD())
        toast.success('Assurance mise à jour avec succès.')
      } else {
        await assurancesApi.create(buildFD())
        toast.success('Assurance créée avec succès.')
      }
      setModal(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (a: Assurance) => {
    setTogglingId(a.id)
    try {
      await assurancesApi.toggle(a.id)
      toast.success(a.is_active ? 'Assurance désactivée.' : 'Assurance activée.')
      setItems(prev => prev.map(i => i.id === a.id ? { ...i, is_active: !i.is_active } : i))
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
      await assurancesApi.delete(deleteTarget.id)
      toast.success('Assurance supprimée.')
      setDeleteTarget(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors de la suppression.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: T.navy }}>Assurances partenaires</h2>
          <p style={{ margin: 0, color: T.gray400, fontSize: 13 }}>
            Compagnies et mutuelles conventionnées avec ESMAD
            {!loading && <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 20, background: T.gray100, fontSize: 11, fontWeight: 700, color: T.gray500 }}>{total}</span>}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" size="sm" onClick={load} icon={<RefreshCw size={13} />}>Actualiser</Btn>
          <Btn onClick={openCreate} icon={<Plus size={15} />}>Nouvelle assurance</Btn>
        </div>
      </div>

      {/* Search */}
      <div style={{ maxWidth: 400 }}>
        <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Rechercher une assurance…" />
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState icon={<Shield size={28} />} title="Aucune assurance" description="Commencez par créer votre première assurance partenaire."
          action={<Btn onClick={openCreate} icon={<Plus size={15} />}>Nouvelle assurance</Btn>} />
      ) : (
        <>
          {/* Card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {items.map(a => (
              <div key={a.id} style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.08)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)')}>
                <div style={{ padding: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: a.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      {a.logo
                        ? <img src={a.logo} alt={a.name} style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
                        : <span style={{ fontSize: 17, fontWeight: 800, color: a.color, letterSpacing: '-0.02em', fontFamily: "'Space Mono', monospace" }}>{a.initials}</span>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: T.navy, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                      <ActiveDot active={a.is_active} />
                    </div>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: a.color, flexShrink: 0 }} title={a.color} />
                  </div>

                  {a.description && (
                    <p style={{ margin: '0 0 10px', fontSize: 12, color: T.gray500, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {a.description}
                    </p>
                  )}

                  {a.website && (
                    <a href={a.website} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: T.green, textDecoration: 'none', fontWeight: 600 }}>
                      <ExternalLink size={11} />
                      {a.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  )}
                </div>

                {/* Card actions */}
                <div style={{ padding: '12px 16px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 8, background: T.gray50 }}>
                  <Btn variant="secondary" size="sm" onClick={() => openEdit(a)} icon={<Pencil size={12} />}>Modifier</Btn>
                  <Btn variant={a.is_active ? 'ghost' : 'secondary'} size="sm"
                    onClick={() => handleToggle(a)}
                    disabled={togglingId === a.id}
                    icon={a.is_active ? <ToggleRight size={14} color={T.green} /> : <ToggleLeft size={14} />}>
                    {a.is_active ? 'Désactiver' : 'Activer'}
                  </Btn>
                  <div style={{ marginLeft: 'auto' }}>
                    <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(a)} icon={<Trash2 size={12} />} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} lastPage={lastPage} onChange={setPage} total={total} />
        </>
      )}

      {/* Create/Edit Modal */}
      <Modal open={!!modal} onClose={() => !saving && setModal(null)} title={editing ? 'Modifier l\'assurance' : 'Nouvelle assurance'} width={540}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Input label="Nom de la compagnie" required value={form.name} onChange={v => set('name', v)} placeholder="ex: NSIA Assurances" />

          <FileInput
            label="Logo (fichier image)"
            onChange={f => set('logo', f)}
            accept="image/*"
            hint="JPG, PNG, WEBP, SVG — max 1 Mo"
            preview={editing?.logo ?? undefined}
          />

          <Input label="URL du logo (alternative)" value={form.logo_url} onChange={v => set('logo_url', v)} placeholder="https://example.com/logo.png" hint="Si vous n'uploadez pas de fichier" />
          <Input label="Site web" value={form.website} onChange={v => set('website', v)} placeholder="https://www.assurance.ci" />
          <Input label="Description courte" value={form.description} onChange={v => set('description', v)} rows={2} placeholder="Courte description de la compagnie…" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ColorPicker label="Couleur principale" value={form.color} onChange={v => set('color', v)} />
            <ColorPicker label="Couleur de fond" value={form.bg_color} onChange={v => set('bg_color', v)} />
          </div>

          {/* Preview */}
          <div style={{ background: T.gray50, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: form.bg_color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: form.color, letterSpacing: '-0.02em', fontFamily: "'Space Mono', monospace" }}>
                {form.name.slice(0, 2).toUpperCase() || 'AB'}
              </span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{form.name || 'Nom de la compagnie'}</div>
              <div style={{ fontSize: 11, color: T.gray400 }}>Aperçu de la carte</div>
            </div>
          </div>

          <Toggle checked={form.is_active} onChange={v => set('is_active', v)} label="Partenaire actif (visible sur le site)" />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
            <Btn variant="secondary" onClick={() => setModal(null)} disabled={saving}>Annuler</Btn>
            <Btn onClick={handleSave} disabled={saving}>
              {saving ? 'Enregistrement…' : editing ? 'Mettre à jour' : 'Créer l\'assurance'}
            </Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget} onClose={() => !deletingId && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Supprimer l'assurance"
        message={`Voulez-vous vraiment supprimer "${deleteTarget?.name}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer" danger loading={!!deletingId}
      />
    </div>
  )
}