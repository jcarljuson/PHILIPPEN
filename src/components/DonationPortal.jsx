import React, { useState } from 'react';
import { orgData } from '../data/ngoData';
import { Heart, Sparkles, X, CheckCircle, ShieldCheck, CreditCard, Wallet, Smartphone, Loader2, AlertCircle, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationPortal({ isOpen, onClose }) {
  const [sel, setSel] = useState(1500);
  const [custom, setCustom] = useState('');
  const [pm, setPm] = useState('gcash');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [_demoData, setDemoData] = useState(null);

  const amt = custom ? parseFloat(custom) || 0 : sel;

  const impact = (a) => {
    if (a >= 15000) return 'Co-finances a community cultivator/power tiller attachment for an indigenous farming cooperative.';
    if (a >= 5000) return 'Funds mechanical soil preparation and organic bio-nutrient starter packs for 1 hectare of ancestral land.';
    if (a >= 1500) return 'Provides heavy-duty heirloom seed packs & knapsack organic sprayers for 3 indigenous farming families.';
    if (a >= 500) return 'Funds bio-fertilizer starter pack and drought-resistant heritage seeds for 1 farming family.';
    return 'Contributes to communal tractor diesel reserve and shared farm tool maintenance.';
  };

  const handlePayMongoSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (amt < 20) {
      setError('Minimum donation amount is ₱20.');
      return;
    }

    if (!donorName.trim()) {
      setError('Please provide your name or organization.');
      return;
    }

    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setError('Please provide a valid email address for your official receipt.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/paymongo/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amt,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim() || '09000000000',
          paymentMethod: pm,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize PayMongo checkout session.');
      }

      // If live mode with checkout URL, redirect to PayMongo hosted checkout
      if (data.mode === 'live' && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      // If demo mode (no secret key configured yet)
      setDemoData(data);
      setDone(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      setError(err.message || 'Unable to connect to payment gateway. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDone(false);
    setError('');
    setDemoData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white border border-[#e0dbd2] rounded-xl p-6 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={reset}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#f5f0e8] text-[#8a8078] hover:text-[#1a1a1a] transition-colors"
          aria-label="Close donation modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!done ? (
          <div>
            <div className="text-center mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#e5efe9] flex items-center justify-center mx-auto mb-3">
                <Heart className="w-5 h-5 text-[#3d6b4f]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Empower Indigenous Farmers</h3>
              <p className="text-xs text-[#6e6659] mt-1 max-w-sm mx-auto">
                Direct equipment, organic soil inputs, and seed drives for ancestral domain farming communities.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handlePayMongoSubmit} className="space-y-4">
              {/* Amount Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold mb-2">
                  Select Donation Amount (PHP)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {orgData.donationTiers.map((t) => (
                    <button
                      key={t.amount}
                      type="button"
                      onClick={() => {
                        setSel(t.amount);
                        setCustom('');
                      }}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        sel === t.amount && !custom
                          ? 'bg-[#3d6b4f] text-white shadow-sm'
                          : 'bg-[#faf7f1] border border-[#e0dbd2] text-[#1a1a1a] hover:bg-[#f5f0e8]'
                      }`}
                    >
                      ₱{t.amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-2.5 text-[#8a8078] text-sm font-medium">₱</span>
                  <input
                    type="number"
                    min="20"
                    placeholder="Enter custom amount (e.g. 2500)"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-sm text-[#1a1a1a] placeholder-[#a89f91] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                  />
                </div>
              </div>

              {/* Impact Callout */}
              <div className="p-3.5 rounded-lg bg-[#e5efe9] border border-[#c4ddd0] flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#8b6914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#3d6b4f] font-bold mb-0.5">Direct Impact</p>
                  <p className="text-xs text-[#3a352d] leading-relaxed">{impact(amt)}</p>
                </div>
              </div>

              {/* PayMongo Payment Method Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold mb-2">
                  Payment Method (PayMongo)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'gcash', label: 'GCash', icon: Smartphone, badge: 'Popular' },
                    { id: 'paymaya', label: 'Maya', icon: Wallet, badge: 'Wallet' },
                    { id: 'card', label: 'Card / Visa', icon: CreditCard, badge: 'Instant' },
                  ].map(({ id, label, icon: Icon, badge }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPm(id)}
                      className={`p-2.5 rounded-lg border text-left transition-all relative ${
                        pm === id
                          ? 'bg-[#faf7f1] border-[#3d6b4f] text-[#3d6b4f] ring-1 ring-[#3d6b4f]'
                          : 'bg-white border-[#e0dbd2] text-[#6e6659] hover:border-[#b8b0a2]'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#8b6914] block mb-0.5">
                        {badge}
                      </span>
                      <div className="flex items-center gap-1.5 font-medium text-xs text-[#1a1a1a]">
                        <Icon className="w-3.5 h-3.5 text-[#3d6b4f]" />
                        <span>{label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor Contact Details for Receipt */}
              <div className="space-y-2 pt-1 border-t border-[#ede7dd]">
                <p className="text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold">
                  Donor Information (For Official Receipt)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name / Org"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number (e.g. 09171234567 for GCash/SMS)"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg text-sm font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] disabled:bg-[#8a8078] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to PayMongo...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    <span>Proceed with PayMongo • ₱{amt.toLocaleString()}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Trust and Compliance Badges */}
            <div className="mt-4 pt-3 border-t border-[#ede7dd] text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#3d6b4f]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secured by PayMongo Payments • BSP Regulated Operator</span>
              </div>
              <p className="text-[10px] text-[#8a8078]">
                SEC Reg. CN201614210 • 100% Directed to Verified IP Farmer Cooperatives
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#e5efe9] text-[#3d6b4f] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-1">Maraming Salamat!</h3>
            <p className="text-xs uppercase tracking-wider text-[#8b6914] font-semibold mb-3">
              PayMongo Donation Gateway Ready
            </p>
            <p className="text-sm text-[#5a5347] mb-5 max-w-sm mx-auto leading-relaxed">
              Your pledge of <span className="font-bold text-[#3d6b4f]">₱{amt.toLocaleString()}</span> from{' '}
              <span className="font-medium text-[#1a1a1a]">{donorName}</span> has been registered.
            </p>

            <div className="p-3.5 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-left text-xs text-[#5a5347] space-y-1 mb-6">
              <p className="font-semibold text-[#1a1a1a] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3d6b4f]" />
                Integration Status
              </p>
              <p className="text-[11px] text-[#6e6659]">
                Method: <strong className="uppercase">{pm}</strong> • Email: {donorEmail}
              </p>
              <p className="text-[11px] text-[#8a8078] pt-1 border-t border-[#ede7dd]">
                To activate live checkout with automatic redirection, set <code className="bg-white px-1 py-0.5 rounded border border-[#e0dbd2]">PAYMONGO_SECRET_KEY=sk_...</code> in your <code className="bg-white px-1 py-0.5 rounded border border-[#e0dbd2]">.env</code> file.
              </p>
            </div>

            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] transition-colors shadow-sm"
            >
              Back to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
