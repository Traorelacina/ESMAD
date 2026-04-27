import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { medecinsApi, specialitesApi, type Medecin, type Specialite } from '@/api/client'
import {
  Table, Tr, Td, Btn, Modal, Input, Select, SearchBar, ActiveDot,
  Avatar, ConfirmDialog, Pagination, Toggle, FileInput, Spinner, EmptyState, T,
} from '@/components/ui'
import {
  Plus, Pencil, Trash2, Stethoscope, Phone, Mail,
  ToggleLeft, ToggleRight, RefreshCw,
} from 'lucide-react'

interface FormState {
  name: string
  specialite_id: string
  phone: string
  email: string
  bio: string
  is_active: boolean
  photo: File | null
}

const emptyForm = (): FormState => ({
  name: '',
  specialite_id: '',
  phone: '',
  email: '',
  bio: '',
  is_active: true,
  photo: null,
})

export default function MedecinsPage() {
  const [medecins, setMedecins]         = useState<Medecin[]>([])
  const [specialites, setSpecialites]   = useState<Specialite[]>([])
  const [loading, setLoading]           = useState(true)
  const [loadingSpecs, setLoadingSpecs] = useState(true)
  const [search, setSearch]             = useState('')
  const [filterSpec, setFilterSpec]     = useState('all')
  const [page, setPage]                 = useState(1)
  const [lastPage, setLastPage]         = useState(1)
  const [total, setTotal]               = useState(0)
  const [modal, setModal]               = useState<'create' | 'edit' | null>(null)
  const [editing, setEditing]           = useState<Medecin | null>(null)
  const [form, setForm]                 = useState<FormState>(emptyForm())
  const [saving, setSaving]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Medecin | null>(null)
  const [deletingId, setDeletingId]     = useState<number | null>(null)
  const [togglingId, setTogglingId]     = useState<number | null>(null)
  const [formErrors, setFormErrors]     = useState<Partial<Record<keyof FormState, string>>>({})

  useEffect(() => {
    specialitesApi.list()
      .then(r => setSpecialites(r.data))
      .catch(e => toast.error(e.message ?? 'Erreur spécialités.'))
      .finally(() => setLoadingSpecs(false))
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), per_page: '10' })
      if (search) params.set('search', search)
      if (filterSpec !== 'all') params.set('specialite', filterSpec)
      const res = await medecinsApi.list(params.toString())
      setMedecins(res.data)
      setLastPage(res.meta.last_page)
      setTotal(res.meta.total)
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }, [page, search, filterSpec])

  useEffect(() => { load() }, [load])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm(f => ({ ...f, [k]: v }))
    if (formErrors[k]) setFormErrors(e => ({ ...e, [k]: undefined }))
  }

  const openCreate = () => {
    setForm(emptyForm())
    setEditing(null)
    setFormErrors({})
    setModal('create')
  }

  const openEdit = (m: Medecin) => {
    setEditing(m)
    setFormErrors({})
    setForm({
      name: m.name,
      specialite_id: String(m.specialite_id),
      phone: m.phone ?? '',
      email: m.email ?? '',
      bio: m.bio ?? '',
      is_active: m.is_active,
      photo: null,
    })
    setModal('edit')
  }

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) errors.name = 'Le nom est obligatoire.'
    if (!form.specialite_id) errors.specialite_id = 'La spécialité est obligatoire.'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const buildFormData = () => {
    const fd = new FormData()
    fd.append('name', form.name.trim())
    fd.append('specialite_id', form.specialite_id)
    if (form.phone) fd.append('phone', form.phone)
    if (form.email) fd.append('email', form.email)
    if (form.bio) fd.append('bio', form.bio)
    fd.append('is_active', form.is_active ? '1' : '0')
    if (form.photo) fd.append('photo', form.photo)
    return fd
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      if (editing) {
        await medecinsApi.update(editing.id, buildFormData())
        toast.success('Médecin mis à jour avec succès.')
      } else {
        await medecinsApi.create(buildFormData())
        toast.success('Médecin créé avec succès.')
      }
      setModal(null)
      load()
    } catch (e: any) {
      if (e.errors) {
        const mapped: Partial<Record<keyof FormState, string>> = {}
        Object.entries(e.errors).forEach(([k, msgs]) => {
          const key = k.split('.')[0] as keyof FormState
          mapped[key] = (msgs as string[])[0]
        })
        setFormErrors(mapped)
      }
      toast.error(e.message ?? 'Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (m: Medecin) => {
    setTogglingId(m.id)
    try {
      await medecinsApi.toggle(m.id)
      toast.success(m.is_active ? 'Médecin désactivé.' : 'Médecin activé.')
      setMedecins(prev => prev.map(i => i.id === m.id ? { ...i, is_active: !i.is_active } : i))
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
      await medecinsApi.delete(deleteTarget.id)
      toast.success('Médecin supprimé.')
      setDeleteTarget(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors de la suppression.')
    } finally {
      setDeletingId(null)
    }
  }

  const specOptions = [
    { value: 'all', label: 'Toutes les spécialités' },
    ...specialites.map(s => ({ value: s.key, label: s.name })),
  ]
  const specSelectOptions = [
    { value: '', label: 'Choisir une spécialité…' },
    ...specialites.map(s => ({ value: String(s.id), label: s.name })),
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: T.navy }}>Médecins</h2>
          <p style={{ margin: 0, color: T.gray400, fontSize: 13 }}>
            Gestion du personnel médical
            {!loading && (
              <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 20, background: T.gray100, fontSize: 11, fontWeight: 700, color: T.gray500 }}>
                {total}
              </span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" size="sm" onClick={load} icon={<RefreshCw size={13} />}>Actualiser</Btn>
          <Btn onClick={openCreate} icon={<Plus size={15} />}>Nouveau médecin</Btn>
        </div>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Rechercher un médecin…" />
        </div>
        <div style={{ minWidth: 240 }}>
          <Select value={filterSpec} onChange={v => { setFilterSpec(v); setPage(1) }} options={specOptions} />
        </div>
      </div>

      {loading ? <Spinner /> : medecins.length === 0 ? (
        <EmptyState
          icon={<Stethoscope size={28} />}
          title="Aucun médecin trouvé"
          description={search || filterSpec !== 'all' ? 'Essayez de modifier vos filtres.' : 'Commencez par ajouter votre premier médecin.'}
          action={!search && filterSpec === 'all' ? <Btn onClick={openCreate} icon={<Plus size={15} />}>Nouveau médecin</Btn> : undefined}
        />
      ) : (
        <>
          <Table
            headers={['Médecin', 'Spécialité', 'Contact', 'Disponibilité', 'Statut', 'Actions']}
            empty="Aucun médecin trouvé."
          >
            {medecins.map(m => (
              <Tr key={m.id}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar src={m.photo} initials={m.initials} size={40} color={m.color} bg={m.bg_color} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{m.name}</div>
                      {m.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: T.gray400, marginTop: 2 }}>
                          <Mail size={10} /> {m.email}
                        </div>
                      )}
                    </div>
                  </div>
                </Td>
                <Td>
                  {m.specialite ? (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px', borderRadius: 20,
                      fontSize: 12, fontWeight: 600,
                      background: m.specialite.bg_color, color: m.specialite.color,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.specialite.color, display: 'inline-block' }} />
                      {m.specialite.name}
                    </span>
                  ) : <span style={{ color: T.gray300, fontSize: 13 }}>—</span>}
                </Td>
                <Td>
                  {m.phone ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: T.gray600 }}>
                      <Phone size={12} color={T.gray400} /> {m.phone}
                    </div>
                  ) : <span style={{ color: T.gray300, fontSize: 13 }}>—</span>}
                </Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: m.is_active ? T.green : T.gray300,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: T.gray500 }}>
                      {m.is_active ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                </Td>
                <Td><ActiveDot active={m.is_active} /></Td>
                <Td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Btn variant="secondary" size="sm" onClick={() => openEdit(m)} icon={<Pencil size={12} />}>Modifier</Btn>
                    <Btn
                      variant="ghost" size="sm"
                      onClick={() => handleToggle(m)}
                      disabled={togglingId === m.id}
                      icon={m.is_active ? <ToggleRight size={14} color={T.green} /> : <ToggleLeft size={14} />}
                    />
                    <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(m)} icon={<Trash2 size={12} />} />
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
          <Pagination page={page} lastPage={lastPage} onChange={setPage} total={total} />
        </>
      )}

      {/* Modal Créer / Modifier */}
      <Modal
        open={!!modal}
        onClose={() => !saving && setModal(null)}
        title={editing ? 'Modifier le médecin' : 'Nouveau médecin'}
        width={580}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Informations générales */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.gray400, marginBottom: 12 }}>
              Informations générales
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input
                  label="Nom complet" required
                  value={form.name} onChange={v => set('name', v)}
                  placeholder="Dr. Prénom Nom"
                  error={formErrors.name}
                />
                <Select
                  label="Spécialité" required
                  value={form.specialite_id} onChange={v => set('specialite_id', v)}
                  options={loadingSpecs ? [{ value: '', label: 'Chargement…' }] : specSelectOptions}
                  error={formErrors.specialite_id}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Input
                  label="Téléphone"
                  value={form.phone} onChange={v => set('phone', v)}
                  placeholder="07 XX XX XX XX"
                  icon={<Phone size={14} />}
                />
                <Input
                  label="Email" type="email"
                  value={form.email} onChange={v => set('email', v)}
                  placeholder="medecin@esmad.ci"
                  icon={<Mail size={14} />}
                />
              </div>
              <Input
                label="Biographie"
                value={form.bio} onChange={v => set('bio', v)}
                rows={2}
                placeholder="Courte présentation du médecin…"
              />
            </div>
          </div>

          {/* Photo */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.gray400, marginBottom: 12 }}>
              Photo
            </div>
            <FileInput
              label="Photo du médecin (optionnel)"
              onChange={f => set('photo', f)}
              accept="image/*"
              hint="JPG, PNG, WEBP — max 2 Mo"
              preview={editing?.photo ?? undefined}
            />
          </div>

          {/* Statut */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.gray400, marginBottom: 14 }}>
              Statut
            </div>
            <Toggle
              checked={form.is_active}
              onChange={v => set('is_active', v)}
              label="Médecin actif (visible sur le site)"
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
            <Btn variant="secondary" onClick={() => setModal(null)} disabled={saving}>Annuler</Btn>
            <Btn onClick={handleSave} disabled={saving}>
              {saving ? 'Enregistrement…' : editing ? 'Mettre à jour' : 'Créer le médecin'}
            </Btn>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => !deletingId && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Supprimer le médecin"
        message={`Voulez-vous vraiment supprimer Dr. ${deleteTarget?.name} ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        danger
        loading={!!deletingId}
      />
    </div>
  )
}