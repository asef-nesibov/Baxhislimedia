import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';

export const Hero: React.FC = () => {
  const { data } = useCMS();
  const { hero } = data;

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Concert Atmosphere"
          className="w-full h-full object-cover opacity-60 grayscale scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-indigo-400 font-medium tracking-[0.3em] uppercase mb-4 text-sm md:text-base"
        >
          {hero.subtitle}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8"
        >
          {hero.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">{hero.titleAccent}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="#music"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <Play size={20} fill="currentColor" />
            LISTEN NOW
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
      </motion.div>
    </section>
  );
};