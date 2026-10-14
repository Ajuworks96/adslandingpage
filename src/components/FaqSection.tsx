'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { FAQS, LIVECALICUT_WHATSAPP, LIVECALICUT_PHONE } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-[#e4e7ec] reveal-init">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#475467] leading-relaxed">
            Straightforward, transparent answers about registering your Kozhikode business.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="editorial-card rounded-2xl overflow-hidden border border-[#e4e7ec] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c3691] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-[#131b3b] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#f4f6fa] flex items-center justify-center shrink-0 transition-transform duration-200 text-[#2c3691] ${
                      isOpen ? 'rotate-180 bg-[#eff6ff]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#475467] leading-relaxed border-t border-[#f2f4f7] bg-[#fbfbfa]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#131b3b]">Have a specific question not covered here?</h4>
            <p className="text-xs text-[#64748b] mt-0.5">Our local Kozhikode team is available via direct phone or WhatsApp.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <a
              href={LIVECALICUT_PHONE.telLink}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#f1f5f9] text-[#131b3b] border border-[#d0d5dd] text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title={`Call ${LIVECALICUT_PHONE.display}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#2c3691]" />
              <span>Call {LIVECALICUT_PHONE.display}</span>
            </a>
            <a
              href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I have a question about registering my business.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp: {LIVECALICUT_WHATSAPP.display}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
