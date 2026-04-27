// src/pages/admin/AssurancesPage.tsx
import { useEffect, useState } from 'react'
import { assurancesApi, type Assurance } from '@/api/client'
import {
  Table, Tr, Td, Btn, Modal, Input, SearchBar,
  ActiveDot, ConfirmDialog, Pagination, ColorPicker, Avatar,
} from '@/components/ui'
import { useToast } from '@/hooks/useToast'

interface FormState {
  name: string; logo_url: string; description: string
  website: string; color: string; bg_color: string
  is_active: boolean; logo: File | null
}

const empty = (): FormState => ({
  name: '', logo_url: '', description: '', website: '',
  color: '#2563EB', bg_color: '#EFF6FF', is_active: true, logo: null,
})

export default function AssurancesPage({ toast }: { toast: ReturnType<typeof useToast> }) {
  const [items, setItems]         = useState<Assurance[]>([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [page, setPage]           = useState(1)
  const [lastPage, setLastPage]   = useState(1)
  const [modal, setModal]         = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing]     = useState<Assurance | null>(null)
  const [form, setForm]           = useState<FormState>(empty())
  const [saving, setSaving]       = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Assurance | null>(null)

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), per_page: '12' })
    if (search) params.set('search', search)
    const res = await assurancesApi.list(params.toString())
    setItems(res.data)
    setLastPage(res.meta.last_page)
    setLoading(false)
  }

  useEffect(() => { load() }, [page, search])

  const set = (k: keyof FormState, v: any) => setForm(f => ({ ...f, [k]: v }))

  const openCreate = () => { setForm(empty()); setEditing(null); setModal('create') }
  const openEdit   = (a: Assurance) => {
    setEditing(a)
    setForm({ name: a.name, logo_url: a.logo_url ?? '', description: a.description ?? '', website: a.website ?? '', color: a.color, bg_color: a.bg_color, is_active: a.is_active, logo: null })
    setModal('edit')
  }

  const buildFD = () => {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('logo_url', form.logo_url)
    fd.append('description', form.description)
    fd.append('website', form.website)
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
      editing ? await assurancesApi.update(editing.id, buildFD()) : await assurancesApi.create(buildFD())
      toast.success(editing ? 'Assurance mise à jour.' : 'Assurance créée.')
      setModal(null); load()
    } catch (e: any) {
      toast.error(e.message)
    } finally { setSaving(false) }
  }

  const handleToggle = async (a: Assurance) => {
    await assurancesApi.toggle(a.id)
    toast.success(a.is_active ? 'Assurance désactivée.' : 'Assurance activée.')
    load()
  }

  const handleDelete = async (a: Assurance) => {
    await assurancesApi.delete(a.id)
    toast.success('Assurance supprimée.')
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: '0 0 3px', fontSize: 20, fontWeight: 800, color: '#0A1628', fontFamily: "'DM Sans', sans-serif" }}>Assurances partenaires</h2>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Compagnies et mutuelles conventionnées avec ESMAD</p>
        </div>
        <Btn onClick={openCreate}>+ Nouvelle assurance</Btn>
      </div>

      <div style={{ marginBottom: 18 }}>
        <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Rechercher une assurance…" />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>Chargement…</div>
      ) : (
        <>
          {/* Card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 8 }}>
            {items.map(a => (
              <div key={a.id} style={{
                background: '#fff', borderRadius: 14, border: '1px solid #E8EDF5',
                padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,.04)',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12, background: a.bg_color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    overflow: 'hidden',
                  }}>
                    {a.logo
                      ? <img src={a.logo} alt={a.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                      : <span style={{ fontSize: 18, fontWeight: 800, color: a.color, fontFamily: "'Space Mono', monospace" }}>{a.initials}</span>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0A1628', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                    <ActiveDot active={a.is_active} />
                  </div>
                </div>
                {a.website && (
                  <a href={a.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#7CB342', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    🔗 {a.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="secondary" size="sm" onClick={() => openEdit(a)}>✏️</Btn>
                  <Btn variant={a.is_active ? 'danger' : 'secondary'} size="sm" onClick={() => handleToggle(a)}>
                    {a.is_active ? 'Désactiver' : 'Activer'}
                  </Btn>
                  <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(a)}>🗑</Btn>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} lastPage={lastPage} onChange={setPage} />
        </>
      )}

      <Modal open={!!modal} onClose={() => setModal(null)} title={editing ? 'Modifier l\'assurance' : 'Nouvelle assurance'} width={520}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Nom de la compagnie" required value={form.name} onChange={v => set('name', v)} placeholder="ex: NSIA Assurances" />

          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>
              Logo (fichier image)
            </label>
            <input type="file" accept="image/*" onChange={e => set('logo', e.target.files?.[0] ?? null)} style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: '#374151' }} />
            <p style={{ margin: '4px 0 0', fontSize: 11, color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>
              Ou renseigner une URL ci-dessous
            </p>
          </div>

          <Input label="URL du logo (optionnel)" value={form.logo_url} onChange={v => set('logo_url', v)} placeholder="https://…/logo.png" />
          <Input label="Site web" value={form.website} onChange={v => set('website', v)} placeholder="https://…" />
          <Input label="Description" value={form.description} onChange={v => set('description', v)} rows={2} placeholder="Courte description…" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ColorPicker label="Couleur principale" value={form.color} onChange={v => set('color', v)} />
            <ColorPicker label="Couleur de fond" value={form.bg_color} onChange={v => set('bg_color', v)} />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: '#374151' }}>
            <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} />
            Partenaire actif (visible sur le site)
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4, borderTop: '1px solid #F1F5F9' }}>
            <Btn variant="secondary" onClick={() => setModal(null)}>Annuler</Btn>
            <Btn onClick={handleSave} disabled={saving}>{saving ? 'Enregistrement…' : '💾 Enregistrer'}</Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Supprimer l'assurance"
        message={`Supprimer "${deleteTarget?.name}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer" danger
      />
    </div>
  )
}