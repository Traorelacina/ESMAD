// src/api/client.ts

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem('esmad_token')
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  isFormData = false,
): Promise<T> {
  const headers = authHeaders()
  if (!isFormData) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: isFormData
      ? (body as FormData)
      : body
      ? JSON.stringify(body)
      : undefined,
  })

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err = new ApiError(
      json.message ?? `HTTP ${res.status}`,
      res.status,
      json.errors,
    )
    throw err
  }

  return json as T
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>,
  ) {
    super(message)
  }
}

const get = <T>(path: string) => request<T>('GET', path)
const post = <T>(path: string, body?: unknown) => request<T>('POST', path, body)
const put = <T>(path: string, body?: unknown) => request<T>('PUT', path, body)
const del = <T>(path: string) => request<T>('DELETE', path)
const patch = <T>(path: string, body?: unknown) => request<T>('PATCH', path, body) // AJOUTÉ pour les requêtes PATCH
const postForm = <T>(path: string, form: FormData) => request<T>('POST', path, form, true)
const putForm = <T>(path: string, form: FormData) => request<T>('PUT', path, form, true)

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Admin {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'admin' | 'editeur'
  avatar: string | null
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

export interface Assurance {
  id: number
  name: string
  slug: string
  logo: string | null
  logo_url?: string | null
  initials: string
  color: string
  bg_color: string
  website: string | null
  description: string | null
  is_active: boolean
  sort_order: number
}

export interface Specialite {
  id: number
  name: string
  key: string
  color: string
  bg_color: string
  is_active: boolean
  medecins_count?: number
}

export interface Disponibilite {
  id?: number
  jour: number
  nom_jour: string
  heure_debut: string
  heure_fin: string
  plage_horaire: string
  is_active: boolean
}

export interface Medecin {
  id: number
  name: string
  slug: string
  initials: string
  specialite: Specialite
  specialite_id: number
  photo: string | null
  color: string
  bg_color: string
  bio: string | null
  phone: string | null
  email: string | null
  is_active: boolean
  disponible: boolean
  sort_order: number
  disponibilites?: Disponibilite[]
  schedule_summary?: string
}

export interface Service {
  id: number
  title: string
  slug: string
  icon_name: string
  description: string
  image: string | null
  color: string
  bg_color: string
  is_active: boolean
  sort_order: number
}

export interface Contact {
  id: number
  name: string
  email: string | null
  phone: string | null
  message: string
  status: 'nouveau' | 'lu' | 'repondu' | 'archive'
  reponse: string | null
  repondu_at: string | null
  ip_address: string | null
  created_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: { current_page: number; last_page: number; per_page: number; total: number }
}

export interface ContactStats {
  total: number
  nouveaux: number
  lus: number
  repondus: number
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    post<{ token: string; admin: Admin; message: string }>('/admin/login', { email, password }),
  logout: () => post<{ message: string }>('/admin/logout'),
  me: () => get<Admin>('/admin/me'), // Simplifié - la réponse est directement l'admin
  updateProfile: (form: FormData) => postForm<{ message: string; admin: Admin }>('/admin/profile', form),
  changePassword: (data: { current_password: string; password: string; password_confirmation: string }) =>
    put<{ message: string }>('/admin/password', data),
}

// ── Admins ────────────────────────────────────────────────────────────────────

export const adminsApi = {
  list: () => get<{ data: Admin[] }>('/admin/admins'),
  create: (form: FormData) => postForm<{ message: string; data: Admin }>('/admin/admins', form),
  update: (id: number, form: FormData) => postForm<{ message: string; data: Admin }>(`/admin/admins/${id}`, form),
  toggle: (id: number) => patch<{ message: string; is_active: boolean }>(`/admin/admins/${id}/toggle`), // Utilise patch au lieu de request
  delete: (id: number) => del<{ message: string }>(`/admin/admins/${id}`),
}

// ── Assurances ────────────────────────────────────────────────────────────────

export const assurancesApi = {
  list: (params?: string) => get<PaginatedResponse<Assurance>>(`/admin/assurances${params ? '?' + params : ''}`),
  create: (form: FormData) => postForm<{ message: string; data: Assurance }>('/admin/assurances', form),
  update: (id: number, form: FormData) => postForm<{ message: string; data: Assurance }>(`/admin/assurances/${id}`, form),
  toggle: (id: number) => patch<{ message: string; is_active: boolean }>(`/admin/assurances/${id}/toggle`),
  delete: (id: number) => del<{ message: string }>(`/admin/assurances/${id}`),
  reorder: (ids: number[]) => post<{ message: string }>('/admin/assurances/reorder', { ids }),
}

// ── Spécialités ───────────────────────────────────────────────────────────────

export const specialitesApi = {
  list: () => get<{ data: Specialite[] }>('/specialites'),
  create: (data: {
    name: string
    description?: string
    color?: string
    bg_color?: string
    is_active?: boolean
    key?: string
    sort_order?: number
  }) => post<{ message: string; data: Specialite }>('/admin/specialites', data),
  update: (id: number, data: {
    name?: string
    description?: string
    color?: string
    bg_color?: string
    is_active?: boolean
    sort_order?: number
  }) => put<{ message: string; data: Specialite }>(`/admin/specialites/${id}`, data),
  delete: (id: number) => del<{ message: string }>(`/admin/specialites/${id}`),
}

// ── Médecins ──────────────────────────────────────────────────────────────────

export const medecinsApi = {
  list: (params?: string) => get<PaginatedResponse<Medecin>>(`/admin/medecins${params ? '?' + params : ''}`),
  create: (form: FormData) => postForm<{ message: string; data: Medecin }>('/admin/medecins', form),
  update: (id: number, form: FormData) => postForm<{ message: string; data: Medecin }>(`/admin/medecins/${id}`, form),
  toggle: (id: number) => patch<{ message: string; is_active: boolean }>(`/admin/medecins/${id}/toggle`),
  delete: (id: number) => del<{ message: string }>(`/admin/medecins/${id}`),
  reorder: (ids: number[]) => post<{ message: string }>('/admin/medecins/reorder', { ids }),
}

// ── Services ──────────────────────────────────────────────────────────────────

export const servicesApi = {
  list: () => get<{ data: Service[] }>('/services'),
  create: (form: FormData) => postForm<{ message: string; data: Service }>('/admin/services', form),
  update: (id: number, form: FormData) => postForm<{ message: string; data: Service }>(`/admin/services/${id}`, form),
  delete: (id: number) => del<{ message: string }>(`/admin/services/${id}`),
  reorder: (ids: number[]) => post<{ message: string }>('/admin/services/reorder', { ids }),
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export const contactsApi = {
  create: (data: { name: string; email?: string; phone?: string; message: string }) =>
    post<{ message: string; id: number }>('/contacts', data),
  list: (params?: string) => get<PaginatedResponse<Contact>>(`/admin/contacts${params ? '?' + params : ''}`),
  show: (id: number) => get<Contact>(`/admin/contacts/${id}`),
  stats: () => get<ContactStats>('/admin/contacts/stats'),
  updateStatus: (id: number, status: string, reponse?: string) =>
    patch<{ message: string; data: Contact }>(`/admin/contacts/${id}/status`, { status, reponse }),
  delete: (id: number) => del<{ message: string }>(`/admin/contacts/${id}`),
}

// ── EXPORT PAR DÉFAUT (AJOUTÉ) ──────────────────────────────────────────────────
// Ceci permet d'importer avec: import api from './client'
const api = {
  get,
  post,
  put,
  patch,    // AJOUTÉ
  delete: del,
  postForm,
  putForm,
}

export default api