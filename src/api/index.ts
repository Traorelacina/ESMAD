import api from './client'
import type {
  Service, Doctor, Appointment, Message,
  AppointmentRequest, MessageRequest, LoginRequest,
  LoginResponse, AppointmentStats, PaginatedResponse,
} from '@/types'

// ─── AUTH ──────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>('/login', data).then((r) => r.data),
  logout: () => api.post('/logout'),
  me: () => api.get<{ id: number; name: string; email: string }>('/me').then((r) => r.data),
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const servicesApi = {
  list: () => api.get<Service[]>('/services').then((r) => r.data),
  get: (id: number) => api.get<Service>(`/services/${id}`).then((r) => r.data),
  create: (data: Partial<Service>) =>
    api.post<Service>('/services', data).then((r) => r.data),
  update: (id: number, data: Partial<Service>) =>
    api.put<Service>(`/services/${id}`, data).then((r) => r.data),
  delete: (id: number) => api.delete(`/services/${id}`),
}

// ─── DOCTORS ──────────────────────────────────────────────────────────────────
export const doctorsApi = {
  list: () => api.get<Doctor[]>('/doctors').then((r) => r.data),
  get: (id: number) => api.get<Doctor>(`/doctors/${id}`).then((r) => r.data),
  create: (data: Partial<Doctor>) =>
    api.post<Doctor>('/doctors', data).then((r) => r.data),
  update: (id: number, data: Partial<Doctor>) =>
    api.put<Doctor>(`/doctors/${id}`, data).then((r) => r.data),
  delete: (id: number) => api.delete(`/doctors/${id}`),
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
export const appointmentsApi = {
  book: (data: AppointmentRequest) =>
    api.post<Appointment>('/appointments', data).then((r) => r.data),
  list: (params?: { status?: string; date?: string; page?: number }) =>
    api.get<PaginatedResponse<Appointment>>('/appointments', { params }).then((r) => r.data),
  get: (id: number) =>
    api.get<Appointment>(`/appointments/${id}`).then((r) => r.data),
  update: (id: number, data: Partial<Appointment>) =>
    api.put<Appointment>(`/appointments/${id}`, data).then((r) => r.data),
  cancel: (id: number) => api.delete(`/appointments/${id}`),
  stats: () => api.get<AppointmentStats>('/appointments/stats').then((r) => r.data),
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────────
export const messagesApi = {
  send: (data: MessageRequest) =>
    api.post<Message>('/messages', data).then((r) => r.data),
  list: () =>
    api.get<PaginatedResponse<Message>>('/messages').then((r) => r.data),
  markRead: (id: number) =>
    api.patch<Message>(`/messages/${id}/read`).then((r) => r.data),
  delete: (id: number) => api.delete(`/messages/${id}`),
  unreadCount: () =>
    api.get<{ count: number }>('/messages/unread').then((r) => r.data),
}