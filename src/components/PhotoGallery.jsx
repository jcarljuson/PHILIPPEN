import React, { useState } from 'react';
import { orgData } from '../data/ngoData';
import { Image as ImageIcon, MapPin, X, Maximize2 } from 'lucide-react';

export default function PhotoGallery() {
  const [cat, setCat] = useState('All');
  const [lb, setLb] = useState(null);

  const cats = ['All', 'Ancestral Domain', 'Indigenous Culture', 'Livelihood', 'Tribal Park', "Women's Welfare"];
  const items = cat === 'All' ? orgData.gallery : orgData.gallery.filter(i => i.category === cat);

  return (
    <section id="gallery" className="py-20 bg-[#f5f0e8] border-b border-[#e0dbd2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">Field Gallery</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Voices from the Field
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            Ancestral lands, IP artisans, reforestation, and Tribal Park renders.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-10">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                cat === c
                  ? 'bg-[#3d6b4f] text-white'
                  : 'bg-white border border-[#e0dbd2] text-[#5a5347] hover:bg-[#faf7f1]'
              }`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.id} onClick={() => setLb(item)}
              className="clean-card cursor-pointer overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ebe6dc]">
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1.5 rounded-md bg-white/90 text-[#1a1a1a]"><Maximize2 className="w-3.5 h-3.5" /></div>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-[10px] text-white/80 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{item.location}
                  </p>
                  <p className="text-sm font-medium text-white line-clamp-1">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lb && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/60 backdrop-blur-xs">
          <div className="relative max-w-3xl w-full bg-white border border-[#e0dbd2] rounded-lg overflow-hidden shadow-xl">
            <button onClick={() => setLb(null)} className="absolute top-3 right-3 z-10 p-2 rounded-md bg-[#1a1a1a]/60 text-white hover:bg-[#1a1a1a]/80 transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="max-h-[70vh] bg-[#1a1a1a]">
              <img src={lb.image} alt={lb.title} className="w-full h-full object-contain max-h-[70vh] mx-auto" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#e5efe9] text-[#3d6b4f] uppercase">{lb.category}</span>
                <span className="text-[11px] text-[#8a8078] flex items-center gap-1"><MapPin className="w-3 h-3 text-[#8b6914]" />{lb.location}</span>
              </div>
              <h3 className="text-base font-semibold text-[#1a1a1a] mb-1">{lb.title}</h3>
              <p className="text-sm text-[#5a5347]">{lb.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
