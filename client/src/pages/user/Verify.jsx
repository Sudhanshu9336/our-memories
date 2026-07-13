import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Lock, Heart } from 'lucide-react';

const Verify = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', nickname: '', birthDate: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await api.post('/verify', formData);
      if (res.data.success) {
        toast.success("Welcome, my love! ❤️");
        localStorage.setItem('verified', 'true');
        navigate('/home');
      }
    } catch (err) {
      setError(true);
      toast.error(err.response?.data?.message || "Oops ❤️ Wrong Answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4 relative"
    >
      <motion.div 
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 md:p-12 rounded-3xl w-full max-w-md z-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
        <div className="text-center mb-8">
          <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Lock className="w-8 h-8 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Secret Gateway</h2>
          <p className="text-gray-400 text-sm">Only the special one holds the key.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">What is your name?</label>
            <input 
              type="text" 
              required
              className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">What does your boyfriend call you?</label>
            <input 
              type="text" 
              required
              className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              placeholder="Your special nickname"
              value={formData.nickname}
              onChange={(e) => setFormData({...formData, nickname: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">What's your birth date?</label>
            <input 
              type="date" 
              required
              className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary flex justify-center items-center gap-2 mt-4"
          >
            {loading ? <span className="animate-pulse">Checking...</span> : <>Unlock My Heart <Heart className="w-5 h-5" /></>}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Verify;
