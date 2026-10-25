import React from 'react';
import About from '../components/About';
import Pillars from '../components/Pillars';
import Founders from '../components/Founders';
import Licenses from '../components/Licenses';
import { Compass } from 'lucide-react';

export default function AboutPage({ onOpenCharter }) {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#faf7f1] border border-[#e0dbd2] text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Compass className="w-6 h-6 text-[#8b6914]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-semibold mb-2">
            Organization &amp; Leadership
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1a1a] mb-3">
            About PHILIPPEN
          </h1>
          <p className="text-sm text-[#5a5347] leading-relaxed max-w-xl mx-auto">
            Philippines International Philanthropy for People &amp; Environment. Over 14 years of defending ancestral lands and empowering indigenous communities.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <About onOpenCharter={onOpenCharter} />

      {/* Guiding Pillars */}
      <Pillars />

      {/* Founders & Leadership */}
      <Founders />

      {/* Legal Licenses & Accreditation */}
      <Licenses />
    </div>
  );
}
