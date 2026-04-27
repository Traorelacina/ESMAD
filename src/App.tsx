// App.tsx
import { Suspense, lazy, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import AdminLayout from '@/components/admin/AdminLayout'
import { contactsApi } from '@/api/client'

import HomePage from '@/pages/HomePage'
import { ServicesPage, DoctorsPage, CliniqueePage, AssurancesPage } from '@/pages/PublicPages'
import { ContactPage } from '@/pages/FormPages'

// Admin pages
const AdminLogin        = lazy(() => import('@/pages/admin/LoginPage'))
const DashboardPage     = lazy(() => import('@/pages/admin/DashboardPage'))
const MedecinsPage      = lazy(() => import('@/pages/admin/MedecinsPage'))
const SpecialitesPage   = lazy(() => import('@/pages/admin/SpecialitesPage'))
const ServicesPageAdmin  = lazy(() => import('@/pages/admin/ServicesPage'))
const AssurancesPageAdmin = lazy(() => import('@/pages/admin/AssurancesPage'))
const ContactsPage      = lazy(() => import('@/pages/admin/ContactsPage'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
})

// ── Spinner ───────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl relative flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7CB342, #8BC34A)', boxShadow: '0 0 30px rgba(124,179,66,0.4)' }}
        >
          <div className="absolute bg-white rounded-sm" style={{ width: 30, height: 10 }} />
          <div className="absolute bg-white rounded-sm" style={{ width: 10, height: 30 }} />
        </div>
        <div className="text-sm text-gray-400">Chargement...</div>
      </div>
    </div>
  )
}

// ── Guards ────────────────────────────────────────────────────────────────────

/**
 * Attend la fin du chargement avant de décider.
 * Sans ça, ProtectedRoute redirige vers /admin/login avant que
 * les setState() du login() soient appliqués.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Spinner />

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

/**
 * Empêche un admin déjà connecté d'accéder à la page login.
 */
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Spinner />

  return isAuthenticated ? <Navigate to="/admin/" replace /> : <>{children}</>
}

// ── Layouts ───────────────────────────────────────────────────────────────────

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

// ── Admin app ─────────────────────────────────────────────────────────────────

function AdminApp() {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(() => {
    const path = location.pathname.replace('/admin/', '').replace('/admin', '')
    return path || 'dashboard'
  })
  const [unreadCount, setUnreadCount] = useState(0)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      contactsApi.stats().then(stats => {
        setUnreadCount(stats.nouveaux)
      }).catch(() => {})
    }
  }, [isAuthenticated, currentPage])

  // Sync state with URL when location changes
  useEffect(() => {
    const path = location.pathname.replace('/admin/', '').replace('/admin', '')
    const page = path || 'dashboard'
    if (page !== currentPage) {
      setCurrentPage(page)
    }
  }, [location.pathname])

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    navigate(`/admin/${page === 'dashboard' ? '' : page}`)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':   return <DashboardPage />
      case 'medecins':    return <MedecinsPage />
      case 'specialites': return <SpecialitesPage />
      case 'services':    return <ServicesPageAdmin />
      case 'assurances':  return <AssurancesPageAdmin />
      case 'contacts':    return <ContactsPage onUnreadChange={setUnreadCount} />
      default:            return <DashboardPage />
    }
  }

  return (
    <AdminLayout
      page={currentPage}
      onNavigate={handleNavigate}
      unreadContacts={unreadCount}
    >
      {renderPage()}
    </AdminLayout>
  )
}

// ── Router ────────────────────────────────────────────────────────────────────

function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public routes */}
        <Route path="/"           element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/clinique"   element={<PublicLayout><CliniqueePage /></PublicLayout>} />
        <Route path="/services"   element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/assurances" element={<PublicLayout><AssurancesPage /></PublicLayout>} />
        <Route path="/medecins"   element={<PublicLayout><DoctorsPage /></PublicLayout>} />
        <Route path="/contact"    element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Login — redirige vers /admin/ si déjà connecté */}
        <Route path="/admin/login" element={
          <GuestRoute>
            <Suspense fallback={<Spinner />}>
              <AdminLogin />
            </Suspense>
          </GuestRoute>
        } />

        {/* Admin — protégé */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Suspense fallback={<Spinner />}>
              <AdminApp />
            </Suspense>
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={
          <PublicLayout>
            <div className="min-h-[60vh] flex items-center justify-center text-center px-7">
              <div>
                <div className="font-head text-8xl font-bold text-gray-100 mb-4">404</div>
                <h1 className="font-head text-3xl font-bold text-navy mb-3">Page introuvable</h1>
                <p className="text-gray-500 mb-6">La page que vous recherchez n'existe pas.</p>
                <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #1565C0, #1976D2)' }}>
                  Retour à l'accueil
                </a>
              </div>
            </div>
          </PublicLayout>
        } />

      </Routes>
    </AnimatePresence>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '14px',
              color: '#111827',
            },
            success: { iconTheme: { primary: '#7CB342', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#C62828', secondary: '#fff' } },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  )
}