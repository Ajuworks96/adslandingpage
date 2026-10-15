'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  MapPin,
  Star,
  Search,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { LIVECALICUT_WHATSAPP } from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onRegisterClick: (category?: string) => void;
  onExploreClick: () => void;
}

interface Landmark {
  id: string;
  name: string;
  shortTabName: string;
  malayalamName: string;
  tag: string;
  image: string;
  subtitle: string;
  trendingSearch: string;
  searchesCount: string;
  spotlightBusiness: {
    name: string;
    category: string;
    rating: string;
    reviews: string;
    badge: string;
    location: string;
  };
}

const LANDMARKS: Landmark[] = [
  {
    id: 'beach',
    name: 'Calicut Beach',
    shortTabName: 'Beach',
    malayalamName: 'കോഴിക്കോട് ബീച്ച്',
    tag: 'Tourism & Sunset Hub',
    image: '/heroes/calicut-hero.jpg',
    subtitle: 'Iconic beach walkway, lighthouse & seaside culinary culture',
    trendingSearch: 'Best Malabar Dum Biryani & Sea-view Cafes',
    searchesCount: '340+ Calicut citizens searched today',
    spotlightBusiness: {
      name: 'Malabar Coastal Flavours',
      category: 'Food & Cafés',
      rating: '4.9',
      reviews: '620+',
      badge: 'Verified Calicut Merchant',
      location: 'Beach Road, Calicut',
    },
  },
  {
    id: 'smstreet',
    name: 'SM Street (Mittai Theruvu)',
    shortTabName: 'SM Street',
    malayalamName: 'മിഠായിത്തെരുവ്',
    tag: 'Historic Retail Heart',
    image: '/heroes/sm-street.jpg',
    subtitle: 'Centuries of heritage commerce, footwear, textiles & halwa hubs',
    trendingSearch: 'Authentic Calicut Black Halwa & Silk Sarees',
    searchesCount: '580+ Calicut citizens searched today',
    spotlightBusiness: {
      name: 'Calicut Heritage Halwa & Sweets',
      category: 'Retail & Bakery',
      rating: '4.9',
      reviews: '1,240+',
      badge: 'Verified Heritage Merchant',
      location: 'SM Street, Palayam',
    },
  },
  {
    id: 'cyberpark',
    name: 'Cyberpark & Mavoor Rd',
    shortTabName: 'Cyberpark',
    malayalamName: 'സൈബർപാർക്ക് & മാവൂർ റോഡ്',
    tag: 'IT & Modern Business',
    image: '/heroes/workplace.jpg',
    subtitle: 'High-growth tech parks, design studios & corporate agencies',
    trendingSearch: 'Creative Agencies, Web Developers & Tax Consultants',
    searchesCount: '410+ local businesses searched today',
    spotlightBusiness: {
      name: 'Calicut Tech Ventures',
      category: 'IT & Consulting',
      rating: '4.8',
      reviews: '310+',
      badge: 'Verified Tech Partner',
      location: 'Cyberpark, Calicut',
    },
  },
  {
    id: 'coast',
    name: 'Beypore & Malabar Coast',
    shortTabName: 'Beypore',
    malayalamName: 'ബേപ്പൂർ & കോസ്റ്റൽ ബെൽറ്റ്',
    tag: 'Crafts & Heritage',
    image: '/heroes/coastal-life.jpg',
    subtitle: 'Historic Uru shipbuilding, authentic crafts & seaside homestays',
    trendingSearch: 'Traditional Handicrafts, Uru Models & Coastal Stays',
    searchesCount: '290+ travelers searched today',
    spotlightBusiness: {
      name: 'Beypore Craft & Artisans Guild',
      category: 'Artisans & Tourism',
      rating: '4.9',
      reviews: '480+',
      badge: 'Verified Craft Guild',
      location: 'Beypore Port Road',
    },
  },
];

