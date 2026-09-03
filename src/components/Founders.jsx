import React, { useState } from 'react';
import { orgData } from '../data/ngoData';
import FounderModal from './FounderModal';
import { Users, ArrowRight } from 'lucide-react';

export default function Founders() {
  const [selectedFounder, setSelectedFounder] = useState(null);

  return (
    <section id="founders" className="py-20 bg-[#f5f0e8]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-3">Founding Visionaries</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Meet the Founders
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            Legal mastery, environmental science, technology, and relentless field advocacy for Philippine Indigenous Peoples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {orgData.founders.map((founder) => (
            <div key={founder.id} className="clean-card p-5 flex flex-col justify-between">
              <div>
                <div className="relative mb-4 overflow-hidden rounded-md aspect-square border border-[#e0dbd2]">
                  <img src={founder.image} alt={founder.name} className={`w-full h-full object-cover ${founder.id === 'leodegario-estrella' ? 'object-[30%_top]' : founder.id === 'raymundo-herrera' ? 'object-[25%_center]' : founder.id === 'carlos-juson' ? 'object-top' : ''}`} />
                </div>
                <h3 className="text-sm font-semibold text-[#1a1a1a] mb-0.5">{founder.name}</h3>
                <p className="text-xs text-[#8b6914] mb-2">{founder.title}</p>
                <p className="text-xs text-[#8a8078] line-clamp-3 leading-relaxed mb-4">{founder.bio}</p>
              </div>
              <button onClick={() => setSelectedFounder(founder)}
                className="w-full py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs font-medium text-[#5a5347] hover:bg-[#f5f0e8] transition-colors flex items-center justify-center gap-1.5">
                Read Biography <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <FounderModal founder={selectedFounder} onClose={() => setSelectedFounder(null)} />
    </section>
  );
}
