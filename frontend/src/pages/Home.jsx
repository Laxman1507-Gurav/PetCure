import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import IntroNavbar from '../components/IntroNavbar';

const fadeUp = {
  hidden: { opacity: 0, y: 100 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 }
  }),
};

export default function Home() {
  const heroRef = useRef(null);

  // 🔥 animation progress (0 → 1)
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen relative">

      {/* 🔥 Intro Animation (center → top-left) */}
      <IntroNavbar onProgress={setProgress} />

      {/* 🔥 MAIN CONTENT WITH SMOOTH BLUR */}
      <div
        style={{
          filter: `blur(${Math.pow(1 - progress, 2) * 10}px)`,
          transition: 'filter 0.1s linear',
          pointerEvents: progress < 1 ? 'none' : 'auto'
        }}
      >

        {/* ── Hero ──────────────────────────────────── */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-cover bg-[center_center] bg-no-repeat sm:bg-center"
            style={{
              backgroundImage: `url('/puppy.jpg')`,
              backgroundPosition: '32% center'
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm mb-6"
            >
              🐾 Trusted Animal Care Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-xl leading-tight mb-6"
            >
              Welcome to{' '}
              <span className="text-white/80">PetCure Family 🐾</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-white drop-shadow-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Caring for your pets, every step of the way
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/index" className="btn-primary text-base px-8 py-3.5 shadow-lg">
                  Join PetCure 🐶
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link to="/find-doctor" className="btn-outline text-base px-8 py-3.5">
                  Find a Vet 🩺
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ── About ─────────────────────────────────── */}
        <section className="section-wrapper">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <span className="badge badge-green mb-4">About Us</span>

              <h2 className="text-4xl font-extrabold text-black mb-5 leading-tight">
                Most Trusted <span className="gradient-text">Animal Healthcare Platform</span>
              </h2>

              <p className="text-gray-800 leading-relaxed mb-4">
                PetCure was founded with a simple mission: every animal deserves the best healthcare.
                Whether you own a dog, cat, bird, or rabbit — we have the tools and community to support you.
              </p>

              <p className="text-gray-800 leading-relaxed mb-4">
                PetCure is a modern animal healthcare and rescue platform designed to make pet care simple, accessible, and reliable.
                We help pet owners connect with nearby veterinary services, book appointments, and support animal rescue efforts.
                Our mission is to ensure every animal receives the care and attention it deserves.
              </p>

              <p className="text-gray-800 leading-relaxed mb-8">
                With 500+ verified vets, 24/7 rescue services, and a thriving blog community,
                PetCure is redefining how India cares for its pets.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[['500+', 'Vets'], ['10K+', 'Pets Helped'], ['4.9⭐', 'Rating']].map(([num, label]) => (
                  <div key={label} className="glass-card !rounded-xl p-4 text-center">
                    <p className="text-2xl font-extrabold gradient-text">{num}</p>
                    <p className="text-xs text-gray-800 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              custom={1}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden h-90 shadow-2xl"
              >
                <img
                  src="/coverpage.jpg"
                  alt="dog and cat"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="absolute -bottom-5 -left-5 glass-card !rounded-2xl p-4 w-48">
                <p className="text-2xl font-extrabold text-black">24/7</p>
                <p className="text-xs text-gray-800">Emergency Rescue Available</p>
              </div>
            </motion.div>

          </div>
        </section>
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                What You Can Do with PetCure
              </h2>
              <p className="text-gray-600">Everything your pet needs in one place</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {[
                ["🩺", "Find Vets", "Locate trusted veterinarians near you"],
                ["🚑", "Rescue Support", "Help injured animals instantly"],
                ["📅", "Easy Booking", "Book appointments in seconds"],
              ].map(([icon, title, desc]) => (
                <motion.div
                  key={title}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-[#F0F8FF] p-6 rounded-2xl shadow-xl text-center cursor-pointer"
                >
                  <div className="text-4xl mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}