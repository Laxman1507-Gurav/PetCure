import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import API from '../api/axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await API.post('/contact', form);
      setDone(true);
      toast.success('Message sent! We\'ll get back to you soon 🐾');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 section-wrapper">
      <div className="grid lg:grid-cols-2 gap-14 items-start">
        {/* Left Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge badge-green mb-4">Get in Touch</span>
          <h1 className="text-4xl font-extrabold text-black mb-4">
            We're here to <span className="gradient-text">help</span>
          </h1>
          <p className="text-gray-800 leading-relaxed mb-10">
            Have questions about our services, need emergency help, or want to partner with us?
            Reach out and our team will respond within 24 hours.
          </p>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {[
              { icon: '📧', label: 'Email Us', val: 'care@petcure.com', sub: 'Response within 24 hours' },
              { icon: '📞', label: 'Call Us', val: '+91 9322857455', sub: 'Mon–Sat, 9 AM – 7 PM' },
              { icon: '📍', label: 'Visit Us', val: 'Pune, Maharashtra', sub: 'Main clinic · By appointment' },
              { icon: '🚑', label: 'Emergency', val: '+91 98765 00000', sub: 'Available 24/7' },
            ].map((c) => (
              <motion.div
                key={c.label}
                whileHover={{ x: 4 }}
                className="glass-card !rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-800 uppercase tracking-wider">{c.label}</p>
                  <p className="text-sm font-semibold text-black">{c.val}</p>
                  <p className="text-xs text-gray-800">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="glass-card p-8">
            {done ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-6xl mb-4">🎉</p>
                <h3 className="text-xl font-bold text-white/80 mb-2">Message Sent!</h3>
                <p className="text-gray-800 text-sm mb-6">Thank you for reaching out. We'll be in touch soon.</p>
                <button
                  onClick={() => setDone(false)}
                  className="btn-outline !px-6 !py-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-black mb-7">Send us a Message 💬</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2"><required>Your Name</required></label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Name"
                      className={`input-field ${errors.name ? 'border-rose-500' : ''}`}
                    />
                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2"><required>Email Address</required></label>
                    <input
                      type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className={`input-field ${errors.email ? 'border-rose-500' : ''}`}
                    />
                    {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2"><required>Message</required></label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className={`input-field resize-none ${errors.message ? 'border-rose-500' : ''}`}
                    />
                    {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <motion.button
                    type="submit" disabled={submitting}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full py-3.5 justify-center"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : 'Send Message 🚀'}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
