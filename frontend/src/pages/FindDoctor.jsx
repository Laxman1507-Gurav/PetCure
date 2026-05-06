import { motion } from 'framer-motion';
import MapView from '../components/MapView';

export default function FindDoctor() {
  return (
    <div className="min-h-screen pt-24 section-wrapper">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <span className="badge badge-green mb-4">Locate</span>
        <h1 className="text-4xl font-extrabold text-black mb-2">Find a Doctor 🩺</h1>
        <p className="text-gray-800 mb-10">Explore certified veterinary clinics near you on the map.</p>

        <div className="glass-card p-6">
          <MapView />
        </div>

        {/* Tips */}
        <div className="grid sm:grid-cols-3 gap-5 mt-10">
          {[
            { icon: '📍', title: 'Detect Location', desc: 'Click "My Location" to find clinics closest to you.' },
            { icon: '🏥', title: 'Select a Clinic', desc: 'Click any violet marker to view clinic info and select it.' },
            { icon: '📅', title: 'Book Appointment', desc: 'Go to Dashboard to confirm your appointment at the selected clinic.' },
          ].map((t) => (
            <motion.div
              key={t.title}
              whileHover={{ y: -4 }}
              className="glass-card p-5"
            >
              <span className="text-3xl">{t.icon}</span>
              <h3 className="text-base font-bold text-black mt-3 mb-1">{t.title}</h3>
              <p className="text-gray-800 text-sm">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
