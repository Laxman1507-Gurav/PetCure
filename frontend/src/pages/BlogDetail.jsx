import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/blogs/${id}`)
      .then((r) => setBlog(r.data))
      .catch(() => toast.error('Blog not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await API.delete(`/blogs/${id}`);
      toast.success('Blog deleted');
      navigate('/blog');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) return (
    <div className="min-h-screen pt-24 text-center">
      <p className="text-gray-800">Blog not found.</p>
      <Link to="/blog" className="bg-black text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-colors mt-4 inline-flex items-center gap-2">← Back to Blogs</Link>
    </div>
  );

  const isOwner = user && (user._id === blog.author || user.role === 'admin');

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          {/* Back */}
          <Link to="/blog" className="btn-outline !px-4 !py-2 !text-xs mb-6 inline-flex items-center gap-2">
            ← Back to Blogs
          </Link>

          {/* Badge & Category */}
          <div className="flex items-center gap-3 mt-4 mb-5">
            <span className="badge badge-green">{blog.category || 'General'}</span>
            <span className="text-gray-800 text-sm">
              {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-4 leading-tight">{blog.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center font-bold text-white shadow-sm">
              {blog.authorName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-black">{blog.authorName || 'Anonymous'}</p>
              <p className="text-xs text-gray-800">Author</p>
            </div>
            {isOwner && (
              <div className="ml-auto flex gap-2">
                <button
                  onClick={handleDelete}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>

          {/* Cover Image */}
          {blog.image && (
            <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
              <img src={blog.image} alt={blog.title} className="w-full h-72 object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none text-black leading-relaxed whitespace-pre-line text-base">
            {blog.content}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
