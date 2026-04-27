// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authApi, type Admin } from '@/api/client'

interface AuthContextType {
  admin: Admin | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean          // ← AJOUT
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setAdmin: (a: Admin) => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin]     = useState<Admin | null>(null)
  const [token, setToken]     = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Hydratation au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('esmad_token')
    if (saved) {
      setToken(saved)
      authApi.me()
        .then((data) => setAdmin((data as any).data ?? data))
        .catch(() => {
          localStorage.removeItem('esmad_token')
          setToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    localStorage.setItem('esmad_token', res.token)
    setToken(res.token)
    setAdmin(res.admin)
  }

  const logout = async () => {
    try { await authApi.logout() } catch {}
    localStorage.removeItem('esmad_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{
      admin,
      token,
      loading,
      isAuthenticated: !!token && !!admin,   // ← AJOUT
      login,
      logout,
      setAdmin,
    }}>
      {/* Bloque le rendu jusqu'à ce que l'hydratation soit terminée */}
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)