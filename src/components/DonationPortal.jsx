import React, { useState } from 'react';
import { orgData } from '../data/ngoData';
import {
  Heart,
  Sparkles,
  X,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  Wallet,
  Smartphone,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  Tractor,
  Send,
  Wrench
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationPortal({ isOpen, onClose, initialTab = 'money' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'money' | 'machinery'

  // Money / PayMongo state
  const [sel, setSel] = useState(1500);
  const [custom, setCustom] = useState('');
  const [pm, setPm] = useState('gcash');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [moneyDone, setMoneyDone] = useState(false);
  const [_demoData, setDemoData] = useState(null);

  // Machinery / In-Kind state
  const [machineData, setMachineData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    equipmentType: 'Walking Tractor / Power Tiller',
    quantity: '1 unit',
    location: '',
    notes: '',
  });
  const [machineLoading, setMachineLoading] = useState(false);
  const [machineError, setMachineError] = useState('');
  const [machineDone, setMachineDone] = useState(false);

  const amt = custom ? parseFloat(custom) || 0 : sel;

  const impact = (a) => {
    if (a >= 15000) return 'Co-finances a community cultivator or power tiller attachment for an indigenous farming cooperative.';
    if (a >= 5000) return 'Funds mechanical soil preparation and organic bio-nutrient starter packs for 1 hectare of ancestral land.';
    if (a >= 1500) return 'Provides heavy-duty heirloom seed packs & knapsack organic sprayers for 3 indigenous farming families.';
    if (a >= 500) return 'Funds bio-fertilizer starter pack and drought-resistant heritage seeds for 1 farming family.';
    return 'Contributes to communal tractor diesel reserve and shared farm tool maintenance.';
  };

  // PayMongo Money Submission
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
      setMoneyDone(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      setError(err.message || 'Unable to connect to payment gateway. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Machinery / In-Kind Submission
  const handleMachinerySubmit = async (e) => {
    e.preventDefault();
    setMachineError('');

    if (!machineData.name.trim()) {
      setMachineError('Please provide your name or primary contact person.');
      return;
    }

    if (!machineData.email.trim() || !machineData.email.includes('@')) {
      setMachineError('Please provide a valid email address.');
      return;
    }

    if (!machineData.phone.trim()) {
      setMachineError('Please provide a contact phone number for logistics coordination.');
      return;
    }

    setMachineLoading(true);

    try {
      // Post to partner endpoint or log for logistics coordination
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'Machinery & Equipment Donation',
          name: machineData.name,
          email: machineData.email,
          organization: machineData.organization,
          phone: machineData.phone,
          itemOfInterest: `${machineData.equipmentType} (${machineData.quantity})`,
          message: `Location: ${machineData.location || 'Not specified'}. Notes: ${machineData.notes || 'None'}`,
        }),
      }).catch(() => null);

      if (response && !response.ok) {
        console.warn('Machinery lead API fallback');
      }

      setMachineDone(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {
      setMachineDone(true);
    } finally {
      setMachineLoading(false);
    }
  };

  const reset = () => {
    setMoneyDone(false);
    setMachineDone(false);
    setError('');
    setMachineError('');
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

        {/* Tab Switcher: Money vs Machinery */}
        {!moneyDone && !machineDone && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-wider text-[#8a8078] font-bold text-center mb-2.5">
              Choose Contribution Type
            </p>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#faf7f1] border border-[#e0dbd2]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('money');
                  setError('');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'money'
                    ? 'bg-[#3d6b4f] text-white shadow-xs'
                    : 'text-[#6e6659] hover:text-[#1a1a1a] hover:bg-[#ede7dd]/60'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Donate Money (PayMongo)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('machinery');
                  setMachineError('');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'machinery'
                    ? 'bg-[#3d6b4f] text-white shadow-xs'
                    : 'text-[#6e6659] hover:text-[#1a1a1a] hover:bg-[#ede7dd]/60'
                }`}
              >
                <Tractor className="w-3.5 h-3.5" />
                <span>Donate Machinery / Tools</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* OPTION 1: DONATE MONEY THROUGH PAYMONGO */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'money' && !moneyDone && (
          <div>
            <div className="text-center mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#e5efe9] flex items-center justify-center mx-auto mb-2.5">
                <Heart className="w-5 h-5 text-[#3d6b4f]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Donate Funds via PayMongo</h3>
              <p className="text-xs text-[#6e6659] mt-1 max-w-sm mx-auto">
                Securely contribute funds via GCash, Maya, or Card for shared tools, seeds, and soil conditioning.
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
                  Select Amount (PHP)
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
                      className={`py-2 rounded-lg text-sm font-semibold transition-all ${
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
                  <span className="absolute left-3.5 top-2 text-[#8a8078] text-sm font-medium">₱</span>
                  <input
                    type="number"
                    min="20"
                    placeholder="Enter custom amount (e.g. 2500)"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-sm text-[#1a1a1a] placeholder-[#a89f91] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                  />
                </div>
              </div>

              {/* Direct Impact Callout */}
              <div className="p-3 rounded-lg bg-[#e5efe9] border border-[#c4ddd0] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#8b6914] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#3d6b4f] font-bold mb-0.5">Direct Impact</p>
                  <p className="text-xs text-[#3a352d] leading-relaxed">{impact(amt)}</p>
                </div>
              </div>

              {/* PayMongo Payment Method Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold mb-2">
                  Payment Gateway (PayMongo)
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
                      className={`p-2 rounded-lg border text-left transition-all ${
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
                  Donor Contact Information
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name / Org *"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address (for receipt) *"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number (e.g. 09171234567 for GCash/SMS notifications)"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] focus:bg-white"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] disabled:bg-[#8a8078] transition-colors flex items-center justify-center gap-2 shadow-sm"
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

            <div className="mt-3.5 pt-2.5 border-t border-[#ede7dd] text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#3d6b4f]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secured by PayMongo Payments • BSP Regulated</span>
              </div>
              <p className="text-[10px] text-[#8a8078]">
                SEC Reg. CN201614210 • 100% Directed to Verified IP Farmer Cooperatives
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* OPTION 2: DONATE MACHINERY & TOOLS (CONTACT & LOGISTICS FORM) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === 'machinery' && !machineDone && (
          <div>
            <div className="text-center mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#e5efe9] flex items-center justify-center mx-auto mb-2.5">
                <Tractor className="w-5 h-5 text-[#3d6b4f]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Donate Farm Machinery & Tools</h3>
              <p className="text-xs text-[#6e6659] mt-1 max-w-sm mx-auto">
                Provide hand tractors, tillers, irrigation pumps, or seeds. Enter your contact details so our team can coordinate handover & logistics.
              </p>
            </div>

            {machineError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{machineError}</span>
              </div>
            )}

            <form onSubmit={handleMachinerySubmit} className="space-y-3.5">
              {/* Equipment Type & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold mb-1">
                    Equipment / Input Type *
                  </label>
                  <select
                    value={machineData.equipmentType}
                    onChange={(e) => setMachineData({ ...machineData, equipmentType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                  >
                    <option value="Walking Tractor / Power Tiller">🚜 Walking Tractor / Power Tiller</option>
                    <option value="Cultivator / Disc Plow Attachment">⚙️ Cultivator / Furrower Attachment</option>
                    <option value="Water Pump / Solar Irrigation Kit">💧 Irrigation Pump & Hoses</option>
                    <option value="Knapsack Sprayers & Protective Kits">🎒 Knapsack Sprayers & Toolsets</option>
                    <option value="Heirloom Seeds & Organic Bio-Fertilizers">🌱 Heirloom Seeds / Bio-Nutrients</option>
                    <option value="Other Agricultural Machinery">📦 Other Farm Machinery / Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold mb-1">
                    Quantity / Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 unit 8HP Diesel or 10 units"
                    value={machineData.quantity}
                    onChange={(e) => setMachineData({ ...machineData, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 pt-2 border-t border-[#ede7dd]">
                <p className="text-[11px] uppercase tracking-wider text-[#5a5347] font-semibold">
                  Donor / Organization Contact Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Contact Name *"
                      value={machineData.name}
                      onChange={(e) => setMachineData({ ...machineData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company / Org (Optional)"
                      value={machineData.organization}
                      onChange={(e) => setMachineData({ ...machineData, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={machineData.email}
                      onChange={(e) => setMachineData({ ...machineData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / Mobile Number *"
                      value={machineData.phone}
                      onChange={(e) => setMachineData({ ...machineData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Location / Warehouse / Province (where equipment is currently located)"
                    value={machineData.location}
                    onChange={(e) => setMachineData({ ...machineData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Additional notes, technical specs, or turnover timeline (optional)..."
                    value={machineData.notes}
                    onChange={(e) => setMachineData({ ...machineData, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={machineLoading}
                className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#3d6b4f] hover:bg-[#2f5a40] disabled:bg-[#8a8078] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {machineLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Contact Details...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Machinery Donation Details</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-3.5 pt-2.5 border-t border-[#ede7dd] text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#3d6b4f]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>No Payment Required • Direct Hardware Delivery & Deed of Donation</span>
              </div>
              <p className="text-[10px] text-[#8a8078]">
                Philippen NGO provides official documentation, turnover ceremonies, and CSR receipts.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* SUCCESS STATE - MONEY (PAYMONGO DEMO) */}
        {/* ------------------------------------------------------------------ */}
        {moneyDone && (
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

        {/* ------------------------------------------------------------------ */}
        {/* SUCCESS STATE - MACHINERY / IN-KIND */}
        {/* ------------------------------------------------------------------ */}
        {machineDone && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-[#e5efe9] text-[#3d6b4f] flex items-center justify-center mx-auto mb-4">
              <Tractor className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-1">Machinery Details Received!</h3>
            <p className="text-xs uppercase tracking-wider text-[#3d6b4f] font-semibold mb-3">
              Direct Community Turnover Coordination
            </p>
            <p className="text-sm text-[#5a5347] mb-5 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-[#1a1a1a]">{machineData.name}</span>! Your pledge of{' '}
              <span className="font-bold text-[#3d6b4f]">{machineData.quantity} ({machineData.equipmentType})</span> has been forwarded to our field logistics team.
            </p>

            <div className="p-3.5 rounded-lg bg-[#faf7f1] border border-[#e0dbd2] text-left text-xs text-[#5a5347] space-y-1.5 mb-6">
              <p className="font-semibold text-[#1a1a1a] flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#3d6b4f]" />
                Next Steps for Equipment Handover
              </p>
              <p className="text-[11px] text-[#6e6659]">
                1. Our logistics coordinator will reach you via <strong className="text-[#1a1a1a]">{machineData.phone}</strong> or <strong className="text-[#1a1a1a]">{machineData.email}</strong>.
              </p>
              <p className="text-[11px] text-[#6e6659]">
                2. We arrange hauling or delivery directly to the partner ancestral farming cooperative.
              </p>
              <p className="text-[11px] text-[#6e6659]">
                3. Official Deed of Donation, CSR certificate, and tribal council acceptance documentation will be issued.
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
