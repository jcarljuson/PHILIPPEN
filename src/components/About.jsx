import React from 'react';
import { orgData } from '../data/ngoData';
import { Compass, Eye, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function About({ onOpenCharter }) {
  return (
    <section id="about" className="py-20 bg-white/60 border-y border-[#e0dbd2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-3">About PHILIPPEN</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Philippines International Philanthropy for People & Environment
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            Safeguarding sacred ancestral domains while establishing sustainable, community-owned livelihoods and ecological resilience for Indigenous Peoples.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-lg bg-[#faf7f1] border border-[#e0dbd2]">
            <Compass className="w-5 h-5 text-[#3d6b4f] mb-4" />
            <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">Mission</h3>
            <p className="text-sm text-[#5a5347] leading-relaxed">{orgData.mission}</p>
          </div>
          <div className="p-6 rounded-lg bg-[#faf7f1] border border-[#e0dbd2]">
            <Eye className="w-5 h-5 text-[#8b6914] mb-4" />
            <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">Vision</h3>
            <p className="text-sm text-[#5a5347] leading-relaxed">{orgData.vision}</p>
          </div>
        </div>

        {/* Principles */}
        <div className="p-6 rounded-lg bg-[#faf7f1] border border-[#e0dbd2]">
          <div className="flex items-center gap-2 mb-5">
            <HeartHandshake className="w-4 h-4 text-[#3d6b4f]" />
            <h3 className="text-sm font-semibold text-[#1a1a1a]">Guiding Principles</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { t: 'Ancestral Self-Determination', d: 'Honoring the Council of Elders and FPIC standards in every community decision.' },
              { t: '100% Community Ownership', d: 'Livelihood cooperatives and craft enterprises owned by IP families directly.' },
              { t: 'Endemic Reforestation', d: 'Restoring corridors with native Philippine hardwood trees, not commercial exotics.' },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3d6b4f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-[#1a1a1a] mb-0.5">{p.t}</h4>
                  <p className="text-xs text-[#8a8078] leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Charter Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={onOpenCharter}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-[#1a1a1a] bg-white border border-[#d4cfc4] hover:bg-[#f5f0e8] hover:border-[#c5bdae] transition-all shadow-sm"
          >
            <Compass className="w-4 h-4 text-[#8b6914]" />
            Read Full Mission & Objectives Charter
          </button>
        </div>
      </div>
    </section>
  );
}
