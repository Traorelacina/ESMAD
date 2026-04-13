import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react'
import { authApi } from '@/api'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLogin() {
  const navigate   = useNavigate()
  const { login }  = useAuth()

  const [email,    setEmail]    = useState('admin@esmad.ci')
  const [password, setPassword] = useState('admin123')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async () => {
    setError('')
    if (!email || !password) {
      setError('Veuillez renseigner vos identifiants.')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.login({ email, password })
      login(res.user, res.token)
      navigate('/admin')
    } catch {
      /* Demo fallback — accept hardcoded credentials */
      if (email === 'admin@esmad.ci' && password === 'admin123') {
        login({ id: 1, name: 'Administrateur ESMAD', email }, 'demo-token')
        navigate('/admin')
      } else {
        setError('Identifiants incorrects. Vérifiez votre email et mot de passe.')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'w-full px-4 py-3.5 border rounded-xl text-sm font-body bg-white outline-none ' +
    'transition-all duration-200 placeholder-gray-400 '

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#070E1C 0%,#0F2044 50%,#1a3a6e 100%)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),
          linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Orbs */}
      <motion.div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(21,101,192,0.22),transparent)' }}
        animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity }} />
      <motion.div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(124,179,66,0.16),transparent)' }}
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} />

      {/* Card */}
      <motion.div
        className="relative z-10 bg-white rounded-3xl w-full max-w-[440px] overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.32)' }}
        initial={{ opacity: 0, y: 48, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#1565C0,#7CB342,#D4A843)' }} />

        <div className="p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              className="w-18 h-18 rounded-2xl mx-auto mb-5 relative flex items-center justify-center"
              style={{
                width: 72, height: 72,
                background: 'linear-gradient(135deg,#7CB342,#8BC34A)',
                boxShadow: '0 0 32px rgba(124,179,66,0.45)',
              }}
              animate={{ boxShadow: ['0 0 20px rgba(124,179,66,0.3)', '0 0 50px rgba(124,179,66,0.65)', '0 0 20px rgba(124,179,66,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute bg-white rounded-sm" style={{ width: 36, height: 12, borderRadius: 2 }} />
              <div className="absolute bg-white rounded-sm" style={{ width: 12, height: 36, borderRadius: 2 }} />
            </motion.div>

            <h1 className="font-head text-2xl font-bold text-[#0A1628] mb-1">
              Administration ESMAD
            </h1>
            <p className="text-sm text-gray-400">
              Connectez-vous à votre espace d'administration
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6"
            >
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                Identifiant (Email)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="admin@esmad.ci"
                className={inputBase + 'border-gray-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.12)]'}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  className={inputBase + 'border-gray-200 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(21,101,192,0.12)] pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              className="btn-shine w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base text-white mt-2 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg,#0A1628,#0F2044)',
                boxShadow: '0 4px 20px rgba(10,22,40,0.35)',
              }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
            >
              {loading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <LogIn size={18} />
                  Se connecter
                </>
              )}
            </motion.button>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={13} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Démo</span>
            </div>
            <div className="text-xs text-gray-500 space-y-0.5">
              <div>Email : <span className="font-mono font-semibold text-gray-700">admin@esmad.ci</span></div>
              <div>Mot de passe : <span className="font-mono font-semibold text-gray-700">admin123</span></div>
            </div>
          </div>

          {/* Back to site */}
          <div className="text-center mt-5">
            <Link to="/" className="text-xs text-gray-400 hover:text-[#1565C0] transition-colors">
              ← Retour au site public
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}