import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { ArrowLeft, Upload, Trash2, Image as ImageIcon, Video, GripVertical, Link as Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { parseMediaUrl, isVideoUrl } from '../../utils/urlParser';

const MediaManage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mediaUrl, setMediaUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

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

  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!mediaUrl) return;
    
    setUploading(true);
    try {
      const parsedUrl = parseMediaUrl(mediaUrl);
      const isVideo = isVideoUrl(parsedUrl);
      await api.post('/media/url', { 
        placeId: id, 
        url: parsedUrl, 
        type: isVideo ? 'video' : 'image' 
      });
      toast.success('URL added successfully');
      setMediaUrl('');
      setShowUrlInput(false);
      fetchData();
    } catch (err) {
      toast.error('Failed to add URL');
    } finally {
      setUploading(false);
    }
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
          <p className="text-gray-400 text-sm mb-6">Drag & drop files or add from a URL</p>
          
          <div className="flex flex-col items-center gap-4">
            <label className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors inline-block w-full max-w-xs">
              {uploading && !showUrlInput ? `Uploading... ${progress}%` : 'Select Files'}
              <input 
                type="file" 
                multiple 
                accept="image/*,video/*" 
                className="hidden" 
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>

            <div className="text-gray-500 text-sm">OR</div>

            {!showUrlInput ? (
              <button 
                onClick={() => setShowUrlInput(true)}
                className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors w-full max-w-xs"
              >
                <Link2 className="w-4 h-4" /> Add from URL
              </button>
            ) : (
              <form onSubmit={handleAddUrl} className="flex gap-2 w-full max-w-md mx-auto">
                <input 
                  type="text" 
                  placeholder="Paste URL here (Drive, Photos, etc)" 
                  className="flex-1 bg-dark-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary-500 focus:outline-none text-sm"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  disabled={uploading}
                />
                <button 
                  type="submit" 
                  disabled={uploading || !mediaUrl}
                  className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  Add
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowUrlInput(false)}
                  className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
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
