
import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';

export const About: React.FC = () => {
  const { data } = useCMS();
  const { about } = data;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header with Breadcrumb */}
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2 uppercase">{about.heading}</h2>
            <div className="text-sm text-gray-400 breadcrumbs uppercase tracking-widest">
                Ana səhifə <span className="mx-2">/</span> Haqqımızda
            </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Content */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2"
            >
                {about.text.map((para, i) => (
                    <p key={i} className="text-gray-600 mb-6 leading-relaxed text-justify">
                        {para}
                    </p>
                ))}
            </motion.div>

             {/* Stats / Image Area */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="md:w-1/2 w-full"
            >
                 {/* Dark stats blocks mimicking the video look */}
                <div className="grid grid-cols-2 gap-4">
                    {about.stats.map((stat, i) => (
                        <div key={i} className="bg-[#222] text-white p-6 rounded-lg text-center shadow-lg">
                            <div className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};
