import React from 'react';
import { catalogItems } from '../data/catalog';
import { Tractor, Wrench, Droplets, Sprout, ArrowRight } from 'lucide-react';

export default function EquipmentPool({ onSelectItem }) {
  const equipmentItems = catalogItems.filter((i) => i.category === 'equipment');
  const inputItems = catalogItems.filter((i) => i.category === 'input');

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Tractor':
        return <Tractor className="w-5 h-5 text-[#3d6b4f]" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-[#3d6b4f]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#3d6b4f]" />;
      case 'Sprout':
      default:
        return <Sprout className="w-5 h-5 text-[#8b6914]" />;
    }
  };

  const renderCard = (item) => {
    const percentage = Math.min(100, Math.round((item.fundedAmount / item.goalAmount) * 100));

    return (
      <div key={item.id} className="clean-card p-6 flex flex-col justify-between h-full">
        <div>
          {/* Header Badges */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-10 h-10 rounded-md bg-[#e5efe9] flex items-center justify-center shrink-0">
              {renderIcon(item.icon)}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f0e6cc]/80 text-[#8b6914] border border-[#e0dbd2]">
                {item.tier}
              </span>
              <span className="text-[10px] text-[#3d6b4f] font-medium tracking-wide">
                Open for Sponsorship
              </span>
            </div>
          </div>

          {/* Title & Purpose */}
          <h4 className="text-base font-semibold text-[#1a1a1a] mb-2 leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-[#5a5347] leading-relaxed mb-4">
            {item.purpose}
          </p>

          {/* Impact Callout */}
          <div className="mb-5 p-3 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#3a352c] leading-relaxed">
            <strong className="text-[#3d6b4f] font-semibold block mb-0.5">Direct Field Impact:</strong>
            {item.impact}
          </div>
        </div>

        {/* Funding & Action */}
        <div>
          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-semibold text-[#1a1a1a]">₱{item.fundedAmount.toLocaleString()} funded</span>
              <span className="text-[#8a8078]">Goal: ₱{item.goalAmount.toLocaleString()}</span>
            </div>

            {/* Accessible Progress Bar */}
            <div
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Funding progress for ${item.title}: ${percentage}%`}
              className="w-full h-2 bg-[#ebe6dc] rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-[#3d6b4f] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#8a8078]">
              <span>{item.unitLabel}</span>
              <span className="font-medium text-[#3d6b4f]">{percentage}% backed</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectItem(item)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#3d6b4f] hover:bg-[#2d513b] text-white font-medium text-xs transition-colors shadow-xs"
          >
            <span>Sponsor this</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-20">
      {/* ─── Equipment Pool ─── */}
      <section id="equipment-pool" className="py-16 sm:py-24 border-t border-[#e0dbd2] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-2">
                Communal Machinery Pool
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
                Farm Mechanization Pool
              </h3>
              <p className="text-sm text-[#5a5347] mt-2 leading-relaxed">
                Empowering indigenous farmers with walking tillers, disc plows, and irrigation kits. 100% direct asset delivery with zero administrative deductions on hardware.
              </p>
            </div>
            <div className="text-xs text-[#5a5347] bg-[#ffffff] border border-[#e0dbd2] px-3.5 py-2 rounded-md shrink-0 shadow-xs">
              <span className="text-[#3d6b4f] font-semibold">100% Direct:</span> Shared equipment maintained locally
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentItems.map(renderCard)}
          </div>
        </div>
      </section>

      {/* ─── Seed & Input Drives ─── */}
      <section id="seed-drives" className="py-16 sm:py-24 border-t border-[#e0dbd2] bg-[#faf7f1]/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#8b6914] font-medium mb-2">
                Seed Sovereignty &amp; Bio-Nutrients
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
                Seed &amp; Organic Input Drives
              </h3>
              <p className="text-sm text-[#5a5347] mt-2 leading-relaxed">
                Supplying certified non-GMO heirloom seeds and organic biological fertilizers to restore ancestral topsoils safely.
              </p>
            </div>
            <div className="text-xs text-[#5a5347] bg-[#ffffff] border border-[#e0dbd2] px-3.5 py-2 rounded-md shrink-0 shadow-xs">
              <span className="text-[#8b6914] font-semibold">Native Sovereignty:</span> Open-pollinated climate-resilient seeds
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {inputItems.map(renderCard)}
          </div>
        </div>
      </section>
    </div>
  );
}
