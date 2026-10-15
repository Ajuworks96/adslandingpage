'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { LIVECALICUT_WHATSAPP } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  onRegisterClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e4e7ec] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2c3691] rounded-lg">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="LiveCalicut Logo"
              width={160}
              height={26}
              priority
              style={{ width: 'auto', height: 'auto' }}
              className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-[#2c3691] border-l border-[#d0d5dd] pl-3">
            Calicut Digital Ecosystem
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-medium text-[#475467]">
          <a href="#problem" className="hover:text-[#2c3691] transition-colors">
            Why LiveCalicut
          </a>
          <a href="#categories" className="hover:text-[#2c3691] transition-colors">
            Categories
          </a>
          <a href="#why-register" className="hover:text-[#2c3691] transition-colors">
            Benefits
          </a>
          <a href="#how-it-works" className="hover:text-[#2c3691] transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-[#2c3691] transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Link */}
          <a
            href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to get more information about listing on LiveCalicut.')}
            target="_blank"
            rel="noopener noreferrer"
            title={`Chat on WhatsApp: ${LIVECALICUT_WHATSAPP.display}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 text-[#075e54] text-xs font-semibold transition-all duration-200 shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25d366] shrink-0" />
            <span className="hidden lg:inline text-[#131b3b] font-bold">{LIVECALICUT_WHATSAPP.display}</span>
            <span className="lg:hidden text-[#075e54] font-bold">WhatsApp</span>
          </a>

          <button
            onClick={onRegisterClick}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#ec2028] hover:bg-[#d61820] text-white text-xs sm:text-[13px] font-semibold tracking-tight shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ec2028] focus:ring-offset-2 cursor-pointer shrink-0"
          >
            <span>List Your Business</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
