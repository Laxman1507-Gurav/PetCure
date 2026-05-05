import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/index' },
  { label: 'Blog', to: '/blog' },
  { label: 'Find Doctor', to: '/find-doctor' },
  { label: 'Medicines', to: '/medicines' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/index" className="flex items-center gap-2 group">
            <span className="text-white font-bold text-lg">🐾</span>
            <span className="text-xl font-bold text-black tracking-tight group-hover:text-[var(--color-primary)] transition-colors">PetCure</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks
              .filter(link => {
                // Only hide Home/Services if the user is logged in AND on the Dashboard or internal routes
                const isAuthFlow = ['/dashboard', '/blog/create'].includes(location.pathname) || (user && ['/index', '/dashboard'].includes(location.pathname));
                if (isAuthFlow && (link.label === 'Home' || link.label === 'Services')) return false;
                return true;
              })
              .map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm transition-all duration-200 ${location.pathname === link.to
                    ? 'text-[var(--color-primary)] font-semibold border-b-2 border-[var(--color-primary)]'
                    : 'text-black font-medium'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-all text-black"
              title="Toggle theme"
            >
              {isDark ? '🌙' : '☀️'}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-black">{user.name}</span>
                  <span className="text-gray-500 text-xs">▾</span>
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setDropOpen(false)}
                        className="block px-4 py-3 text-sm text-black transition-colors"
                      >
                        📊 Dashboard
                      </Link>
                      <button
                        onClick={() => { setDropOpen(false); handleLogout(); }}
                        className="w-full text-left px-4 py-3 text-sm text-rose-400 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" className="btn-outline !px-4 !py-2 !text-sm">Login</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/register" className="btn-primary !px-4 !py-2 !text-sm">Register</Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-gray-100 transition-all"
            onClick={() => setMenuOpen((p) => !p)}
          >
            <span className={`block w-5 h-0.5 bg-black transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-md"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks
                .filter(link => {
                  const isAuthFlow = ['/dashboard', '/blog/create'].includes(location.pathname) || (user && ['/index', '/dashboard'].includes(location.pathname));
                  if (isAuthFlow && (link.label === 'Home' || link.label === 'Services')) return false;
                  return true;
                })
                .map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === link.to
                      ? 'text-[var(--color-primary)] font-semibold bg-[var(--color-primary)]/10'
                      : 'text-black font-medium'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              <div className="pt-2 flex items-center gap-2">
                <button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm text-black">
                  {isDark ? '🌙 Dark' : '☀️ Light'}
                </button>
                {user ? (
                  <>
                    <Link to="/dashboard" className="btn-outline !px-4 !py-2 !text-sm flex-1 text-center">Dashboard</Link>
                    <button onClick={handleLogout} className="btn-primary !px-4 !py-2 !text-sm">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline !px-4 !py-2 !text-sm flex-1 text-center">Login</Link>
                    <Link to="/register" className="btn-primary !px-4 !py-2 !text-sm">Register</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
