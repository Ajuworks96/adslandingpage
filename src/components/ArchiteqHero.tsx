'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  Building2,
  Users2,
  Award,
  Plus,
  X,
  Compass,
  Layers,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Phone,
  Mail,
  Send,
  Calendar,
  Clock,
  Menu,
} from 'lucide-react';

export interface ArchiteqHeroProps {
  onTalkClick?: () => void;
  onExploreClick?: () => void;
  onWatchProcessClick?: () => void;
  showNavigation?: boolean;
}

export const ArchiteqLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-neutral-900"
      >
        {/* Isometric 3D wireframe cube */}
        <rect x="4" y="6" width="16" height="16" rx="2" />
        <rect x="12" y="10" width="16" height="16" rx="2" />
        <line x1="4" y1="6" x2="12" y2="10" />
        <line x1="20" y1="6" x2="28" y2="10" />
        <line x1="4" y1="22" x2="12" y2="26" />
        <line x1="20" y1="22" x2="28" y2="26" />
      </svg>
    </div>
    <span className="font-bold text-lg sm:text-xl tracking-[0.16em] text-neutral-900 font-sans">
      ARCHITEQ
    </span>
  </div>
);

export const ArchiteqHero: React.FC<ArchiteqHeroProps> = ({
  onTalkClick,
  onExploreClick,
  onWatchProcessClick,
  showNavigation = true,
}) => {
  // Modal states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isFeatureExpanded, setIsFeatureExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visualSource, setVisualSource] = useState<'render' | 'mockup'>('render');

  // Form submission state for Talk modal
  const [talkFormSubmitted, setTalkFormSubmitted] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState(0);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const processSteps = [
    {
      title: '01. Vision & Concept Discovery',
      description:
        'We understand your lifestyle, site topography, solar orientation, and spatial aspirations to sculpt the core architectural narrative.',
      duration: 'Week 1–2',
      deliverables: 'Moodboards, Spatial Bubble Diagrams & Massing Studies',
    },
    {
      title: '02. Meticulous 3D & Parametric Modeling',
      description:
        'Crafting photorealistic digital twins, lighting simulations, and structural material palettes to preview daylight and flow in millimeter precision.',
      duration: 'Week 3–4',
      deliverables: '3D Walkthroughs, Material Boards & Interior Volumes',
    },
    {
      title: '03. Blueprint Engineering & Permits',
      description:
        'Comprehensive MEP, structural calculations, and permit-ready documentation ensuring frictionless municipality approvals.',
      duration: 'Week 5–6',
      deliverables: 'Complete CAD/BIM Blueprint Set & Compliance Filing',
    },
    {
      title: '04. Precision Build & Quality Oversight',
      description:
        'On-site architectural supervisory visits, contractor alignment, and artisanal material procurement through final key handover.',
      duration: 'Execution',
      deliverables: 'Weekly Inspection Logs & As-Built Handover Documentation',
    },
  ];

  const handleOpenTalk = () => {
    if (onTalkClick) {
      onTalkClick();
    } else {
      setIsTalkModalOpen(true);
    }
  };

  const handleOpenProcess = () => {
    if (onWatchProcessClick) {
      onWatchProcessClick();
    } else {
      setIsVideoModalOpen(true);
    }
  };

  return (
    <section className="relative w-full bg-[#f8f8f6] text-neutral-900 overflow-hidden font-sans selection:bg-[#65a30d]/20 selection:text-neutral-900">
      {/* Background Architectural Blueprint Blueprint Grid & Ambient Sun Flare */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle CAD / Blueprint grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: `
              radial-gradient(#94a3b8 0.75px, transparent 0.75px),
              linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px, 72px 72px, 72px 72px',
          }}
        />

        {/* Warm Golden Sun Flare Radiating from Top Right (as seen in mockup) */}
        <div
          className="absolute -top-24 right-0 w-[550px] sm:w-[750px] lg:w-[900px] h-[550px] sm:h-[750px] lg:h-[900px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 75% 25%, rgba(251, 191, 36, 0.28) 0%, rgba(245, 158, 11, 0.14) 30%, rgba(234, 88, 12, 0.04) 55%, transparent 75%)',
          }}
        />

        {/* Blueprint drafting curves / Technical lines watermark on left */}
        <svg
          className="absolute left-[-5%] top-[15%] w-[600px] h-[600px] opacity-[0.05] stroke-neutral-900"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="140" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="90" strokeWidth="1.2" />
          <line x1="20" y1="200" x2="380" y2="200" strokeWidth="0.8" />
          <line x1="200" y1="20" x2="200" y2="380" strokeWidth="0.8" />
        </svg>
      </div>

      {/* TOP NAVBAR */}
      {showNavigation && (
        <header className="relative z-30 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          {/* Brand Logo */}
          <ArchiteqLogo />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[14px] font-medium text-neutral-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-neutral-900 relative group py-1"
              >
                <span>{link.label}</span>
                {link.label === 'Home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#65a30d] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenTalk}
              className="group inline-flex items-center gap-2 bg-[#12161a] hover:bg-black text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 mx-6 mt-3 rounded-2xl shadow-xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-700 hover:text-neutral-900 font-medium py-2 px-3 rounded-lg hover:bg-neutral-100/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* MAIN HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Headings, Subtitle, Buttons, Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Pill Badge: • Designing the Future */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-neutral-200/80 backdrop-blur-sm shadow-xs mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65a30d] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65a30d]" />
              </span>
              <span className="text-xs font-medium text-neutral-600 tracking-wide">
                Designing the Future
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[68px] font-extrabold text-neutral-900 tracking-tight leading-[1.08]">
              Where Vision <br />
              Meets <span className="text-[#65a30d]">Precision</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-lg font-normal">
              We turn ideas into timeless spaces through innovative design and meticulous planning.
            </p>

            {/* Action Buttons Row */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary Explore Projects Button */}
              <button
                onClick={onExploreClick || handleOpenTalk}
                className="group inline-flex items-center gap-2.5 bg-[#12161a] hover:bg-black text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary Watch Our Process Video Button */}
              <button
                onClick={handleOpenProcess}
                className="group inline-flex items-center gap-3 text-neutral-800 hover:text-black font-medium text-sm transition-colors cursor-pointer"
              >
                <span className="w-10 h-10 rounded-full bg-white border border-neutral-300/80 shadow-xs flex items-center justify-center text-neutral-800 group-hover:bg-[#12161a] group-hover:text-white group-hover:border-[#12161a] transition-all duration-200 group-hover:scale-105">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>Watch Our Process</span>
              </button>
            </div>

            {/* Floating Glass Stats Card */}
            <div className="mt-10 sm:mt-12 backdrop-blur-md bg-white/85 border border-white/80 rounded-2xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.06)] max-w-xl">
              <div className="grid grid-cols-3 divide-x divide-neutral-200/70">
                
                {/* Metric 1: Projects */}
                <div className="px-2 sm:px-4 first:pl-1 flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#65a30d]/10 text-[#65a30d] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-bold text-neutral-900 tracking-tight leading-none">
                      250+
                    </div>
                    <div className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-1 leading-snug">
                      Projects Completed
                    </div>
                  </div>
                </div>

                {/* Metric 2: Clients */}
                <div className="px-2 sm:px-4 flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#65a30d]/10 text-[#65a30d] flex items-center justify-center shrink-0">
                    <Users2 className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-bold text-neutral-900 tracking-tight leading-none">
                      120+
                    </div>
                    <div className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-1 leading-snug">
                      Happy Clients
                    </div>
                  </div>
                </div>

                {/* Metric 3: Awards */}
                <div className="px-2 sm:px-4 last:pr-1 flex items-start gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#65a30d]/10 text-[#65a30d] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-base sm:text-xl font-bold text-neutral-900 tracking-tight leading-none">
                      15+
                    </div>
                    <div className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-1 leading-snug">
                      Awards Won
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Architectural Villa Model + Floating Feature Card */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            
            {/* Visual Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-white/60 bg-white group">
              
              {/* Architectural Scale Model Image */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={visualSource === 'render' ? '/heroes/architecture-model.jpg' : '/heroes/architeq-reference.png'}
                  alt="Modern architectural villa scale model on architectural blueprint drafting table"
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

                {/* Visual View Switcher (Bottom Left of visual) */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center bg-black/60 backdrop-blur-md rounded-lg p-0.5 border border-white/10 text-[10px] text-white">
                  <button
                    onClick={() => setVisualSource('render')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      visualSource === 'render'
                        ? 'bg-[#65a30d] text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    3D Render
                  </button>
                  <button
                    onClick={() => setVisualSource('mockup')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      visualSource === 'mockup'
                        ? 'bg-[#65a30d] text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Mockup
                  </button>
                </div>
              </div>

              {/* Floating Feature Card (Upper Right quadrant) */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                <div className="relative bg-[#1d2329]/95 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/10 max-w-[210px] sm:max-w-[230px] transition-all hover:bg-[#1d2329]">
                  
                  {/* Card Header with Green Dot */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                      Innovative Design
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
                  </div>

                  {/* Card Body */}
                  <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed mt-1.5">
                    Creating spaces that inspire and elevate everyday living.
                  </p>

                  {/* Floating Action Button with '+' (as seen in screenshot) */}
                  <button
                    onClick={() => setIsFeatureExpanded(!isFeatureExpanded)}
                    title="Explore innovative design features"
                    className="absolute -bottom-4 -right-4 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-gradient-to-tr from-[#65a30d] to-[#84cc16] text-white flex items-center justify-center shadow-lg ring-4 ring-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus
                      className={`w-4 sm:w-5 h-4 sm:h-5 stroke-[2.5] transition-transform duration-300 ${
                        isFeatureExpanded ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Feature Details Popover */}
                {isFeatureExpanded && (
                  <div className="absolute top-full mt-6 right-0 w-64 bg-white text-neutral-900 rounded-xl p-4 shadow-2xl border border-neutral-200 text-xs z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="font-semibold text-neutral-900 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#65a30d]" />
                      <span>Signature Innovations</span>
                    </div>
                    <ul className="space-y-1.5 text-neutral-600">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] shrink-0 mt-0.5" />
                        <span>Passive solar orientation & natural thermal cooling</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] shrink-0 mt-0.5" />
                        <span>Biophilic indoor-outdoor garden integration</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d] shrink-0 mt-0.5" />
                        <span>Carbon-neutral composite cross-laminated timber</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM FEATURE / SERVICE DOCK (Dark Rounded Bar Spanning Across) */}
        <div className="mt-12 sm:mt-16 bg-[#181d22] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x-0 lg:divide-x divide-white/10">
            
            {/* Service 1: Architectural Design */}
            <div className="pt-4 sm:pt-0 lg:px-4 first:lg:pl-0 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#84cc16]/30 flex items-center justify-center text-[#84cc16] shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">
                  Architectural Design
                </h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Smart, functional and sustainable design solutions.
                </p>
              </div>
            </div>

            {/* Service 2: Interior Design */}
            <div className="pt-4 sm:pt-0 lg:px-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#84cc16]/30 flex items-center justify-center text-[#84cc16] shrink-0 shadow-inner">
                <Layers className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">
                  Interior Design
                </h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Beautiful interiors that reflect your lifestyle.
                </p>
              </div>
            </div>

            {/* Service 3: Project Planning */}
            <div className="pt-4 sm:pt-0 lg:px-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#84cc16]/30 flex items-center justify-center text-[#84cc16] shrink-0 shadow-inner">
                <Compass className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">
                  Project Planning
                </h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  From concept to completion we&apos;ve got you covered.
                </p>
              </div>
            </div>

            {/* Service 4: 3D Visualization */}
            <div className="pt-4 sm:pt-0 lg:px-4 last:lg:pr-0 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-[#84cc16]/30 flex items-center justify-center text-[#84cc16] shrink-0 shadow-inner">
                <Maximize2 className="w-5 h-5 stroke-[1.8]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">
                  3D Visualization
                </h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Bringing your ideas to life before they are built.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* WATCH OUR PROCESS MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#181d22] text-white rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden">
            
            {/* Close button */}
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#84cc16]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#84cc16]">
                Methodology & Workflow
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              How We Sculpt Timeless Architecture
            </h2>
            <p className="text-sm text-neutral-400 mb-6">
              Step through our four-stage design and precision construction process.
            </p>

            {/* Tabs for Process Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {processSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepTab(idx)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium transition-all text-left ${
                    activeStepTab === idx
                      ? 'bg-[#65a30d] text-white shadow-md'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Phase 0{idx + 1}
                </button>
              ))}
            </div>

            {/* Active Step Content */}
            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">
                  {processSteps[activeStepTab].title}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#84cc16]/20 text-[#84cc16] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {processSteps[activeStepTab].duration}
                </span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                {processSteps[activeStepTab].description}
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300">Deliverables:</span>
                <span>{processSteps[activeStepTab].deliverables}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsTalkModalOpen(true);
                }}
                className="bg-[#65a30d] hover:bg-[#558b0b] text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                Schedule Architecture Consultation
              </button>
            </div>

          </div>
        </div>
      )}

      {/* LET'S TALK / CONSULTATION MODAL */}
      {isTalkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 overflow-hidden">
            
            <button
              onClick={() => {
                setIsTalkModalOpen(false);
                setTalkFormSubmitted(false);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {talkFormSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#65a30d]/10 text-[#65a30d] mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Vision Received
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto mb-6">
                  Our principal architect will review your project brief and get in touch within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsTalkModalOpen(false);
                    setTalkFormSubmitted(false);
                  }}
                  className="bg-[#12161a] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#65a30d]/10 text-[#65a30d] text-xs font-semibold mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Start Your Project</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
                  Let&apos;s Design Something Iconic
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                  Share your design aspirations and let our team turn your vision into architectural precision.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTalkFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Sterling"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="maya@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Primary Service Interest
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all bg-white">
                      <option>Architectural Design & Engineering</option>
                      <option>Interior Architecture & Luxury Living</option>
                      <option>Full Project Master Planning</option>
                      <option>3D Spatial Visualization & VR Walkthrough</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Project Notes / Location
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the property, plot size, or desired timeline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a30d] focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#12161a] hover:bg-black text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
