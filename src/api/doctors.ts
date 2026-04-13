import api from './client'
import type { Doctor } from '@/types'

export const doctorsApi = {
  list: (): Promise<Doctor[]> =>
    api.get('/doctors').then((r) => r.data),

  get: (id: number): Promise<Doctor> =>
    api.get(`/doctors/${id}`).then((r) => r.data),

  create: (data: Partial<Doctor>): Promise<Doctor> =>
    api.post('/doctors', data).then((r) => r.data),

  update: (id: number, data: Partial<Doctor>): Promise<Doctor> =>
    api.put(`/doctors/${id}`, data).then((r) => r.data),

  delete: (id: number): Promise<void> =>
    api.delete(`/doctors/${id}`).then(() => undefined),

  deactivate: (id: number): Promise<Doctor> =>
    api.put(`/doctors/${id}`, { is_active: false }).then((r) => r.data),
}