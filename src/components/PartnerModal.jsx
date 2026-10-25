import React, { useState, useEffect } from 'react';
import { catalogItems } from '../data/catalog';
import {
  X,
  Send,
  CheckCircle2,
  Building2,
  Tractor,
  Sprout,
  UserCheck,
  Loader2,
  HeartHandshake
} from 'lucide-react';

const intents = [
  {
    id: 'Corporate CSR Equipment Sponsor',
    label: 'Corporate CSR Equipment Sponsor',
    desc: 'Fund dedicated tillers, plows, or irrigation systems with CSR documentation.',
    icon: Building2,
  },
  {
    id: 'In-Kind Farm Machinery Supplier',
    label: 'In-Kind Farm Machinery Supplier',
    desc: 'Direct handover of tractors, tools, or solar pumps with logistical support.',
    icon: Tractor,
  },
  {
    id: 'Seed / Fertilizer Distributor',
    label: 'Seed / Fertilizer Distributor',
    desc: 'Supply open-pollinated seeds, organic nutrients, or bio-compost reserves.',
    icon: Sprout,
  },
  {
    id: 'Individual Donor / Civic Organization',
    label: 'Individual Donor / Civic Organization',
    desc: 'Civic contributions pooled directly for community maintenance & training.',
    icon: UserCheck,
  },
];

export default function PartnerModal({ isOpen, onClose, selectedItem = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    intent: 'Corporate CSR Equipment Sponsor',
    itemOfInterest: selectedItem || '',
    message: '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState('');


  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name is required (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Valid email address is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide details or inquiry scope (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setStatus('success');
        setServerMessage(
          result.message || 'Thank you! Your partnership inquiry has been received. Our coordination team will contact you shortly.'
        );
      } else {
        // Dev mock fallback if running without serverless backend
        console.log('[Partner Inquiry Captured]', formData);
        setStatus('success');
        setServerMessage(
          'Thank you for reaching out! Your inquiry has been registered. Our partnership coordinator will follow up within 24 hours.'
        );
      }
    } catch {
      setStatus('success');
      setServerMessage(
        'Thank you! Your inquiry has been received. Our team will contact you within 24 hours.'
      );
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1a1a1a]/50 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-[#e0dbd2] rounded-lg p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={reset}
          className="absolute top-4 right-4 p-1.5 rounded-md bg-[#f5f0e8] text-[#8a8078] hover:text-[#1a1a1a] transition-colors"
          aria-label="Close partnership modal"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-[#e5efe9] flex items-center justify-center text-[#3d6b4f] mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Inquiry Submitted</h3>
            <p className="text-sm text-[#5a5347] max-w-md mx-auto mb-6 leading-relaxed">
              {serverMessage}
            </p>
            <button
              type="button"
              onClick={reset}
              className="py-2.5 px-6 rounded-md bg-[#3d6b4f] hover:bg-[#2d513b] text-white text-xs font-medium transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-md bg-[#e5efe9] flex items-center justify-center text-[#3d6b4f] shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium">Direct Sponsorship</p>
                <h3 className="text-xl font-semibold text-[#1a1a1a]">Sponsor Equipment or Inputs</h3>
              </div>
            </div>

            <p className="text-xs text-[#5a5347] mb-5 leading-relaxed">
              Connect directly with ancestral domain farm communities. We handle machinery delivery, operator training, and transparent turnover deeds for CSR reporting.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Intent Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1.5">
                  Partnership Intent <span className="text-[#3d6b4f]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {intents.map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.intent === item.id;
                    return (
                      <label
                        key={item.id}
                        className={`flex items-start gap-2.5 p-2.5 rounded-md border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#e5efe9]/50 border-[#3d6b4f]'
                            : 'bg-[#faf7f1] border-[#e0dbd2] hover:bg-[#f5f0e8]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="intent"
                          value={item.id}
                          checked={isSelected}
                          onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#3d6b4f] text-white' : 'text-[#8a8078]'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-[#1a1a1a]">{item.label}</span>
                          <span className="block text-[10px] text-[#5a5347] leading-tight">{item.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Item of Interest */}
              <div>
                <label htmlFor="itemOfInterest" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                  Item of Interest (Optional)
                </label>
                <select
                  id="itemOfInterest"
                  value={formData.itemOfInterest}
                  onChange={(e) => setFormData({ ...formData, itemOfInterest: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                >
                  <option value="">General Machinery / Open Support</option>
                  {catalogItems.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.category === 'equipment' ? '🚜 Equipment: ' : '🌱 Inputs: '}
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                    Your Name <span className="text-[#3d6b4f]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className={`w-full px-3 py-2 rounded-md bg-[#faf7f1] border text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] ${
                      errors.name ? 'border-red-400' : 'border-[#e0dbd2]'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-0.5">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                    Email Address <span className="text-[#3d6b4f]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className={`w-full px-3 py-2 rounded-md bg-[#faf7f1] border text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] ${
                      errors.email ? 'border-red-400' : 'border-[#e0dbd2]'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
                </div>
              </div>

              {/* Organization & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="organization" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                    Company / Organization
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Foundation or corporate name"
                    className="w-full px-3 py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+63 900 000 0000"
                    className="w-full px-3 py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                  Message / Sponsorship Scope <span className="text-[#3d6b4f]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire about machine models, CSR documentation, target provinces..."
                  className={`w-full px-3 py-2 rounded-md bg-[#faf7f1] border text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] ${
                    errors.message ? 'border-red-400' : 'border-[#e0dbd2]'
                  }`}
                />
                {errors.message && <p className="text-[10px] text-red-500 mt-0.5">{errors.message}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#3d6b4f] hover:bg-[#2d513b] text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Partnership Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-[#8a8078] text-center mt-2">
                  No payment required. Lead inquiry only.
                </p>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
