import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('esmad_user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('esmad_token'),
  )

  const login = useCallback((u: User, t: string) => {
    setUser(u)
    setToken(t)
    localStorage.setItem('esmad_user', JSON.stringify(u))
    localStorage.setItem('esmad_token', t)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('esmad_user')
    localStorage.removeItem('esmad_token')
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}