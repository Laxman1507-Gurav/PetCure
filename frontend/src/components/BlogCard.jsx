import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogCard({ blog }) {
  const imageUrl = blog.image ? blog.image : null;

  return (
    <motion.div
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-40">🐾</div>
        )}
        <div className="absolute top-3 left-3">
          <span className="badge badge-green">{blog.category || 'General'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-black mb-2 line-clamp-2 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-800 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
          {blog.content}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {blog.authorName?.[0]?.toUpperCase() || 'A'}
            </div>
            <span className="text-xs text-gray-800">{blog.authorName || 'Anonymous'}</span>
          </div>
          <span className="text-xs text-gray-800">
            {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>

        <Link
          to={`/blog/${blog._id}`}
          className="btn-outline !py-2 !text-sm mt-4 text-center"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
}
