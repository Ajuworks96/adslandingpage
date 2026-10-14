'use client';

import React from 'react';
import { ClipboardCheck, SearchCheck, CheckCircle2, ShieldAlert } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Submit Your Details',
      desc: 'Complete the short registration form below with your contact details, business name, category, and Kozhikode area.',
      icon: ClipboardCheck,
    },
    {
      step: '02',
      title: 'LiveCalicut Reviews Your Submission',
      desc: 'Our local team verifies the details to ensure authenticity and contacts you directly if further information or clarification is needed.',
      icon: SearchCheck,
    },
    {
      step: '03',
      title: 'Move Forward with Your Listing',
      desc: 'Our team guides you through the applicable listing process, verification standards, and next steps for your profile on LiveCalicut.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-[#e4e7ec] reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
            Clear Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight">
            Get Started in Three Simple Steps.
          </h2>
          <p className="text-base text-[#475467] leading-relaxed">
            Zero complex hurdles or confusing portals. Here is how connecting with LiveCalicut works:
          </p>
        </div>

        {/* Steps Grid with Connected Step Styling */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#2c3691]/20 via-[#ec2028]/20 to-[#2c3691]/20 -translate-y-8 pointer-events-none" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-7 border border-[#e4e7ec] shadow-xs hover:border-[#2c3691] hover:shadow-md transition-all space-y-4 text-center flex flex-col items-center"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#f4f6fa] border border-[#e4e7ec] flex items-center justify-center text-[#2c3691] relative">
                  <Icon className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#ec2028] text-white text-[10px] font-bold">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#131b3b] pt-1">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mandatory Transparency Note */}
        <div className="mt-12 max-w-2xl mx-auto p-4 sm:p-5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-3.5 text-xs text-[#475467]">
          <ShieldAlert className="w-5 h-5 text-[#2c3691] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#131b3b]">Important note on review & verification:</strong> Submitting this registration form does not constitute an automatic guarantee of publication. Every listing is reviewed by the LiveCalicut team to verify legitimate operation within Kozhikode and protect community trust.
          </p>
        </div>

      </div>
    </section>
  );
};
