// src/pages/admin/ContactsPage.tsx
import { useEffect, useState } from 'react'
import { contactsApi, type Contact, type PaginatedResponse } from '@/api/client'
import { Table, Tr, Td, Btn, Modal, StatusBadge, SearchBar, Select, Pagination, Input } from '@/components/ui'
import { useToast } from '@/hooks/useToast'
import { Eye, Trash2, Send, Archive, X, Mail, Phone, Calendar, MessageSquare, Reply, User } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'nouveau', label: 'Nouveaux' },
  { value: 'lu', label: 'Lus' },
  { value: 'repondu', label: 'Répondus' },
  { value: 'archive', label: 'Archivés' },
]

const STATUS_COLORS = {
  nouveau: { bg: '#DBEAFE', color: '#1E40AF', dot: '#3B82F6' },
  lu: { bg: '#F3F4F6', color: '#374151', dot: '#9CA3AF' },
  repondu: { bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
  archive: { bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B' },
}

interface ContactsPageProps {
  toast: ReturnType<typeof useToast>
  onUnreadChange?: (n: number) => void  // Optionnel
}

export default function ContactsPage({ toast, onUnreadChange }: ContactsPageProps) {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [reponse, setReponse] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ 
        page: String(page), 
        per_page: '15' 
      })
      if (search) params.set('search', search)
      if (status) params.set('status', status)
      
      const res = await contactsApi.list(params.toString()) as PaginatedResponse<Contact>
      
      setItems(Array.isArray(res.data) ? res.data : [])
      setLastPage(res.meta?.last_page ?? 1)

      // Rafraîchir le compteur des non lus (seulement si la fonction est fournie)
      const stats = await contactsApi.stats()
      if (onUnreadChange) {
        onUnreadChange(stats.nouveaux)
      }
      
    } catch (error: any) {
      console.error('❌ Erreur chargement:', error)
      const errorMsg = error?.message || 'Erreur lors du chargement des messages'
      toast.error(errorMsg)
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
    
    if (contact.status === 'nouveau') {
      try {
        await contactsApi.updateStatus(contact.id, 'lu')
        await load()
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
      
      const statusLabel = STATUS_OPTIONS.find(opt => opt.value === newStatus)?.label || newStatus
      toast.success(`Statut mis à jour : ${statusLabel}.`)
      setSelected(null)
      await load()
    } catch (error: any) {
      console.error('Erreur mise à jour statut:', error)
      const errorMsg = error?.message || 'Erreur lors de la mise à jour du statut'
      toast.error(errorMsg)
    } finally { 
      setSaving(false) 
    }
  }

  const handleDelete = async (contact: Contact) => {
    if (!window.confirm(`Archiver le message de ${contact.name} ?`)) return
    try {
      await contactsApi.delete(contact.id)
      toast.success('Message archivé avec succès.')
      await load()
    } catch (error: any) {
      console.error('Erreur suppression:', error)
      toast.error(error?.message || 'Erreur lors de l\'archivage')
    }
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

  const getStatusStyle = (statusValue: string) => {
    return STATUS_COLORS[statusValue as keyof typeof STATUS_COLORS] || STATUS_COLORS.lu
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
          <Mail size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
          <p>Aucun message trouvé</p>
        </div>
      ) : (
        <>
          <Table headers={['Expéditeur', 'Message', 'Date', 'Statut', 'Actions']}>
            {items.map(c => {
              const statusStyle = getStatusStyle(c.status)
              return (
                <Tr key={c.id} style={{ cursor: 'pointer' }}>
                  <Td>
                    <div>
                      <div style={{ 
                        fontWeight: c.status === 'nouveau' ? 800 : 600, 
                        fontSize: 14, 
                        color: '#0A1628',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}>
                        {c.status === 'nouveau' && (
                          <span style={{ 
                            display: 'inline-block', 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            background: statusStyle.dot 
                          }} />
                        )}
                        {c.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                        {c.email && <span>📧 {c.email}</span>}
                        {c.phone && <span style={{ marginLeft: 8 }}>📞 {c.phone}</span>}
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
                  <Td muted style={{ fontSize: 12 }}>
                    {formatDate(c.created_at)}
                  </Td>
                  <Td>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      background: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {STATUS_OPTIONS.find(opt => opt.value === c.status)?.label || c.status}
                    </span>
                  </Td>
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
              )
            })}
          </Table>
          {lastPage > 1 && (
            <Pagination page={page} lastPage={lastPage} onChange={setPage} />
          )}
        </>
      )}

      {/* Modal de détail */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Détail du message" width={640}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Informations expéditeur */}
            <div style={{ 
              background: '#F8FAFC', 
              borderRadius: 12, 
              padding: 18, 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: 14 
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 4 }}>
                  <User size={12} style={{ display: 'inline', marginRight: 4 }} />
                  Nom
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0A1628' }}>
                  {selected.name}
                </div>
              </div>
              
              {selected.email && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 4 }}>
                    <Mail size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Email
                  </div>
                  <a href={`mailto:${selected.email}`} style={{ fontSize: 14, color: '#2563EB' }}>
                    {selected.email}
                  </a>
                </div>
              )}
              
              {selected.phone && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 4 }}>
                    <Phone size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Téléphone
                  </div>
                  <a href={`tel:${selected.phone}`} style={{ fontSize: 14, color: '#2563EB' }}>
                    {selected.phone}
                  </a>
                </div>
              )}
              
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 4 }}>
                  <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />
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
                <MessageSquare size={12} style={{ display: 'inline', marginRight: 4 }} />
                Message
              </div>
              <div style={{ 
                background: '#FFFBEB', 
                border: '1px solid #FDE68A', 
                borderRadius: 10, 
                padding: 16, 
                fontSize: 14, 
                lineHeight: 1.6, 
                color: '#374151',
                whiteSpace: 'pre-wrap'
              }}>
                {selected.message}
              </div>
            </div>

            {/* Réponse */}
            {selected.status !== 'archive' && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', marginBottom: 8 }}>
                  <Reply size={12} style={{ display: 'inline', marginRight: 4 }} />
                  Votre réponse (optionnel)
                </div>
                <textarea
                  value={reponse}
                  onChange={(e) => setReponse(e.target.value)}
                  rows={4}
                  placeholder="Écrivez votre réponse ici..."
                  style={{
                    width: '100%',
                    padding: 12,
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
              <div style={{ 
                fontSize: 12, 
                color: '#10B981', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6,
                padding: 10,
                background: '#D1FAE5',
                borderRadius: 8
              }}>
                <Reply size={14} />
                Réponse envoyée le {formatDate(selected.repondu_at)}
              </div>
            )}

            {/* Actions */}
            <div style={{ 
              display: 'flex', 
              gap: 10, 
              flexWrap: 'wrap', 
              paddingTop: 8, 
              borderTop: '1px solid #F1F5F9',
              justifyContent: 'flex-end'
            }}>
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
                  {reponse ? 'Envoyer la réponse' : 'Marquer comme répondu'}
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