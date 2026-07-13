import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/* ─── Animated Boy Character (SVG with articulated body parts) ─── */
const AnimatedBoy = ({ stage, avatarUrl }) => (
  <motion.g
    initial={{ x: -300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.8, type: 'spring', stiffness: 40 }}
  >
    {/* Shadow on ground */}
    <motion.ellipse
      cx="160" cy="390" rx="50" ry="8"
      fill="rgba(0,0,0,0.3)"
      animate={stage >= 2 ? { rx: 40, cy: 395 } : {}}
      transition={{ duration: 0.8 }}
    />

    {/* LEFT LEG (back leg - kneels flat) */}
    <motion.g
      animate={stage >= 2
        ? { rotate: -75, x: -10, y: -20 }
        : { rotate: 0 }
      }
      transition={{ duration: 1, type: 'spring', stiffness: 60 }}
      style={{ transformOrigin: '140px 310px' }}
    >
      {/* Thigh */}
      <rect x="132" y="310" width="18" height="45" rx="8" fill="#1a1a2e" />
      {/* Shin */}
      <motion.rect
        x="130" y="350" width="18" height="40" rx="8" fill="#16162a"
        animate={stage >= 2 ? { rotate: 75 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: '140px 350px' }}
      />
      {/* Shoe */}
      <motion.ellipse
        cx="145" cy="390" rx="16" ry="7" fill="#111"
        animate={stage >= 2 ? { cy: 375, cx: 160 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.g>

    {/* RIGHT LEG (front leg - bends at knee) */}
    <motion.g
      animate={stage >= 2
        ? { rotate: -30, y: 10 }
        : { rotate: 0 }
      }
      transition={{ duration: 1, type: 'spring', stiffness: 60 }}
      style={{ transformOrigin: '170px 310px' }}
    >
      {/* Thigh */}
      <rect x="162" y="310" width="18" height="45" rx="8" fill="#1f1f3a" />
      {/* Shin */}
      <motion.g
        animate={stage >= 2 ? { rotate: 60 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: '170px 355px' }}
      >
        <rect x="162" y="352" width="18" height="38" rx="8" fill="#1a1a30" />
        {/* Shoe */}
        <path d="M158 388 Q170 396 185 390 L182 384 Q170 388 162 384 Z" fill="#111" />
      </motion.g>
    </motion.g>

    {/* TORSO (Suit jacket) */}
    <motion.g
      animate={stage >= 2 ? { y: 20, rotate: -5 } : {}}
      transition={{ duration: 1, type: 'spring' }}
      style={{ transformOrigin: '160px 310px' }}
    >
      {/* Torso base */}
      <path d="M135 230 Q130 250 132 310 L188 310 Q190 250 185 230 Z" fill="#1a1a2e" />
      {/* Suit lapels */}
      <path d="M150 230 L160 275 L170 230" fill="#fff" opacity="0.15" />
      {/* Tie */}
      <path d="M157 235 L163 235 L161 280 L159 280 Z" fill="#e11d48" />
      <path d="M155 280 L165 280 L160 295 Z" fill="#be123c" />
      {/* Shirt collar */}
      <path d="M148 228 L160 245 L172 228" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />

      {/* LEFT ARM (behind body, relaxed) */}
      <motion.g
        animate={stage >= 2 ? { rotate: 15 } : {}}
        transition={{ duration: 0.8 }}
        style={{ transformOrigin: '138px 240px' }}
      >
        {/* Upper arm */}
        <rect x="118" y="238" width="16" height="40" rx="7" fill="#1a1a2e" />
        {/* Forearm */}
        <motion.g
          animate={stage >= 2 ? { rotate: -30 } : {}}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: '126px 278px' }}
        >
          <rect x="118" y="275" width="14" height="35" rx="6" fill="#1f1f3a" />
          {/* Hand */}
          <circle cx="125" cy="312" r="7" fill="#e8b896" />
        </motion.g>
      </motion.g>

      {/* RIGHT ARM (extends flower) */}
      <motion.g
        animate={stage >= 2
          ? { rotate: -45 }
          : { rotate: 0 }
        }
        transition={{ duration: 1, type: 'spring', stiffness: 50 }}
        style={{ transformOrigin: '182px 240px' }}
      >
        {/* Upper arm */}
        <rect x="180" y="238" width="16" height="40" rx="7" fill="#1a1a2e" />
        {/* Forearm */}
        <motion.g
          animate={stage >= 3
            ? { rotate: 25, x: 10 }
            : stage >= 2 ? { rotate: -20 } : {}
          }
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ transformOrigin: '190px 278px' }}
        >
          <rect x="182" y="275" width="14" height="38" rx="6" fill="#1f1f3a" />
          {/* Hand */}
          <circle cx="190" cy="315" r="7" fill="#e8b896" />

          {/* ROSE 🌹 */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Stem */}
                <line x1="192" y1="308" x2="192" y2="275" stroke="#2d5a2d" strokeWidth="2.5" />
                {/* Leaves */}
                <ellipse cx="188" cy="290" rx="5" ry="3" fill="#3a7a3a" transform="rotate(-30 188 290)" />
                <ellipse cx="196" cy="296" rx="5" ry="3" fill="#3a7a3a" transform="rotate(30 196 296)" />
                {/* Rose petals */}
                <circle cx="192" cy="272" r="8" fill="#e11d48" />
                <circle cx="188" cy="270" r="5" fill="#f43f5e" />
                <circle cx="196" cy="270" r="5" fill="#be123c" />
                <circle cx="192" cy="267" r="4" fill="#fb7185" />
              </motion.g>
            )}
          </AnimatePresence>
        </motion.g>
      </motion.g>

      {/* NECK */}
      <rect x="153" y="218" width="14" height="15" rx="5" fill="#e8b896" />

      {/* HEAD */}
      <motion.g
        animate={stage >= 3
          ? { rotate: [0, 5, 0, -3, 0], y: [0, -2, 0] }
          : {}
        }
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {/* Head shape */}
        <ellipse cx="160" cy="200" rx="26" ry="30" fill="#e8b896" />
        {/* Hair */}
        <path d="M134 195 Q135 165 160 162 Q185 165 186 195 Q185 180 160 178 Q135 180 134 195" fill="#2c1810" />
        
        {/* Face photo overlay */}
        {avatarUrl ? (
          <foreignObject x="136" y="175" width="48" height="48" clipPath="url(#boyFaceClip)">
            <img
              xmlns="http://www.w3.org/1999/xhtml"
              src={avatarUrl}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              alt=""
            />
          </foreignObject>
        ) : (
          <>
            {/* Default eyes */}
            <ellipse cx="150" cy="198" rx="3" ry="3.5" fill="#2c1810" />
            <ellipse cx="170" cy="198" rx="3" ry="3.5" fill="#2c1810" />
            <circle cx="151" cy="197" r="1" fill="#fff" />
            <circle cx="171" cy="197" r="1" fill="#fff" />
            {/* Smile */}
            <path d="M152 210 Q160 218 168 210" fill="none" stroke="#c4856b" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
      </motion.g>
    </motion.g>
  </motion.g>
);

/* ─── Animated Girl Character (SVG with articulated body parts) ─── */
const AnimatedGirl = ({ stage, avatarUrl }) => (
  <motion.g
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.8, delay: 0.3, type: 'spring', stiffness: 40 }}
  >
    {/* Shadow on ground */}
    <ellipse cx="320" cy="392" rx="45" ry="7" fill="rgba(0,0,0,0.25)" />

    {/* DRESS (Long flowing gown) */}
    <motion.g
      animate={stage >= 4 ? { y: [0, -3, 0] } : {}}
      transition={{ repeat: Infinity, duration: 2.5 }}
    >
      {/* Dress skirt - flowing A-line */}
      <path d="M295 290 Q280 340 268 392 L372 392 Q360 340 345 290 Z" fill="url(#dressGradient)" />
      {/* Dress shimmer */}
      <path d="M305 300 Q310 340 300 392" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <path d="M335 300 Q330 340 340 392" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      {/* Dress fold details */}
      <path d="M288 370 Q295 360 290 392" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      <path d="M352 370 Q345 360 350 392" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
    </motion.g>

    {/* TORSO (Dress top) */}
    <path d="M300 230 Q298 260 295 290 L345 290 Q342 260 340 230 Z" fill="#e11d48" />
    {/* Sweetheart neckline */}
    <path d="M305 230 Q320 245 335 230" fill="#e8b896" />
    {/* Necklace */}
    <motion.circle
      cx="320" cy="240" r="3" fill="#ffd700"
      animate={{ filter: ['drop-shadow(0 0 3px #ffd700)', 'drop-shadow(0 0 8px #ffd700)', 'drop-shadow(0 0 3px #ffd700)'] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />

    {/* LEFT ARM */}
    <motion.g
      animate={stage >= 4
        ? { rotate: -40 }
        : { rotate: 5 }
      }
      transition={{ duration: 0.8, type: 'spring' }}
      style={{ transformOrigin: '300px 240px' }}
    >
      <rect x="282" y="238" width="14" height="35" rx="6" fill="#e8b896" />
      <motion.g
        animate={stage >= 4 ? { rotate: -60 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ transformOrigin: '289px 273px' }}
      >
        <rect x="282" y="270" width="13" height="30" rx="5" fill="#e8b896" />
        <circle cx="289" cy="302" r="6" fill="#f0c8a8" />
      </motion.g>
    </motion.g>

    {/* RIGHT ARM */}
    <motion.g
      animate={stage >= 4
        ? { rotate: 40 }
        : { rotate: -5 }
      }
      transition={{ duration: 0.8, type: 'spring' }}
      style={{ transformOrigin: '340px 240px' }}
    >
      <rect x="344" y="238" width="14" height="35" rx="6" fill="#e8b896" />
      <motion.g
        animate={stage >= 4 ? { rotate: 60 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ transformOrigin: '351px 273px' }}
      >
        <rect x="345" y="270" width="13" height="30" rx="5" fill="#e8b896" />
        <circle cx="352" cy="302" r="6" fill="#f0c8a8" />
      </motion.g>
    </motion.g>

    {/* NECK */}
    <rect x="313" y="216" width="14" height="16" rx="5" fill="#e8b896" />

    {/* HEAD */}
    <motion.g
      animate={stage >= 4
        ? { rotate: [0, -5, 0, 3, 0], y: [0, -3, 0] }
        : {}
      }
      transition={{ repeat: Infinity, duration: 3.5 }}
    >
      {/* Head shape */}
      <ellipse cx="320" cy="198" rx="26" ry="28" fill="#e8b896" />
      {/* Long hair - back */}
      <path d="M294 198 Q290 240 295 270 Q300 275 305 265 Q298 235 300 200" fill="#3d1c0a" />
      <path d="M346 198 Q350 240 345 270 Q340 275 335 265 Q342 235 340 200" fill="#3d1c0a" />
      {/* Hair top */}
      <path d="M294 200 Q296 165 320 160 Q344 165 346 200 Q344 178 320 174 Q296 178 294 200" fill="#3d1c0a" />
      {/* Hair bangs */}
      <path d="M300 190 Q305 178 315 182" fill="#3d1c0a" />
      <path d="M340 190 Q335 178 325 182" fill="#3d1c0a" />
      {/* Hair clip / flower */}
      <circle cx="340" cy="183" r="5" fill="#fb7185" />
      <circle cx="343" cy="180" r="3" fill="#f43f5e" />

      {/* Face photo overlay */}
      {avatarUrl ? (
        <foreignObject x="296" y="174" width="48" height="48" clipPath="url(#girlFaceClip)">
          <img
            xmlns="http://www.w3.org/1999/xhtml"
            src={avatarUrl}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            alt=""
          />
        </foreignObject>
      ) : (
        <>
          {/* Default eyes with lashes */}
          <ellipse cx="310" cy="196" rx="3" ry="4" fill="#3d1c0a" />
          <ellipse cx="330" cy="196" rx="3" ry="4" fill="#3d1c0a" />
          <circle cx="311" cy="195" r="1.2" fill="#fff" />
          <circle cx="331" cy="195" r="1.2" fill="#fff" />
          {/* Eyelashes */}
          <path d="M306 193 L308 190" stroke="#3d1c0a" strokeWidth="1" />
          <path d="M326 193 L328 190" stroke="#3d1c0a" strokeWidth="1" />
          {/* Blush */}
          <ellipse cx="305" cy="204" rx="6" ry="3" fill="#ffb4b4" opacity="0.4" />
          <ellipse cx="335" cy="204" rx="6" ry="3" fill="#ffb4b4" opacity="0.4" />
          {/* Lips */}
          <path d="M314 210 Q320 216 326 210" fill="#e11d48" opacity="0.7" />
        </>
      )}
    </motion.g>
  </motion.g>
);

/* ─── Main Component ─── */
const SurpriseAnimation = ({ boyAvatarUrl, girlAvatarUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState(0);

  const startAnimation = () => {
    setIsPlaying(true);
    setStage(0);
    setTimeout(() => setStage(1), 300);
    setTimeout(() => setStage(2), 2000);
    setTimeout(() => setStage(3), 3800);
    setTimeout(() => setStage(4), 5200);
    setTimeout(() => setStage(5), 6800);
  };

  const close = () => { setIsPlaying(false); setStage(0); };

  const hearts = Array.from({ length: 25 }, (_, i) => ({
    id: i, x: (Math.random() - 0.5) * 700, y: -(Math.random() * 500 + 150),
    size: Math.random() * 22 + 14, delay: Math.random() * 2, duration: Math.random() * 2.5 + 2,
  }));

  const petals = Array.from({ length: 30 }, (_, i) => ({
    id: i, startX: Math.random() * 100, delay: Math.random() * 4,
    duration: Math.random() * 4 + 4, size: Math.random() * 12 + 10, sway: (Math.random() - 0.5) * 120,
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
          <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-xl group-hover:bg-pink-500/50 transition-all" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20">
            <span className="text-2xl">💐</span>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-ping" style={{ animationDuration: '2.5s' }} />
        </div>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs text-pink-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-500/20">
          A Special Surprise 💝
        </span>
      </motion.button>

      {/* Fullscreen Animation */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Cinematic bars */}
            <motion.div className="absolute top-0 left-0 right-0 bg-black z-50"
              initial={{ height: 0 }} animate={{ height: 50 }} transition={{ duration: 1 }} />
            <motion.div className="absolute bottom-0 left-0 right-0 bg-black z-50"
              initial={{ height: 0 }} animate={{ height: 50 }} transition={{ duration: 1 }} />

            {/* Night sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b1a] via-[#0f0a2a] to-[#1a1030]" />

            {/* Stars */}
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div key={`s-${i}`} className="absolute rounded-full bg-white"
                style={{ width: Math.random() * 2.5 + 0.5, height: Math.random() * 2.5 + 0.5, top: `${Math.random() * 45}%`, left: `${Math.random() * 100}%` }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: Math.random() * 3 + 2, delay: Math.random() * 2, repeat: Infinity }}
              />
            ))}

            {/* Moon */}
            <motion.div className="absolute top-16 right-16 w-20 h-20 rounded-full"
              style={{ background: 'radial-gradient(circle at 35% 35%, #fef3c7, #fbbf24)', boxShadow: '0 0 80px 30px rgba(251,191,36,0.2)' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
            />

            {/* Close */}
            <motion.button onClick={close}
              className="absolute top-16 right-6 z-[60] text-white/40 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
              whileHover={{ rotate: 90 }}>
              <X className="w-6 h-6" />
            </motion.button>

            {/* Falling petals */}
            {stage >= 4 && petals.map((p) => (
              <motion.div key={`p-${p.id}`} className="absolute pointer-events-none z-30"
                style={{ left: `${p.startX}%`, top: -20, fontSize: p.size }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: '110vh', x: [0, p.sway, -p.sway, 0], opacity: [0, 1, 1, 0.3], rotate: [0, 180, 360, 540] }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'linear', repeat: Infinity }}>
                🌸
              </motion.div>
            ))}

            {/* ===== SVG SCENE ===== */}
            <div className="absolute inset-0 flex items-end justify-center pb-12 z-20">
              <svg viewBox="0 0 480 400" className="w-full max-w-lg h-auto" style={{ maxHeight: '70vh' }}>
                <defs>
                  <linearGradient id="dressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e11d48" />
                    <stop offset="50%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#9f1239" />
                  </linearGradient>
                  <clipPath id="boyFaceClip">
                    <circle cx="160" cy="199" r="22" />
                  </clipPath>
                  <clipPath id="girlFaceClip">
                    <circle cx="320" cy="198" r="22" />
                  </clipPath>
                  {/* Ground grass */}
                  <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a3a1a" />
                    <stop offset="100%" stopColor="#0d2818" />
                  </linearGradient>
                </defs>

                {/* Ground */}
                <rect x="0" y="388" width="480" height="12" fill="url(#groundGrad)" rx="2" />
                {/* Grass blades */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <line key={`grass-${i}`} x1={i * 16 + 5} y1="390" x2={i * 16 + 8} y2={383 + Math.random() * 5}
                    stroke="#2d5a2d" strokeWidth="1.5" opacity={0.4 + Math.random() * 0.4} />
                ))}

                {/* Characters */}
                {stage >= 1 && <AnimatedBoy stage={stage} avatarUrl={boyAvatarUrl} />}
                {stage >= 1 && <AnimatedGirl stage={stage} avatarUrl={girlAvatarUrl} />}
              </svg>
            </div>

            {/* Ground gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 z-10"
              style={{ background: 'linear-gradient(to top, #0d2818, transparent)' }} />

            {/* Speech bubble */}
            <AnimatePresence>
              {stage >= 4 && (
                <motion.div
                  className="absolute z-40"
                  style={{ top: '15%', left: '55%' }}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="relative bg-white/95 backdrop-blur text-rose-600 px-5 py-2.5 rounded-2xl text-sm md:text-base font-bold shadow-2xl border border-rose-100">
                    Oh my God, Yes! 🥺💍
                    <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-rose-100" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hearts explosion */}
            <AnimatePresence>
              {stage >= 5 && hearts.map((h) => (
                <motion.div key={`h-${h.id}`} className="absolute pointer-events-none z-30"
                  style={{ left: '50%', bottom: '35%', fontSize: h.size }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], x: h.x, y: h.y, scale: [0, 1.3, 1, 0.5] }}
                  transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}>
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bottom message */}
            <AnimatePresence>
              {stage >= 5 && (
                <motion.div className="absolute bottom-16 left-0 right-0 text-center z-40 px-4"
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}>
                  <motion.h2 className="text-3xl md:text-5xl font-extrabold mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b8a, #ffd1dc, #ff6b8a)',
                      backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 25px rgba(255,107,138,0.5))',
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 4, repeat: Infinity }}>
                    You are my forever 💕
                  </motion.h2>
                  <p className="text-pink-200/70 text-sm md:text-base tracking-widest">Every moment with you is a dream come true</p>
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
