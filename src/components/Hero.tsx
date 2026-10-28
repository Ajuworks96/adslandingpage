'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  Store,
  Users,
  MapPin,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Laptop,
} from 'lucide-react';
import { LIVECALICUT_WHATSAPP } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onRegisterClick: (category?: string) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  const [isFeatureExpanded, setIsFeatureExpanded] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full bg-[#fbfbfa] text-[#131b3b] overflow-hidden font-sans selection:bg-[#2c3691]/15 selection:text-[#131b3b]"
    >
      {/* Background Blueprint / City Grid & Warm Ambient Sun Flare */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle CAD / Cartography grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              radial-gradient(#94a3b8 0.75px, transparent 0.75px),
              linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 72px 72px, 72px 72px',
          }}
        />

        {/* Warm Golden Sun Flare Radiating from Top Right (Matching reference mockup) */}
        <div
          className="absolute -top-24 right-0 w-[550px] sm:w-[750px] lg:w-[900px] h-[550px] sm:h-[750px] lg:h-[900px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(251, 191, 36, 0.25) 0%, rgba(245, 158, 11, 0.12) 30%, rgba(236, 32, 40, 0.04) 55%, transparent 75%)',
          }}
        />

        {/* Calicut Map Radial Watermark on left */}
        <svg
          className="absolute left-[-5%] top-[12%] w-[600px] h-[600px] opacity-[0.04] stroke-[#131b3b]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="130" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="80" strokeWidth="1.2" />
          <line x1="20" y1="200" x2="380" y2="200" strokeWidth="0.8" />
          <line x1="200" y1="20" x2="200" y2="380" strokeWidth="0.8" />
        </svg>
      </div>

      {/* MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Headings, Subtitle, Buttons, Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Pill Badge: • Calicut's Official Local Discovery Platform */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#e4e7ec] backdrop-blur-sm shadow-xs mb-5 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12b76a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12b76a]" />
              </span>
              <span className="text-xs font-semibold text-[#344054] tracking-wide">
                Kerala&apos;s #1 Local Discovery Platform
              </span>
            </div>

            {/* Malayalam Tagline */}
            <div className="mb-2">
              <span className="inline-block text-[11px] sm:text-xs font-bold text-[#ec2028] uppercase tracking-wider bg-[#ec2028]/10 px-2.5 py-0.5 rounded-md">
                കോഴിക്കോട് നിങ്ങളുടെ ബിസിനസ്സ് വേഗത്തിൽ വളർത്താം
              </span>
            </div>

            {/* Headline (Matching the Reference UI Typography) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[66px] font-extrabold text-[#131b3b] tracking-tight leading-[1.08]">
              Where Calicut <br />
              Discovers <span className="text-[#2c3691]">Your Business</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-6 text-[#475467] text-base sm:text-lg leading-relaxed max-w-lg font-normal">
              Put your shop, dining spot, home service, or IT agency in front of thousands of daily local customers searching across Kozhikode — from SM Street to Cyberpark. 100% Free.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary Register Business Button */}
              <button
                type="button"
                onClick={() => onRegisterClick()}
                className="group inline-flex items-center gap-2.5 bg-[#131b3b] hover:bg-[#2c3691] text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>List Your Business — Free</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary See How It Works / Video Button */}
              <button
                type="button"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 text-[#131b3b] hover:text-[#2c3691] font-semibold text-sm transition-colors cursor-pointer"
              >
                <span className="w-10 h-10 rounded-full bg-white border border-[#d0d5dd] shadow-xs flex items-center justify-center text-[#131b3b] group-hover:bg-[#131b3b] group-hover:text-white group-hover:border-[#131b3b] transition-all duration-200 group-hover:scale-105">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>See How It Works</span>
              </button>
            </div>

            {/* Direct WhatsApp Quick Register */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#475467]">
              <span>Or list instantly via WhatsApp:</span>
              <a
                href={LIVECALICUT_WHATSAPP.getLink(
                  'Hello LiveCalicut team, I want to register my business on LiveCalicut.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#075e54] hover:text-[#128c7e] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25d366]" />
                <span>{LIVECALICUT_WHATSAPP.display}</span>
              </a>
            </div>

            {/* Floating Glass Stats Card (Matching the Reference 3-Metric Frosted Card) */}
            <div className="mt-8 sm:mt-10 backdrop-blur-md bg-white/85 border border-white/80 rounded-2xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06)] max-w-xl">
              <div className="grid grid-cols-3 divide-x divide-[#e4e7ec]">
                
                {/* Metric 1: Businesses */}
                <div className="px-2 sm:px-4 first:pl-1 flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2c3691]/10 text-[#2c3691] flex items-center justify-center shrink-0">
                    <Store className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-bold text-[#131b3b] tracking-tight leading-none">
                      1,200+
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#667085] font-medium mt-1 leading-snug">
                      Verified Businesses
                    </div>
                  </div>
                </div>

                {/* Metric 2: Monthly Searches */}
                <div className="px-2 sm:px-4 flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#12b76a]/15 text-[#12b76a] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-bold text-[#131b3b] tracking-tight leading-none">
                      50,000+
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#667085] font-medium mt-1 leading-snug">
                      Monthly Searches
                    </div>
                  </div>
                </div>

                {/* Metric 3: City Hubs */}
                <div className="px-2 sm:px-4 last:pr-1 flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ec2028]/10 text-[#ec2028] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-bold text-[#131b3b] tracking-tight leading-none">
                      25+
                    </div>
                    <div className="text-[11px] sm:text-xs text-[#667085] font-medium mt-1 leading-snug">
                      Calicut Hubs
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Calicut Digital Hub Visual + Floating Feature Card */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            
            {/* Visual Container (Matching the reference aesthetic) */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-white/60 bg-white group">
              
              {/* Calicut 3D Business Hub Image */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/heroes/calicut-digital-hub.jpg"
                  alt="LiveCalicut Digital Ecosystem 3D Business Hub Model"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Ambient Sun Flare Overlay from top right */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 90% 10%, rgba(254, 240, 138, 0.35) 0%, rgba(251, 191, 36, 0.15) 30%, transparent 65%)',
                  }}
                />

                {/* Subtle blueprint grid line overlay on edges */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-3xl" />
              </div>

              {/* Floating Feature Card (Upper Right quadrant, matching reference) */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                <div className="relative bg-[#131b3b]/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/15 max-w-[210px] sm:max-w-[240px] transition-all hover:bg-[#131b3b]">
                  
                  {/* Card Header with Emerald Dot */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                      Verified Listing
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a]" />
                  </div>

                  {/* Card Body */}
                  <p className="text-[11px] sm:text-xs text-blue-100/80 leading-relaxed mt-1.5">
                    Direct WhatsApp leads, Google Maps location &amp; top search discovery for Calicut businesses.
                  </p>

                  {/* Floating Action Button with '+' (Matching reference UI) */}
                  <button
                    type="button"
                    onClick={() => setIsFeatureExpanded(!isFeatureExpanded)}
                    title="View listing benefits"
                    className="absolute -bottom-4 -right-4 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-tr from-[#12b76a] to-[#25d366] text-white flex items-center justify-center shadow-lg ring-4 ring-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus
                      className={`w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5] transition-transform duration-300 ${
                        isFeatureExpanded ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Benefits Popover */}
                {isFeatureExpanded && (
                  <div className="absolute top-full mt-6 right-0 w-68 bg-white text-[#131b3b] rounded-2xl p-4 shadow-2xl border border-[#e4e7ec] text-xs z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="font-bold text-[#131b3b] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2c3691]" />
                      <span>Instant Verification Benefits</span>
                    </div>
                    <ul className="space-y-1.5 text-[#475467]">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12b76a] shrink-0 mt-0.5" />
                        <span>Direct 1-click WhatsApp customer chat</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12b76a] shrink-0 mt-0.5" />
                        <span>Featured on SM Street &amp; City Hubs directory</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12b76a] shrink-0 mt-0.5" />
                        <span>100% Free — No hidden subscriptions or fees</span>
                      </li>
                    </ul>

                    <div className="mt-3 pt-2.5 border-t border-[#f2f4f7]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFeatureExpanded(false);
                          onRegisterClick();
                        }}
                        className="w-full bg-[#131b3b] hover:bg-[#2c3691] text-white py-2 rounded-xl font-semibold text-[11px] text-center transition-colors"
                      >
                        Register Your Business Now
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Left Badge: 100% Free Listing */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131b3b]/85 backdrop-blur-md text-white text-[11px] font-semibold border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-[#12b76a]" />
                <span>100% Free Verified Listing</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM ECOSYSTEM DOCK (LiveCalicut Signature Blue Dock) */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#101738] via-[#162354] to-[#1e2e73] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(20,30,80,0.22)] border border-[#2c3691]/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x-0 lg:divide-x divide-white/15">
            
            {/* Sector 1: Retail & SM Street */}
            <div className="pt-4 sm:pt-0 lg:px-4 first:lg:pl-0 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Retail &amp; SM Street
                </h3>
                <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                  From Sweet Meat Street to Mavoor Road, connect with daily local shoppers.
                </p>
              </div>
            </div>

            {/* Sector 2: Dining & Cafes */}
            <div className="pt-4 sm:pt-0 lg:px-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shrink-0 shadow-inner">
                <UtensilsCrossed className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Dining &amp; Cafés
                </h3>
                <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                  Attract food lovers searching for authentic Malabar dining &amp; modern cafés.
                </p>
              </div>
            </div>

            {/* Sector 3: Home & Local Services */}
            <div className="pt-4 sm:pt-0 lg:px-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shrink-0 shadow-inner">
                <Wrench className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Services &amp; Healthcare
                </h3>
                <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                  Plumbing, electrical, clinics, and repair experts booked in seconds.
                </p>
              </div>
            </div>

            {/* Sector 4: IT & Cyberpark */}
            <div className="pt-4 sm:pt-0 lg:px-4 last:lg:pr-0 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shrink-0 shadow-inner">
                <Laptop className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  IT Hubs &amp; Cyberpark
                </h3>
                <p className="text-xs text-blue-100/80 mt-1 leading-relaxed">
                  Promote tech agencies, co-working spaces, and talent across Calicut.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
