import React from 'react';
import { MapPin, Handshake, Truck, TrendingUp, Check } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Community Mapping',
      desc: 'Tribal council consultation and farm acreage profiling to identify precise mechanization and seed needs.',
      icon: MapPin,
      highlight: 'Customary domain verification',
    },
    {
      num: '02',
      title: 'Targeted Solicitation',
      desc: 'Machinery donations and seed funds mobilized from civic donors, corporate CSR partners, and equipment suppliers.',
      icon: Handshake,
      highlight: 'Zero hardware overhead fee',
    },
    {
      num: '03',
      title: 'Turnover & Operator Training',
      desc: 'Equipment delivery on-site accompanied by comprehensive mechanic training and community maintenance schedules.',
      icon: Truck,
      highlight: 'Certified community operators',
    },
    {
      num: '04',
      title: 'Harvest & Market Access',
      desc: 'Support through planting cycles, linking surplus yields to ethical fair-trade buyers and local markets.',
      icon: TrendingUp,
      highlight: 'Long-term food sovereignty',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-t border-[#e0dbd2] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">
            Implementation Pipeline
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
            How It Works
          </h3>
          <p className="text-sm text-[#5a5347] mt-2.5 leading-relaxed">
            A transparent, four-stage lifecycle from indigenous council consultation to verified post-harvest sovereignty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="clean-card p-6 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#f0e6cc]/80 text-[#8b6914] border border-[#e0dbd2]">
                    STEP {step.num}
                  </span>
                  <div className="w-9 h-9 rounded-md bg-[#e5efe9] flex items-center justify-center text-[#3d6b4f] group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-[#1a1a1a] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#5a5347] leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e0dbd2] flex items-center gap-1.5 text-xs text-[#3d6b4f]">
                  <Check className="w-3.5 h-3.5" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
