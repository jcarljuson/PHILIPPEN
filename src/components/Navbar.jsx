import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartHandshake, Tractor } from 'lucide-react';

export default function Navbar({ onOpenDonation, onOpenPartner }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Equipment Pool', path: '/equipment', highlight: true },
    { name: 'About & Founders', path: '/about' },
    { name: 'Regional Map', path: '/locations' },
    { name: 'Transparency & CSR', path: '/transparency' },
  ];

  const handlePartnerClick = () => {
    if (onOpenPartner) {
      onOpenPartner();
    } else if (onOpenDonation) {
      onOpenDonation();
    }
  };

  const isHomePage = location.pathname === '/';
  const showSolidNav = scrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-200 ${
        showSolidNav
          ? 'py-2.5 bg-[#f5f0e8]/95 backdrop-blur-md border-b border-[#d4cfc4]/70 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
          : 'py-3.5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo-new.png"
              alt="PHILIPPEN Logo"
              className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                    isActive
                      ? 'font-semibold text-[#3d6b4f] bg-[#e5efe9]'
                      : link.highlight
                      ? 'font-medium text-[#3d6b4f] bg-[#e5efe9]/60 hover:bg-[#e5efe9]'
                      : 'font-normal text-[#5a5347] hover:text-[#1a1a1a] hover:bg-[#ebe6dc]/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
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
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2 rounded-md text-sm ${
                  isActive
                    ? 'font-semibold text-[#3d6b4f] bg-[#e5efe9]'
                    : 'text-[#5a5347] hover:text-[#1a1a1a] hover:bg-[#ebe6dc]/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
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
