import React from 'react';
import { orgData } from '../data/ngoData';
import { Shield, PhoneCall, MapPin, Heart, ArrowUp, Send } from 'lucide-react';

export default function Footer({ onOpenDonation }) {
  return (
    <footer className="bg-[#1a1a1a] text-[#a09888] relative z-10">
      
      {/* CTA Banner */}
      <div className="border-b border-[#2a2a2a] py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">Support indigenous communities today</h3>
            <p className="text-xs text-[#8a8078]">Ancestral land titling, native tree reforestation, and sustainable livelihoods.</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button onClick={onOpenDonation}
              className="px-5 py-2.5 rounded-md text-xs font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" /> Contribute
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-md bg-[#2a2a2a] text-[#8a8078] hover:text-white transition-colors">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center">
              <img src="/logo-new.png" alt="PHILIPPEN Logo" className="h-12 w-auto bg-[#f5f0e8] rounded-md p-1.5 object-contain" onContextMenu={(e) => e.preventDefault()} draggable="false" />
            </div>
            <p className="text-xs text-[#a09888] leading-relaxed">{orgData.name}</p>
            <p className="text-[11px] text-[#706858] leading-relaxed">
              Non-profit NGO registered under Philippine laws. NCIP Accredited Partner.
            </p>
            <div className="p-3 rounded-md bg-[#222] border border-[#333] text-xs">
              <p className="text-[#8b6914] font-medium mb-0.5">Founders</p>
              <p className="text-[#a09888]">Leodegario Estrella · Raymundo B. Herrera · Carlos Juson · Jcarl Juson</p>
            </div>
          </div>

          {/* Branches */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-white font-medium mb-3">Regional Branches</p>
            <ul className="space-y-2 text-xs">
              {orgData.branches.map((b) => (
                <li key={b.id} className="flex items-start gap-2">
                  <MapPin className={`w-3 h-3 shrink-0 mt-0.5 ${b.isHQ ? 'text-[#8b6914]' : 'text-[#3d6b4f]'}`} />
                  <div>
                    <span className="text-[#c4b99a] block">{b.name}</span>
                    <span className="text-[#706858] text-[11px]">{b.address}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Hotline & Newsletter */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white font-medium">Emergency Hotline</p>
            <div className="p-3 rounded-md bg-[#222] border border-[#333]">
              <div className="flex items-center gap-1.5 text-[#3d6b4f] text-xs font-medium mb-1">
                <PhoneCall className="w-3.5 h-3.5" /> 24/7 Ancestral Rights Desk
              </div>
              <p className="text-xs text-white font-mono">+63 (02) 8920-PHIL</p>
            </div>

            <div>
              <p className="text-xs text-[#a09888] mb-1.5">Subscribe to field updates</p>
              <div className="flex gap-1.5">
                <input type="email" placeholder="Your email"
                  className="w-full px-3 py-2 rounded-md bg-[#222] border border-[#333] text-xs text-white focus:outline-none focus:border-[#3d6b4f]" />
                <button className="px-3 py-2 rounded-md bg-[#3d6b4f] text-white text-xs shrink-0 hover:bg-[#2f5a40] transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2a2a2a] py-5 text-center text-[11px] text-[#706858]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} PHILIPPEN. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#a09888]">Privacy</a>
            <a href="#" className="hover:text-[#a09888]">Governance</a>
            <a href="#" className="hover:text-[#a09888]">SEC Audits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
