import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Save, Upload, Plus, Trash2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const [formData, setFormData] = useState({
    girlfriendName: '',
    nickname: '',
    birthDate: '',
    landingPageText: '',
    websiteTitle: '',
    themeColor: '',
    backgroundMusicUrl: '',
    boyAvatarUrl: '',
    girlAvatarUrl: '',
    relationshipStartDate: '',
    loveReasons: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingBoy, setUploadingBoy] = useState(false);
  const [uploadingGirl, setUploadingGirl] = useState(false);
  const [newReason, setNewReason] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data) {
          const data = { ...res.data };
          if (data.birthDate) {
            data.birthDate = new Date(data.birthDate).toISOString().split('T')[0];
          }
          if (data.relationshipStartDate) {
            data.relationshipStartDate = new Date(data.relationshipStartDate).toISOString().split('T')[0];
          }
          setFormData({
            girlfriendName: data.girlfriendName || '',
            nickname: data.nickname || '',
            birthDate: data.birthDate || '',
            landingPageText: data.landingPageText || '',
            websiteTitle: data.websiteTitle || '',
            themeColor: data.themeColor || '',
            backgroundMusicUrl: data.backgroundMusicUrl || '',
            boyAvatarUrl: data.boyAvatarUrl || '',
            girlAvatarUrl: data.girlAvatarUrl || '',
            relationshipStartDate: data.relationshipStartDate || '',
            loveReasons: data.loveReasons || []
          });
        }
      } catch (err) {
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const setUploading = type === 'boy' ? setUploadingBoy : setUploadingGirl;
    setUploading(true);
    
    const fd = new FormData();
    fd.append('avatar', file);
    
    try {
      const res = await api.post('/settings/upload-avatar', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const key = type === 'boy' ? 'boyAvatarUrl' : 'girlAvatarUrl';
      setFormData(prev => ({ ...prev, [key]: res.data.url }));
      toast.success(`${type === 'boy' ? 'Your' : 'Her'} avatar uploaded!`);
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const addReason = () => {
    if (newReason.trim()) {
      setFormData(prev => ({ ...prev, loveReasons: [...prev.loveReasons, newReason.trim()] }));
      setNewReason('');
    }
  };

  const removeReason = (index) => {
    setFormData(prev => ({
      ...prev,
      loveReasons: prev.loveReasons.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', formData);
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400 flex items-center justify-center min-h-[50vh]">Loading settings...</div>;

  const inputClass = "w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary-500 focus:outline-none transition-colors";

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-white mb-8">Settings & Configuration</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Verification Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-primary-400 border-b border-white/10 pb-3 mb-6">🔐 Verification Answers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Her Real Name</label>
              <input type="text" name="girlfriendName" required className={inputClass} value={formData.girlfriendName} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nickname (What you call her)</label>
              <input type="text" name="nickname" required className={inputClass} value={formData.nickname} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Her Birth Date</label>
              <input type="date" name="birthDate" required className={inputClass} value={formData.birthDate} onChange={handleChange} />
            </div>
          </div>
        </motion.div>

        {/* Website Config */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 md:p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-primary-400 border-b border-white/10 pb-3 mb-6">⚙️ Website Config</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Website Title</label>
              <input type="text" name="websiteTitle" className={inputClass} value={formData.websiteTitle} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Landing Page Text</label>
              <input type="text" name="landingPageText" className={inputClass} value={formData.landingPageText} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Background Music URL</label>
              <input type="text" name="backgroundMusicUrl" className={inputClass} value={formData.backgroundMusicUrl} onChange={handleChange} placeholder="Link to an audio file" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Relationship Start Date</label>
              <input type="date" name="relationshipStartDate" className={inputClass} value={formData.relationshipStartDate} onChange={handleChange} />
            </div>
          </div>
        </motion.div>

        {/* Avatar Uploads */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 md:p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-primary-400 border-b border-white/10 pb-3 mb-6">💑 Surprise Animation Avatars</h3>
          <p className="text-gray-400 text-sm mb-6">Upload face photos for the personalized kneeling proposal animation. Use clear, close-up face shots for the best result.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boy Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-500/50 bg-dark-900 flex items-center justify-center">
                {formData.boyAvatarUrl ? (
                  <img src={formData.boyAvatarUrl} alt="Boy" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">👦</span>
                )}
              </div>
              <label className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${uploadingBoy ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'} text-white flex items-center gap-2`}>
                <Upload className="w-4 h-4" /> {uploadingBoy ? 'Uploading...' : 'Upload Your Face'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarUpload(e, 'boy')} disabled={uploadingBoy} />
              </label>
            </div>
            {/* Girl Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-pink-500/50 bg-dark-900 flex items-center justify-center">
                {formData.girlAvatarUrl ? (
                  <img src={formData.girlAvatarUrl} alt="Girl" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">👩</span>
                )}
              </div>
              <label className={`px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${uploadingGirl ? 'bg-gray-600' : 'bg-pink-600 hover:bg-pink-500'} text-white flex items-center gap-2`}>
                <Upload className="w-4 h-4" /> {uploadingGirl ? 'Uploading...' : 'Upload Her Face'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarUpload(e, 'girl')} disabled={uploadingGirl} />
              </label>
            </div>
          </div>
        </motion.div>

        {/* Love Reasons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 md:p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-primary-400 border-b border-white/10 pb-3 mb-6">💝 Reasons Why I Love You</h3>
          <p className="text-gray-400 text-sm mb-4">Add love notes that will randomly appear from the magic Love Jar on the home page.</p>
          
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              className={inputClass}
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder="Type a reason... e.g. Your smile makes my whole day better"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addReason())}
            />
            <button type="button" onClick={addReason} className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2.5 rounded-lg transition-colors flex-shrink-0">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            <AnimatePresence>
              {formData.loveReasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 bg-dark-900/50 border border-white/5 rounded-lg px-4 py-3"
                >
                  <Heart className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" />
                  <span className="text-gray-300 text-sm flex-1">{reason}</span>
                  <button type="button" onClick={() => removeReason(i)} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {formData.loveReasons.length === 0 && (
              <p className="text-gray-600 text-sm text-center py-4">No love notes added yet. Start writing! ✍️</p>
            )}
          </div>
        </motion.div>

        {/* Save */}
        <div className="flex justify-end sticky bottom-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-500 text-white px-10 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] text-lg font-medium"
          >
            <Save className="w-5 h-5" /> {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
