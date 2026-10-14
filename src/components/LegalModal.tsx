'use client';

import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-xs animate-fade-in-up"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e4e7ec] overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#e4e7ec] flex items-center justify-between bg-[#fbfbfa]">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#2c3691] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-[#fff1f2] text-[#ec2028] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-[#131b3b]">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <p className="text-[11px] text-[#667085]">
                LiveCalicut &bull; Kozhikode Local Discovery Ecosystem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#f4f6fa] hover:bg-[#e4e7ec] text-[#475467] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#475467] leading-relaxed">
          {type === 'privacy' ? (
            <>
              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">1. Information We Collect</h4>
                <p>
                  When you submit a business registration on LiveCalicut, we collect your Full Name, Mobile Number, Business Name, Business Category, and optional details (Email Address, Area in Kozhikode, and Website or Social Media URL). We also capture campaign attribution parameters to understand where you found us.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">2. Purpose & Use of Data</h4>
                <p>
                  Your details are utilized strictly to evaluate your listing submission, verify authentic operation within Kozhikode, and contact you via phone or WhatsApp regarding the onboarding process. We do not sell or lease your personal information to third-party ad brokers or unauthorized entities.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">3. Storage & Security</h4>
                <p>
                  Data transmissions are encrypted using standard TLS protocols. Incoming submissions are stored securely in protected administrative stores for review by the authorized LiveCalicut team.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">4. Data Access, Rights & Contact</h4>
                <p>
                  You retain the right to inquire about your submitted listing, request modifications, or withdraw your business details. You can contact our team at our registered office: <strong>M-7 63/345, Begum Complex, UKS Road, Calicut, Kozhikode, Kerala, 673001, India</strong>, by phone at <strong>0495 2928095</strong>, or via WhatsApp at <strong>+91 95399 80990</strong>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">1. Acceptance & Service Scope</h4>
                <p>
                  By submitting your registration on LiveCalicut, you apply for review and potential inclusion in the LiveCalicut local discovery ecosystem. Submitting this form does not guarantee automatic publication, ranking, leads, or business revenue.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">2. Business Verification & Accuracy</h4>
                <p>
                  Applicants are responsible for providing truthful, accurate information regarding their business, licensing, location in Kozhikode, and contact numbers. Fraudulent, misleading, or deceptive submissions will be declined or removed.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">3. Free Registration vs Optional Services</h4>
                <p>
                  Submitting your initial registration form is free. LiveCalicut may offer optional paid promotional, marketing, or featured placement services in the future; these will always be presented clearly without mandatory commitment.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-[#131b3b] text-sm">4. Platform Governance</h4>
                <p>
                  LiveCalicut reserves the right to decline or remove any listing that fails to meet quality, verification, or community safety standards across Kozhikode.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#e4e7ec] bg-[#fbfbfa] flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded-xl bg-[#131b3b] hover:bg-[#1e293b] text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
