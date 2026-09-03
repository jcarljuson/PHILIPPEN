import React from 'react';
import { orgData } from '../data/ngoData';
import { Heart, MapPin, Trees, ArrowDown } from 'lucide-react';

export default function Hero({ onOpenDonation }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Right-side background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#f5f0e8] via-[#f5f0e8]/95 sm:via-[#f5f0e8]/85 to-transparent z-10" />
        <img
          src="/hero-bg-new.png"
          alt="Philippine ancestral rainforest"
          className="w-full h-full object-cover object-[center_80%]"
        />
      </div>

      {/* Left-aligned content */}
      <div className="relative z-20 max-w-6xl mx-auto px-5 sm:px-8 w-full py-32">
        <div className="max-w-xl">
          
          {/* Label */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-5">
            Philippines International Philanthropy for People & Environment
          </p>

          {/* Heading — concise */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-[#1a1a1a] leading-[1.1] mb-5">
            Defending ancestral lands.
            <br />
            <span className="text-[#3d6b4f]">Empowering lives.</span>
          </h1>

          {/* Short description */}
          <div className="mb-4 max-w-lg">
            <p className="text-[15px] font-medium text-[#1a1a1a] leading-relaxed">
              "Dugtungan, tulungan, malasakitan at bayanihan sa kapakanan ng bawat mamamayan, kapwa at kalikasan"
            </p>
          </div>

          <p className="text-xs text-[#8a8078] tracking-wide mb-8">
            Serving indigenous communities for over 14 years · Est. 2012
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <button onClick={onOpenDonation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors">
              <Heart className="w-4 h-4" />
              Make a Contribution
            </button>
            <a href="#branch-map"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-normal text-[#3d6b4f] bg-white/80 border border-[#d4cfc4] hover:bg-white transition-colors">
              <MapPin className="w-4 h-4" />
              Regional Branches
            </a>
            <a href="#tribal-park"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-normal text-[#8b6914] bg-[#f0e6cc]/60 border border-[#d9c98e]/50 hover:bg-[#f0e6cc] transition-colors">
              <Trees className="w-4 h-4" />
              Tribal Park
            </a>
          </div>

          {/* Founders — subtle */}
          <p className="text-xs text-[#8a8078]">
            Founded by <span className="text-[#5a5347] font-medium">Leodegario Estrella</span>,{' '}
            <span className="text-[#5a5347] font-medium">Raymundo B. Herrera</span>,{' '}
            <span className="text-[#5a5347] font-medium">Carlos Juson</span> &{' '}
            <span className="text-[#5a5347] font-medium">Jcarl Juson</span>
          </p>
        </div>
      </div>

      {/* Scroll indicator — right side, blended */}
      <div className="absolute bottom-8 right-10 z-20 text-white/40 animate-bounce">
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}
