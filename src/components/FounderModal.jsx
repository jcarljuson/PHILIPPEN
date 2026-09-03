import React from 'react';
import { X, Award, Quote, CheckCircle } from 'lucide-react';

export default function FounderModal({ founder, onClose }) {
  if (!founder) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-[#e0dbd2] rounded-lg p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-md bg-[#f5f0e8] text-[#8a8078] hover:text-[#1a1a1a] transition-colors">
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
          <img src={founder.image} alt={founder.name}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border border-[#e0dbd2] ${founder.id === 'leodegario-estrella' ? 'object-[30%_top]' : founder.id === 'raymundo-herrera' ? 'object-[25%_center]' : founder.id === 'carlos-juson' ? 'object-top' : ''}`} />
          <div className="text-center sm:text-left">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-1">Founding Leadership</p>
            <h3 className="text-xl font-semibold text-[#1a1a1a]">{founder.name}</h3>
            <p className="text-[#8b6914] text-sm mt-0.5">{founder.title}</p>
            <p className="text-xs text-[#8a8078] mt-0.5">{founder.role}</p>
          </div>
        </div>

        <div className="p-3 rounded-md bg-[#faf7f1] border border-[#e0dbd2] mb-5 relative">
          <Quote className="w-5 h-5 text-[#3d6b4f]/15 absolute top-2 left-2" />
          <p className="text-[#5a5347] italic text-sm pl-5">"{founder.quote}"</p>
        </div>

        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1.5">Biography</p>
          <p className="text-[#5a5347] text-sm leading-relaxed">{founder.bio}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#8b6914]" /> Key Contributions
          </p>
          <ul className="space-y-1.5">
            {founder.achievements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#5a5347]">
                <CheckCircle className="w-3.5 h-3.5 text-[#3d6b4f] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e0dbd2] text-right">
          <button onClick={onClose}
            className="px-5 py-1.5 rounded-md text-xs font-medium text-[#5a5347] bg-[#f5f0e8] hover:bg-[#ebe6dc] transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
