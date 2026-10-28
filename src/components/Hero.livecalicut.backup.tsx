'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Store,
  User,
  Phone,
  Loader2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  BUSINESS_CATEGORIES,
  CALICUT_LOCATIONS,
  LIVECALICUT_WHATSAPP,
} from '@/lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Confetti } from './Confetti';
import { RegistrationFormData, ApiResponse } from '@/lib/types';

interface HeroProps {
  onRegisterClick: (category?: string) => void;
  onExploreClick: () => void;
}

const HERO_CATEGORIES = [
  { id: 'restaurants', label: 'Restaurants & Cafés', icon: '🍽️' },
  { id: 'shops', label: 'Shops & Retail', icon: '🛍️' },
  { id: 'services', label: 'Home & Professional Services', icon: '⚡' },
  { id: 'jobs', label: 'IT & Cyberpark', icon: '💻' },
  { id: 'accommodation', label: 'Hotels & Stays', icon: '🏨' },
];

export const LiveCalicutHero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  // Quick Registration Form State
  const [formData, setFormData] = useState({
    businessName: '',
    businessCategory: 'shops',
    businessLocation: '',
    fullName: '',
    mobile: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    referenceId: string;
    businessName: string;
  } | null>(null);

  // Handle Quick Category selection from left pills or card buttons
  const handleSelectCategory = (catId: string) => {
    setFormData((prev) => ({ ...prev, businessCategory: catId }));
    if (errors.businessCategory) {
      setErrors((prev) => ({ ...prev, businessCategory: '' }));
    }
    const inputEl = document.getElementById('hero-business-name');
    if (inputEl) {
      inputEl.focus();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      errs.businessName = 'Please enter your business or shop name.';
    }

    if (!formData.businessCategory) {
      errs.businessCategory = 'Please select a business category.';
    }

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter contact person name.';
    }

    const cleanPhone = formData.mobile.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+91[\s-]?)?[6789]\d{9}$/;
    if (!cleanPhone) {
      errs.mobile = 'Mobile number is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: RegistrationFormData = {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.replace(/[\s-]/g, ''),
        businessName: formData.businessName.trim(),
        businessCategory: formData.businessCategory,
        businessLocation: formData.businessLocation || undefined,
        consent: true,
        honeypot: formData.honeypot || undefined,
        utmParams: typeof window !== 'undefined'
          ? {
              utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'hero_quick_form',
              utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || 'hero_form',
              referrer: document.referrer || undefined,
            }
          : undefined,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setSubmitError(data.message || 'Submission failed. Please try again.');
        return;
      }

      setSuccessResponse({
        referenceId: data.referenceId || 'LC-CONFIRMED',
        businessName: formData.businessName,
      });
    } catch {
      setSubmitError('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: '',
      businessCategory: 'shops',
      businessLocation: '',
      fullName: '',
      mobile: '',
      honeypot: '',
    });
    setErrors({});
    setSubmitError(null);
    setSuccessResponse(null);
  };

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
              LEFT COLUMN: Bilingual Tech-Startup Typography & Benefits
             ========================================================= */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tech-Startup Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2c3691]/5 border border-[#2c3691]/15 text-[#2c3691] text-xs font-semibold backdrop-blur-xs shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12b76a] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12b76a]" />
                </span>
                <span className="uppercase tracking-wider font-bold text-[10.5px] sm:text-[11px]">
                  CALICUT DIGITAL ECOSYSTEM
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ec2028]/10 border border-[#ec2028]/20 text-[#ec2028] text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec2028]" />
                <span>100% Free Listing</span>
              </span>
            </div>

            {/* Bilingual Main Headline */}
            <div className="space-y-3.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#101828] tracking-tight leading-[1.16]">
                Connect Every Customer in Calicut to Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec2028] via-[#e11d48] to-[#2c3691]">
                  Business.
                </span>
              </h1>

              {/* Punchy Malayalam Sub-Hook Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#fafbfc] via-white to-[#fff5f5] border border-[#e4e7ec] shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[#ec2028] text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                    Live Search
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#131b3b]">
                    Google-ൽ തുടങ്ങുന്ന തിരച്ചിൽ, LIVECALICUT-ലൂടെ നേരിട്ട് നിങ്ങളിലേക്ക്!
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                  കോഴിക്കോട്ടുകാർ നിങ്ങളുടെ അടുത്തുള്ള കടകളും സർവീസുകളും തിരയുമ്പോൾ, ഏറ്റവും മുന്നിൽ നിങ്ങൾ ഉണ്ടാവട്ടെ. Direct WhatsApp & Call leads &bull; സീറോ കമ്മീഷൻ.
                </p>
              </div>
            </div>

            {/* Interactive Category Quick Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#667085]">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#2c3691]" />
                  <span>Top Calicut Categories (Click to Select):</span>
                </div>
                <span className="text-[11px] text-[#2c3691] font-semibold hidden sm:inline">Instant Setup</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {HERO_CATEGORIES.map((cat) => {
                  const isSelected = formData.businessCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#2c3691] text-white border-[#2c3691] shadow-xs'
                          : 'bg-white hover:bg-[#f4f6fa] border-[#e4e7ec] hover:border-[#2c3691]/40 text-[#344054] hover:text-[#2c3691] shadow-2xs'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'text-white' : 'text-[#98a2b3]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  const inputEl = document.getElementById('hero-business-name');
                  if (inputEl) {
                    inputEl.focus();
                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else {
                    onRegisterClick();
                  }
                }}
                type="button"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ec2028] via-[#e11d48] to-[#cc141c] hover:opacity-95 text-white text-sm sm:text-base font-bold shadow-md shadow-[#ec2028]/25 hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer group"
              >
                {/* Shimmer sweep effect */}
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 animate-shimmer pointer-events-none" />
                <span className="relative z-10">Register Your Business — Free</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreClick}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#f8fafc] text-[#131b3b] text-sm sm:text-base font-bold border border-[#d0d5dd] hover:border-[#2c3691] shadow-xs hover:shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#2c3691]" />
                <span>Explore Calicut Directory</span>
              </button>
            </div>

            {/* Tech-Startup Metric Strip */}
            <div className="pt-2 grid grid-cols-3 gap-2.5 sm:gap-3 border-t border-[#f2f4f7] text-left">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#fafbfc] border border-[#f0f2f5]">
                <p className="text-base sm:text-lg font-black text-[#131b3b]">1,200+</p>
                <p className="text-[10px] sm:text-[11px] text-[#667085] font-medium leading-tight">Calicut Merchants</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#fafbfc] border border-[#f0f2f5]">
                <p className="text-base sm:text-lg font-black text-[#ec2028]">50K+</p>
                <p className="text-[10px] sm:text-[11px] text-[#667085] font-medium leading-tight">Monthly Searches</p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#fafbfc] border border-[#f0f2f5]">
                <p className="text-base sm:text-lg font-black text-[#12b76a]">₹0</p>
                <p className="text-[10px] sm:text-[11px] text-[#667085] font-medium leading-tight">Zero Commission</p>
              </div>
            </div>

            {/* Authentic Trust Marker */}
            <div className="flex items-center gap-2.5 text-xs text-[#475467]">
              <div className="w-6 h-6 rounded-lg bg-[#2c3691]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2c3691]" />
              </div>
              <span className="leading-snug">
                <strong className="text-[#131b3b] font-semibold">Verified Calicut Directory:</strong> Listings checked by our local Calicut team &bull; Zero spam &bull; Direct customer enquiries.
              </span>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Direct Quick Registration Card (Clean & Authentic)
             ========================================================= */}
          <div className="lg:col-span-5 relative pt-2 sm:pt-4">
            {successResponse && <Confetti />}

            <div
              id="hero-register-card"
              className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#e4e7ec] shadow-xl sm:shadow-2xl overflow-hidden transition-all duration-300"
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#2c3691] via-[#ec2028] to-[#12b76a]" />

              {/* Card Header */}
              <div className="p-5 sm:p-6 pb-4 sm:pb-4 border-b border-[#f2f4f7] bg-gradient-to-b from-[#fafbfc] to-white">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf3] border border-[#a7f3d0] text-[#027a48] text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#12b76a] animate-pulse" />
                    <span>Free Listing 2026</span>
                  </span>

                  <a
                    href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to get quick assistance registering my business.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075e54] hover:text-[#128c7e] transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25d366]" />
                    <span>WhatsApp Help</span>
                  </a>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#131b3b] tracking-tight">
                  List Your Business Free
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
                  കോഴിക്കോട്ടെ ആയിരക്കണക്കിന് കസ്റ്റമേഴ്സിലേക്ക് 60 സെക്കൻഡിൽ എത്തൂ.
                </p>
              </div>

              {/* Card Body: Form or Success State */}
              <div className="p-5 sm:p-6 pt-4">
                {successResponse ? (
                  /* Confirmed State */
                  <div className="text-center py-6 space-y-4 animate-modal-in">
                    <div className="w-14 h-14 rounded-full bg-[#ecfdf3] text-[#12b76a] flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#f4f6fa] text-[#2c3691] text-[11px] font-bold uppercase tracking-wider border border-[#e4e7ec]">
                        ID: {successResponse.referenceId}
                      </span>
                      <h4 className="text-lg font-extrabold text-[#131b3b]">
                        രജിസ്ട്രേഷൻ ലഭിച്ചു!
                      </h4>
                      <p className="text-xs sm:text-sm text-[#475467] leading-relaxed max-w-xs mx-auto">
                        <strong className="text-[#131b3b] font-semibold">{successResponse.businessName}</strong> വിവരങ്ങൾ പരിശോധനയ്ക്കായി കൈമാറി. ഞങ്ങളുടെ കോഴിക്കോട് ടീം നിങ്ങളുമായി ബന്ധപ്പെടും.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <a
                        href={LIVECALICUT_WHATSAPP.getLink(
                          `Hello LiveCalicut team, I have just registered my business (${successResponse.businessName}, Ref: ${successResponse.referenceId}). Please verify my listing.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-white" />
                        <span>Fast-Track on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-[#667085] hover:text-[#131b3b] pt-1 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Register another business</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form Input Fields */
                  <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                    {/* Hidden Honeypot */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {submitError && (
                      <div className="p-3 rounded-xl bg-[#fef3f2] border border-[#fee4e2] flex items-start gap-2.5 text-xs text-[#b42318]">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Field 1: Business Name */}
                    <div>
                      <label htmlFor="hero-business-name" className="block text-[11px] font-bold uppercase tracking-wider text-[#344054] mb-1">
                        Business / Shop Name <span className="text-[#ec2028]">*</span>
                      </label>
                      <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-2 focus-within:ring-[#2c3691]/10 ${errors.businessName ? 'border-[#fda29b]' : 'border-[#d0d5dd]'}`}>
                        <div className="pl-3 pr-2 text-[#98a2b3] shrink-0 pointer-events-none">
                          <Store className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="hero-business-name"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="e.g. Malabar Cafe, Paragon, Halwa Hub..."
                          className="w-full bg-transparent py-2.5 pr-3 text-xs sm:text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                      {errors.businessName && (
                        <p className="text-[11px] text-[#d92d20] mt-1 font-medium">{errors.businessName}</p>
                      )}
                    </div>

                    {/* Field 2: Business Category & Quick Chips */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="hero-business-category" className="block text-[11px] font-bold uppercase tracking-wider text-[#344054]">
                          Category <span className="text-[#ec2028]">*</span>
                        </label>
                        <span className="text-[10px] text-[#667085]">Select nearest fit</span>
                      </div>

                      {/* Top 4 Quick Chips */}
                      <div className="grid grid-cols-4 gap-1.5 mb-2">
                        {[
                          { id: 'restaurants', label: 'Dining' },
                          { id: 'shops', label: 'Retail' },
                          { id: 'services', label: 'Services' },
                          { id: 'jobs', label: 'IT/Tech' },
                        ].map((chip) => {
                          const isSelected = formData.businessCategory === chip.id;
                          return (
                            <button
                              key={chip.id}
                              type="button"
                              onClick={() => handleSelectCategory(chip.id)}
                              className={`py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer border truncate ${
                                isSelected
                                  ? 'bg-[#2c3691] text-white border-[#2c3691]'
                                  : 'bg-[#f8fafc] text-[#475467] border-[#e2e8f0] hover:border-[#2c3691]/40'
                              }`}
                            >
                              {chip.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="relative">
                        <select
                          id="hero-business-category"
                          name="businessCategory"
                          value={formData.businessCategory}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-[#d0d5dd] bg-white py-2.5 pl-3 pr-8 text-xs sm:text-sm text-[#101828] appearance-none focus:outline-none focus:border-[#2c3691] focus:ring-2 focus:ring-[#2c3691]/10 cursor-pointer"
                          disabled={isSubmitting}
                          required
                        >
                          {BUSINESS_CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#667085]">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.businessCategory && (
                        <p className="text-[11px] text-[#d92d20] mt-1 font-medium">{errors.businessCategory}</p>
                      )}
                    </div>

                    {/* Field 3: Area in Calicut */}
                    <div>
                      <label htmlFor="hero-business-location" className="block text-[11px] font-bold uppercase tracking-wider text-[#344054] mb-1">
                        Area in Calicut
                      </label>
                      <div className="relative flex items-center rounded-xl border border-[#d0d5dd] bg-white focus-within:border-[#2c3691] focus-within:ring-2 focus-within:ring-[#2c3691]/10">
                        <div className="pl-3 pr-2 text-[#98a2b3] shrink-0 pointer-events-none">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <select
                          id="hero-business-location"
                          name="businessLocation"
                          value={formData.businessLocation}
                          onChange={handleInputChange}
                          className="w-full bg-transparent py-2.5 pr-8 text-xs sm:text-sm text-[#101828] appearance-none focus:outline-none cursor-pointer"
                          disabled={isSubmitting}
                        >
                          <option value="">Select Calicut Area (Optional)...</option>
                          {CALICUT_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 text-[#667085]">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Field 4 & 5: Name and Phone in 2 cols */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hero-full-name" className="block text-[11px] font-bold uppercase tracking-wider text-[#344054] mb-1">
                          Your Name <span className="text-[#ec2028]">*</span>
                        </label>
                        <div className={`flex items-center rounded-xl border bg-white focus-within:border-[#2c3691] focus-within:ring-2 focus-within:ring-[#2c3691]/10 ${errors.fullName ? 'border-[#fda29b]' : 'border-[#d0d5dd]'}`}>
                          <div className="pl-3 pr-2 text-[#98a2b3] shrink-0 pointer-events-none">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="hero-full-name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Arjun"
                            className="w-full bg-transparent py-2.5 pr-2.5 text-xs sm:text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                        {errors.fullName && (
                          <p className="text-[11px] text-[#d92d20] mt-1 font-medium">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="hero-mobile" className="block text-[11px] font-bold uppercase tracking-wider text-[#344054] mb-1">
                          WhatsApp / Mobile <span className="text-[#ec2028]">*</span>
                        </label>
                        <div className={`flex items-center rounded-xl border bg-white focus-within:border-[#2c3691] focus-within:ring-2 focus-within:ring-[#2c3691]/10 overflow-hidden ${errors.mobile ? 'border-[#fda29b]' : 'border-[#d0d5dd]'}`}>
                          <span className="inline-flex items-center px-2 py-2.5 border-r border-[#d0d5dd] bg-[#f8fafc] text-[11px] font-bold text-[#475467] shrink-0">
                            +91
                          </span>
                          <input
                            type="tel"
                            id="hero-mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="98470 12345"
                            className="w-full bg-transparent py-2.5 px-2 text-xs sm:text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-[11px] text-[#d92d20] mt-1 font-medium">{errors.mobile}</p>
                        )}
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative overflow-hidden w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#ec2028] via-[#e11d48] to-[#cc141c] hover:opacity-95 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-[#ec2028]/25 hover:shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer group"
                      >
                        <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 animate-shimmer pointer-events-none" />
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                            <span className="relative z-10">Submitting Listing...</span>
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Get Listed on LiveCalicut — Free</span>
                            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Direct WhatsApp Registration Pill */}
                    <div className="pt-1 text-center">
                      <a
                        href={LIVECALICUT_WHATSAPP.getLink(
                          'Hello LiveCalicut team, I want to register my business in Calicut.'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-[#075e54] hover:text-[#128c7e] font-semibold transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25d366]" />
                        <span>Or register via WhatsApp: <strong>{LIVECALICUT_WHATSAPP.display}</strong></span>
                      </a>
                    </div>

                    {/* Micro Security & Trust */}
                    <div className="pt-2 border-t border-[#f2f4f7] flex items-center justify-between text-[11px] text-[#667085]">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#12b76a]" />
                        <span>100% Free</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2c3691]" />
                        <span>Verified Listing</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#f79009]" />
                        <span>60-Sec Review</span>
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Floating Live Badge */}
            <div className="hidden sm:flex absolute -bottom-3 right-4 px-3 py-1.5 rounded-xl bg-white border border-[#e4e7ec] shadow-lg items-center gap-2 text-[11px] font-bold text-[#131b3b] z-20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12b76a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12b76a]" />
              </span>
              <span>1,200+ Calicut Businesses Joined</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
