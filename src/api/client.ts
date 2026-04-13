import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

// Inject Sanctum token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('esmad_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 → redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('esmad_token')
      localStorage.removeItem('esmad_user')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  },
)

export default api