import api from './client'
import type { Service } from '@/types'

export const servicesApi = {
  list: (): Promise<Service[]> =>
    api.get('/services').then((r) => r.data),

  get: (id: number): Promise<Service> =>
    api.get(`/services/${id}`).then((r) => r.data),

  create: (data: Partial<Service>): Promise<Service> =>
    api.post('/services', data).then((r) => r.data),

  update: (id: number, data: Partial<Service>): Promise<Service> =>
    api.put(`/services/${id}`, data).then((r) => r.data),

  delete: (id: number): Promise<void> =>
    api.delete(`/services/${id}`).then(() => undefined),

  toggleActive: (id: number, is_active: boolean): Promise<Service> =>
    api.put(`/services/${id}`, { is_active }).then((r) => r.data),
} 