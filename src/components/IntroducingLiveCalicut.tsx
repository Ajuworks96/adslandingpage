'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Globe, Layers } from 'lucide-react';

interface IntroducingLiveCalicutProps {
  onRegisterClick: () => void;
}

export const IntroducingLiveCalicut: React.FC<IntroducingLiveCalicutProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#e4e7ec] reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Side: City Guide Experience Composition */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#e4e7ec] shadow-lg">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/heroes/sm-street.jpg"
                  alt="Kozhikode vibrant city market and commerce"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b3b]/90 via-[#131b3b]/30 to-transparent" />

                {/* City Discovery Editorial Caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#ec2028]" />
                    <span>The Kozhikode Spirit</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight">
                    Where tradition meets modern commerce.
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    From historic spice markets to bustling IT startups at Cyberpark, LiveCalicut is built to reflect the full spectrum of our city.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
              About The Ecosystem
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight leading-tight">
              One City. Many Possibilities. <br />
              <span className="text-[#2c3691]">One Local Ecosystem.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
              LiveCalicut is created with a singular focus: to bridge the gap between people, local businesses, and opportunities across Kozhikode.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="p-4 rounded-xl bg-[#fbfbfa] border border-[#e4e7ec] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center text-[#2c3691]">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#131b3b]">Connecting Kozhikode</h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Helping residents and visitors quickly uncover businesses, services, dining, and healthcare nearby.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfbfa] border border-[#e4e7ec] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#fff1f2] flex items-center justify-center text-[#ec2028]">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#131b3b]">Organized Local Hubs</h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Tailored structure highlighting specific Kozhikode locations from Palayam and Beach to Cyberpark and Thondayad.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRegisterClick}
                type="button"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#131b3b] hover:bg-[#1e293b] text-white text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
              >
                <span>Become Part of LiveCalicut</span>
                <ArrowRight className="w-4 h-4 text-[#ec2028]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
