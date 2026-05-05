import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';


// ✅ MOVE FIELD COMPONENT OUTSIDE
const Field = ({ name, label, type = 'text', placeholder, form, setForm, errors }) => (
  <div>
    <label className="block text-sm font-medium text-black mb-2">{label}</label>

    <input
      type={type}
      value={form[name]}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          [name]: e.target.value
        }))
      }
      placeholder={placeholder}
      className={`input-field ${errors[name] ? 'border-red-500' : ''}`}
    />

    {errors[name] && (
      <p className="text-red-600 text-xs mt-1 font-medium">
        {errors[name]}
      </p>
    )}
  </div>
);


export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      login(data);
      toast.success(`Welcome to PetCure, ${data.name}! 🐾`);
      navigate('/dashboard');

    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black/10 z-10" />

        <img
          src="/lab puppy.jpg"
          alt="puppy"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        <div className="absolute top-10 left-10 z-20 flex items-center gap-4">
          <span className="text-3xl">🐾</span>
          <h2 className="text-3xl font-extrabold text-white drop-shadow-2xl tracking-wide">
            PetCure
          </h2>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-24 relative">

        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md"
        >

          {/* Header */}
          <div className="mb-10 lg:hidden text-center">
            <span className="text-5xl">🐾</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Create Account ✨
            </h1>
            <p className="text-gray-600 text-sm">
              Join the PetCure community today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field name="name" label="Full Name" placeholder="Name" form={form} setForm={setForm} errors={errors} />
              <Field name="email" label="Email Address" type="email" placeholder="example@gmail.com" form={form} setForm={setForm} errors={errors} />
            </div>

            <Field name="password" label="Password" type="password" placeholder="••••••••" form={form} setForm={setForm} errors={errors} />
            <Field name="confirm" label="Confirm Password" type="password" placeholder="••••••••" form={form} setForm={setForm} errors={errors} />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full py-3.5 justify-center mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Join PetCure 🚀'
              )}
            </motion.button>

          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)] transition-colors"
            >
              Sign in here
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}