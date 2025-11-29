import React from 'react';

export interface Song {
  id: number;
  title: string;
  album: string;
  duration: string;
  plays: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

export interface SiteData {
  general: {
    artistName: string;
    contactEmail: string;
  };
  hero: {
    subtitle: string;
    title: string;
    titleAccent: string;
    backgroundImage: string;
  };
  about: {
    heading: string;
    headingAccent: string;
    bioParagraphs: string[];
    image: string;
    stats: { label: string; value: string }[];
  };
  music: {
    heading: string;
    headingAccent: string;
    tracks: Song[];
    albumArt: string;
  };
  gallery: {
    heading: string;
    headingAccent: string;
    images: string[];
  };
  contact: {
    heading: string;
    headingAccent: string;
    text: string;
  };
}