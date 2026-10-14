'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { LIVECALICUT_WHATSAPP } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

interface StickyMobileCtaProps {
  onRegisterClick: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onRegisterClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = 450;
      const registerElement = document.getElementById('register');

      if (!registerElement) {
        setIsVisible(scrollY > heroHeight);
        return;
      }

      const rect = registerElement.getBoundingClientRect();
      // Hide if the register form is currently in the viewport
      const isFormInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(scrollY > heroHeight && !isFormInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-[#e4e7ec] p-3 px-4 shadow-2xl transition-all duration-300 animate-fade-in-up">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2c3691]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ec2028]" />
            <span>LiveCalicut Free</span>
          </div>
          <span className="text-[12px] font-bold text-[#131b3b] line-clamp-1">
            Register Your Business
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to register my business / chat on WhatsApp.')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp LiveCalicut at ${LIVECALICUT_WHATSAPP.display}`}
            className="p-2.5 rounded-xl bg-[#25d366] text-white hover:bg-[#20ba59] active:scale-95 shadow-sm transition-all"
            title={`WhatsApp: ${LIVECALICUT_WHATSAPP.display}`}
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
          </a>

          <button
            onClick={onRegisterClick}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ec2028] text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>List Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
