import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import EventGallery from '../components/EventGallery';
import { catalogItems } from '../data/catalog';
import { Tractor, Wrench, Droplets, ArrowRight, Heart } from 'lucide-react';

export default function HomePage({ onOpenDonation, onOpenCharter }) {
  const featuredEquipment = catalogItems.filter((i) => i.category === 'equipment');

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Tractor':
        return <Tractor className="w-5 h-5 text-[#3d6b4f]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#3d6b4f]" />;
      case 'Droplets':
      default:
        return <Droplets className="w-5 h-5 text-[#3d6b4f]" />;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        onOpenDonation={() => onOpenDonation('money')}
        onOpenPartner={() => onOpenDonation('machinery')}
      />

      {/* About Summary */}
      <About onOpenCharter={onOpenCharter} />

      {/* Equipment Pool Highlight */}
      <section className="py-16 sm:py-20 border-b border-[#e0dbd2] bg-[#f5f0e8]/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-2">
                Communal Hardware Initiative
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
                Farm Mechanization Pool
              </h3>
              <p className="text-sm text-[#5a5347] mt-1.5 max-w-xl">
                Providing shared walking tillers, disc plows, and irrigation kits directly to indigenous farming cooperatives.
              </p>
            </div>
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#3d6b4f] hover:text-[#284935] transition-colors"
            >
              <span>Explore All Machinery & Seed Drives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredEquipment.map((item) => (
              <div key={item.id} className="clean-card p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-[#e5efe9] flex items-center justify-center shrink-0">
                      {renderIcon(item.icon)}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f0e6cc]/80 text-[#8b6914] border border-[#e0dbd2]">
                      {item.tier}
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-[#1a1a1a] mb-2">{item.title}</h4>
                  <p className="text-xs text-[#5a5347] leading-relaxed mb-4">{item.purpose}</p>
                </div>

                <div className="pt-4 border-t border-[#ede7dd] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#3d6b4f]">Goal: ₱{item.goalAmount.toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => onOpenDonation('machinery')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a1a1a] hover:text-[#3d6b4f] transition-colors"
                  >
                    <span>Sponsor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white border border-[#d4cfc4] hover:bg-[#faf7f1] text-xs font-semibold text-[#1a1a1a] transition-all shadow-xs"
            >
              <Tractor className="w-4 h-4 text-[#3d6b4f]" />
              <span>View Full Equipment Pool &amp; Seed Drives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* In Action Field Gallery */}
      <EventGallery />

      {/* Quick Action CTA Banner */}
      <section className="py-14 sm:py-16 bg-[#e5efe9]/80 border-t border-[#c4ddd0]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a1a1a] mb-3">
            Support Indigenous Livelihoods Today
          </h3>
          <p className="text-sm text-[#5a5347] mb-7 max-w-xl mx-auto leading-relaxed">
            Whether sponsoring a power tiller, donating non-GMO seeds, or contributing via GCash &amp; Maya, 100% of your support directly reaches verified ancestral farming communities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenDonation('money')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors shadow-sm"
            >
              <Heart className="w-4 h-4" />
              <span>Donate Funds (PayMongo)</span>
            </button>
            <button
              onClick={() => onOpenDonation('machinery')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-[#1a1a1a] bg-white border border-[#d4cfc4] hover:bg-[#faf7f1] transition-colors shadow-sm"
            >
              <Tractor className="w-4 h-4 text-[#3d6b4f]" />
              <span>Sponsor Machinery / Hardware</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
