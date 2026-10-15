'use client';

import React from 'react';
import {
  Store,
  Utensils,
  Compass,
  Bed,
  Building2,
  Briefcase,
  GraduationCap,
  Calendar,
  Wrench,
  ShoppingBag,
  ArrowUpRight,
} from 'lucide-react';

interface ExploreCategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

const CATEGORIES = [
  {
    id: 'shops',
    title: 'Businesses & Shops',
    desc: 'Retail outlets, fashion boutiques, electronics, and commercial stores.',
    icon: Store,
    tag: 'Commercial',
  },
  {
    id: 'restaurants',
    title: 'Restaurants, Food & Cafés',
    desc: 'Authentic Malabar cuisine, beachside cafes, bakeries, and fine dining.',
    icon: Utensils,
    tag: 'Dining',
  },
  {
    id: 'tourism',
    title: 'Tourism & Places',
    desc: 'Heritage landmarks, coastal destinations, viewpoints, and cultural spots.',
    icon: Compass,
    tag: 'Explore',
  },
  {
    id: 'accommodation',
    title: 'Accommodation & Stays',
    desc: 'Boutique hotels, serviced apartments, homestays, and beach resorts.',
    icon: Bed,
    tag: 'Hospitality',
  },
  {
    id: 'real_estate',
    title: 'Real Estate & Property',
    desc: 'Commercial rental spaces, property developers, and residential brokers.',
    icon: Building2,
    tag: 'Property',
  },
  {
    id: 'jobs',
    title: 'Jobs & Careers',
    desc: 'Cyberpark tech positions, retail openings, and local firm recruitments.',
    icon: Briefcase,
    tag: 'Careers',
  },
  {
    id: 'education',
    title: 'Education & Learning',
    desc: 'Higher education academies, competitive coaching, and skill centers.',
    icon: GraduationCap,
    tag: 'Learning',
  },
  {
    id: 'events',
    title: 'Events & Community',
    desc: 'Calicut literary festivals, sports leagues, exhibitions, and meets.',
    icon: Calendar,
    tag: 'Community',
  },
  {
    id: 'services',
    title: 'Local Services',
    desc: 'Automotive workshops, home maintenance, legal, tax, and repairs.',
    icon: Wrench,
    tag: 'Essential Services',
  },
  {
    id: 'products',
    title: 'Products & Buy/Sell',
    desc: 'Local craft marketplace, pre-owned classifieds, and artisan goods.',
    icon: ShoppingBag,
    tag: 'Marketplace',
  },
];

export const ExploreCategories: React.FC<ExploreCategoriesProps> = ({ onCategorySelect }) => {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#fbfbfa] reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f6fa] border border-[#e4e7ec] text-xs font-bold uppercase tracking-wider text-[#2c3691]">
            Calicut Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b3b] tracking-tight">
            Explore Local Categories
          </h2>
          <p className="text-base text-[#475467] leading-relaxed">
            Discover how LiveCalicut organizes the city. Select your industry to jump directly to free registration.
          </p>
        </div>

        {/* 10-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="editorial-card group p-5 rounded-2xl flex flex-col justify-between cursor-pointer hover:border-[#2c3691] transition-all relative"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onCategorySelect(cat.id);
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f4f6fa] group-hover:bg-[#2c3691]/10 text-[#2c3691] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f2f4f7] text-[#475467] group-hover:bg-[#2c3691] group-hover:text-white transition-colors">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#131b3b] group-hover:text-[#2c3691] transition-colors leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed mt-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f2f4f7] flex items-center justify-between text-xs font-semibold text-[#2c3691] group-hover:text-[#ec2028] transition-colors">
                  <span>Register in this category</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-note */}
        <div className="mt-8 text-center text-xs text-[#667085]">
          Operating in another specialized niche? You can select &ldquo;Other Category&rdquo; during free registration.
        </div>

      </div>
    </section>
  );
};
