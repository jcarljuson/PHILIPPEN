import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Founders from './components/Founders';
import Pillars from './components/Pillars';
import BranchMap from './components/BranchMap';
import TribalParkShowcase from './components/TribalParkShowcase';
import PhotoGallery from './components/PhotoGallery';
import Licenses from './components/Licenses';
import EventGallery from './components/EventGallery';
import DonationPortal from './components/DonationPortal';
import Footer from './components/Footer';
import BaybayinBackground from './components/BaybayinBackground';
import CharterModal from './components/CharterModal';

export default function App() {
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [charterModalOpen, setCharterModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="baybayin-bg min-h-screen flex flex-col">
      <BaybayinBackground />
      <Navbar onOpenDonation={() => setDonationModalOpen(true)} />

      <main className="flex-1 relative">
        <Hero onOpenDonation={() => setDonationModalOpen(true)} />
        <About onOpenCharter={() => setCharterModalOpen(true)} />
        <Pillars />
        <BranchMap />
        <TribalParkShowcase />
        <PhotoGallery />
        <Licenses />
        <Founders />
        <EventGallery />
      </main>

      <Footer onOpenDonation={() => setDonationModalOpen(true)} />

      <DonationPortal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />

      <CharterModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
      />
    </div>
  );
}
