import React from 'react';
import Transparency from '../components/Transparency';
import PartnerSection from '../components/PartnerSection';
import { ShieldCheck } from 'lucide-react';

export default function TransparencyPage({ onOpenPartner }) {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#faf7f1] border border-[#e0dbd2] text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-[#3d6b4f]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-semibold mb-2">
            Governance &amp; Accountability
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1a1a] mb-3">
            Radical Civic Transparency
          </h1>
          <p className="text-sm text-[#5a5347] leading-relaxed max-w-xl mx-auto">
            Zero administrative deductions on hardware donations, GPS hardware logging, tripartite turnover deeds, and open public records.
          </p>
        </div>
      </div>

      {/* Transparency Component */}
      <Transparency />

      {/* Corporate CSR & Equipment Partnership Lead Section */}
      <PartnerSection onOpenPartner={onOpenPartner} />
    </div>
  );
}
