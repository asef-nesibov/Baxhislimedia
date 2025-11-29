import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import { useCMS } from './CMSContext';

const navItems: NavItem[] = [
  { label: 'Ana səhifə', href: '#hero' },
  { label: 'Haqqımızda', href: '#about' },
  { label: 'Xidmətlər', href: '#music' }, // Reusing 'music' section for services
  { label: 'Partnyorlar', href: '#gallery' }, // Reusing gallery for partners
  { label: 'Bloq', href: '#' },
  { label: 'Əlaqə', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { data } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 relative flex justify-between items-center">
        
        {/* Logo Area - Fixed to the Left */}
        <a href="#" className="flex flex-col leading-none group relative z-20">
            <div className="text-3xl font-bold tracking-tighter">
                <span className="text-[#f05a28]">NK</span>
            </div>
            <div className="text-[10px] tracking-[0.3em] text-gray-400 font-light group-hover:text-white transition-colors">
                MEDIA
            </div>
        </a>

        {/* Desktop Menu - Absolute Center */}
        {/* We use absolute positioning to center this group (Nav + Button) relative to the container */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8">
          <div className="flex gap-8">
            {navItems.map((item) => (
                <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group whitespace-nowrap"
                >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f05a28] transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
          </div>
          
          {/* Blue CTA Button */}
          <a 
            href="#contact"
            className="px-6 py-2.5 bg-[#0f6cbd] hover:bg-[#0d5ca0] text-white text-sm font-medium rounded-full transition-colors shadow-lg whitespace-nowrap"
          >
            Müraciət et
          </a>
        </div>

        {/* Mobile Toggle - Right */}
        <div className="lg:hidden ml-auto relative z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#050505] border-t border-gray-800 shadow-2xl">
          <div className="flex flex-col items-center py-8 space-y-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-[#f05a28] transition-colors"
              >
                {item.label}
              </a>
            ))}
             <a 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-8 py-3 bg-[#0f6cbd] text-white font-medium rounded-full"
            >
                Müraciət et
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};