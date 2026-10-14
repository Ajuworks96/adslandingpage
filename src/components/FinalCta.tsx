'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LIVECALICUT_WHATSAPP } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FinalCtaProps {
  onRegisterClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#131b3b] via-[#1a234f] to-[#2c3691] text-white relative overflow-hidden reveal-init">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ec2028]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2c3691]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-[#93c5fd]">
          <span className="w-2 h-2 rounded-full bg-[#ec2028]" />
          <span>Join Kozhikode&apos;s Local Platform</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Let&apos;s Build a More Connected Kozhikode.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Register your business and take the next step towards local discovery.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRegisterClick}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#ec2028] hover:bg-[#d61820] text-white text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.99] cursor-pointer group"
          >
            <span>Register Your Business — Free</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <a
            href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to get more information about listing on LiveCalicut.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold backdrop-blur-sm transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 fill-[#25d366]" />
            <span>WhatsApp: {LIVECALICUT_WHATSAPP.display}</span>
          </a>
        </div>

        <p className="text-xs text-slate-400 pt-2">
          No credit card required &bull; 100% Free registration review &bull; Quick 1-minute form
        </p>
      </div>
    </section>
  );
};
