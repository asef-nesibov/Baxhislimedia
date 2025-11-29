
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Partners } from './components/Partners';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CMSProvider } from './components/CMSContext';
import { AdminPanel } from './components/AdminPanel';

const App: React.FC = () => {
  return (
    <CMSProvider>
      <div className="bg-white min-h-screen text-gray-800">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Partners />
          <Blog />
          <Contact />
        </main>
        <Footer />
        <AdminPanel />
      </div>
    </CMSProvider>
  );
};

export default App;