const HERO_CATEGORIES = [
  { id: 'restaurants', label: 'Restaurants & Cafés', icon: '🍽️' },
  { id: 'shops', label: 'Shops & Retail', icon: '🛍️' },
  { id: 'services', label: 'Home & Professional Services', icon: '⚡' },
  { id: 'jobs', label: 'IT & Cyberpark', icon: '💻' },
  { id: 'accommodation', label: 'Hotels & Stays', icon: '🏨' },
];

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-cycle through Calicut landmarks every 6 seconds unless paused
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setActiveLandmarkIndex((prev) => (prev + 1) % LANDMARKS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const currentLandmark = LANDMARKS[activeLandmarkIndex];

  return (
    <section
      id="hero"
      className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fbfbfa] to-[#ffffff]"
    >
      {/* Ambient background decoration & luminous glows */}
      <div className="absolute inset-0 bg-mesh-dots pointer-events-none opacity-40" />
      <div className="absolute top-6 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-[#2c3691]/8 via-[#2c3691]/4 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-6 left-10 w-[26rem] h-[26rem] bg-gradient-to-tr from-[#ec2028]/8 via-[#ec2028]/3 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* =========================================================
              LEFT COLUMN: Editorial Typography, Live Ticker & Action
             ========================================================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Indicator Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e4e7ec] shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ec2028] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ec2028]" />
                </span>
                <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#131b3b]">
                  LIVECALICUT &bull; CALICUT LOCAL DIRECTORY
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff1f2] border border-[#fecdca] text-[#ec2028] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec2028]" />
                <span>100% സൗജന്യ രജിസ്ട്രേഷൻ</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black text-[#131b3b] tracking-tight leading-[1.24] sm:leading-[1.2]">
                Google-ൽ തുടങ്ങുന്ന തിരച്ചിൽ.{' '}
                <span className="block mt-1 sm:mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#ec2028] via-[#e11d48] to-[#2c3691]">
                  LIVECALICUT-ൽ
                </span>{' '}
                നേരിട്ടെത്തുന്നു!
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#475467] leading-relaxed max-w-xl font-normal">
              കോഴിക്കോട്ടുകാർ നിങ്ങളുടെ അടുത്തുള്ള കടകളും സർവീസുകളും തിരയുമ്പോൾ, ഏറ്റവും മുന്നിൽ നിങ്ങൾ ഉണ്ടാവട്ടെ.{' '}
              <strong className="text-[#131b3b] font-semibold">Calicut-ന്റെ local ecosystem-ന്റെ</strong> ഭാഗമായി കസ്റ്റമേഴ്സിനെ നേരിട്ട് നേടൂ.
            </p>

            {/* Interactive Category Quick Pills */}
            <div className="pt-1 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#667085]">
                <TrendingUp className="w-3.5 h-3.5 text-[#2c3691]" />
                <span>തിരയപ്പെടുന്ന പ്രധാന വിഭാഗങ്ങൾ (Click to register):</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {HERO_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onRegisterClick(cat.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#f4f6fa] border border-[#e4e7ec] hover:border-[#2c3691]/40 text-xs font-semibold text-[#344054] hover:text-[#2c3691] shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer group"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#98a2b3] group-hover:text-[#2c3691] transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                onClick={() => onRegisterClick()}
                type="button"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-[#ec2028] via-[#e11d48] to-[#cc141c] hover:opacity-95 text-white text-base font-bold shadow-lg shadow-[#ec2028]/25 hover:shadow-xl hover:shadow-[#ec2028]/35 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 animate-shimmer pointer-events-none" />
                <span className="relative z-10">Register Your Business — Free</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-[#f8fafc] text-[#131b3b] text-base font-bold border border-[#d0d5dd] hover:border-[#2c3691] shadow-xs hover:shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#2c3691]" />
                <span>Explore Calicut Directory</span>
              </button>
            </div>

            {/* Supporting Microcopy & Trust Proof */}
            <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-[13px] text-[#475467]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a]" />
                <span>Takes only 60 seconds</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a]" />
                <span>Zero commission / 100% Free</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a]" />
                <span>Direct WhatsApp & Call Leads</span>
              </span>
            </div>

            {/* Authentic Trust Marker */}
            <div className="pt-3 border-t border-[#f2f4f7] flex items-center gap-3 text-xs text-[#475467]">
              <div className="w-7 h-7 rounded-lg bg-[#2c3691]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#2c3691]" />
              </div>
              <span className="leading-relaxed">
                <strong className="text-[#131b3b] font-semibold">100% Verified Calicut Review:</strong> Every listing is checked by our local Calicut team &bull; Zero spam &bull; Direct local customer trust.
              </span>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Interactive "Calicut Local Discovery" Console
             ========================================================= */}
          <div
            className="lg:col-span-5 relative pt-4 sm:pt-5"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">

              {/* Main Showcase Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#e4e7ec] shadow-2xl bg-white transition-all duration-300">
                
                {/* Header Selector Tabs: Calicut Hubs */}
                <div className="bg-[#131b3b] p-2.5 sm:p-3 border-b border-[#232d56]">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#12b76a] animate-pulse" />
                      <span className="text-[11px] uppercase tracking-wider font-bold text-white/90">
                        CALICUT HUBS SPOTLIGHT
                      </span>
                    </div>
                    <span className="text-[10px] text-white/60 font-medium">
                      Click to explore
                    </span>
                  </div>

                  {/* Landmark navigation pills */}
                  <div className="grid grid-cols-4 gap-1 sm:gap-1.5 bg-[#0c1228] p-1 rounded-xl">
                    {LANDMARKS.map((landmark, idx) => {
                      const isActive = idx === activeLandmarkIndex;
                      return (
                        <button
                          key={landmark.id}
                          type="button"
                          onClick={() => setActiveLandmarkIndex(idx)}
                          className={`px-2 py-1.5 rounded-lg text-center transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-[#ec2028] to-[#cc141c] text-white shadow-sm font-bold'
                              : 'text-white/70 hover:text-white hover:bg-white/10 font-medium'
                          }`}
                        >
                          <p className="text-[10px] sm:text-[11px] leading-tight truncate">
                            {landmark.shortTabName}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main Visual Image Frame */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-slate-900">
                  <Image
                    key={currentLandmark.id}
                    src={currentLandmark.image}
                    alt={`${currentLandmark.name} - Calicut commercial hub`}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlays for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b3b] via-[#131b3b]/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#131b3b]/60 via-transparent to-transparent" />

                  {/* Overlaid Badge: Active Hub Coordinates */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#131b3b]/85 backdrop-blur-md border border-white/20 text-xs font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#ec2028]" />
                      <span>{currentLandmark.name}</span>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                      {currentLandmark.tag}
                    </span>
                  </div>

                  {/* Live simulated customer search card (Floating Top-Left) */}
                  <div className="absolute top-14 left-3 right-3 sm:right-auto sm:max-w-[270px] animate-float">
                    <div className="hero-glass-card rounded-xl p-2.5 sm:p-3 shadow-lg border border-white/80 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#2c3691]/10 flex items-center justify-center shrink-0">
                          <Search className="w-3 h-3 text-[#2c3691]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] uppercase tracking-wider font-bold text-[#667085]">
                            Live Citizen Search
                          </p>
                          <p className="text-[11px] font-bold text-[#131b3b] truncate">
                            &ldquo;{currentLandmark.trendingSearch}&rdquo;
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#12b76a] font-semibold pl-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12b76a] animate-pulse" />
                        <span>{currentLandmark.searchesCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* On-Image Bottom Details Bar */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold text-white/90 drop-shadow-sm">
                      {currentLandmark.malayalamName}
                    </p>
                    <p className="text-[11px] text-white/80 line-clamp-1 drop-shadow-sm">
                      {currentLandmark.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Verified Merchant Showcase Card */}
                <div className="p-4 sm:p-5 bg-white border-t border-[#f2f4f7] space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#fff1f2] text-[#ec2028] text-[10px] font-extrabold uppercase tracking-wide">
                          Live Merchant Spotlight
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#b54708]">
                          <Star className="w-3 h-3 fill-[#f79009] text-[#f79009]" />
                          <span>{currentLandmark.spotlightBusiness.rating}</span>
                          <span className="text-[#667085] font-normal">({currentLandmark.spotlightBusiness.reviews})</span>
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-[#131b3b]">
                        {currentLandmark.spotlightBusiness.name}
                      </h4>
                      <p className="text-xs text-[#667085]">
                        {currentLandmark.spotlightBusiness.category} &bull; {currentLandmark.spotlightBusiness.location}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRegisterClick()}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-[#2c3691] hover:bg-[#1f2868] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      List Like This
                    </button>
                  </div>

                  {/* Quick stats strip */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f2f4f7] text-center">
                    <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#eaecf0]">
                      <p className="text-xs sm:text-sm font-extrabold text-[#2c3691]">1,200+</p>
                      <p className="text-[10px] text-[#667085] font-medium">Calicut Businesses</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#eaecf0]">
                      <p className="text-xs sm:text-sm font-extrabold text-[#ec2028]">50K+</p>
                      <p className="text-[10px] text-[#667085] font-medium">Monthly Searches</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#f8fafc] border border-[#eaecf0]">
                      <p className="text-xs sm:text-sm font-extrabold text-[#12b76a]">100%</p>
                      <p className="text-[10px] text-[#667085] font-medium">Free To Join</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Verified Listing Badge (Top Right) */}
              <div className="absolute -top-3.5 -right-2 sm:-right-4 px-3.5 py-2 rounded-xl bg-white border border-[#e4e7ec] shadow-xl flex items-center gap-2 text-xs font-bold text-[#131b3b] z-20 animate-float-alt">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12b76a] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#12b76a]" />
                </span>
                <span>Calicut Registration Open</span>
              </div>

              {/* Floating WhatsApp Direct Chat Pill (Bottom Left) */}
              <a
                href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to enquire about listing on LiveCalicut.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex absolute -bottom-3.5 -left-3 px-3.5 py-2 rounded-xl bg-[#131b3b] hover:bg-[#0c1228] text-white shadow-xl items-center gap-2 text-xs font-semibold z-20 transition-all hover:scale-105 group cursor-pointer border border-white/10"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25d366] shrink-0" />
                <span className="text-[#25d366] font-bold">WhatsApp:</span>
                <span className="group-hover:underline text-white font-medium">{LIVECALICUT_WHATSAPP.display}</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
