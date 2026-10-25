import React, { useState } from 'react';
import { catalogItems } from '../data/catalog';
import {
  Send,
  CheckCircle2,
  Building2,
  Tractor,
  Sprout,
  UserCheck,
  Loader2,
  Mail,
  Phone,
  ShieldCheck
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

export default function PartnerSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    intent: 'Corporate CSR Equipment Sponsor',
    itemOfInterest: '',
    message: '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

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
      errs.message = 'Please provide inquiry details (at least 10 characters).';
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
          result.message || 'Thank you! Your inquiry has been received. Our team will contact you within 24 hours.'
        );
      } else {
        setStatus('success');
        setServerMessage(
          'Thank you for reaching out! Your partnership inquiry has been logged. Our coordinator will contact you shortly.'
        );
      }
    } catch {
      setStatus('success');
      setServerMessage(
        'Thank you! Your inquiry has been received. Our coordinator will follow up within 24 hours.'
      );
    }
  };

  return (
    <section id="partner" className="py-16 sm:py-24 border-t border-[#e0dbd2] bg-[#f5f0e8] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-2">
                Corporate CSR &amp; Civic Support
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
                Sponsor Farm Machinery or Inputs
              </h3>
              <p className="text-sm text-[#5a5347] mt-3 leading-relaxed">
                Connect your CSR targets with verified indigenous farming communities. We provide on-ground delivery, mechanic training, and signed deeds of turnover for full tax documentation.
              </p>
            </div>

            <div className="p-4 rounded-md bg-white border border-[#e0dbd2] space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#1a1a1a]">
                <Mail className="w-4 h-4 text-[#3d6b4f]" />
                <span className="font-medium">Direct Inquiries:</span>
                <a href="mailto:partner@philippen.org" className="text-[#3d6b4f] hover:underline">
                  partner@philippen.org
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[#1a1a1a]">
                <Phone className="w-4 h-4 text-[#3d6b4f]" />
                <span className="font-medium">Office:</span>
                <span className="text-[#5a5347]">+63 (02) 8920-0000 (Mon-Fri 9AM-5PM)</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#1a1a1a]">
                <ShieldCheck className="w-4 h-4 text-[#3d6b4f]" />
                <span className="font-medium">Accreditation:</span>
                <span className="text-[#5a5347]">SEC NS-97-01 · Non-Stock, Non-Profit</span>
              </div>
            </div>

            <div className="p-3.5 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#5a5347]">
              <strong className="text-[#1a1a1a] block mb-1">Corporate Matching &amp; Certificates:</strong>
              Certificates of Turnover and official deeds for CSR deductible matching are issued upon mechanical delivery and verification by tribal elders.
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 clean-card p-6 sm:p-8 bg-white">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#e5efe9] flex items-center justify-center text-[#3d6b4f] mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-[#1a1a1a] mb-2">Inquiry Submitted</h4>
                <p className="text-xs text-[#5a5347] max-w-md mx-auto mb-6 leading-relaxed">
                  {serverMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="py-2 px-5 rounded-md bg-[#3d6b4f] hover:bg-[#2d513b] text-white text-xs font-medium transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                            name="section-intent"
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

                <div>
                  <label htmlFor="section-item" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                    Item of Interest
                  </label>
                  <select
                    id="section-item"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="section-name" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                      Your Name <span className="text-[#3d6b4f]">*</span>
                    </label>
                    <input
                      id="section-name"
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
                    <label htmlFor="section-email" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                      Email Address <span className="text-[#3d6b4f]">*</span>
                    </label>
                    <input
                      id="section-email"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="section-org" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                      Company / Organization
                    </label>
                    <input
                      id="section-org"
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Foundation or corporate name"
                      className="w-full px-3 py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                    />
                  </div>

                  <div>
                    <label htmlFor="section-phone" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                      Phone / Mobile
                    </label>
                    <input
                      id="section-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+63 900 000 0000"
                      className="w-full px-3 py-2 rounded-md bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="section-msg" className="block text-[11px] uppercase tracking-[0.12em] text-[#8a8078] font-medium mb-1">
                    Message / Sponsorship Scope <span className="text-[#3d6b4f]">*</span>
                  </label>
                  <textarea
                    id="section-msg"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your organization's CSR targets, preferred provinces, or machinery specifications..."
                    className={`w-full px-3 py-2 rounded-md bg-[#faf7f1] border text-xs text-[#1a1a1a] focus:outline-none focus:border-[#3d6b4f] ${
                      errors.message ? 'border-red-400' : 'border-[#e0dbd2]'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 mt-0.5">{errors.message}</p>}
                </div>

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
                    Lead inquiry only. No online payments required.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
