import React, { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake, Tractor } from 'lucide-react';

export default function Navbar({ onOpenDonation, onOpenPartner }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Equipment Pool', href: '#equipment-pool', highlight: true },
    { name: 'Seed Drives', href: '#seed-drives' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Transparency', href: '#transparency' },
    { name: 'Regional Map', href: '#branch-map' },
    { name: 'Field Action', href: '#action' },
    { name: 'Founders', href: '#founders' },
  ];

  const handlePartnerClick = () => {
    if (onOpenPartner) {
      onOpenPartner();
    } else if (onOpenDonation) {
      onOpenDonation();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled
        ? 'py-2.5 bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-[#d4cfc4]/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
        : 'py-3.5 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline */}
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo-new.png"
              alt="PHILIPPEN Logo"
              className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
            <span className="hidden xl:block text-[11px] text-[#5a5347] max-w-[210px] leading-tight border-l border-[#d4cfc4] pl-3">
              Direct Agricultural Support for Indigenous Communities
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                  link.highlight
                    ? 'font-medium text-[#3d6b4f] bg-[#e5efe9]/80 border border-[#3d6b4f]/20'
                    : 'font-normal text-[#5a5347] hover:text-[#1a1a1a] hover:bg-[#ebe6dc]/50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePartnerClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors shadow-xs"
            >
              <Tractor className="w-3.5 h-3.5" />
              <span>Sponsor Equipment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handlePartnerClick}
              className="p-1.5 rounded-md bg-[#3d6b4f] text-white sm:hidden"
              aria-label="Sponsor Equipment"
            >
              <Tractor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#5a5347] hover:text-[#1a1a1a] hover:bg-[#ebe6dc]/50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f5f0e8] border-b border-[#d4cfc4] px-5 py-4 shadow-lg space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2 rounded-md text-sm ${
                link.highlight
                  ? 'font-medium text-[#3d6b4f] bg-[#e5efe9]'
                  : 'text-[#5a5347] hover:text-[#1a1a1a] hover:bg-[#ebe6dc]/50'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-[#d4cfc4]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handlePartnerClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-xs font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Sponsor Equipment / Donate Inputs</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
