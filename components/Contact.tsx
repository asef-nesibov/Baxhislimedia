import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';
import { useCMS } from './CMSContext';

export const Contact: React.FC = () => {
  const { data } = useCMS();
  const { contact, general } = data;

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              {contact.heading} <span className="text-indigo-500">{contact.headingAccent}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
              {contact.text}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-indigo-500">
                  <Mail />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider text-sm">Management</h4>
                  <a href={`mailto:${general.contactEmail}`} className="text-gray-400 hover:text-white transition-colors">{general.contactEmail}</a>
                </div>
              </div>

              <div className="pt-8 border-t border-neutral-800">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Follow {general.artistName}</h4>
                <div className="flex gap-6">
                  {[Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 border border-neutral-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <form className="bg-neutral-900/50 p-8 md:p-10 rounded-2xl border border-neutral-800 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-black/50 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-black/50 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Subject</label>
                  <select className="w-full bg-black/50 border border-neutral-700 text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors">
                    <option>Booking Inquiry</option>
                    <option>Press / Media</option>
                    <option>Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-black/50 border border-neutral-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="w-full bg-indigo-600 text-white font-bold tracking-widest uppercase py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};