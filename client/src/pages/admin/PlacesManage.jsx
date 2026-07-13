import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const PlacesManage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', coverImage: '', date: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const res = await api.get('/places');
      setPlaces(res.data);
    } catch (err) {
      toast.error('Failed to load places');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/places/${editId}`, formData);
        toast.success('Place updated successfully');
      } else {
        await api.post('/places', formData);
        toast.success('Place created successfully');
      }
      setShowModal(false);
      setFormData({ name: '', description: '', coverImage: '', date: '' });
      setEditId(null);
      fetchPlaces();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this place and all its media?')) {
      try {
        await api.delete(`/places/${id}`);
        toast.success('Place deleted');
        fetchPlaces();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const openEditModal = (place) => {
    setFormData({
      name: place.name,
      description: place.description || '',
      coverImage: place.coverImage || '',
      date: place.date ? new Date(place.date).toISOString().split('T')[0] : '',
    });
    setEditId(place._id);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Places</h1>
        <button 
          onClick={() => {
            setEditId(null);
            setFormData({ name: '', description: '', coverImage: '', date: '' });
            setShowModal(true);
          }}
          className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Place
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <motion.div 
              key={place._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
            >
              <img 
                src={place.coverImage || 'https://via.placeholder.com/400x300'} 
                alt={place.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{place.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{place.description}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10">
                  <Link 
                    to={`/admin/places/${place._id}/media`}
                    className="text-primary-400 hover:text-primary-300 flex items-center gap-1 text-sm font-medium transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" /> Manage Media
                  </Link>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(place)} className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(place._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">{editId ? 'Edit Place' : 'Add New Place'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Place Name</label>
                <input 
                  type="text" required
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary-500 focus:outline-none"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea 
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary-500 focus:outline-none"
                  rows="3"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Cover Image URL</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary-500 focus:outline-none"
                  value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary-500 focus:outline-none"
                  value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-primary-600 hover:bg-primary-500 text-white py-2 rounded-lg transition-colors">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PlacesManage;
