import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Landing = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simple floating hearts will go here */}
      </div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="glass-card p-12 rounded-3xl z-10 max-w-lg w-full"
      >
        <Heart className="w-16 h-16 text-primary-500 mx-auto mb-6 animate-pulse-slow" fill="currentColor" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Memories</h1>
        <p className="text-gray-300 text-lg mb-8 font-light">Every moment with you is a beautiful dream come true.</p>
        
        <Link to="/verify" className="btn-primary inline-block">
          Start Journey
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
