import React from 'react';
import { orgData } from '../data/ngoData';
import { ShieldCheck, FileSignature, Stamp } from 'lucide-react';

export default function Licenses() {
  const getIcon = (type) => {
    switch (type) {
      case 'SEC':
        return <Stamp className="w-8 h-8 text-[#8b6914]" />;
      case 'DENR':
        return <ShieldCheck className="w-8 h-8 text-[#3d6b4f]" />;
      case 'NCIP':
        return <FileSignature className="w-8 h-8 text-[#8b6914]" />;
      default:
        return <ShieldCheck className="w-8 h-8 text-[#3d6b4f]" />;
    }
  };

  return (
    <section id="licenses" className="py-20 bg-white border-b border-[#e0dbd2]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">
            Official Accreditations
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a1a] mb-4">
            Licenses & Certifications
          </h2>
          <p className="text-[15px] text-[#5a5347] leading-relaxed">
            PHILIPPEN operates transparently and is officially recognized by the Philippine government to protect our people and environment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgData.licenses.map((license) => (
            <div 
              key={license.id} 
              className="bg-[#fcfbfa] border border-[#e0dbd2] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#f5f0e8] flex items-center justify-center mb-6">
                {getIcon(license.type)}
              </div>
              
              <h3 className="text-[17px] font-semibold text-[#1a1a1a] mb-2 leading-snug">
                {license.title}
              </h3>
              
              <div className="inline-block bg-white border border-[#e0dbd2] px-3 py-1 rounded-full mb-4">
                <p className="text-xs font-mono font-medium tracking-wide text-[#3d6b4f]">
                  {license.number}
                </p>
              </div>
              
              <p className="text-sm text-[#5a5347] leading-relaxed">
                {license.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
