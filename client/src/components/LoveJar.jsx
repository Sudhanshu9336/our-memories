import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveJar = ({ reasons = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const pickRandom = useCallback(() => {
    if (reasons.length === 0) return;
    const random = reasons[Math.floor(Math.random() * reasons.length)];
    setCurrentNote(random);
    setShowNote(true);

    // Generate sparkle particles
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200 - 50,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.3,
    }));
    setSparkles(newSparkles);

    setTimeout(() => setSparkles([]), 2000);
  }, [reasons]);

  const handleClick = () => {
    if (reasons.length === 0) return;
    setIsOpen(true);
    pickRandom();
  };

  if (reasons.length === 0) return null;

  return (
    <>
      {/* Floating Jar Button */}
      <motion.button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-40 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 bg-primary-500/30 rounded-full blur-lg group-hover:bg-primary-500/50 transition-all" />
          
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
            <span className="text-2xl" role="img" aria-label="love jar">🏺</span>
          </div>
          
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary-400/40 animate-ping" />
        </div>
        
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-primary-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-dark-900/80 px-2 py-1 rounded-md">
          Love Jar ✨
        </span>
      </motion.button>

      {/* Sparkle Particles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="fixed bottom-14 right-14 z-50 pointer-events-none text-yellow-400"
            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            animate={{ opacity: 0, x: s.x, y: s.y, scale: s.scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: s.delay, ease: 'easeOut' }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Note Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            
            {/* Note Card */}
            <motion.div
              className="relative max-w-sm w-full"
              initial={{ scale: 0.3, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.3, rotate: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Paper texture card */}
              <div className="relative bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-8 shadow-2xl overflow-hidden">
                {/* Decorative corner hearts */}
                <div className="absolute top-3 left-3 text-primary-300/30 text-lg">❤️</div>
                <div className="absolute bottom-3 right-3 text-primary-300/30 text-lg">❤️</div>
                
                {/* Fold effect */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-rose-200 to-transparent rounded-bl-2xl" />
                
                <p className="text-center text-gray-400 text-xs font-medium tracking-widest uppercase mb-4">
                  A reason I love you...
                </p>
                
                <AnimatePresence mode="wait">
                  {showNote && (
                    <motion.p
                      key={currentNote}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center text-lg md:text-xl text-gray-800 font-medium leading-relaxed italic"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      "{currentNote}"
                    </motion.p>
                  )}
                </AnimatePresence>
                
                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pickRandom}
                    className="bg-primary-500 hover:bg-primary-400 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg"
                  >
                    Another one 💌
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoveJar;
