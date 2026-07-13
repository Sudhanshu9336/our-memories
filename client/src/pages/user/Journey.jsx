import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import api from '../../services/api';
import { Heart, Calendar, ArrowLeft } from 'lucide-react';
import ParticlesBg from '../../components/ParticlesBg';

const Journey = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  useEffect(() => {
    if (!localStorage.getItem('verified')) {
      navigate('/verify');
      return;
    }

    const fetchPlaces = async () => {
      try {
        const res = await api.get('/places');
        // Sort by date ascending (oldest first for chronological journey)
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setPlaces(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [navigate]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      <ParticlesBg />

      {/* Fixed header */}
      <div className="sticky top-0 z-20 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary-500" fill="currentColor" />
            Our Journey
          </h1>
          <div className="w-20" /> {/* spacer */}
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 text-center py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary-400 text-sm tracking-widest uppercase mb-3">Scroll down to travel through</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Love Story</h2>
          <p className="text-gray-400 max-w-md mx-auto">Every memory is a milestone on the most beautiful journey of our lives.</p>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          className="mt-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-400 rounded-full" />
          </div>
        </motion.div>
      </div>

      {loading ? (
        <div className="text-center text-primary-400 py-20 animate-pulse">Loading your journey...</div>
      ) : (
        <div className="relative max-w-5xl mx-auto pb-32 px-6">
          {/* SVG Path Line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-2 z-0 hidden md:block"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            {/* Background track */}
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
            {/* Animated fill */}
            <motion.line
              x1="1" y1="0" x2="1" y2="100"
              stroke="url(#journeyGradient)"
              strokeWidth="2"
              style={{
                pathLength: pathLength,
              }}
            />
            <defs>
              <linearGradient id="journeyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline Items */}
          {places.map((place, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={place._id}
                initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 100 }}
                className={`relative flex items-center mb-20 md:mb-28 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-5 h-5 bg-primary-500 rounded-full border-4 border-dark-900 shadow-[0_0_15px_rgba(225,29,72,0.6)]"
                  />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Link to={`/place/${place._id}`} className="block group">
                    <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_0_40px_rgba(225,29,72,0.2)] group-hover:border-primary-500/30">
                      {/* Image */}
                      <div className="relative h-52 md:h-56 overflow-hidden">
                        <img
                          src={place.coverImage || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80'}
                          alt={place.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />

                        {/* Date badge */}
                        <div className="absolute top-4 left-4 bg-dark-900/70 backdrop-blur-sm border border-white/10 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-primary-400" />
                          {formatDate(place.date)}
                        </div>

                        {/* Number badge */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-primary-600/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>

                      {/* Text */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                          {place.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                          {place.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}

          {/* Journey End */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center relative z-10 py-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.4)] mb-6">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">And the journey continues...</h3>
            <p className="text-gray-400 text-sm">Every new day with you is a new chapter 💕</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Journey;
