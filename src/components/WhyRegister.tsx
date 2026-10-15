'use client';

import React from 'react';
import { Eye, FileText, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface WhyRegisterProps {
  onRegisterClick: () => void;
}

export const WhyRegister: React.FC<WhyRegisterProps> = ({ onRegisterClick }) => {
  return (
    <section id="why-register" className="py-16 sm:py-24 bg-white border-b border-[#e4e7ec] reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
            Clear & Honest Value
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight">
            Your Business Deserves to Be Discovered.
          </h2>
          <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
            We focus on honest, practical utility for Calicut businesses. We don&apos;t make exaggerated promises or fake guarantees — here is exactly what LiveCalicut offers:
          </p>
        </div>

        {/* Editorial Layout: Asymmetric 2-column composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Main Feature Pillar */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#131b3b] to-[#1e293b] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#ec2028]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#ec2028]">
                <Eye className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#93c5fd] font-bold">
                  Core Benefit 01
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Online Visibility
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Give people another reliable avenue to discover your business. When citizens and travelers explore Calicut by neighborhood, category, or service, your presence is there for them to find.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10 relative z-10">
              <button
                onClick={onRegisterClick}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#ec2028] hover:bg-[#d61820] text-white text-sm font-semibold transition-all shadow cursor-pointer"
              >
                <span>List Your Business for Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Supporting Benefits Stack */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Benefit 2 */}
            <div className="editorial-card p-6 sm:p-7 rounded-2xl flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-[#eff6ff] text-[#2c3691] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">Benefit 02</span>
                  <span className="text-xs text-[#d0d5dd]">&bull;</span>
                  <h4 className="text-base font-bold text-[#131b3b]">Clear Business Information</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Present your essential contact information, location, category, and website or social channels cleanly so customers know exactly how to reach you directly without friction.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="editorial-card p-6 sm:p-7 rounded-2xl flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-[#fff1f2] text-[#ec2028] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">Benefit 03</span>
                  <span className="text-xs text-[#d0d5dd]">&bull;</span>
                  <h4 className="text-base font-bold text-[#131b3b]">Targeted Local Reach</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Build awareness specifically among people who are living in, working in, or traveling through Calicut — ensuring your visibility is hyper-relevant to your actual service area.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="editorial-card p-6 sm:p-7 rounded-2xl flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-[#ecfdf3] text-[#12b76a] flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">Benefit 04</span>
                  <span className="text-xs text-[#d0d5dd]">&bull;</span>
                  <h4 className="text-base font-bold text-[#131b3b]">Easy & Free Registration</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  Submit your details through a fast, 1-minute form without complex setup or mandatory upfront fees. Our local team reviews each submission personally.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
