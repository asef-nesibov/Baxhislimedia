import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';

export const About: React.FC = () => {
  const { data } = useCMS();
  const { about } = data;

  return (
    <section id="about" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 blur-lg transition duration-500"></div>
              <img
                src={about.image}
                alt="Artist Portrait"
                className="relative w-full h-[600px] object-cover grayscale contrast-125 shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              {about.heading} <span className="text-indigo-500">{about.headingAccent}</span>
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              {about.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-12 flex gap-12">
              {about.stats.map((stat, i) => (
                <div key={i}>
                  <span className="block text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-gray-500 tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};