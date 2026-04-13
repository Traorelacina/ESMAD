import api from './client'
import type { Appointment, AppointmentRequest, AppointmentStats, PaginatedResponse } from '@/types'

export const appointmentsApi = {
  book: (data: AppointmentRequest): Promise<Appointment> =>
    api.post('/appointments', data).then((r) => r.data),

  list: (params?: {
    status?: string
    date?: string
    page?: number
  }): Promise<PaginatedResponse<Appointment>> =>
    api.get('/appointments', { params }).then((r) => r.data),

  get: (id: number): Promise<Appointment> =>
    api.get(`/appointments/${id}`).then((r) => r.data),

  update: (id: number, data: Partial<Appointment>): Promise<Appointment> =>
    api.put(`/appointments/${id}`, data).then((r) => r.data),

  confirm: (id: number): Promise<Appointment> =>
    api.put(`/appointments/${id}`, { status: 'confirmed' }).then((r) => r.data),

  cancel: (id: number): Promise<void> =>
    api.delete(`/appointments/${id}`).then(() => undefined),

  complete: (id: number): Promise<Appointment> =>
    api.put(`/appointments/${id}`, { status: 'completed' }).then((r) => r.data),

  stats: (): Promise<AppointmentStats> =>
    api.get('/appointments/stats').then((r) => r.data),
}