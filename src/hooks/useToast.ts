// src/hooks/useToast.ts
import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

let counter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++counter
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000)
  }, [])

  const remove = useCallback((id: number) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  return {
    toasts,
    success: (msg: string) => push(msg, 'success'),
    error:   (msg: string) => push(msg, 'error'),
    info:    (msg: string) => push(msg, 'info'),
    warning: (msg: string) => push(msg, 'warning'),
    remove,
  }
}