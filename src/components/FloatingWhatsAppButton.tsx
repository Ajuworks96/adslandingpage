'use client';

import React from 'react';
import { LIVECALICUT_WHATSAPP } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center group"
    >
      <a
        href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to get more information about listing my business on LiveCalicut.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with LiveCalicut on WhatsApp at ${LIVECALICUT_WHATSAPP.display}`}
        className="relative flex items-center gap-2.5 px-3.5 py-3 md:py-2.5 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2"
      >
        {/* Ambient pulse ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25d366] opacity-30 animate-ping pointer-events-none -z-10 group-hover:opacity-40"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />

        {/* Text for desktop and larger mobile */}
        <div className="flex flex-col text-left leading-none pr-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/90">
            WhatsApp Live
          </span>
          <span className="text-[12px] font-extrabold text-white">
            {LIVECALICUT_WHATSAPP.display}
          </span>
        </div>
      </a>
    </aside>
  );
};
