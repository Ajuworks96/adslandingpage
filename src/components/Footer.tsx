'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, Phone, ExternalLink } from 'lucide-react';
import { CALICUT_LOCATIONS, LIVECALICUT_WHATSAPP, LIVECALICUT_PHONE, LIVECALICUT_ADDRESS } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onRegisterClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onRegisterClick,
}) => {
  const [currentYear] = React.useState(() =>
    typeof window !== 'undefined' ? new Date().getFullYear() : 2026
  );

  return (
    <footer className="w-full bg-[#fbfbfa] border-t border-[#e4e7ec] pt-14 pb-24 md:pb-14 text-[#667085] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#e4e7ec]">
          
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="LiveCalicut Logo"
                width={150}
                height={24}
                style={{ width: 'auto', height: 'auto' }}
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#475467] leading-relaxed max-w-sm">
              LiveCalicut brings the local ecosystem together, connecting people, businesses, services, and opportunities across Calicut, Kerala.
            </p>
            <div className="pt-1">
              <p className="text-[11px] text-[#98a2b3]">
                Official Portal:{' '}
                <a
                  href="https://livecalicut.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2c3691] hover:underline font-semibold"
                >
                  livecalicut.com
                </a>
              </p>
            </div>
          </div>

          {/* Office Address & Direct Contact */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#131b3b]">
              Office & Contact
            </h4>
            
            {/* Physical Address */}
            <div className="flex items-start gap-2.5 text-xs text-[#475467]">
              <MapPin className="w-4 h-4 text-[#ec2028] shrink-0 mt-0.5" />
              <div className="space-y-0.5 leading-relaxed">
                <p className="font-semibold text-[#131b3b]">{LIVECALICUT_ADDRESS.line1}</p>
                <p>{LIVECALICUT_ADDRESS.line2}</p>
                <p>{LIVECALICUT_ADDRESS.stateAndPin}</p>
                <a
                  href={LIVECALICUT_ADDRESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#2c3691] hover:underline font-medium pt-0.5"
                >
                  <span>Locate on Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Landline Phone */}
            <div className="flex items-center gap-2.5 text-xs pt-1">
              <Phone className="w-3.5 h-3.5 text-[#2c3691] shrink-0" />
              <a
                href={LIVECALICUT_PHONE.telLink}
                className="text-[#475467] hover:text-[#2c3691] transition-colors"
                title={`Call ${LIVECALICUT_PHONE.display}`}
              >
                <span>Phone: </span>
                <strong className="text-[#131b3b] font-semibold hover:underline">{LIVECALICUT_PHONE.display}</strong>
              </a>
            </div>

            {/* WhatsApp */}
            <div className="pt-1">
              <a
                href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to get support / list my business.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 text-[#075e54] text-xs font-semibold transition-all"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25d366] shrink-0" />
                <span>WhatsApp: <strong className="text-[#131b3b] font-bold">{LIVECALICUT_WHATSAPP.display}</strong></span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#131b3b]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-[#2c3691] transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#2c3691] transition-colors">
                  Local Categories
                </a>
              </li>
              <li>
                <a href="#why-register" className="hover:text-[#2c3691] transition-colors">
                  Registration Benefits
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#2c3691] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#2c3691] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-[#ec2028] hover:underline font-semibold cursor-pointer"
                >
                  Register Your Business (Free)
                </button>
              </li>
            </ul>
          </div>

          {/* Calicut Spatial Hubs */}
          <div className="md:col-span-8 lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#131b3b] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ec2028]" />
              <span>Calicut City Hubs</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {CALICUT_LOCATIONS.slice(0, 10).map((loc) => (
                <span
                  key={loc}
                  className="px-2.5 py-1 rounded-md bg-white border border-[#e4e7ec] text-[11px] text-[#475467]"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <p>© {currentYear} LiveCalicut. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#131b3b] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#131b3b] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[#475467]">
            <span>Crafted for Calicut</span>
            <Heart className="w-3.5 h-3.5 text-[#ec2028] fill-[#ec2028]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
