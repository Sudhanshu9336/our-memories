import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const RelationshipCounter = ({ startDate }) => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!startDate) return;
    const start = new Date(startDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = now - start;
      if (diff < 0) return;

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setElapsed({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  if (!startDate) return null;

  const blocks = [
    { label: 'Days', value: elapsed.days },
    { label: 'Hours', value: elapsed.hours },
    { label: 'Minutes', value: elapsed.minutes },
    { label: 'Seconds', value: elapsed.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative my-12"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-pink-500/10 to-primary-600/10 rounded-3xl blur-xl" />
      
      <div className="relative glass-card rounded-3xl p-6 md:p-8 border border-primary-500/20 overflow-hidden">
        {/* Decorative floating hearts */}
        <div className="absolute top-3 right-4 opacity-20">
          <Heart className="w-8 h-8 text-primary-400 animate-pulse" fill="currentColor" />
        </div>
        <div className="absolute bottom-3 left-4 opacity-10">
          <Heart className="w-6 h-6 text-pink-400 animate-pulse" fill="currentColor" style={{ animationDelay: '0.5s' }} />
        </div>

        <p className="text-center text-gray-400 text-sm font-medium tracking-widest uppercase mb-2">
          Falling in love with you for
        </p>
        <p className="text-center text-primary-400 font-semibold text-sm mb-6">
          (Since {new Date(startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })})
        </p>

        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto">
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <div className="relative">
                <div className="bg-dark-900/80 border border-white/10 rounded-2xl py-3 md:py-5 px-2 backdrop-blur-sm">
                  <span className="text-2xl md:text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent tabular-nums">
                    {String(block.value).padStart(block.label === 'Days' ? 1 : 2, '0')}
                  </span>
                </div>
                {/* Subtle glow under active digit */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary-500/30 rounded-full blur-sm" />
              </div>
              <p className="text-gray-500 text-xs mt-2 font-medium tracking-wider uppercase">{block.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs mt-6 italic">...and counting every heartbeat 💓</p>
      </div>
    </motion.div>
  );
};

export default RelationshipCounter;
