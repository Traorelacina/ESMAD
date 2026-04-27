// src/pages/admin/ContactsPage.tsx
import { useEffect, useState } from 'react'
import { contactsApi, type Contact, ApiError } from '@/api/client'
import { Table, Tr, Td, Btn, Modal, StatusBadge, SearchBar, Select, Pagination, Input } from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import { Mail, Eye, Archive, Reply, Trash2, X, Send } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'nouveau', label: 'Nouveaux' },
  { value: 'lu', label: 'Lus' },
  { value: 'repondu', label: 'Répondus' },
  { value: 'archive', label: 'Archivés' },
]

export default function ContactsPage({
  toast, onUnreadChange,
}: {
  toast: ReturnType<typeof useToast>
  onUnreadChange?: (n: number) => void
}) {
  const [items, setItems]         = useState<Contact[]>([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [status, setStatus]       = useState('')
  const [page, setPage]           = useState(1)
  const [lastPage, setLastPage]   = useState(1)
  const [selected, setSelected]   = useState<Contact | null>(null)
  const [reponse, setReponse]     = useState('')
  const [saving, setSaving]       = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ 
        page: String(page), 
        per_page: '15' 
      })
      if (search) params.set('search', search)
      if (status) params.set('status', status)
      
      const res = await contactsApi.list(params.toString())
      console.log('📋 Contacts chargés:', res)
      
      // Gestion des différentes structures possibles
      const data = (res as any).data ?? res
      setItems(Array.isArray(data) ? data : [])
      
      // Récupération de la pagination
      const lastPageValue = (res as any).meta?.last_page ?? (res as any).last_page ?? 1
      setLastPage(lastPageValue)

      // Refresh unread count
      const stats = await contactsApi.stats()
      onUnreadChange?.(stats.nouveaux)
      
    } catch (error: any) {
      console.error('❌ Erreur chargement:', error)
      toast.error(error?.message || 'Erreur lors du chargement des messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    load() 
  }, [page, search, status])

  const openContact = async (contact: Contact) => {
    setSelected(contact)
    setReponse(contact.reponse ?? '')
    
    // Mark as "lu"
    if (contact.status === 'nouveau') {
      try {
        await contactsApi.updateStatus(contact.id, 'lu')
        load()
      } catch (error) {
        console.error('Erreur mise à jour statut:', error)
      }
    }
  }

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selected) return
    setSaving(true)
    try {
      await contactsApi.updateStatus(
        selected.id, 
        newStatus, 
        newStatus === 'repondu' ? reponse : undefined
      )
      toast.success(`Statut mis à jour : ${getStatusLabel(newStatus)}.`)
      setSelected(null)
      await load()
    } catch (error: any) {
      console.error('Erreur mise à jour statut:', error)
      const errorMsg = error?.message || 'Erreur lors de la mise à jour'
      toast.error(errorMsg)
    } finally { 
      setSaving(false) 
    }
  }

  const handleDelete = async (contact: Contact) => {
    if (!window.confirm(`Archiver le message de ${contact.name} ?`)) return
    try {
      await contactsApi.delete(contact.id)
      toast.success('Message archivé.')
      await load()
    } catch (error: any) {
      console.error('Erreur suppression:', error)
      toast.error(error?.message || 'Erreur lors de l\'archivage')
    }
  }

  const getStatusLabel = (statusValue: string): string => {
    const option = STATUS_OPTIONS.find(opt => opt.value === statusValue)
    return option?.label || statusValue
  }

  const formatDate = (d: string) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <h2 style={{ margin: '0 0 3px', fontSize: 20, fontWeight: 800, color: '#0A1628' }}>
            Messages de contact
          </h2>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: 13 }}>
            Formulaire de contact du site ESMAD
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <SearchBar 
            value={search} 
            onChange={v => { setSearch(v); setPage(1) }} 
            placeholder="Rechercher par nom, email, message…" 
          />
        </div>
        <div style={{ minWidth: 200 }}>
          <Select 
            value={status} 
            onChange={v => { setStatus(v); setPage(1) }} 
            options={STATUS_OPTIONS} 
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>
          Chargement des messages...
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9CA3AF' }}>
          Aucun message trouvé
        </div>
      ) : (
        <>
          <Table headers={['Expéditeur', 'Message', 'Date', 'Statut', 'Actions']}>
            {items.map(c => (
              <Tr key={c.id} style={{ cursor: 'pointer' }}>
                <Td>
                  <div>
                    <div style={{ 
                      fontWeight: c.status === 'nouveau' ? 800 : 600, 
                      fontSize: 14, 
                      color: '#0A1628',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      {c.status === 'nouveau' && (
                        <span style={{ 
                          display: 'inline-block', 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          background: '#2563EB' 
                        }} />
                      )}
                      {c.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>
                      {c.email ?? c.phone ?? '—'}
                    </div>
                  </div>
                </Td>
                <Td>
                  <span style={{ 
                    fontSize: 13, 
                    color: '#6B7280', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden', 
                    maxWidth: 320 
                  }}>
                    {c.message}
                  </span>
                </Td>
                <Td muted>{formatDate(c.created_at)}</Td>
                <Td><StatusBadge status={c.status} /></Td>
                <Td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Btn 
                      variant="secondary" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); openContact(c) }}
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <Eye size={14} />
                      Lire
                    </Btn>
                    <Btn 
                      variant="danger" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); handleDelete(c) }}
                      style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <Trash2 size={14} />
                      Archiver
                    </Btn>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
          <Pagination page={page} lastPage={lastPage} onChange={setPage} />
        </>
      )}

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Message reçu" width={620}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Infos expéditeur */}
            <div style={{ 
              background: '#F8FAFC', 
              borderRadius: 12, 
              padding: '16px', 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 12 
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 3 }}>
                  Nom
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628' }}>
                  {selected.name}
                </div>
              </div>
              {selected.email && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 3 }}>
                    Email
                  </div>
                  <a href={`mailto:${selected.email}`} style={{ fontSize: 14, color: '#2563EB' }}>
                    {selected.email}
                  </a>
                </div>
              )}
              {selected.phone && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 3 }}>
                    Téléphone
                  </div>
                  <a href={`tel:${selected.phone}`} style={{ fontSize: 14, color: '#2563EB' }}>
                    {selected.phone}
                  </a>
                </div>
              )}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 3 }}>
                  Date
                </div>
                <div style={{ fontSize: 13, color: '#374151' }}>
                  {formatDate(selected.created_at)}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 8 }}>
                Message
              </div>
              <div style={{ 
                background: '#FFFBEB', 
                border: '1px solid #FDE68A', 
                borderRadius: 10, 
                padding: '14px', 
                fontSize: 14, 
                lineHeight: 1.7, 
                color: '#374151' 
              }}>
                {selected.message}
              </div>
            </div>

            {/* Réponse */}
            {selected.status !== 'archive' && (
              <div>
                <label style={{ 
                  fontSize: 11, 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: '#9CA3AF', 
                  marginBottom: 8, 
                  display: 'block' 
                }}>
                  Réponse (optionnel)
                </label>
                <textarea
                  value={reponse}
                  onChange={(e) => setReponse(e.target.value)}
                  rows={4}
                  placeholder="Votre réponse au patient…"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 10,
                    border: '1.5px solid #E2E8F0',
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

            {selected.repondu_at && (
              <div style={{ fontSize: 12, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Reply size={14} />
                Répondu le {formatDate(selected.repondu_at)}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 4, borderTop: '1px solid #F1F5F9' }}>
              <Btn variant="secondary" size="sm" onClick={() => setSelected(null)}>
                <X size={14} style={{ marginRight: 4 }} />
                Fermer
              </Btn>
              
              {selected.status !== 'repondu' && (
                <Btn 
                  size="sm" 
                  onClick={() => handleUpdateStatus('repondu')} 
                  disabled={saving}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Send size={14} />
                  {reponse ? 'Marquer répondu + sauvegarder' : 'Marquer répondu'}
                </Btn>
              )}
              
              {selected.status !== 'archive' && (
                <Btn 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleUpdateStatus('archive')} 
                  disabled={saving}
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <Archive size={14} />
                  Archiver
                </Btn>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}