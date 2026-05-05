import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Index from './pages/Index';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FindDoctor from './pages/FindDoctor';
import Medicines from './pages/Medicines';
import Contact from './pages/Contact';

import { useAuth } from './context/AuthContext';

// Premium & Responsive Loading Screen
function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fdfbfd] to-[#f8f6fc] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-sm"
      >
        {/* Floating Logo Container */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -2, 2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-3xl rounded-full scale-150" />

          <div className="relative flex flex-col items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl md:text-8xl"
            >
              🐾
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black">
              Pet<span className="text-[var(--color-primary)]">Cure</span>
            </h1>
          </div>
        </motion.div>

        {/* Shimmering Progress Container */}
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full h-1.5 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm border border-black/5">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
            />
          </div>
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500"
          >
            Initializing Care For Loyal Eyes
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Redirect authenticated users away from public pages (Home, Login, Register)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

// Special wrapper for the landing page (Home)
function LandingRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  // If authenticated, redirect to dashboard or index
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

// Premium Page transition wrapper
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 1.02 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a "glide" feel
      }}
    >
      {children}
    </motion.div>
  );
}

// Global Back Button Component
function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate(-1)}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors"
      title="Go Back"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </motion.button>
  );
}

export default function App() {
  const location = useLocation();

  // Pages that should not show footer
  const noFooterRoutes = ['/login', '/register'];
  const showFooter = !noFooterRoutes.includes(location.pathname);

  // Pages that should not show navbar
  const noNavbarRoutes = ['/', '/login', '/register'];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1e1b4b',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: { iconTheme: { primary: '#8b5cf6', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      <GlobalBackButton />
      {showNavbar && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingRoute><PageWrapper><Home /></PageWrapper></LandingRoute>} />
            <Route path="/index" element={<PageWrapper><Index /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/blog/create" element={
              <ProtectedRoute>
                <PageWrapper><CreateBlog /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/blog/:id" element={<PageWrapper><BlogDetail /></PageWrapper>} />
            <Route path="/login" element={<PublicRoute><PageWrapper><Login /></PageWrapper></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><PageWrapper><Register /></PageWrapper></PublicRoute>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <PageWrapper><Dashboard /></PageWrapper>
              </ProtectedRoute>
            } />
            <Route path="/find-doctor" element={<PageWrapper><FindDoctor /></PageWrapper>} />
            <Route path="/medicines" element={<PageWrapper><Medicines /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            {/* 404 catch-all */}
            <Route path="*" element={
              <PageWrapper>
                <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
                  <p className="text-8xl mb-4">🐾</p>
                  <h1 className="text-4xl font-extrabold text-black mb-3">404 — Page Not Found</h1>
                  <p className="text-gray-800 mb-8">Looks like this page went for a walk and didn't come back.</p>
                  <Link to="/index" className="btn-primary px-8 py-3">Go Home</Link>
                </div>
              </PageWrapper>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
