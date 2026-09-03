import React, { useState, useEffect } from 'react';
import { orgData } from '../data/ngoData';
import { Trees, Layers, MapPin, CheckCircle } from 'lucide-react';

export default function TribalParkShowcase() {
  const park = orgData.tribalPark;
  const [zone, setZone] = useState(park.zones[0]);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAfter(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="tribal-park" className="py-20 bg-white/60 border-b border-[#e0dbd2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-3">QC Diliman Flagship</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Philippine Tribal Park
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            A 12.5-hectare urban-indigenous eco-cultural sanctuary bridging modern communities with ancient ancestral wisdom.
          </p>
        </div>

        {/* Overview */}
        <div className="p-6 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] mb-10">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#e5efe9] text-[#3d6b4f] text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" /> QC Diliman Corridor
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a1a]">{park.title}</h3>
              <p className="text-sm text-[#5a5347] leading-relaxed">{park.overview}</p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {[
                  { l: 'Status', v: park.status, c: '#8b6914' },
                  { l: 'Area', v: park.areaSize, c: '#3d6b4f' },
                ].map((s, i) => (
                  <div key={i} className="px-3 py-1.5 rounded-md bg-white border border-[#e0dbd2] text-xs">
                    <span className="text-[#8a8078] block text-[10px] uppercase tracking-wider font-medium">{s.l}</span>
                    <span className="font-medium" style={{ color: s.c }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-2.5 relative">
              {/* Badge for Before/After */}
              <div className="absolute -top-3 -right-3 z-20 px-3 py-1 rounded-full bg-[#1a1a1a] text-white text-[10px] uppercase tracking-wider font-bold shadow-lg transition-colors duration-500">
                {showAfter ? 'After (Vision)' : 'Before (Current)'}
              </div>

              <div className="relative rounded-md overflow-hidden aspect-video border border-[#e0dbd2]">
                {/* Before Image */}
                <img src="/tribal-park-before-1.jpg" alt="Tribal Park Path Before" className="absolute inset-0 w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} draggable="false" />
                {/* After Image */}
                <img src="/tribal-park-new-3.jpg" alt="Tribal Park Path After" className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out" style={{ clipPath: showAfter ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }} onContextMenu={(e) => e.preventDefault()} draggable="false" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative rounded-md overflow-hidden aspect-video border border-[#e0dbd2]">
                  <img src="/tribal-park-before-2.jpg" alt="Tribal Park Entrance Before" className="absolute inset-0 w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} draggable="false" />
                  <img src="/tribal-park-new-1.jpg" alt="Tribal Park Entrance After" className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out" style={{ clipPath: showAfter ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }} onContextMenu={(e) => e.preventDefault()} draggable="false" />
                </div>
                <div className="relative rounded-md overflow-hidden aspect-video border border-[#e0dbd2]">
                  <img src="/tribal-park-before-3.jpg" alt="Tribal Park Landscape Before" className="absolute inset-0 w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} draggable="false" />
                  <img src="/tribal-park-new-2.jpg" alt="Tribal Park Landscape After" className="absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out" style={{ clipPath: showAfter ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }} onContextMenu={(e) => e.preventDefault()} draggable="false" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Selector */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a]">
            <Layers className="w-4 h-4 text-[#8b6914]" />
            Planned Park Zones
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {park.zones.map((z) => (
              <button key={z.id} onClick={() => setZone(z)}
                className={`p-3 rounded-md border text-left transition-all ${
                  zone.id === z.id
                    ? 'bg-[#f0e6cc] border-[#d9c98e]'
                    : 'bg-[#faf7f1] border-[#e0dbd2] hover:border-[#c4b99a]'
                }`}>
                <p className={`text-[10px] uppercase tracking-wider font-medium mb-0.5 ${zone.id === z.id ? 'text-[#8b6914]' : 'text-[#8a8078]'}`}>
                  Zone
                </p>
                <p className="text-xs font-medium text-[#1a1a1a] line-clamp-2">{z.name}</p>
              </button>
            ))}
          </div>

          {zone && (
            <div className="p-5 sm:p-6 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] grid lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 rounded-md overflow-hidden aspect-video border border-[#e0dbd2]">
                <img src={zone.image} alt={zone.name} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-6 space-y-3">
                <h4 className="text-lg font-semibold text-[#1a1a1a]">{zone.name}</h4>
                <p className="text-sm text-[#5a5347] leading-relaxed">{zone.desc}</p>
                <div className="pt-2 space-y-1.5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#8b6914] font-medium">Key Features</p>
                  {zone.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#5a5347]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#3d6b4f] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
