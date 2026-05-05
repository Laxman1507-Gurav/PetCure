import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import API from '../api/axios';

const CATEGORIES = ['General', 'Health Tips', 'Rescue Stories', 'Nutrition', 'Training', 'News'];

export default function CreateBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return toast.error('Title and content are required');
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('content', form.content);
      fd.append('category', form.category);
      if (image) fd.append('image', image);

      await API.post('/blogs', fd);
      toast.success('Blog published! 🎉');
      navigate('/blog');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to publish');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 section-wrapper max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <span className="badge badge-green mb-4">Create Post</span>
        <h1 className="text-4xl font-extrabold text-black mb-8">Write a Blog ✍️</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Title *</label>
            <input name="title" value={form.title} onChange={handleChange}
              placeholder="Give your blog a great title..."
              className="input-field" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Cover Image (optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-white/20/40 transition-colors cursor-pointer relative">
              <input type="file" accept="image/*" onChange={handleImage}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              ) : (
                <div className="text-gray-800">
                  <p className="text-4xl mb-2">🖼️</p>
                  <p className="text-sm">Click to upload an image (max 5MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Content *</label>
            <textarea name="content" value={form.content} onChange={handleChange}
              placeholder="Share your thoughts, story, or tips..."
              rows={10} className="input-field resize-none" />
          </div>

          <motion.button
            type="submit" disabled={submitting}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="btn-primary w-full py-3.5 justify-center"
          >
            {submitting ? 'Publishing...' : 'Publish Blog 🚀'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
