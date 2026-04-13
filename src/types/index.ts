// ─── ENTITIES ─────────────────────────────────────────────────────────────────

export interface Service {
  id: number
  name: string
  description: string
  image: string | null
  icon: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  bio: string | null
  photo: string | null
  schedule: string | null
  is_active: boolean
  experience_years: number | null
  created_at: string
  updated_at: string
}

export interface Patient {
  id: number
  name: string
  phone: string
  email: string | null
}

export interface Appointment {
  id: number
  patient_id: number
  service_id: number
  doctor_id: number | null
  date: string
  time: string
  message: string | null
  status: AppointmentStatus
  patient?: Patient
  service?: Service
  doctor?: Doctor | null
  created_at: string
  updated_at: string
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export interface Message {
  id: number
  name: string
  email: string | null
  phone: string | null
  message: string
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  name: string
  email: string
}

// ─── API ───────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface LoginRequest {
  email: string
  password: string
}

export type LoginCredentials = LoginRequest

export interface LoginResponse {
  user: User
  token: string
}

export interface AppointmentRequest {
  name: string
  phone: string
  email?: string
  service_id: number
  doctor_id?: number
  date: string
  time: string
  message?: string
}

export interface MessageRequest {
  name: string
  email?: string
  phone?: string
  message: string
}

export interface AppointmentStats {
  total: number
  today: number
  pending: number
  confirmed: number
}

// ─── UI ────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  dropdown?: { label: string; href: string }[]
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface Testimonial {
  text: string
  author: string
  city: string
  initials: string
  color: string
}

export interface Partner {
  name: string
}

export interface NewsArticle {
  category: string
  categoryColor: string
  bgColor: string
  title: string
  excerpt: string
  date: string
}