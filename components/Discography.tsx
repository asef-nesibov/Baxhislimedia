import React, { useState } from 'react';
import { Play, Pause, Disc, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';

export const Discography: React.FC = () => {
  const { data } = useCMS();
  const { music } = data;
  const tracks = music.tracks;
  
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (id: number) => {
    if (currentTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(id);
      setIsPlaying(true);
    }
  };

  return (
    <section id="music" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {music.heading} <span className="text-indigo-500">{music.headingAccent}</span>
          </motion.h2>
          <div className="h-1 w-24 bg-indigo-600 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Album Art / Player Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-2xl sticky top-24">
              <div className="aspect-square bg-gradient-to-br from-indigo-900 to-black rounded-xl mb-8 flex items-center justify-center relative overflow-hidden group">
                 <img 
                    src={music.albumArt} 
                    alt="Album Cover" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                 />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Disc className={`w-24 h-24 text-white/80 ${isPlaying ? 'animate-spin-slow' : ''}`} />
                 </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  {currentTrack ? tracks.find(t => t.id === currentTrack)?.title : "Select a Track"}
                </h3>
                <p className="text-indigo-400">
                  {currentTrack ? tracks.find(t => t.id === currentTrack)?.album : data.general.artistName}
                </p>
              </div>
              
              {/* Fake Progress Bar */}
              <div className="mt-8 space-y-2">
                <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: isPlaying ? "65%" : "0%" }}
                    transition={{ duration: 40, ease: "linear" }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-mono">
                  <span>1:24</span>
                  <span>{currentTrack ? tracks.find(t => t.id === currentTrack)?.duration : "0:00"}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center items-center gap-8">
                <button className="text-gray-400 hover:text-white"><Heart size={24}/></button>
                <button 
                  onClick={() => currentTrack && setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:bg-indigo-400 transition-colors"
                >
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
                <button className="text-gray-400 hover:text-white"><Share2 size={24}/></button>
              </div>
            </div>
          </motion.div>

          {/* Tracklist */}
          <div className="lg:w-2/3 space-y-2">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePlay(track.id)}
                className={`group flex items-center p-4 md:p-6 rounded-xl transition-all cursor-pointer border border-transparent ${
                  currentTrack === track.id 
                    ? 'bg-neutral-900 border-neutral-800' 
                    : 'hover:bg-neutral-900/50 hover:border-neutral-800'
                }`}
              >
                <div className="w-12 text-center text-gray-500 font-mono text-sm group-hover:text-indigo-400">
                  {currentTrack === track.id && isPlaying ? (
                    <div className="flex gap-1 justify-center h-4 items-end">
                      <span className="w-1 bg-indigo-500 animate-[bounce_1s_infinite] h-2"></span>
                      <span className="w-1 bg-indigo-500 animate-[bounce_1.2s_infinite] h-4"></span>
                      <span className="w-1 bg-indigo-500 animate-[bounce_0.8s_infinite] h-3"></span>
                    </div>
                  ) : (
                    String(index + 1).padStart(2, '0')
                  )}
                </div>
                
                <div className="flex-1 px-4 md:px-8">
                  <h4 className={`font-bold text-lg mb-1 ${currentTrack === track.id ? 'text-indigo-400' : 'text-white group-hover:text-white'}`}>
                    {track.title}
                  </h4>
                  <p className="text-sm text-gray-500">{track.album}</p>
                </div>

                <div className="hidden md:block text-sm text-gray-500 font-mono mr-8">
                  {track.plays} plays
                </div>

                <div className="text-sm text-gray-500 font-mono">
                  {track.duration}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};