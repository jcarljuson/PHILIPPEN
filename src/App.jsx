import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EquipmentPool from './components/EquipmentPool';
import WhyThisModelWorks from './components/WhyThisModelWorks';
import HowItWorks from './components/HowItWorks';
import Transparency from './components/Transparency';
import Pillars from './components/Pillars';
import BranchMap from './components/BranchMap';
import Licenses from './components/Licenses';
import Founders from './components/Founders';
import EventGallery from './components/EventGallery';
import PartnerSection from './components/PartnerSection';
import PartnerModal from './components/PartnerModal';
import DonationPortal from './components/DonationPortal';
import Footer from './components/Footer';
import BaybayinBackground from './components/BaybayinBackground';
import CharterModal from './components/CharterModal';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [selectedCatalogItem, setSelectedCatalogItem] = useState('');
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

  const handleOpenPartnerModal = (itemTitle = '') => {
    setSelectedCatalogItem(itemTitle);
    setPartnerModalOpen(true);
  };

  const handleSelectCatalogItem = (item) => {
    setSelectedCatalogItem(item.title);
    setPartnerModalOpen(true);
  };

  return (
    <div className="baybayin-bg min-h-screen flex flex-col overflow-x-hidden">
      <BaybayinBackground />
      
      <Navbar
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenPartner={() => handleOpenPartnerModal()}
      />

      <main className="flex-1 relative">
        <Hero
          onOpenDonation={() => setDonationModalOpen(true)}
          onOpenPartner={() => handleOpenPartnerModal()}
        />
        <About onOpenCharter={() => setCharterModalOpen(true)} />
        
        {/* New Agricultural Support Features */}
        <EquipmentPool onSelectItem={handleSelectCatalogItem} />
        <WhyThisModelWorks />
        <HowItWorks />
        <Transparency />

        {/* Existing Loved Sections: Pillars, Map, Photos, Licenses, Founders, Events */}
        <Pillars />
        <BranchMap />
        <Licenses />
        <Founders />
        <EventGallery />

        {/* Lead Capture & Sponsorship Section */}
        <PartnerSection />
      </main>

      <Footer
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenPartner={() => handleOpenPartnerModal()}
      />

      {/* Equipment & In-Kind Lead Capture Modal */}
      <PartnerModal
        key={selectedCatalogItem || 'default'}
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
        selectedItem={selectedCatalogItem}
      />

      {/* Individual Donation Modal */}
      <DonationPortal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />

      {/* Charter Modal */}
      <CharterModal
        isOpen={charterModalOpen}
        onClose={() => setCharterModalOpen(false)}
      />
    </div>
  );
}
