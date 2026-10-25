import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Tractor, ArrowRight, ArrowDown } from 'lucide-react';

export default function Hero({ onOpenDonation, onOpenPartner }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Right-side background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#f5f0e8] via-[#f5f0e8]/95 sm:via-[#f5f0e8]/85 to-transparent z-10" />
        <img
          src="/hero-bg-new.png"
          alt="Philippine ancestral rainforest and farmland"
          className="w-full h-full object-cover object-[center_80%]"
        />
      </div>

      {/* Left-aligned content */}
      <div className="relative z-20 max-w-6xl mx-auto px-5 sm:px-8 w-full py-28 sm:py-36">
        <div className="max-w-2xl">
          
          {/* Label */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-5">
            Philippines International Philanthropy for People & Environment
          </p>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-[#1a1a1a] leading-[1.1] mb-5">
            Defending ancestral lands.
            <br />
            <span className="text-[#3d6b4f]">Empowering lives.</span>
          </h1>

          {/* Motto & Subtitle */}
          <div className="mb-4 max-w-xl">
            <p className="text-[15px] font-medium text-[#1a1a1a] leading-relaxed">
              "Dugtungan, tulungan, malasakitan at bayanihan sa kapakanan ng bawat mamamayan, kapwa at kalikasan"
            </p>
          </div>

          <p className="text-xs text-[#8a8078] tracking-wide mb-8">
            Serving indigenous communities for over 14 years · Est. 2012
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => onOpenDonation && onOpenDonation('money')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors shadow-xs"
            >
              <Tractor className="w-4 h-4" />
              <span>Sponsor Farm Equipment</span>
            </button>
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-normal text-[#1a1a1a] bg-white/90 border border-[#d4cfc4] hover:bg-white transition-colors shadow-xs"
            >
              <span>Explore Active Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5a5347]" />
            </Link>
            <button
              type="button"
              onClick={onOpenPartner || onOpenDonation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-normal text-[#8b6914] bg-[#f0e6cc]/60 border border-[#d9c98e]/50 hover:bg-[#f0e6cc] transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Partner With Us</span>
            </button>
          </div>

          {/* Founders subtitle */}
          <p className="text-[11px] text-[#8a8078]">
            Founded by <span className="text-[#5a5347] font-medium">Leodegario Estrella</span>,{' '}
            <span className="text-[#5a5347] font-medium">Raymundo B. Herrera</span>,{' '}
            <span className="text-[#5a5347] font-medium">Carlos Juson</span> &{' '}
            <span className="text-[#5a5347] font-medium">Jcarl Juson</span> · Est. 2012
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-10 z-20 text-[#8a8078]/60 animate-bounce hidden sm:block">
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}
