// src/contexts/ToastContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import toast from 'react-hot-toast'

interface ToastContextType {
  toast: typeof toast
}

const ToastContext = createContext<ToastContextType>({ toast })

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => useContext(ToastContext)