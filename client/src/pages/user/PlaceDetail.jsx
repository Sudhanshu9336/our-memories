import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { ArrowLeft, Calendar, Heart } from 'lucide-react';

const PlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('verified')) {
      navigate('/verify');
      return;
    }

    const fetchData = async () => {
      try {
        const placeRes = await api.get(`/places/${id}`);
        setPlace(placeRes.data);
        const mediaRes = await api.get(`/media/${id}`);
        setMedia(mediaRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary-400">Loading...</div>;
  if (!place) return <div className="text-white">Place not found</div>;

  const images = media.filter(m => m.type === 'image');
  const videos = media.filter(m => m.type === 'video');

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Cover Banner */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10"></div>
        <img 
          src={place.coverImage || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80'} 
          className="w-full h-full object-cover" 
          alt={place.name} 
        />
        
        <Link to="/home" className="absolute top-6 left-6 z-20 text-white flex items-center gap-2 hover:text-primary-400 transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div className="absolute bottom-0 left-0 w-full p-8 z-20">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              {place.name}
            </motion.h1>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 text-gray-300"
            >
              <Calendar className="w-5 h-5" />
              <span>{place.date ? new Date(place.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown Date'}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 relative z-20">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg leading-relaxed mb-16 glass-card p-8 rounded-2xl"
        >
          {place.description}
        </motion.p>

        {images.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary-500" /> Photo Gallery
            </h2>
            <PhotoProvider
              speed={() => 800}
              easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
              maskOpacity={0.8}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="aspect-square overflow-hidden rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all"
                  >
                    <PhotoView src={item.url}>
                      <img src={item.url} alt="Memory" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </PhotoView>
                  </motion.div>
                ))}
              </div>
            </PhotoProvider>
          </div>
        )}

        {videos.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary-500" /> Video Memories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl overflow-hidden glass-card aspect-video border border-white/10 relative"
                >
                  <video 
                    src={item.url} 
                    controls 
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceDetail;
