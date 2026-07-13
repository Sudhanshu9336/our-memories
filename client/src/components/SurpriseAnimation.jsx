import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SurpriseAnimation = ({ boyAvatarUrl, girlAvatarUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0); 

  const startAnimation = () => {
    setIsPlaying(true);
    setStage(1);
    setTimeout(() => setStage(2), 2000);  // kneel
    setTimeout(() => setStage(3), 3500);  // show flower
    setTimeout(() => setStage(4), 5500);  // girl accepts flower
    setTimeout(() => setStage(5), 7000);  // hearts explosion
  };

  const replayMoment = () => {
    setStage(2); // reset to kneel
    setTimeout(() => setStage(3), 1500);  // show flower
    setTimeout(() => setStage(4), 3500);  // accept flower
    setTimeout(() => setStage(5), 5000);  // hearts
  };

  const close = () => {
    setIsPlaying(false);
    setStage(0);
  };

  const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: -(Math.random() * 400 + 100),
    size: Math.random() * 20 + 14,
    delay: Math.random() * 1.5,
    duration: Math.random() * 2 + 2,
  }));

  const petals = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 3,
    size: Math.random() * 10 + 8,
    sway: (Math.random() - 0.5) * 100,
  }));

  return (
    <>
      <motion.button
        onClick={startAnimation}
        className="fixed bottom-6 left-6 z-40 group surprise-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-lg group-hover:bg-pink-500/50 transition-all" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
            <span className="text-2xl">💐</span>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-pink-400/40 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-pink-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-dark-900/80 px-2 py-1 rounded-md">
          A Surprise 🎁
        </span>
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-[#1a0a2e] to-[#2d0a3e]" />

            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              />
            ))}

            <button onClick={close} className="absolute top-6 right-6 z-50 text-white/60 hover:text-white p-2 transition-colors">
              <X className="w-8 h-8" />
            </button>

            {stage >= 3 && petals.map((p) => (
              <motion.div
                key={`petal-${p.id}`}
                className="absolute pointer-events-none"
                style={{ left: `${p.startX}%`, top: -20, fontSize: p.size }}
                initial={{ y: -30, opacity: 0, rotate: 0 }}
                animate={{
                  y: '110vh',
                  x: [0, p.sway, -p.sway, 0],
                  opacity: [0, 1, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'linear', repeat: Infinity }}
              >
                🌸
              </motion.div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-950 to-transparent" />

            <div className="absolute bottom-32 left-0 right-0 flex items-end justify-center gap-10 md:gap-16 px-4">

              {/* BOY (REALISTIC SUIT SILHOUETTE) */}
              <motion.div
                className="relative flex flex-col items-center origin-bottom z-30"
                initial={{ x: -300, opacity: 0 }}
                animate={
                  stage >= 2
                    ? { x: 0, opacity: 1, y: 30 } // drop down for kneel
                    : { x: -60, opacity: 1 }
                }
                transition={{ duration: 1.5, type: 'spring', stiffness: 60 }}
              >
                {/* Face Mask */}
                <motion.div
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-[40%] overflow-hidden border-2 border-white/10 shadow-2xl z-20 bg-[#fce2c4]"
                  animate={stage >= 2 ? { y: [0, -4, 0], rotate: 5 } : {}}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  style={{ borderRadius: '45% 45% 55% 55%' }} // realistic head shape
                >
                  {boyAvatarUrl ? (
                    <img src={boyAvatarUrl} alt="Him" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🤵</div>
                  )}
                </motion.div>

                {/* Neck */}
                <div className="w-6 h-8 bg-[#f5d0b5] -mt-4 z-10 rounded-b-full shadow-inner" />

                {/* Body (Suit) */}
                <motion.div
                  className="relative -mt-2 z-0 flex flex-col items-center"
                  animate={stage >= 2 ? { scaleY: 0.85, originY: 1 } : { scaleY: 1 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                >
                  {/* Suit Torso */}
                  <div 
                    className="w-24 h-32 md:w-28 md:h-36 bg-gray-900 relative shadow-2xl"
                    style={{ borderRadius: '40% 40% 10% 10%' }}
                  >
                    {/* White Shirt Collar / V-Neck */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-16 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                    {/* Tie */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-14 bg-red-700" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 80%, 50% 100%, 0 80%)' }} />
                  </div>

                  {/* Legs */}
                  <motion.div
                    className="relative w-full flex justify-center gap-1 -mt-2"
                    animate={stage >= 2 ? { height: 40 } : { height: 70 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Front Leg (Kneeling bent) */}
                    <motion.div 
                      className="w-9 bg-gray-900 rounded-b-xl shadow-lg border-t border-gray-800" 
                      style={{ height: '100%' }}
                      animate={stage >= 2 ? { rotate: -15, transformOrigin: 'top' } : {}}
                    />
                    {/* Back Leg (Kneeling flat) */}
                    <motion.div 
                      className="w-9 bg-gray-950 rounded-b-xl shadow-lg border-t border-gray-800" 
                      style={{ height: '100%' }}
                      animate={stage >= 2 ? { scaleY: 0.5, rotate: 20, transformOrigin: 'top', y: 15 } : {}}
                    />
                  </motion.div>
                </motion.div>

                {/* Arm reaching out with flower */}
                <AnimatePresence>
                  {stage >= 3 && (
                    <motion.div
                      className="absolute right-0 top-32 z-30"
                      initial={{ scale: 0, rotate: -45, opacity: 0, x: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1, x: 50, y: -20 }}
                      transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                    >
                      {/* Suit Sleeve */}
                      <div className="absolute -left-12 top-6 w-16 h-7 bg-gray-900 rounded-full -rotate-12 shadow-lg" />
                      {/* Hand & Rose */}
                      <motion.div 
                        className="text-5xl drop-shadow-2xl relative z-10" 
                        style={{ filter: 'drop-shadow(0px 10px 10px rgba(225,29,72,0.4))' }}
                        animate={stage >= 4 ? { x: 135, y: -15, rotate: 30 } : { x: 0, y: 0, rotate: 0 }}
                        transition={{ duration: 1, type: 'spring' }}
                      >
                        🌹
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>


              {/* GIRL (REALISTIC DRESS SILHOUETTE) */}
              <motion.div
                className="relative flex flex-col items-center origin-bottom z-20"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3, type: 'spring', stiffness: 60 }}
              >
                {/* Face Mask */}
                <motion.div
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-[40%] overflow-hidden border-2 border-white/10 shadow-2xl z-20 bg-[#fce2c4]"
                  animate={stage >= 3 ? { y: [0, -5, 0], rotate: [0, -3, 0, 3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 3 }}
                  style={{ borderRadius: '45% 45% 55% 55%' }}
                >
                  {girlAvatarUrl ? (
                    <img src={girlAvatarUrl} alt="Her" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">👰</div>
                  )}
                </motion.div>

                {/* Neck */}
                <div className="w-5 h-7 bg-[#f5d0b5] -mt-3 z-10 shadow-inner" />

                {/* Body (Dress) */}
                <div className="relative -mt-2 z-0 flex flex-col items-center">
                  {/* Dress Top */}
                  <div 
                    className="w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-red-600 to-red-700 shadow-2xl relative"
                    style={{ borderRadius: '30% 30% 10% 10%' }}
                  >
                    {/* Sweetheart neckline */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-8 bg-[#f5d0b5]" style={{ borderRadius: '0 0 50% 50%' }} />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" /> {/* Necklace */}
                  </div>
                  
                  {/* Elegant Skirt/Gown Flow */}
                  <div 
                    className="w-32 h-36 md:w-40 md:h-44 bg-gradient-to-b from-red-700 to-red-900 -mt-2 shadow-2xl" 
                    style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)', borderRadius: '0 0 10px 10px' }} 
                  />
                </div>

                {/* Arms (Surprised reaction) */}
                <AnimatePresence>
                  {stage >= 3 && (
                    <motion.div
                      className="absolute top-36 z-30 flex gap-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* Left Arm bending to face or accepting flower */}
                      <motion.div 
                        className="w-6 h-16 bg-[#f5d0b5] rounded-full -ml-8 shadow-md origin-top" 
                        animate={stage >= 4 ? { rotate: 80, x: -10, y: 0 } : { rotate: 45, x: 0, y: 0 }}
                        transition={{ duration: 1, type: 'spring' }}
                      />
                      {/* Right Arm bending to face */}
                      <motion.div 
                        className="w-6 h-16 bg-[#f5d0b5] rounded-full -mr-8 shadow-md origin-top"
                        animate={{ rotate: -45 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {stage >= 3 && (
                    <motion.div
                      className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 z-40"
                      initial={{ opacity: 0, y: 10, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      <div className="bg-white/95 text-red-600 px-5 py-2.5 rounded-full text-base md:text-lg font-bold shadow-2xl whitespace-nowrap border-2 border-red-100">
                        Oh my god, Yes! 🥺❤️
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <AnimatePresence>
              {stage >= 5 && floatingHearts.map((h) => (
                <motion.div
                  key={`heart-${h.id}`}
                  className="absolute pointer-events-none"
                  style={{ left: '50%', bottom: '35%', fontSize: h.size }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], x: h.x, y: h.y, scale: [0, 1.2, 1, 0.8] }}
                  transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 5 && (
                <motion.div
                  className="absolute bottom-10 left-0 right-0 text-center z-40 px-4 flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(225,29,72,0.6))' }}>
                    You are my forever 💕
                  </h2>
                  <p className="text-pink-200/90 text-base md:text-lg font-medium tracking-wide mb-6">Every single moment with you is a dream come true.</p>
                  
                  <motion.button 
                    onClick={replayMoment}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-2.5 rounded-full backdrop-blur-md transition-colors text-sm font-bold shadow-lg"
                  >
                    Replay Moment ⏪
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SurpriseAnimation;
