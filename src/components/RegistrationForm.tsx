'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Store,
  User,
  Mail,
  MapPin,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_CATEGORIES, KOZHIKODE_LOCATIONS, LIVECALICUT_WHATSAPP, LIVECALICUT_PHONE } from '@/lib/constants';
import { RegistrationFormData, ApiResponse } from '@/lib/types';
import { Confetti } from './Confetti';
import { WhatsAppIcon } from './WhatsAppIcon';

interface RegistrationFormProps {
  initialCategory?: string;
  onOpenPrivacy: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialCategory,
  onOpenPrivacy,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    businessName: '',
    businessCategory: initialCategory || '',
    otherCategory: '',
    email: '',
    businessLocation: '',
    websiteOrSocial: '',
    consent: true,
    honeypot: '',
  });

  const [utmParams] = useState<RegistrationFormData['utmParams']>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined,
        referrer: document.referrer || undefined,
      };
    }
    return {};
  });

  const [prevCategory, setPrevCategory] = useState(initialCategory);
  if (initialCategory && initialCategory !== prevCategory) {
    setPrevCategory(initialCategory);
    setFormData((prev) => ({ ...prev, businessCategory: initialCategory }));
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    referenceId: string;
    businessName: string;
  } | null>(null);

  const validateField = (name: string, value: string | boolean): string => {
    if (name === 'fullName') {
      const str = String(value).trim();
      if (!str) return 'Please enter your full name.';
      if (str.length < 2) return 'At least 2 characters required.';
    }
    if (name === 'mobile') {
      const cleanMobile = String(value).replace(/[\s-]/g, '');
      if (!cleanMobile) return 'Mobile number is required.';
      const indianPhoneRegex = /^(?:\+91[\s-]?)?[6789]\d{9}$/;
      if (!indianPhoneRegex.test(cleanMobile)) {
        return 'Enter a valid 10-digit Indian mobile number.';
      }
    }
    if (name === 'businessName') {
      const str = String(value).trim();
      if (!str) return 'Please enter your business or service name.';
      if (str.length < 2) return 'At least 2 characters required.';
    }
    if (name === 'businessCategory') {
      if (!value) return 'Please select a business category.';
    }
    if (name === 'otherCategory') {
      if (formData.businessCategory === 'other' && !String(value).trim()) {
        return 'Please specify your category.';
      }
    }
    if (name === 'email') {
      const str = String(value).trim();
      if (str && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str)) {
        return 'Please enter a valid email address.';
      }
    }
    if (name === 'consent') {
      if (!value) return 'You must agree to the privacy terms.';
    }
    return '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      const errorMsg = validateField(name, newValue);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      mobile: validateField('mobile', formData.mobile),
      businessName: validateField('businessName', formData.businessName),
      businessCategory: validateField('businessCategory', formData.businessCategory),
      otherCategory:
        formData.businessCategory === 'other'
          ? validateField('otherCategory', formData.otherCategory)
          : '',
      email: validateField('email', formData.email),
      consent: validateField('consent', formData.consent),
    };

    const activeErrors: Record<string, string> = {};
    Object.entries(newErrors).forEach(([k, v]) => {
      if (v) activeErrors[k] = v;
    });

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setTouched({
        fullName: true,
        mobile: true,
        businessName: true,
        businessCategory: true,
        otherCategory: true,
        email: true,
        consent: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: RegistrationFormData = {
        fullName: formData.fullName.trim(),
        mobile: formData.mobile.replace(/[\s-]/g, ''),
        businessName: formData.businessName.trim(),
        businessCategory: formData.businessCategory,
        otherCategory: formData.otherCategory.trim() || undefined,
        email: formData.email.trim() || undefined,
        businessLocation: formData.businessLocation || undefined,
        websiteOrSocial: formData.websiteOrSocial.trim() || undefined,
        consent: formData.consent,
        honeypot: formData.honeypot || undefined,
        utmParams,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) setErrors(data.errors);
        setSubmitError(
          data.message || 'Submission failed. Please check your information and try again.'
        );
        return;
      }

      setSuccessResponse({
        referenceId: data.referenceId || 'LC-CONFIRMED',
        businessName: formData.businessName,
      });
    } catch {
      setSubmitError(
        'Unable to connect to registration server. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobile: '',
      businessName: '',
      businessCategory: '',
      otherCategory: '',
      email: '',
      businessLocation: '',
      websiteOrSocial: '',
      consent: true,
      honeypot: '',
    });
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setSuccessResponse(null);
  };

  return (
    <section id="register" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#fbfbfa] to-white scroll-mt-20 reveal-init">
      {successResponse && <Confetti />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff1f2] border border-[#fecdd3] text-xs font-bold uppercase tracking-wider text-[#ec2028]">
            <span className="w-2 h-2 rounded-full bg-[#ec2028]" />
            <span>Official Kozhikode Registration &bull; Instant Free Review</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131b3b] tracking-tight">
            Let&apos;s Put Your Business on the Map.
          </h2>

          <p className="text-base sm:text-lg text-[#475467] max-w-xl mx-auto leading-relaxed">
            Share a few details. The LiveCalicut team will review and get in touch about next steps.
          </p>
        </div>

        {/* Confirmation State */}
        {successResponse ? (
          <div className="bg-white rounded-3xl border-2 border-[#12b76a]/30 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-modal-in">
            <div className="w-16 h-16 rounded-full bg-[#ecfdf3] text-[#12b76a] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#f4f6fa] text-[#2c3691] text-xs font-bold uppercase tracking-widest border border-[#e4e7ec]">
                Reference ID: {successResponse.referenceId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#131b3b]">
                Thank you for choosing LiveCalicut!
              </h3>
              <p className="text-base text-[#475467] max-w-lg mx-auto leading-relaxed">
                Your registration details for <strong className="text-[#131b3b] font-semibold">{successResponse.businessName}</strong> have been received and sent for verification.
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-left text-xs sm:text-sm text-[#475467] space-y-2.5">
              <p className="font-bold text-[#131b3b] uppercase tracking-wide text-xs">What happens next:</p>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#2c3691] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                <span>Verification check of your business location & contact info within Kozhikode.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#2c3691] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                <span>Direct WhatsApp / Call outreach from our local onboarding team.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetForm}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d0d5dd] hover:bg-[#f8fafc] text-xs font-semibold text-[#344054] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit another listing</span>
              </button>
            </div>
          </div>
        ) : (
          /* Attractive Elevated Card Form */
          <div className="gradient-border-card bg-white p-6 sm:p-10 shadow-2xl relative">
            
            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              id="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-[#fef3f2] border border-[#fee4e2] flex items-start gap-3 text-sm text-[#b42318]">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Submission Alert</p>
                  <p className="text-xs mt-0.5">{submitError}</p>
                </div>
              </div>
            )}

            {/* Direct WhatsApp Registration Option */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#ecfdf3] via-[#f0fdf4] to-white border border-[#a7f3d0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#065f46]">
                      Register or Chat on WhatsApp
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#12b76a]/20 text-[#027a48] text-[10px] font-bold">
                      Direct Support
                    </span>
                  </div>
                  <p className="text-xs text-[#344054] mt-0.5">
                    Prefer direct support? WhatsApp us at{' '}
                    <strong className="text-[#131b3b] font-bold">{LIVECALICUT_WHATSAPP.display}</strong> or call{' '}
                    <a href={LIVECALICUT_PHONE.telLink} className="text-[#131b3b] font-bold underline hover:text-[#2c3691]">
                      {LIVECALICUT_PHONE.display}
                    </a>
                  </p>
                </div>
              </div>

              <a
                href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to register my business / get assistance with listing on LiveCalicut.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Category Quick Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-2">
                  Select Category <span className="text-[#ec2028]">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {BUSINESS_CATEGORIES.slice(0, 6).map((cat) => {
                    const isSelected = formData.businessCategory === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, businessCategory: cat.id }));
                          if (touched.businessCategory) {
                            setErrors((prev) => ({ ...prev, businessCategory: '' }));
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2c3691] text-white border-[#2c3691] shadow-xs'
                            : 'bg-[#f8fafc] text-[#475467] border-[#e2e8f0] hover:border-[#2c3691]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <select
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-input appearance-none bg-white pr-10 text-sm ${errors.businessCategory ? 'border-[#fda29b] focus:border-[#d92d20] focus:ring-[#f04438]/20' : ''}`}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Or select from full category list...</option>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#667085]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {touched.businessCategory && errors.businessCategory && (
                  <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.businessCategory}</p>
                )}
              </div>

              {/* Conditional Other Category */}
              {formData.businessCategory === 'other' && (
                <div>
                  <label htmlFor="otherCategory" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Specify Your Category <span className="text-[#ec2028]">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherCategory"
                    name="otherCategory"
                    value={formData.otherCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Photography Studio, Artisanal Pottery"
                    className="form-input text-sm"
                    disabled={isSubmitting}
                    required
                  />
                  {touched.otherCategory && errors.otherCategory && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.otherCategory}</p>
                  )}
                </div>
              )}

              {/* Business Name & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="businessName" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Business Name <span className="text-[#ec2028]">*</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 ${errors.businessName ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <Store className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Malabar Spice Cafe"
                      className="w-full bg-transparent py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {touched.businessName && errors.businessName && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="businessLocation" className="block text-xs font-medium text-[#475467] mb-1.5">
                    Area in Kozhikode <span className="text-[11px] text-[#98a2b3]">(Optional)</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-[#d0d5dd] bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 relative">
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      id="businessLocation"
                      name="businessLocation"
                      value={formData.businessLocation}
                      onChange={handleChange}
                      className="w-full bg-transparent py-3 pr-10 text-sm text-[#101828] appearance-none focus:outline-none cursor-pointer"
                      disabled={isSubmitting}
                    >
                      <option value="">Select Kozhikode Area...</option>
                      {KOZHIKODE_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 text-[#667085]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Contact Person Name <span className="text-[#ec2028]">*</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 ${errors.fullName ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Arjun Nair"
                      className="w-full bg-transparent py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Mobile Number <span className="text-[#ec2028]">*</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 overflow-hidden ${errors.mobile ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <span className="inline-flex items-center px-3.5 py-3 border-r border-[#d0d5dd] bg-[#f8fafc] text-xs font-bold text-[#475467] shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="98470 12345"
                      className="w-full bg-transparent py-3 px-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {touched.mobile && errors.mobile && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.mobile}</p>
                  )}
                </div>
              </div>

              {/* Optional Email & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#475467] mb-1.5">
                    Email Address <span className="text-[11px] text-[#98a2b3]">(Optional)</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 ${errors.email ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="business@example.com"
                      className="w-full bg-transparent py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="websiteOrSocial" className="block text-xs font-medium text-[#475467] mb-1.5">
                    Website or Social Handle <span className="text-[11px] text-[#98a2b3]">(Optional)</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-[#d0d5dd] bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10">
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="websiteOrSocial"
                      name="websiteOrSocial"
                      value={formData.websiteOrSocial}
                      onChange={handleChange}
                      placeholder="instagram.com/mybusiness"
                      className="w-full bg-transparent py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 rounded border-[#d0d5dd] text-[#2c3691] focus:ring-[#2c3691] cursor-pointer"
                  />
                  <span className="text-xs text-[#475467] leading-relaxed select-none">
                    I agree to be contacted by LiveCalicut regarding my registration and understand how my information will be used under the{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenPrivacy();
                      }}
                      className="text-[#2c3691] underline hover:text-[#ec2028] font-medium"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
                {touched.consent && errors.consent && (
                  <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.consent}</p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#ec2028] to-[#d61820] hover:from-[#d61820] hover:to-[#b91c1c] disabled:opacity-50 text-white text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Registration</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Security reassurance & destination note */}
              <div className="flex items-center justify-center gap-2 text-xs text-[#667085]">
                <ShieldCheck className="w-4 h-4 text-[#12b76a]" />
                <span>Registrations delivered directly to hello@livecalicut.com &bull; 100% Free review</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
