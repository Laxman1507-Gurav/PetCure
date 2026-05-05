import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/axios';
import BlogCard from '../components/BlogCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useAuth } from '../context/AuthContext';

export default function Blog() {
  const { isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/blogs')
      .then((r) => setBlogs(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 section-wrapper">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <span className="badge badge-green mb-3">Community</span>
          <h1 className="text-4xl font-extrabold text-black">Pet Care Blog</h1>
          <p className="text-gray-800 mt-2">Stories, tips, and expert advice from our community.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="input-field !w-56"
          />
          {isAuthenticated && (
            <Link to="/blog/create" className="btn-primary whitespace-nowrap">
              ✍️ Write a Blog
            </Link>
          )}
        </div>
      </motion.div>

      {/* Blogs */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="text-6xl mb-4">🐾</p>
          <p className="text-gray-800 text-lg">No blogs found. {isAuthenticated ? 'Be the first to write!' : 'Login to write one!'}</p>
          {!isAuthenticated && (
            <Link to="/login" className="btn-primary mt-6 inline-flex">Login to Write</Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((blog) => (
            <motion.div
              key={blog._id}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
