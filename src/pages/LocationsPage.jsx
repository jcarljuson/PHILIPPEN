import React from 'react';
import BranchMap from '../components/BranchMap';
import EventGallery from '../components/EventGallery';
import { MapPin } from 'lucide-react';

export default function LocationsPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#e5efe9]/70 border border-[#c4ddd0] text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <MapPin className="w-6 h-6 text-[#3d6b4f]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-semibold mb-2">
            Regional Presence &amp; Sanctuaries
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1a1a] mb-3">
            Regional Hubs &amp; Field Bases
          </h1>
          <p className="text-sm text-[#5a5347] leading-relaxed max-w-xl mx-auto">
            From the National Coordinating Headquarters in Metro Manila to coastal sanctuaries in Pangasinan, Sierra Madre mountain bases, and the Southern Archipelago.
          </p>
        </div>
      </div>

      {/* Interactive Map */}
      <BranchMap />

      {/* Field Action Photos */}
      <EventGallery />
    </div>
  );
}
