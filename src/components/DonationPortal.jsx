import React, { useState } from 'react';
import { orgData } from '../data/ngoData';
import { Heart, Sparkles, X, CheckCircle, ShieldCheck, CreditCard, Wallet, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationPortal({ isOpen, onClose }) {
  const [sel, setSel] = useState(1500);
  const [custom, setCustom] = useState('');
  const [pm, setPm] = useState('gcash');
  const [done, setDone] = useState(false);
  const amt = custom ? parseFloat(custom) || 0 : sel;

  const impact = (a) => {
    if (a >= 15000) return "Sponsors 1 native tree pavilion section in the Philippine Tribal Park.";
    if (a >= 5000) return "Funds legal mapping for 1 hectare of ancestral domain.";
    if (a >= 1500) return "Provides 1 month of heritage school materials for an IP child.";
    if (a >= 500) return `Plants ${Math.floor(a / 50)} native trees with IP forest guardians.`;
    return "Contributes to emergency legal defense for tribal families.";
  };

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    confetti({ particleCount: 80, spread: 50, origin: { y: 0.6 } });
  };

  const reset = () => { setDone(false); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/50 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white border border-[#e0dbd2] rounded-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        
        <button onClick={reset} className="absolute top-3 right-3 p-1.5 rounded-md bg-[#f5f0e8] text-[#8a8078] hover:text-[#1a1a1a] transition-colors">
          <X className="w-4 h-4" />
        </button>

        {!done ? (
          <div>
            <div className="text-center mb-5">
              <div className="w-10 h-10 rounded-md bg-[#e5efe9] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-5 h-5 text-[#3d6b4f]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1a1a1a]">Support PHILIPPEN</h3>
              <p className="text-xs text-[#8a8078] mt-0.5">Every contribution empowers indigenous communities directly.</p>
            </div>

            <div className="space-y-3 mb-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#5a5347] font-medium">Amount (PHP)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {orgData.donationTiers.map((t) => (
                  <button key={t.amount} type="button"
                    onClick={() => { setSel(t.amount); setCustom(''); }}
                    className={`py-2.5 rounded-md text-sm font-medium transition-colors ${
                      sel === t.amount && !custom
                        ? 'bg-[#3d6b4f] text-white'
                        : 'bg-[#faf7f1] border border-[#e0dbd2] text-[#1a1a1a] hover:bg-[#f5f0e8]'
                    }`}>
                    ₱{t.amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#8a8078] text-sm">₱</span>
                <input type="number" placeholder="Custom" value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]" />
              </div>
            </div>

            <div className="p-3 rounded-md bg-[#e5efe9] border border-[#c4ddd0] mb-5 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#8b6914] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#3d6b4f] font-medium mb-0.5">Impact</p>
                <p className="text-xs text-[#5a5347] leading-relaxed">{impact(amt)}</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#5a5347] font-medium">Payment</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { k: 'gcash', l: 'GCash / Maya', I: Wallet },
                  { k: 'bank', l: 'Bank Transfer', I: Building },
                  { k: 'card', l: 'Card / PayPal', I: CreditCard },
                ].map(({ k, l, I }) => (
                  <button key={k} type="button" onClick={() => setPm(k)}
                    className={`p-2.5 rounded-md border text-xs font-medium flex flex-col items-center gap-1 transition-colors ${
                      pm === k ? 'bg-[#faf7f1] border-[#3d6b4f] text-[#3d6b4f]' : 'bg-white border-[#e0dbd2] text-[#8a8078]'
                    }`}>
                    <I className="w-4 h-4" /><span>{l}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={submit}>
              <button type="submit"
                className="w-full py-3 rounded-md text-sm font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> Contribute ₱{amt.toLocaleString()}
              </button>
            </form>
            <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-[#8a8078]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3d6b4f]" /> SEC Non-Profit — Tax Deductible
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-md bg-[#e5efe9] text-[#3d6b4f] flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">Maraming Salamat!</h3>
            <p className="text-sm text-[#5a5347] mb-5 max-w-sm mx-auto">
              Your gift of <span className="font-medium text-[#3d6b4f]">₱{amt.toLocaleString()}</span> supports ancestral domain defense and indigenous livelihoods.
            </p>
            <button onClick={reset} className="px-6 py-2 rounded-md text-xs font-medium text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors">
              Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
