import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SurpriseAnimation = ({ boyAvatarUrl, girlAvatarUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);

  const startAnimation = () => {
    setIsPlaying(true);
    setStage(0);
    setTimeout(() => setStage(1), 500);    // scene fades in
    setTimeout(() => setStage(2), 2500);   // faces appear
    setTimeout(() => setStage(3), 4000);   // speech bubble
    setTimeout(() => setStage(4), 5500);   // hearts + petals + message
  };

  const close = () => { setIsPlaying(false); setStage(0); };

  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: (Math.random() - 0.5) * 800, y: -(Math.random() * 500 + 200),
    size: Math.random() * 24 + 14, delay: Math.random() * 2.5, duration: Math.random() * 3 + 2,
  }));

  const petals = Array.from({ length: 35 }, (_, i) => ({
    id: i, startX: Math.random() * 100, delay: Math.random() * 5,
    duration: Math.random() * 5 + 4, size: Math.random() * 14 + 10, sway: (Math.random() - 0.5) * 150,
  }));

  const fireflies = Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: 30 + Math.random() * 50,
    delay: Math.random() * 4, duration: Math.random() * 4 + 3,
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
          <div className="relative w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
            <span className="text-2xl">💐</span>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-pink-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-500/20">
          A Special Surprise 💝
        </span>
      </motion.button>

      {/* Fullscreen Cinematic Overlay */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Cinematic letterbox bars */}
            <motion.div className="absolute top-0 left-0 right-0 bg-black z-40"
              initial={{ height: 0 }} animate={{ height: 55 }} transition={{ duration: 1.5 }} />
            <motion.div className="absolute bottom-0 left-0 right-0 bg-black z-40"
              initial={{ height: 0 }} animate={{ height: 55 }} transition={{ duration: 1.5 }} />

            {/* Close button */}
            <motion.button onClick={close}
              className="absolute top-4 right-4 z-[60] text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              whileHover={{ rotate: 90 }}>
              <X className="w-7 h-7" />
            </motion.button>

            {/* ===== THE MAIN SCENE IMAGE ===== */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
            >
              <div className="relative w-full max-w-[100vh] aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* Main proposal scene */}
                <img
                  src="/proposal_scene.png"
                  alt="Romantic Proposal Scene"
                  className="w-full h-full object-contain bg-black"
                />

                {/* Soft dreamy overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
                }} />

                {/* ===== BOY FACE OVERLAY ===== */}
                <AnimatePresence>
                  {stage >= 2 && boyAvatarUrl && (
                    <motion.div
                      className="absolute overflow-hidden"
                      style={{
                        top: '26%',
                        left: '28%',
                        width: '10.5%',
                        aspectRatio: '1',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.1)',
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, type: 'spring' }}
                    >
                      <img src={boyAvatarUrl} alt="Him" className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ===== GIRL FACE OVERLAY ===== */}
                <AnimatePresence>
                  {stage >= 2 && girlAvatarUrl && (
                    <motion.div
                      className="absolute overflow-hidden"
                      style={{
                        top: '19.5%',
                        left: '58%',
                        width: '9.5%',
                        aspectRatio: '1',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.1)',
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.3, type: 'spring' }}
                    >
                      <img src={girlAvatarUrl} alt="Her" className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Fireflies */}
            {stage >= 1 && fireflies.map((f) => (
              <motion.div
                key={`ff-${f.id}`}
                className="absolute pointer-events-none z-30 rounded-full"
                style={{
                  left: `${f.x}%`, top: `${f.y}%`,
                  width: 4, height: 4, backgroundColor: '#fef08a',
                  boxShadow: '0 0 8px 4px rgba(254,240,138,0.6)',
                }}
                animate={{
                  opacity: [0, 1, 0.3, 1, 0],
                  x: [0, 20, -15, 10, 0],
                  y: [0, -15, 10, -20, 0],
                }}
                transition={{ duration: f.duration, delay: f.delay, repeat: Infinity }}
              />
            ))}

            {/* Falling rose petals */}
            {stage >= 4 && petals.map((p) => (
              <motion.div key={`p-${p.id}`} className="absolute pointer-events-none z-30"
                style={{ left: `${p.startX}%`, top: -30, fontSize: p.size }}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: '110vh', x: [0, p.sway, -p.sway, 0], opacity: [0, 0.9, 0.9, 0.2], rotate: [0, 180, 360, 540] }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'linear', repeat: Infinity }}>
                🌸
              </motion.div>
            ))}

            {/* Speech bubble from girl */}
            <AnimatePresence>
              {stage >= 3 && (
                <motion.div
                  className="absolute z-40"
                  style={{ top: '10%', right: '18%' }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <div className="relative bg-white/95 backdrop-blur-md text-rose-600 px-6 py-3 rounded-2xl text-sm md:text-lg font-bold shadow-2xl border border-rose-100">
                    Oh my God, Yesss! 🥺💍
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-rose-100" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hearts explosion */}
            <AnimatePresence>
              {stage >= 4 && hearts.map((h) => (
                <motion.div key={`h-${h.id}`} className="absolute pointer-events-none z-30"
                  style={{ left: '50%', bottom: '40%', fontSize: h.size }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], x: h.x, y: h.y, scale: [0, 1.4, 1, 0.5], rotate: [0, 20, -20, 0] }}
                  transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}>
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bottom romantic message */}
            <AnimatePresence>
              {stage >= 4 && (
                <motion.div className="absolute bottom-16 left-0 right-0 text-center z-40 px-4"
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1.2 }}>
                  <motion.h2
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b8a, #ffd1dc, #ff8fab, #ff6b8a)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 4px 20px rgba(255,107,138,0.6))',
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 4, repeat: Infinity }}>
                    You are my forever 💕
                  </motion.h2>
                  <motion.p className="text-pink-100/70 text-sm md:text-lg font-light tracking-[0.2em]"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
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
