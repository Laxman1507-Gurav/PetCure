import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import MapView from '../components/MapView';

const ANIMAL_TYPES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Reptile', 'Other'];
const STATUS_COLORS = {
  Pending: 'badge-amber',
  Confirmed: 'badge-green',
  Cancelled: 'badge-red',
  Completed: 'badge-blue',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [form, setForm] = useState({ animalType: 'Dog', breed: '', petName: '', contactNumber: '', notes: '' });
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.get('/bookings/my')
      .then((r) => setBookings(r.data))
      .catch(console.error)
      .finally(() => setLoadingBookings(false));
  }, []);

  const validate = () => {
    const e = {};
    if (!/^\d{10}$/.test(form.contactNumber)) e.contactNumber = 'Enter a valid 10-digit number';
    if (!selectedClinic) e.clinic = 'Please select a clinic from the map';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        clinic: {
          name: selectedClinic.name,
          lat: selectedClinic.lat,
          lng: selectedClinic.lng
        }
      };
      const { data } = await API.post('/bookings', payload);
      setBookings([data, ...bookings]);
      setForm({ animalType: 'Dog', breed: '', petName: '', contactNumber: '', notes: '' });
      setSelectedClinic(null);
      toast.success('Appointment booked successfully! 🐾');
    } catch (err) {
      console.error('Booking error:', err);
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 section-wrapper">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <span className="badge badge-green mb-3">Dashboard</span>
        <h1 className="text-4xl font-extrabold text-black">
          Welcome back, <span className="gradient-text">{user?.name}</span> 👋
        </h1>
        <p className="text-gray-800 mt-2">Book appointments and manage your pet care journey.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* ── Booking Form ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card p-7">
            <h2 className="text-xl font-bold text-black mb-6">📅 Book an Appointment</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Animal Type */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Animal Type *</label>
                <select
                  value={form.animalType}
                  onChange={(e) => setForm({ ...form, animalType: e.target.value })}
                  className="input-field"
                >
                  {ANIMAL_TYPES.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Breed</label>
                <input
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  placeholder="e.g. Golden Retriever"
                  className="input-field"
                />
              </div>

              {/* Pet Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Pet Name (optional)</label>
                <input
                  value={form.petName}
                  onChange={(e) => setForm({ ...form, petName: e.target.value })}
                  placeholder="e.g. Bruno"
                  className="input-field"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Contact Number *</label>
                <input
                  value={form.contactNumber}
                  onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={`input-field ${errors.contactNumber ? 'border-rose-500' : ''}`}
                  maxLength={10}
                />
                {errors.contactNumber && <p className="text-rose-400 text-xs mt-1">{errors.contactNumber}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Additional Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Describe symptoms or concerns..."
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              {/* Map */}
              <div>
                <label className="block text-sm font-medium text-black mb-3">Select Nearby Clinic *</label>
                <MapView onSelectClinic={setSelectedClinic} selectedClinic={selectedClinic} />
                {errors.clinic && <p className="text-rose-400 text-xs mt-2 font-medium">{errors.clinic}</p>}
              </div>

              <motion.button
                type="submit" disabled={submitting}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="btn-primary w-full py-3.5 justify-center"
              >
                {submitting ? 'Booking...' : 'Book Appointment 🐾'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* ── Previous Bookings ── */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="glass-card p-7">
            <h2 className="text-xl font-bold text-black mb-6">📋 Your Bookings</h2>

            {loadingBookings ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">📭</p>
                <p className="text-gray-800">No bookings yet. Book your first appointment!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {bookings.map((b, i) => (
                  <motion.div
                    key={b._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card !rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-black text-sm">
                          {b.animalType} {b.petName ? `— ${b.petName}` : ''}
                        </p>
                        {b.breed && <p className="text-xs text-gray-600">Breed: {b.breed}</p>}

                        {b.clinic?.name ? (
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)]">
                            <span>🏥</span>
                            <span>{b.clinic.name}</span>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 mt-1 italic">No clinic selected</p>
                        )}

                        <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">
                          {new Date(b.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`badge ${STATUS_COLORS[b.status] || 'badge-blue'} !text-[10px]`}>
                        {b.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6 mt-6">
            <h3 className="text-lg font-bold text-black mb-4">⚡ Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Find a Vet', icon: '🩺', to: '/find-doctor' },
                { label: 'Buy Medicines', icon: '💊', to: '/medicines' },
                { label: 'Read Blogs/Write a Blog', icon: '📝', to: '/blog' },
                { label: 'Contact Us', icon: '📞', to: '/contact' },
              ].map((a) => (
                <Link
                  key={a.label}
                  to={a.to}
                  className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200 transition-all text-sm text-black"
                >
                  <span className="text-lg">{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
