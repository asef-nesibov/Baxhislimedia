
import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';
import { Search, Shield, BadgeCheck, Headphones, Megaphone, Globe } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  seo: <Search size={40} className="text-[#f05a28]" />,
  content: <Shield size={40} className="text-[#f05a28]" />,
  verify: <BadgeCheck size={40} className="text-[#f05a28]" />,
  support: <Headphones size={40} className="text-[#f05a28]" />,
  ads: <Megaphone size={40} className="text-[#f05a28]" />,
  digital: <Globe size={40} className="text-[#f05a28]" />,
};

export const Services: React.FC = () => {
  const { data } = useCMS();
  const { services } = data;

  return (
    <section id="services" className="py-24 bg-white text-center">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{services.heading}</h2>
          <p className="text-gray-500 text-lg">{services.subtitle}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[item.iconType] || <Search size={40} className="text-[#f05a28]" />}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
