import { useEffect, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { contactsApi, type Contact } from '@/api/client'
import {
  Table, Tr, Td, Btn, Modal, StatusBadge, SearchBar, Select,
  Pagination, Input, Spinner, EmptyState, T,
} from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import {
  Mail, Phone, Calendar, Archive, Eye, Trash2,
  MessageSquare, User, Clock, CheckCircle2, RefreshCw, Filter,
} from 'lucide-react'

const STATUS_OPTIONS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'nouveau', label: 'Nouveaux' },
  { value: 'lu', label: 'Lus' },
  { value: 'archive', label: 'Archivés' },
]

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const formatDateShort = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

export default function ContactsPage({ onUnreadChange }: { onUnreadChange?: (count: number) => void }) {
  const [items, setItems]       = useState<Contact[]>([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('')
  const [page, setPage]         = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal]       = useState(0)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [saving, setSaving]     = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), per_page: '15' })
      if (search) params.set('search', search)
      if (status) params.set('status', status)
      const res = await contactsApi.list(params.toString())
      setItems(res.data)
      setLastPage(res.meta.last_page)
      setTotal(res.meta.total)
      // Refresh unread count
      const stats = await contactsApi.stats()
      onUnreadChange?.(stats.nouveaux)
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur lors du chargement.')
    } finally {
      setLoading(false)
    }
  }, [page, search, status])

  useEffect(() => { load() }, [load])

  const openContact = async (c: Contact) => {
    setSelected(c)
    if (c.status === 'nouveau') {
      try {
        await contactsApi.updateStatus(c.id, 'lu')
        setItems(prev => prev.map(i => i.id === c.id ? { ...i, status: 'lu' as const } : i))
        onUnreadChange && contactsApi.stats().then(s => onUnreadChange(s.nouveaux))
      } catch { /* silent */ }
    }
  }

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selected) return
    setSaving(true)
    try {
      await contactsApi.updateStatus(selected.id, newStatus)
      toast.success(
        newStatus === 'archive' ? 'Message archivé.' : 'Statut mis à jour.'
      )
      setSelected(null)
      load()
    } catch (e: any) {
      toast.error(e.message ?? 'Erreur.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (c: Contact) => {
    setDeletingId(c.id)
    try {
      await contactsApi.delete(c.id)
      toast.success('Message supprimé.')
      setDeleteTarget(null)
      if (selected?.id === c.id) setSelected(null)
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
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: T.navy }}>Messages de contact</h2>
          <p style={{ margin: 0, color: T.gray400, fontSize: 13 }}>
            Formulaire de contact du site ESMAD
            {!loading && <span style={{ marginLeft: 8, padding: '2px 8px', borderRadius: 20, background: T.gray100, fontSize: 11, fontWeight: 700, color: T.gray500 }}>{total}</span>}
          </p>
        </div>
        <Btn variant="secondary" size="sm" onClick={load} icon={<RefreshCw size={13} />}>Actualiser</Btn>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Nom, email, message…" />
        </div>
        <div style={{ minWidth: 200 }}>
          <Select value={status} onChange={v => { setStatus(v); setPage(1) }} options={STATUS_OPTIONS} />
        </div>
      </div>

      {loading ? <Spinner /> : items.length === 0 ? (
        <EmptyState icon={<MessageSquare size={28} />} title="Aucun message"
          description={search || status ? 'Essayez de modifier vos filtres.' : 'Aucun message reçu pour le moment.'} />
      ) : (
        <>
          <Table headers={['Expéditeur', 'Message', 'Date', 'Statut', 'Actions']} empty="Aucun message.">
            {items.map(c => (
              <Tr key={c.id} onClick={() => openContact(c)}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: c.status === 'nouveau' ? T.blueL : T.gray100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <User size={15} color={c.status === 'nouveau' ? T.blue : T.gray400} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {c.status === 'nouveau' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.blue, display: 'inline-block', flexShrink: 0 }} />}
                        <span style={{ fontWeight: c.status === 'nouveau' ? 800 : 600, fontSize: 13, color: T.navy }}>{c.name}</span>
                      </div>
                      <div style={{ fontSize: 11, color: T.gray400, marginTop: 1 }}>
                        {c.email ?? c.phone ?? '—'}
                      </div>
                    </div>
                  </div>
                </Td>
                <Td>
                  <p style={{ margin: 0, fontSize: 12, color: T.gray500, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: 300, lineHeight: 1.5 }}>
                    {c.message}
                  </p>
                </Td>
                <Td muted>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
                    <Clock size={11} color={T.gray300} />
                    {formatDateShort(c.created_at)}
                  </div>
                </Td>
                <Td><StatusBadge status={c.status} /></Td>
                <Td>
                  <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                    <Btn variant="secondary" size="sm" onClick={() => openContact(c)} icon={<Eye size={12} />}>Lire</Btn>
                    <Btn variant="danger" size="sm" onClick={() => setDeleteTarget(c)} icon={<Trash2 size={12} />} disabled={deletingId === c.id}>Supprimer</Btn>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
          <Pagination page={page} lastPage={lastPage} onChange={setPage} total={total} />
        </>
      )}

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => !saving && setSelected(null)} title="Détail du message" width={600}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Sender info */}
            <div style={{ background: T.gray50, borderRadius: 12, padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <User size={12} color={T.gray400} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400 }}>Nom</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{selected.name}</div>
              </div>
              {selected.email && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Mail size={12} color={T.gray400} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400 }}>Email</span>
                  </div>
                  <a href={`mailto:${selected.email}`} style={{ fontSize: 13, color: T.blue, textDecoration: 'none' }}>{selected.email}</a>
                </div>
              )}
              {selected.phone && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Phone size={12} color={T.gray400} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400 }}>Téléphone</span>
                  </div>
                  <a href={`tel:${selected.phone}`} style={{ fontSize: 13, color: T.blue, textDecoration: 'none' }}>{selected.phone}</a>
                </div>
              )}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Calendar size={12} color={T.gray400} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400 }}>Date</span>
                </div>
                <div style={{ fontSize: 13, color: T.gray600 }}>{formatDate(selected.created_at)}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400, marginBottom: 4 }}>Statut</div>
                <StatusBadge status={selected.status} />
              </div>
            </div>

            {/* Message */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <MessageSquare size={14} color={T.gray400} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gray400 }}>Message</span>
              </div>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '16px', fontSize: 14, lineHeight: 1.75, color: T.gray700 }}>
                {selected.message}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 8, borderTop: `1px solid ${T.border}` }}>
              <Btn variant="secondary" size="sm" onClick={() => setSelected(null)}>Fermer</Btn>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                {selected.status !== 'archive' && (
                  <Btn variant="danger" size="sm" onClick={() => handleUpdateStatus('archive')} disabled={saving}
                    icon={<Archive size={13} />}>
                    Archiver
                  </Btn>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      {deleteTarget && (
        <div onClick={() => !deletingId && setDeleteTarget(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: T.white, borderRadius: 18, padding: 28, width: 380, boxShadow: '0 24px 64px rgba(0,0,0,.18)' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: 16, fontWeight: 800, color: T.navy, fontFamily: T.font }}>Supprimer le message ?</h3>
            <p style={{ margin: '0 0 22px', color: T.gray500, fontSize: 14, lineHeight: 1.6, fontFamily: T.font }}>
              Supprimer définitivement le message de <strong>{deleteTarget.name}</strong> ? Cette action est irréversible.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <Btn variant="secondary" onClick={() => setDeleteTarget(null)} disabled={!!deletingId}>Annuler</Btn>
              <Btn variant="danger" onClick={() => handleDelete(deleteTarget)} disabled={!!deletingId}
                icon={<Trash2 size={13} />}>
                {deletingId ? 'Suppression…' : 'Supprimer'}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}