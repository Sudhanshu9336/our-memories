import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SurpriseAnimation = ({ boyAvatarUrl, girlAvatarUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);
  const audioRef = useRef(null);

  const startAnimation = () => {
    setIsPlaying(true);
    setStage(0);
    // Cinematic sequence
    setTimeout(() => setStage(1), 500);   // fade in scene
    setTimeout(() => setStage(2), 2500);  // boy walks in
    setTimeout(() => setStage(3), 4500);  // boy kneels
    setTimeout(() => setStage(4), 6000);  // girl reacts
    setTimeout(() => setStage(5), 7500);  // hearts + message
  };

  const close = () => {
    setIsPlaying(false);
    setStage(0);
  };

  // Floating hearts
  const hearts = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 800,
    y: -(Math.random() * 500 + 200),
    size: Math.random() * 24 + 16,
    delay: Math.random() * 2,
    duration: Math.random() * 2.5 + 2,
  }));

  // Rose petals
  const petals = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 4,
    size: Math.random() * 14 + 10,
    sway: (Math.random() - 0.5) * 150,
  }));

  // Sparkles
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 4 + 2,
  }));

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={startAnimation}
        className="fixed bottom-6 left-6 z-40 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-xl group-hover:bg-pink-500/50 transition-all duration-500" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 backdrop-blur-sm">
            <span className="text-2xl">💐</span>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-pink-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-500/20">
          A Special Surprise 💝
        </span>
      </motion.button>

      {/* Fullscreen Cinematic Animation */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Cinematic letterbox bars */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-black z-50"
              initial={{ height: 0 }}
              animate={{ height: stage >= 1 ? 60 : 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-black z-50"
              initial={{ height: 0 }}
              animate={{ height: stage >= 1 ? 60 : 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />

            {/* Background - Beautiful night sky gradient */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2e] to-[#0d1b2a]" />
              
              {/* Stars */}
              {Array.from({ length: 80 }).map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${Math.random() * 50}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}

              {/* Moon */}
              <motion.div
                className="absolute top-12 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 40% 40%, #fef3c7, #fcd34d, #f59e0b)',
                  boxShadow: '0 0 60px 20px rgba(253,224,71,0.3), 0 0 120px 40px rgba(253,224,71,0.1)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 1 ? 1 : 0 }}
                transition={{ duration: 2 }}
              />

              {/* Ground with grass and flowers */}
              <div className="absolute bottom-0 left-0 right-0 h-40" style={{
                background: 'linear-gradient(to top, #1a3a1a 0%, #0d2818 40%, transparent 100%)'
              }} />
            </div>

            {/* Close button */}
            <motion.button
              onClick={close}
              className="absolute top-20 right-6 z-[60] text-white/40 hover:text-white p-2 transition-all duration-300 hover:bg-white/10 rounded-full"
              whileHover={{ rotate: 90 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Falling petals */}
            {stage >= 4 && petals.map((p) => (
              <motion.div
                key={`petal-${p.id}`}
                className="absolute pointer-events-none z-30"
                style={{ left: `${p.startX}%`, top: -30, fontSize: p.size }}
                initial={{ y: -30, opacity: 0, rotate: 0 }}
                animate={{
                  y: '110vh',
                  x: [0, p.sway, -p.sway, 0],
                  opacity: [0, 1, 1, 0.3],
                  rotate: [0, 180, 360, 540],
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'linear', repeat: Infinity }}
              >
                🌸
              </motion.div>
            ))}

            {/* Sparkle particles */}
            {stage >= 3 && sparkles.map((s) => (
              <motion.div
                key={`sparkle-${s.id}`}
                className="absolute pointer-events-none z-20"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.size,
                  height: s.size,
                  backgroundColor: '#fef08a',
                  borderRadius: '50%',
                  boxShadow: `0 0 ${s.size * 3}px ${s.size}px rgba(254,240,138,0.6)`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: s.delay,
                  repeat: Infinity,
                }}
              />
            ))}

            {/* ===== MAIN SCENE ===== */}
            <div className="absolute bottom-16 left-0 right-0 flex items-end justify-center gap-4 md:gap-8 px-4 z-20">

              {/* ===== BOY (Realistic Image + Face Overlay) ===== */}
              <motion.div
                className="relative"
                style={{ width: 'clamp(140px, 30vw, 280px)' }}
                initial={{ x: -400, opacity: 0 }}
                animate={
                  stage >= 2
                    ? { x: 0, opacity: 1 }
                    : { x: -400, opacity: 0 }
                }
                transition={{ duration: 2, type: 'spring', stiffness: 40, damping: 15 }}
              >
                {/* Realistic body image */}
                <motion.img
                  src="/man_body.png"
                  alt=""
                  className="w-full h-auto drop-shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                    maxHeight: 'clamp(250px, 50vh, 450px)',
                    objectFit: 'contain',
                  }}
                  animate={stage >= 3 ? { y: [0, -5, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                />

                {/* Face overlay on the body */}
                {boyAvatarUrl && (
                  <motion.div
                    className="absolute overflow-hidden border-2 border-white/10"
                    style={{
                      top: '2%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '28%',
                      aspectRatio: '1',
                      borderRadius: '45% 45% 50% 50%',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage >= 2 ? 1 : 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <img
                      src={boyAvatarUrl}
                      alt="Him"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                {/* Spotlight under boy */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  }}
                />
              </motion.div>

              {/* ===== GIRL (Realistic Image + Face Overlay) ===== */}
              <motion.div
                className="relative"
                style={{ width: 'clamp(140px, 30vw, 280px)' }}
                initial={{ x: 400, opacity: 0 }}
                animate={
                  stage >= 2
                    ? { x: 0, opacity: 1 }
                    : { x: 400, opacity: 0 }
                }
                transition={{ duration: 2, delay: 0.5, type: 'spring', stiffness: 40, damping: 15 }}
              >
                {/* Realistic body image */}
                <motion.img
                  src="/woman_body.png"
                  alt=""
                  className="w-full h-auto drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                    maxHeight: 'clamp(250px, 50vh, 450px)',
                    objectFit: 'contain',
                  }}
                  animate={stage >= 4 ? { y: [0, -4, 0], rotate: [0, -1, 0, 1, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                />

                {/* Face overlay on the body */}
                {girlAvatarUrl && (
                  <motion.div
                    className="absolute overflow-hidden border-2 border-white/10"
                    style={{
                      top: '1%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '25%',
                      aspectRatio: '1',
                      borderRadius: '45% 45% 50% 50%',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage >= 2 ? 1 : 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <img
                      src={girlAvatarUrl}
                      alt="Her"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                {/* Speech bubble */}
                <AnimatePresence>
                  {stage >= 4 && (
                    <motion.div
                      className="absolute -top-20 left-1/2 -translate-x-1/2 z-40"
                      initial={{ opacity: 0, y: 20, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <div className="relative bg-white/95 backdrop-blur-md text-rose-600 px-6 py-3 rounded-2xl text-base md:text-lg font-bold shadow-2xl whitespace-nowrap border border-rose-100">
                        Oh my God, Yes! 🥺💍
                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-rose-100" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Spotlight under girl */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            </div>

            {/* Floating hearts explosion */}
            <AnimatePresence>
              {stage >= 5 && hearts.map((h) => (
                <motion.div
                  key={`heart-${h.id}`}
                  className="absolute pointer-events-none z-30"
                  style={{ left: '50%', bottom: '30%', fontSize: h.size }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: h.x,
                    y: h.y,
                    scale: [0, 1.3, 1, 0.6],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bottom text message */}
            <AnimatePresence>
              {stage >= 5 && (
                <motion.div
                  className="absolute bottom-20 left-0 right-0 text-center z-40 px-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                >
                  <motion.h2
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b8a, #ff8a9e, #ffd1dc, #ff6b8a)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 30px rgba(255,107,138,0.5))',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    You are my forever 💕
                  </motion.h2>
                  <motion.p
                    className="text-pink-200/80 text-sm md:text-lg font-light tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Every single moment with you is a dream come true
                  </motion.p>
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
