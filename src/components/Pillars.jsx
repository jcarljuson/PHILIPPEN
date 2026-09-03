import React from 'react';
import { orgData } from '../data/ngoData';
import { Shield, Sprout, BookOpen, Anchor, CheckCircle2 } from 'lucide-react';

export default function Pillars() {
  const iconMap = { Shield, Sprout, BookOpen, Anchor };

  return (
    <section id="pillars" className="py-20 bg-white/60 border-y border-[#e0dbd2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">Pillars of Action</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Ancestral Domain Empowerment & Livelihoods
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            Protecting territory is only the first step. We build community-owned green enterprises and preserve ancestral heritage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {orgData.pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Shield;
            return (
              <div key={pillar.id} className="clean-card overflow-hidden">
                <div className="relative h-44 overflow-hidden bg-[#ebe6dc]">
                  <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-md bg-white/90 border border-[#e0dbd2] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#3d6b4f]" />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[#5a5347] mb-5 leading-relaxed">{pillar.shortDesc}</p>
                  <div className="space-y-2 pt-4 border-t border-[#ebe6dc]">
                    {pillar.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#5a5347]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3d6b4f] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
