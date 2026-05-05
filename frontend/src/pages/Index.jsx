import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  { icon: '🩺', title: 'Find a Doctor', desc: 'Browse certified vets by specialty, location, and availability.', to: '/find-doctor', color: 'from-[var(--color-primary)]/10 to-[var(--color-accent)]/5' },
  { icon: '🚑', title: 'Rescue Services', desc: '24/7 animal rescue & emergency transport across the city.', to: '/contact', color: 'from-rose-500/10 to-red-600/5' },
  { icon: '💊', title: 'Medicines', desc: 'Order vet-approved medicines, vitamins, and supplements online.', to: '/medicines', color: 'from-blue-500/10 to-indigo-600/5' },
  { icon: '📝', title: 'Blog & Community', desc: 'Share experiences, read tips, and connect with pet parents.', to: '/blog', color: 'from-amber-500/10 to-yellow-600/5' },
  { icon: '🗓️', title: 'Book Appointment', desc: 'Schedule vet visits, grooming, and wellness checkups.', to: '/dashboard', color: 'from-purple-500/10 to-violet-600/5' },
  { icon: '🏠', title: 'Pet Boarding', desc: 'Safe, loving boarding facilities for when you\'re away.', to: '/contact', color: 'from-pink-500/10 to-rose-600/5' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    localStorage.setItem('petcure_visited', 'true');
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-15 px-6 bg-[#ADD8E6]">
        <div className="absolute inset-0 opacity-20 bg-white/30" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl bg-white/20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-black text-sm mb-6"
            >
              🐾 Welcome to PetCure
            </motion.div>
            <h1 className="text-5xl font-extrabold text-black leading-tight mb-5">
              Your Pet's Health{' '}
              <span className="gradient-text">Starts Here</span>
            </h1>
            <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium">
              PetCure provides trusted animal healthcare, rescue support, and a caring community for your furry companions.
            </p>
            <div className="flex gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/register" className="btn-primary px-8 py-3.5">Book Appointment 🗓️</Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/find-doctor" className="btn-outline px-8 py-3.5">Find a Vet 🩺</Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 h-[400px] sm:h-[400px] lg:h-[550px] w-full"
            >
              <img
                src="/GroupPhoto.jpg"
                alt="animals"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 glass-card !rounded-2xl p-3"
            >
              <p className="text-sm font-extrabold text-black">500+ Vets</p>
              <p className="text-xs text-gray-800">Available Now</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 glass-card !rounded-2xl p-3 border-[var(--color-primary)]/30"
            >
              <p className="text-sm font-extrabold text-[var(--color-primary)]">24/7 Rescue</p>
              <p className="text-xs text-gray-800">Emergency Ready</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-wrapper">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-blue mb-4">Our Services</span>
          <h2 className="text-4xl font-extrabold text-black">What We Offer</h2>
          <p className="text-gray-800 mt-3 max-w-xl mx-auto">Comprehensive pet care services designed for every need.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              variants={fadeUp} initial="hidden" whileInView="show" custom={i}
              viewport={{ once: true }}
            >
              <Link to={svc.to} className="block h-full">
                <motion.div
                  className={`glass-card p-7 h-full bg-gradient-to-br ${svc.color}`}
                >
                  <div className="text-4xl mb-4 text-black transition-colors">{svc.icon}</div>
                  <h3 className="text-lg font-extrabold text-black mb-2">{svc.title}</h3>
                  <p className="text-gray-800 text-sm leading-relaxed">{svc.desc}</p>
                  <span className="inline-block mt-4 text-[var(--color-primary)] text-sm font-medium">Explore →</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
