import React, { useState, useEffect } from 'react';
import { orgData } from '../data/ngoData';
import { MapPin, Trees, User, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const createIcon = (isHQ) => L.divIcon({
  className: 'custom-pin',
  html: `<div style="width:28px;height:28px;border-radius:6px;background:${isHQ?'#8b6914':'#3d6b4f'};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.15)"><div style="width:10px;height:10px;border-radius:50%;background:#fff"></div></div>`,
  iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14]
});

function MapFlyTo({ coords }) {
  const map = useMap();
  useEffect(() => { if (coords) map.flyTo(coords, 9, { duration: 1 }); }, [coords, map]);
  return null;
}

export default function BranchMap() {
  const [sel, setSel] = useState(orgData.branches[0]);

  return (
    <section id="branch-map" className="py-20 bg-[#f5f0e8] border-b border-[#e0dbd2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">Regional Map</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            PHILIPPEN Regional Locations
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            Operational sanctuaries from Metro Manila to the Southern Archipelago.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1 px-0.5">
              {orgData.branches.length} Locations
            </p>
            {orgData.branches.map((b) => (
              <button key={b.id} onClick={() => setSel(b)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                  sel.id === b.id
                    ? 'bg-white border-[#3d6b4f] shadow-sm'
                    : 'bg-white/60 border-[#e0dbd2] hover:border-[#c4b99a]'
                }`}>
                <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  b.isHQ ? 'bg-[#f0e6cc] text-[#8b6914]' : 'bg-[#e5efe9] text-[#3d6b4f]'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="text-sm font-medium text-[#1a1a1a] truncate">{b.name}</h4>
                    {b.isHQ && <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#8b6914] text-white uppercase shrink-0">HQ</span>}
                  </div>
                  <p className="text-[11px] text-[#8a8078] truncate">{b.region}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Map + Detail */}
          <div className="lg:col-span-7 space-y-5">
            <div className="w-full h-[380px] rounded-lg overflow-hidden border border-[#e0dbd2] shadow-sm">
              <MapContainer center={sel.coords} zoom={6} scrollWheelZoom={false} className="w-full h-full">
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <MapFlyTo coords={sel.coords} />
                {orgData.branches.map((b) => (
                  <Marker key={b.id} position={b.coords} icon={createIcon(b.isHQ)} eventHandlers={{ click: () => setSel(b) }}>
                    <Popup>
                      <div className="p-1.5 text-[#1a1a1a]">
                        <div className="font-medium text-sm text-[#3d6b4f] mb-0.5">{b.name}</div>
                        <div className="text-xs text-[#5a5347]">{b.focus}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {sel && (
              <div className="p-5 sm:p-6 rounded-lg bg-white border border-[#e0dbd2] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ebe6dc]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#3d6b4f] font-medium">{sel.region}</p>
                    <h3 className="text-lg font-semibold text-[#1a1a1a]">{sel.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#5a5347] leading-relaxed">{sel.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {sel.keyProjects.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#e5efe9] text-[#3d6b4f] text-xs font-medium">✓ {p}</span>
                  ))}
                </div>
                {sel.id === 'qc-diliman' && (
                  <a href="#tribal-park"
                    className="w-full py-2.5 rounded-md bg-[#f0e6cc] border border-[#d9c98e] text-[#8b6914] text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#ebe1c1] transition-colors">
                    <Trees className="w-4 h-4" /> View Philippine Tribal Park Masterplan <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
