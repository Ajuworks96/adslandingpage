'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, TrendingUp, MapPin, Compass } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#fbfbfa] border-b border-[#e4e7ec] overflow-hidden reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Text Storytelling */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
              <Heart className="w-3.5 h-3.5 text-[#ec2028] fill-[#ec2028]" />
              <span>Evolving City Ecosystem</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight leading-tight">
              More Than a Listing. <br />
              <span className="text-[#2c3691]">A Connected Local Community.</span>
            </h2>

            <p className="text-base text-[#475467] leading-relaxed">
              Kozhikode has always been celebrated for its warmth, hospitality, and vibrant merchant spirit. LiveCalicut is built to translate that real-world community into an evolving digital ecosystem.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#2c3691] flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#131b3b]">Local Exploration & Experiences</h4>
                  <p className="text-xs text-[#667085] leading-relaxed mt-0.5">
                    Highlighting Calicut&apos;s distinctive food culture, historic heritage streets, coastal leisure, and neighborhood hubs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#fff1f2] text-[#ec2028] flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#131b3b]">Connecting Opportunity</h4>
                  <p className="text-xs text-[#667085] leading-relaxed mt-0.5">
                    Bridging connections between skilled professionals, local enterprises, career opportunities, and neighborhood services.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#e4e7ec] text-xs text-[#667085] leading-relaxed">
              <strong className="text-[#131b3b]">Our ongoing commitment:</strong> We are continuously refining platform modules alongside Kozhikode&apos;s business owners to ensure every feature delivers genuine local utility.
            </div>
          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <Image
                  src="/heroes/coastal-life.jpg"
                  alt="Kozhikode coastal culture and life"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b3b]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-bold">Kozhikode Beach</p>
                  <p className="text-[10px] text-slate-300">Heart of the coastline</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square">
                  <Image
                    src="/heroes/workplace.jpg"
                    alt="Cyberpark IT workspace and professionals"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b3b]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-bold">Modern Workspaces</p>
                    <p className="text-[10px] text-slate-300">Cyberpark & Innovation</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#e4e7ec] shadow-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2c3691]">
                    <MapPin className="w-3.5 h-3.5 text-[#ec2028]" />
                    <span>Malabar Focus</span>
                  </div>
                  <p className="text-[11px] text-[#667085] leading-tight">
                    Dedicated specifically to Kozhikode district and its surrounding community.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
