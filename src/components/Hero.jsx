import React from 'react';
import { Heart, Tractor, ArrowRight, ShieldCheck, Users, LandPlot, ArrowDown } from 'lucide-react';

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0e6cc]/80 border border-[#e0dbd2] text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d6b4f]" />
            <span>Direct Agricultural Support Initiative</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1a1a1a] leading-[1.15] mb-5">
            Mechanizing Ancestral Lands,
            <br />
            <span className="text-[#3d6b4f]">Securing Indigenous Livelihoods.</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#5a5347] leading-relaxed mb-6 max-w-xl">
            Eliminating red tape to deliver hand tractors, tillers, climate-resilient seeds, and organic fertilizers directly to indigenous farming communities.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="#equipment-pool"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors shadow-xs"
            >
              <Tractor className="w-4 h-4" />
              <span>Sponsor Farm Equipment</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-normal text-[#1a1a1a] bg-white/90 border border-[#d4cfc4] hover:bg-white transition-colors shadow-xs"
            >
              <span>Explore Active Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5a5347]" />
            </a>
            <button
              type="button"
              onClick={onOpenPartner || onOpenDonation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-normal text-[#8b6914] bg-[#f0e6cc]/60 border border-[#d9c98e]/50 hover:bg-[#f0e6cc] transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Partner With Us</span>
            </button>
          </div>

          {/* 3-Item Stats Bar in clean-card styling */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="clean-card p-3.5 bg-white/95">
              <div className="flex items-center gap-2 text-[#3d6b4f] font-semibold text-xs mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Direct Delivery</span>
              </div>
              <p className="text-[11px] text-[#5a5347] leading-tight">
                No administrative deduction on donated hardware.
              </p>
            </div>

            <div className="clean-card p-3.5 bg-white/95">
              <div className="flex items-center gap-2 text-[#8b6914] font-semibold text-xs mb-1">
                <Users className="w-4 h-4" />
                <span>Community-Pooled</span>
              </div>
              <p className="text-[11px] text-[#5a5347] leading-tight">
                Shared equipment maintained locally under tribal council oversight.
              </p>
            </div>

            <div className="clean-card p-3.5 bg-white/95">
              <div className="flex items-center gap-2 text-[#3d6b4f] font-semibold text-xs mb-1">
                <LandPlot className="w-4 h-4" />
                <span>Ancestral Domain Focus</span>
              </div>
              <p className="text-[11px] text-[#5a5347] leading-tight">
                Traditional stewardship backed by modern productivity.
              </p>
            </div>
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
