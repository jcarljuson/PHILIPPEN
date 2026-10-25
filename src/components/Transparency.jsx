import React, { useState } from 'react';
import { ShieldCheck, FileText, ChevronDown, CheckCircle, AlertCircle, Receipt, Eye } from 'lucide-react';

export default function Transparency() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does Philippen guarantee zero administrative deductions on equipment donations?',
      a: 'All equipment grants and machinery sponsorships are routed directly into designated equipment purchase orders or delivered as in-kind physical hardware. Core operational and mapping expenses are sustained independently through private founder endowments and philanthropic gifts, ensuring 100% of your sponsored equipment funds reach the farming soil.',
    },
    {
      q: 'Who legally holds title to the sponsored tractors and tillers?',
      a: 'Machinery is deeded directly to the registered Indigenous Peoples Organization (IPO) or recognized Tribal Farm Committee under the supervision of the Council of Elders and NCIP documentation. Individual privatization is strictly prohibited under the turnover covenant.',
    },
    {
      q: 'How are equipment operators selected and trained?',
      a: 'Each beneficiary community designates 3 to 5 young indigenous farmers who complete mandatory on-site mechanical operation, daily lubrication protocols, and preventive maintenance training conducted by certified mechanics before turnover.',
    },
    {
      q: 'Can corporate donors receive official CSR acknowledgment and turnover documentation?',
      a: 'Yes. Every corporate sponsor receives a formal Turnover Dossier consisting of verified serial numbers, GPS coordinate logs, signed acceptance deeds from tribal chieftains, high-resolution field handover photos, and official NGO acknowledgment receipts.',
    },
  ];

  const breakdown = [
    {
      label: 'Machinery & Equipment Procurement',
      percentage: '75%',
      detail: 'Direct factory/dealer purchase of tillers, plows, attachments, and field accessories.',
    },
    {
      label: 'Logistics & Upland Mountain Delivery',
      percentage: '15%',
      detail: 'Flatbed hauling and 4x4 transport across unpaved mountain access roads to remote CADT lands.',
    },
    {
      label: 'On-Site Operator Mechanical Training',
      percentage: '10%',
      detail: 'Toolkits, spare maintenance filters, operator fuel safety, and tribal operator workshops.',
    },
  ];

  return (
    <section id="transparency" className="py-16 sm:py-24 border-t border-[#e0dbd2] bg-[#faf7f1]/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] uppercase tracking-[0.15em] text-[#3d6b4f] font-medium mb-3">
            Accountability &amp; Trust
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
            Radical Civic Transparency
          </h3>
          <p className="text-sm text-[#5a5347] mt-2.5 leading-relaxed">
            Agricultural philanthropy requires uncompromising accountability. Here is how every peso, machine, and seed kit is tracked on ancestral domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Tracking */}
          <div className="clean-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-md bg-[#e5efe9] flex items-center justify-center text-[#3d6b4f] mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                How Donated Hardware Is Tracked
              </h4>
              <p className="text-xs text-[#5a5347] leading-relaxed mb-6">
                Every machine introduced to an ancestral domain undergoes a 3-point digital verification process before, during, and after field deployment.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#f0e6cc]/80 text-[#8b6914] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#1a1a1a]">Serial Number Registry &amp; GPS Tagging</h5>
                    <p className="text-[11px] text-[#5a5347] mt-0.5">Hardware chassis numbers logged with community GPS boundary coordinates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#f0e6cc]/80 text-[#8b6914] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#1a1a1a]">Tripartite Turnover Deed</h5>
                    <p className="text-[11px] text-[#5a5347] mt-0.5">Signed by Donor, Philippen Lead Trustee, and the Tribal Chieftain / Farm Head.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#f0e6cc]/80 text-[#8b6914] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold text-[#1a1a1a]">Bi-Annual Field Audits</h5>
                    <p className="text-[11px] text-[#5a5347] mt-0.5">In-person mechanical inspection verifying continuous communal usage and operational readiness.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e0dbd2] text-xs text-[#5a5347] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3d6b4f]" />
              <span>SEC Registered NS-97-01 · Strict NCIP FPIC Guidelines</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="clean-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-md bg-[#f0e6cc]/70 flex items-center justify-center text-[#8b6914] mb-5">
                <Receipt className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-semibold text-[#1a1a1a] mb-2">
                What Happens to Your Gift
              </h4>
              <p className="text-xs text-[#5a5347] leading-relaxed mb-6">
                100% of equipment sponsorships translate directly into hardware procurement, logistics, and operator training on ancestral land.
              </p>

              <div className="space-y-3">
                {breakdown.map((item, bIdx) => (
                  <div key={bIdx} className="p-3.5 rounded-md bg-[#faf7f1] border border-[#e0dbd2]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-[#1a1a1a]">{item.label}</span>
                      <span className="text-xs font-bold text-[#3d6b4f]">{item.percentage}</span>
                    </div>
                    <p className="text-[11px] text-[#5a5347]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e0dbd2] text-xs text-[#5a5347] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#3d6b4f]" />
              <span>Itemized commercial dealer invoices provided to all CSR sponsors</span>
            </div>
          </div>

        </div>

        {/* Public Repository Placeholder */}
        <div className="clean-card p-6 mb-12 bg-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f0e6cc]/80 text-[#8b6914] text-[10px] font-medium mb-1.5">
                <AlertCircle className="w-3 h-3" />
                <span>TODO: client to review turnover reporting repository &amp; sample receipts</span>
              </div>
              <h4 className="text-base font-semibold text-[#1a1a1a]">
                Public Turnover Repository &amp; Delivery Receipts
              </h4>
              <p className="text-xs text-[#5a5347] mt-1 max-w-xl">
                Open archive containing signed deeds of donation, serial number logs, and on-site photos of community turnovers.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#5a5347] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#3d6b4f]" /> Sample Deed (PDF)
              </span>
              <span className="px-3 py-1.5 rounded bg-[#faf7f1] border border-[#e0dbd2] text-xs text-[#5a5347] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#8b6914]" /> Serial Registry (TODO)
              </span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h4 className="text-lg font-semibold text-[#1a1a1a] text-center mb-6">
            Frequently Asked Questions
          </h4>

          <div className="space-y-2.5">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div key={fIdx} className="clean-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : fIdx)}
                    className="w-full px-5 py-3.5 flex items-center justify-between text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs sm:text-sm font-medium text-[#1a1a1a] pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a8078] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#3d6b4f]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-[#5a5347] leading-relaxed border-t border-[#e0dbd2]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
