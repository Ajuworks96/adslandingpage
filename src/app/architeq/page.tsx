'use client';

import React from 'react';
import { ArchiteqHero } from '@/components/ArchiteqHero';
import { ArrowUpRight, Award, ShieldCheck, Sparkles, Building, PhoneCall, Mail } from 'lucide-react';

export default function ArchiteqPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] text-neutral-900 font-sans selection:bg-[#65a30d]/20 selection:text-neutral-900">
      {/* THE ARCHITEQ HERO SECTION (Pixel-Perfect from Mockup) */}
      <ArchiteqHero showNavigation={true} />

      {/* ADDITIONAL SHOWCASE SECTIONS FOR ARCHITEQ */}
      <section id="projects" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 border-t border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#65a30d]/10 text-[#65a30d] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Featured Architectural Works
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              From cantilevered waterfront residences to commercial bio-climatic towers.
            </p>
          </div>
          <a
            href="#contact"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#65a30d] hover:text-[#52840b] transition-colors"
          >
            <span>View All 250+ Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'The Glass Pavilion',
              location: 'Aspen, Colorado',
              category: 'Luxury Residential',
              stats: '6,400 sq.ft • Completed 2025',
            },
            {
              title: 'Horizon Cantilever Villa',
              location: 'Zurich, Switzerland',
              category: 'Sustainable Living',
              stats: '8,200 sq.ft • Completed 2026',
            },
            {
              title: 'Elysian Eco-Office Tower',
              location: 'Stockholm, Sweden',
              category: 'Commercial Architecture',
              stats: '34,000 sq.ft • Completed 2026',
            },
          ].map((project, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-medium text-[#65a30d] tracking-wide uppercase">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1 group-hover:text-[#65a30d] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">{project.location}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600 font-medium">
                <span>{project.stats}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#12161a] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-[0.16em] text-white">ARCHITEQ</span>
            <span className="text-xs text-neutral-400 border-l border-neutral-700 pl-3">
              Where Vision Meets Precision
            </span>
          </div>
          <div className="text-xs text-neutral-400">
            © 2026 Architeq Architecture & Spatial Design Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

