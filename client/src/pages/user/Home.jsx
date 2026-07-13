import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { Heart, Image as ImageIcon, Video, Map, Sparkles } from 'lucide-react';
import ParticlesBg from '../../components/ParticlesBg';
import RelationshipCounter from '../../components/RelationshipCounter';
import LoveJar from '../../components/LoveJar';
import SurpriseAnimation from '../../components/SurpriseAnimation';

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('verified')) {
      navigate('/verify');
      return;
    }

    const fetchData = async () => {
      try {
        const [placesRes, settingsRes] = await Promise.all([
          api.get('/places'),
          api.get('/settings'),
        ]);
        setPlaces(placesRes.data);
        setSettings(settingsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen relative p-6 md:p-12 overflow-hidden">
      <ParticlesBg />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 mt-8"
        >
          <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4 animate-pulse-slow" fill="currentColor" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Memories</h1>
          <p className="text-gray-400">A collection of our beautiful moments together.</p>
        </motion.div>

        {/* Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-10"
        >
          <Link
            to="/journey"
            className="flex items-center gap-2 bg-gradient-to-r from-primary-600/20 to-pink-600/20 hover:from-primary-600/40 hover:to-pink-600/40 border border-primary-500/30 hover:border-primary-500/60 text-primary-300 hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all group"
          >
            <Map className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Our Journey
          </Link>
          <button
            onClick={() => {
              const el = document.querySelector('.surprise-trigger');
              if (el) el.click();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/40 hover:to-purple-600/40 border border-pink-500/30 hover:border-pink-500/60 text-pink-300 hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all group"
          >
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Surprise
          </button>
        </motion.div>

        {/* Relationship Counter */}
        {settings?.relationshipStartDate && (
          <RelationshipCounter startDate={settings.relationshipStartDate} />
        )}

        {/* Places Grid */}
        {loading ? (
          <div className="text-center text-primary-400 animate-pulse">Loading our memories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place, index) => (
              <motion.div
                key={place._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/place/${place._id}`} className="block group">
                  <div className="glass-card rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] group-hover:-translate-y-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10"></div>
                    <img 
                      src={place.coverImage || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80'} 
                      alt={place.name}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-2">{place.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span className="flex items-center gap-1"><ImageIcon className="w-4 h-4" /> {place.photosCount || 0}</span>
                        <span className="flex items-center gap-1"><Video className="w-4 h-4" /> {place.videosCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Love Jar Widget */}
      {settings?.loveReasons?.length > 0 && (
        <LoveJar reasons={settings.loveReasons} />
      )}

      {/* Surprise Animation */}
      <SurpriseAnimation
        boyAvatarUrl={settings?.boyAvatarUrl}
        girlAvatarUrl={settings?.girlAvatarUrl}
      />
    </div>
  );
};

export default Home;
