import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, Song } from '../types';

// Default content used if no saved data is found
const defaultData: SiteData = {
  general: {
    artistName: "NOCTURNE",
    contactEmail: "mgmt@nocturnemusic.com",
  },
  hero: {
    subtitle: "New Album Out Now",
    title: "MIDNIGHT",
    titleAccent: "ECHOES",
    backgroundImage: "https://picsum.photos/seed/concert/1920/1080",
  },
  about: {
    heading: "THE ART OF",
    headingAccent: "DARKNESS",
    bioParagraphs: [
      "Born in the shadows of the urban sprawl, Nocturne is more than just a musician—he is an architect of soundscapes. Blending analog synthesizers with cinematic atmospheres, his music explores the delicate balance between chaos and serenity.",
      "Following his breakout debut in Berlin's underground scene, Nocturne has captivated audiences worldwide with his visceral live performances. His latest album, 'Midnight Echoes,' delves deeper into the human psyche, asking questions that only silence can answer."
    ],
    image: "https://picsum.photos/seed/musician/800/1000",
    stats: [
      { value: "5M+", label: "Streams" },
      { value: "120+", label: "Shows" },
      { value: "3", label: "Albums" }
    ]
  },
  music: {
    heading: "LATEST",
    headingAccent: "RELEASES",
    albumArt: "https://picsum.photos/seed/albumart/600/600",
    tracks: [
      { id: 1, title: "Neon Rainfall", album: "Midnight Echoes", duration: "3:45", plays: "1.2M" },
      { id: 2, title: "Digital Ghosts", album: "Midnight Echoes", duration: "4:12", plays: "890K" },
      { id: 3, title: "Silence in Tokyo", album: "Midnight Echoes", duration: "3:58", plays: "2.5M" },
      { id: 4, title: "Velvet Void", album: "Previous Life", duration: "4:30", plays: "560K" },
      { id: 5, title: "Analog Heart", album: "Previous Life", duration: "3:22", plays: "1.8M" },
    ]
  },
  gallery: {
    heading: "VISUAL",
    headingAccent: "DIARY",
    images: [
      "https://picsum.photos/seed/gig1/800/600",
      "https://picsum.photos/seed/gig2/600/800",
      "https://picsum.photos/seed/gig3/800/800",
      "https://picsum.photos/seed/gig4/800/600",
      "https://picsum.photos/seed/gig5/600/800",
      "https://picsum.photos/seed/gig6/800/800",
    ]
  },
  contact: {
    heading: "GET IN",
    headingAccent: "TOUCH",
    text: "For booking inquiries, press features, or collaborations, please use the form or contact management directly."
  }
};

interface CMSContextType {
  data: SiteData;
  updateData: (newData: SiteData) => void;
  updateSection: <K extends keyof SiteData>(section: K, value: SiteData[K]) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultData);

  useEffect(() => {
    // Try to load data from the embedded script tag on mount
    const scriptTag = document.getElementById('site-data');
    if (scriptTag && scriptTag.textContent) {
      try {
        const savedData = JSON.parse(scriptTag.textContent);
        if (savedData && typeof savedData === 'object') {
            // Merge with default data to ensure new fields don't break old saves
            setData(prev => ({ ...prev, ...savedData }));
        }
      } catch (e) {
        console.error("Failed to parse embedded site data", e);
      }
    }
  }, []);

  const updateData = (newData: SiteData) => {
    setData(newData);
  };

  const updateSection = <K extends keyof SiteData>(section: K, value: SiteData[K]) => {
    setData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  return (
    <CMSContext.Provider value={{ data, updateData, updateSection }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};