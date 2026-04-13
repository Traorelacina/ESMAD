import api from './client'
import type { Message, MessageRequest, PaginatedResponse } from '@/types'

export const messagesApi = {
  send: (data: MessageRequest): Promise<Message> =>
    api.post('/messages', data).then((r) => r.data),

  list: (): Promise<PaginatedResponse<Message>> =>
    api.get('/messages').then((r) => r.data),

  get: (id: number): Promise<Message> =>
    api.get(`/messages/${id}`).then((r) => r.data),

  markRead: (id: number): Promise<Message> =>
    api.patch(`/messages/${id}/read`).then((r) => r.data),

  markAllRead: (): Promise<void> =>
    api.patch('/messages/read-all').then(() => undefined),

  delete: (id: number): Promise<void> =>
    api.delete(`/messages/${id}`).then(() => undefined),

  unreadCount: (): Promise<{ count: number }> =>
    api.get('/messages/unread').then((r) => r.data),
}