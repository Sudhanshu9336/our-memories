import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { MapPin, Image as ImageIcon, Video, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPlaces: 0,
    totalPhotos: 0,
    totalVideos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pRes = await api.get('/places');
        const places = pRes.data;
        
        let photos = 0;
        let videos = 0;
        
        places.forEach(p => {
          photos += p.photosCount || 0;
          videos += p.videosCount || 0;
        });
        
        setStats({
          totalPlaces: places.length,
          totalPhotos: photos,
          totalVideos: videos,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Places', value: stats.totalPlaces, icon: MapPin, color: 'text-primary-400' },
    { title: 'Photos Uploaded', value: stats.totalPhotos, icon: ImageIcon, color: 'text-blue-400' },
    { title: 'Videos Uploaded', value: stats.totalVideos, icon: Video, color: 'text-purple-400' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((stat, i) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
              {loading ? (
                <div className="h-8 w-16 bg-white/10 animate-pulse rounded"></div>
              ) : (
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              )}
            </div>
            <div className={`p-4 rounded-xl bg-dark-800 ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="glass-card p-8 rounded-3xl border border-white/5 text-center">
        <Heart className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-pulse-slow" fill="currentColor" />
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Admin Panel</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Manage your beautiful memories here. You can add new places, upload high-quality photos and videos, and customize the website settings for the perfect romantic experience.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
