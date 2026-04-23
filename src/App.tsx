import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

import HomePage from '@/pages/HomePage'
import { ServicesPage, DoctorsPage, CliniqueePage, AssurancesPage } from '@/pages/PublicPages'
import { ContactPage } from '@/pages/FormPages'

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminLogin    = lazy(() => import('@/pages/admin/AdminLogin'))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
})

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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

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

function AppRouter() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/clinique"   element={<PublicLayout><CliniqueePage /></PublicLayout>} />
        <Route path="/services"   element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/assurances" element={<PublicLayout><AssurancesPage /></PublicLayout>} />
        <Route path="/medecins"   element={<PublicLayout><DoctorsPage /></PublicLayout>} />
        <Route path="/contact"    element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<Suspense fallback={<Spinner />}><AdminLogin /></Suspense>} />
        <Route path="/admin"       element={<ProtectedRoute><Suspense fallback={<Spinner />}><AdminDashboard /></Suspense></ProtectedRoute>} />
        <Route path="/admin/*"     element={<ProtectedRoute><Suspense fallback={<Spinner />}><AdminDashboard /></Suspense></ProtectedRoute>} />

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