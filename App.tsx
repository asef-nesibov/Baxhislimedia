import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Discography } from './components/Discography';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CMSProvider } from './components/CMSContext';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  return (
    <CMSProvider>
      <div className="bg-[#050505] min-h-screen text-neutral-200">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Discography />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <AdminPanel />
      </div>
    </CMSProvider>
  );
};

export default App;