import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon, Video, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const MediaManage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const pRes = await api.get(`/places/${id}`);
      setPlace(pRes.data);
      const mRes = await api.get(`/media/${id}`);
      setMedia(mRes.data);
    } catch (err) {
      toast.error('Failed to fetch data');
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      formData.append('placeId', id);

      try {
        await api.post('/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        });
        uploadedCount++;
      } catch (err) {
        toast.error(`Failed to upload ${files[i].name}`);
      }
    }

    setUploading(false);
    setProgress(0);
    if (uploadedCount > 0) {
      toast.success(`Successfully uploaded ${uploadedCount} files`);
      fetchData();
    }
    // Clear input
    e.target.value = null;
  };

  const handleDelete = async (mediaId) => {
    if (window.confirm('Delete this media?')) {
      try {
        await api.delete(`/media/${mediaId}`);
        toast.success('Media deleted');
        fetchData();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  if (!place) return <div className="text-gray-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/places" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">Manage Media: {place.name}</h1>
      </div>

      <div className="glass-card p-6 rounded-2xl mb-8 border border-white/10 border-dashed bg-white/5">
        <div className="text-center">
          <Upload className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Upload Photos & Videos</h3>
          <p className="text-gray-400 text-sm mb-6">Drag & drop or click to browse</p>
          
          <label className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-block">
            {uploading ? `Uploading... ${progress}%` : 'Select Files'}
            <input 
              type="file" 
              multiple 
              accept="image/*,video/*" 
              className="hidden" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item, index) => (
          <motion.div 
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative aspect-square rounded-xl overflow-hidden glass-card border border-white/10"
          >
            {item.type === 'video' ? (
              <div className="w-full h-full bg-dark-900 flex items-center justify-center">
                <Video className="w-12 h-12 text-gray-500" />
              </div>
            ) : (
              <img src={item.url} alt="" className="w-full h-full object-cover" />
            )}
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-between items-start">
                <span className="bg-dark-900/80 px-2 py-1 rounded text-xs text-white capitalize flex items-center gap-1">
                  {item.type === 'video' ? <Video className="w-3 h-3"/> : <ImageIcon className="w-3 h-3"/>}
                  {item.type}
                </span>
                <button 
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        
        {media.length === 0 && !uploading && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No media uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManage;
