'use client';

import React from 'react';
import {
  Store,
  Utensils,
  UserCheck,
  Wrench,
  Compass,
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

interface WhoCanRegisterProps {
  onRegisterClick: () => void;
}

const SECTORS = [
  {
    icon: Store,
    title: 'Retail Shops & Local Stores',
    description: 'Textile showrooms, supermarkets, footwear, electronics, and neighborhood retail outlets across Calicut.',
  },
  {
    icon: Utensils,
    title: 'Restaurants, Cafés & Bakeries',
    description: 'Traditional Malabar biryani hubs, modern specialty coffee houses, family restaurants, and bakeries.',
  },
  {
    icon: UserCheck,
    title: 'Freelancers & Independent Pros',
    description: 'Designers, software developers, photographers, accountants, tutors, and creative consultants.',
  },
  {
    icon: Wrench,
    title: 'Home & Essential Service Providers',
    description: 'Plumbing, electrical technicians, AC repair, cleaning, automotive workshops, and wellness experts.',
  },
  {
    icon: Compass,
    title: 'Tourism & Stays',
    description: 'Hotels, beachside homestays, heritage resorts, cab operators, and Malabar tour guides.',
  },
  {
    icon: GraduationCap,
    title: 'Educational & Training Institutes',
    description: 'Coaching centers, academies, language trainers, entrance institutes, and vocational centers.',
  },
  {
    icon: Building2,
    title: 'Property & Real Estate Firms',
    description: 'Real estate brokers, commercial leasing agencies, builders, and property management firms.',
  },
  {
    icon: Briefcase,
    title: 'Other Legitimate Businesses',
    description: 'Any genuine enterprise or emerging startup serving customers or clients within Calicut.',
  },
];

export const WhoCanRegister: React.FC<WhoCanRegisterProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#fbfbfa] border-b border-[#e4e7ec] reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
            Inclusive Business Community
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight">
            Made for Calicut&apos;s Local Business Community.
          </h2>
          <p className="text-base text-[#475467] leading-relaxed">
            Whether you run a 3-generation shop on SM Street or operate a modern IT consultancy at Cyberpark, you belong here.
          </p>
        </div>

        {/* Grid of 8 sectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#e4e7ec] shadow-xs hover:border-[#2c3691] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#f4f6fa] text-[#2c3691] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#131b3b]">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed mt-2">
                    {sector.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Action */}
        <div className="mt-12 text-center">
          <button
            onClick={onRegisterClick}
            type="button"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#ec2028] hover:bg-[#d61820] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            <span>Register Your Business</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
