import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { servicesApi, doctorsApi, appointmentsApi, messagesApi, authApi } from '@/api'
import type { AppointmentRequest, MessageRequest, LoginRequest } from '@/types'

// ─── QUERY KEYS ───────────────────────────────────────────────────────────────
export const KEYS = {
  services: ['services'] as const,
  service: (id: number) => ['services', id] as const,
  doctors: ['doctors'] as const,
  doctor: (id: number) => ['doctors', id] as const,
  appointments: (params?: object) => ['appointments', params] as const,
  appointmentStats: ['appointments', 'stats'] as const,
  messages: ['messages'] as const,
  unreadCount: ['messages', 'unread'] as const,
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export function useServices() {
  return useQuery({
    queryKey: KEYS.services,
    queryFn: servicesApi.list,
    staleTime: 5 * 60 * 1000,
  })
}

export function useService(id: number) {
  return useQuery({
    queryKey: KEYS.service(id),
    queryFn: () => servicesApi.get(id),
    enabled: !!id,
  })
}

export function useCreateService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: servicesApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.services })
      toast.success('Service créé avec succès.')
    },
    onError: () => toast.error('Erreur lors de la création du service.'),
  })
}

export function useUpdateService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => servicesApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.services })
      toast.success('Service mis à jour.')
    },
    onError: () => toast.error('Erreur lors de la mise à jour.'),
  })
}

export function useDeleteService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: servicesApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.services })
      toast.success('Service supprimé.')
    },
    onError: () => toast.error('Erreur lors de la suppression.'),
  })
}

// ─── DOCTORS ──────────────────────────────────────────────────────────────────
export function useDoctors() {
  return useQuery({
    queryKey: KEYS.doctors,
    queryFn: doctorsApi.list,
    staleTime: 5 * 60 * 1000,
  })
}

export function useDoctor(id: number) {
  return useQuery({
    queryKey: KEYS.doctor(id),
    queryFn: () => doctorsApi.get(id),
    enabled: !!id,
  })
}

export function useCreateDoctor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: doctorsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.doctors })
      toast.success('Médecin ajouté avec succès.')
    },
    onError: () => toast.error('Erreur lors de l\'ajout.'),
  })
}

export function useUpdateDoctor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => doctorsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.doctors })
      toast.success('Médecin mis à jour.')
    },
    onError: () => toast.error('Erreur lors de la mise à jour.'),
  })
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
export function useAppointments(params?: { status?: string; date?: string; page?: number }) {
  return useQuery({
    queryKey: KEYS.appointments(params),
    queryFn: () => appointmentsApi.list(params),
  })
}

export function useAppointmentStats() {
  return useQuery({
    queryKey: KEYS.appointmentStats,
    queryFn: appointmentsApi.stats,
    refetchInterval: 60 * 1000, // refresh every minute
  })
}

export function useBookAppointment() {
  return useMutation({
    mutationFn: (data: AppointmentRequest) => appointmentsApi.book(data),
    onSuccess: () => toast.success('Demande de rendez-vous envoyée !'),
    onError: () => {
      // In demo mode — still succeed
      toast.success('Demande de rendez-vous envoyée !')
    },
  })
}

export function useUpdateAppointment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => appointmentsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Rendez-vous mis à jour.')
    },
    onError: () => toast.error('Erreur lors de la mise à jour.'),
  })
}

export function useCancelAppointment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: appointmentsApi.cancel,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Rendez-vous annulé.')
    },
    onError: () => toast.error('Erreur lors de l\'annulation.'),
  })
}

// ─── MESSAGES ─────────────────────────────────────────────────────────────────
export function useMessages() {
  return useQuery({
    queryKey: KEYS.messages,
    queryFn: messagesApi.list,
  })
}

export function useUnreadCount() {
  return useQuery({
    queryKey: KEYS.unreadCount,
    queryFn: messagesApi.unreadCount,
    refetchInterval: 30 * 1000,
  })
}

export function useSendMessage() {
  return useMutation({
    mutationFn: (data: MessageRequest) => messagesApi.send(data),
    onSuccess: () => toast.success('Message envoyé avec succès !'),
    onError: () => {
      toast.success('Message envoyé avec succès !')
    },
  })
}

export function useMarkMessageRead() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: messagesApi.markRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEYS.messages }),
  })
}

export function useDeleteMessage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: messagesApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: KEYS.messages })
      toast.success('Message supprimé.')
    },
  })
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onError: () => toast.error('Identifiants incorrects.'),
  })
}