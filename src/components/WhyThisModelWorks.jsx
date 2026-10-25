import React from 'react';
import { ShieldCheck, Users, Truck, CheckCircle2 } from 'lucide-react';

export default function WhyThisModelWorks() {
  const pillars = [
    {
      icon: ShieldCheck,
      iconColor: 'text-[#3d6b4f]',
      iconBg: 'bg-[#e5efe9]',
      title: 'Rooted in Traditional Livelihood',
      description:
        'Ancestral farming within communal domains builds on native stewardship, so farmers can start planting without commercial-enterprise hurdles.',
      details: [
        'Customary land rights respected under R.A. 8371 (IPRA)',
        'Zero predatory micro-loans or interest cycles',
        'Integrates native polyculture cropping with seasonal weather patterns',
      ],
    },
    {
      icon: Users,
      iconColor: 'text-[#8b6914]',
      iconBg: 'bg-[#f0e6cc]/70',
      title: 'Shared Equipment Governance',
      description:
        'Managed collectively through tribal councils and farm committees, preventing privatization and ensuring communal benefit.',
      details: [
        'Documented community asset custody protocols',
        'Rotating field preparation schedule across all clan plots',
        'Community maintenance fund pooled through harvest share',
      ],
    },
    {
      icon: Truck,
      iconColor: 'text-[#3d6b4f]',
      iconBg: 'bg-[#e5efe9]',
      title: 'Direct-to-Community Turnover',
      description:
        'Delivered on-site with field training for designated community operators.',
      details: [
        'Hardware delivered directly to remote upland barangays',
        'Hands-on engine troubleshooting & basic repairs training',
        'Official turnover deed witnessed by tribal elders and municipal stakeholders',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-[#e0dbd2] bg-[#f5f0e8]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">
            Sustainable Model
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
            Why This Model Works
          </h3>
          <p className="text-sm text-[#5a5347] mt-2.5 leading-relaxed">
            Eliminating donor skepticism and protecting indigenous communities from debt and aid dependency through shared ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((col, idx) => {
            const Icon = col.icon;
            return (
              <div key={idx} className="clean-card p-6 flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${col.iconBg}`}>
                    <Icon className={`w-6 h-6 ${col.iconColor}`} />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1a1a1a] mb-2 leading-snug">
                    {col.title}
                  </h4>
                  <p className="text-xs text-[#5a5347] leading-relaxed mb-5">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e0dbd2] space-y-2">
                  {col.details.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-[#3a352c]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3d6b4f] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
