import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#ADD8E6] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/index" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg border border-gray-200">
                <span className="text-lg">🐾</span>
              </div>
              <span className="text-2xl font-bold text-black tracking-tight">PetCure</span>
            </Link>
            <p className="text-black text-sm leading-relaxed max-w-xs">
              Your trusted animal healthcare & rescue platform. Connecting pets with the care they deserve.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/index' },
                { label: 'Blog', to: '/blog' },
                { label: 'Find Doctor', to: '/find-doctor' },
                { label: 'Medicines', to: '/medicines' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-800 hover:text-black text-sm transition-colors font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>📧 [EMAIL_ADDRESS]</li>
              <li>📞 +91 80103 14218</li>
              <li>📍 Pune, Maharashtra, India</li>
            </ul>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="btn-primary !px-4 !py-2 !text-sm mt-5 inline-flex">
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-black text-sm">© {new Date().getFullYear()} PetCure. All rights reserved.</p>
          <p className="text-black text-sm font-medium">Made with ❤️ for animals</p>
        </div>
      </div>
    </footer>
  );
}
