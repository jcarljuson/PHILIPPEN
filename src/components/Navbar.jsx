import React, { useState, useEffect } from 'react';
import { orgData } from '../data/ngoData';
import { Heart, Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenDonation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Founders', href: '#founders' },
    { name: 'Pillars', href: '#pillars' },
    { name: 'Regional Map', href: '#branch-map' },
    { name: 'Tribal Park', href: '#tribal-park', highlight: true },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Licenses', href: '#licenses' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled
        ? 'py-3 bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-[#d4cfc4]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo-new.png" alt="PHILIPPEN Logo" className="h-14 sm:h-16 w-auto object-contain mix-blend-multiply" onContextMenu={(e) => e.preventDefault()} draggable="false" />
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-[13px] transition-colors ${
                  link.highlight
                    ? 'font-medium text-[#8b6914] bg-[#f0e6cc]/60'
                    : 'font-normal text-[#5a5347] hover:text-[#1a1a1a] hover:bg-[#ebe6dc]/50'
                }`}>
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden sm:flex items-center">
            <button onClick={onOpenDonation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors">
              <Heart className="w-3.5 h-3.5" />
              <span>Donate</span>
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button onClick={onOpenDonation} className="p-1.5 rounded-md bg-[#3d6b4f] text-white sm:hidden">
              <Heart className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md bg-white border border-[#d4cfc4] text-[#5a5347]">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f5f0e8] border-b border-[#d4cfc4] px-5 pt-3 pb-5 mt-2 space-y-1">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm ${
                link.highlight ? 'font-medium text-[#8b6914]' : 'text-[#5a5347]'
              }`}>
              {link.name}
            </a>
          ))}
          <button onClick={() => { setMobileMenuOpen(false); onOpenDonation(); }}
            className="w-full mt-2 py-2.5 rounded-md text-sm font-medium text-white bg-[#3d6b4f] flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" /> Donate
          </button>
        </div>
      )}
    </nav>
  );
}
