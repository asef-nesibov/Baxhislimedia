
import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';
import { Calendar, Eye } from 'lucide-react';

export const Blog: React.FC = () => {
  const { data } = useCMS();
  const { blog } = data;

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{blog.heading}</h2>
          <p className="text-gray-500">{blog.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blog.posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[#f05a28] transition-colors">
                {post.title}
              </h3>
              
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{post.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
