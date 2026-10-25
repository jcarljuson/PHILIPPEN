import React from 'react';
import EquipmentPool from '../components/EquipmentPool';
import WhyThisModelWorks from '../components/WhyThisModelWorks';
import HowItWorks from '../components/HowItWorks';
import { Tractor, HeartHandshake } from 'lucide-react';

export default function EquipmentPage({ onSelectItem, onOpenDonation }) {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-12">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#e5efe9]/70 border border-[#c4ddd0] text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Tractor className="w-6 h-6 text-[#3d6b4f]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-semibold mb-2">
            Indigenous Agricultural Mechanization
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1a1a] mb-3">
            Shared Machinery &amp; Seed Drives
          </h1>
          <p className="text-sm text-[#5a5347] leading-relaxed max-w-xl mx-auto">
            Direct-to-cooperative hardware turnover eliminating predatory farm debt and empowering indigenous families on ancestral lands.
          </p>
        </div>
      </div>

      {/* Equipment Pool & Input Drives */}
      <EquipmentPool onSelectItem={onSelectItem} />

      {/* Why This Model Works */}
      <WhyThisModelWorks />

      {/* How It Works */}
      <HowItWorks />

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 mt-16 text-center">
        <div className="clean-card p-8 bg-white text-center">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-serif">Have machinery or supplies to contribute?</h3>
          <p className="text-xs text-[#5a5347] mb-5 max-w-md mx-auto">
            We handle hauling logistics, operator training, and transparent turnover deeds for CSR reporting and tribal recognition.
          </p>
          <button
            onClick={() => onOpenDonation('machinery')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors shadow-xs"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Sponsor Machinery / In-Kind Hardware</span>
          </button>
        </div>
      </div>
    </div>
  );
}
