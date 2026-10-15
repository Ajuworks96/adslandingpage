'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Store,
  User,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { BUSINESS_CATEGORIES, CALICUT_LOCATIONS, LIVECALICUT_WHATSAPP, LIVECALICUT_PHONE } from '@/lib/constants';
import { RegistrationFormData, ApiResponse } from '@/lib/types';
import { Confetti } from './Confetti';
import { WhatsAppIcon } from './WhatsAppIcon';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onOpenPrivacy: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
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

  // Track initialCategory updates
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

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      if (!value) return 'Please select a category.';
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
        setSubmitError(data.message || 'Submission failed. Please check your information.');
        return;
      }

      setSuccessResponse({
        referenceId: data.referenceId || 'LC-CONFIRMED',
        businessName: formData.businessName,
      });
    } catch {
      setSubmitError('Connection failed. Please check your internet and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0b1026]/75 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Confetti celebration effect on success */}
      {successResponse && <Confetti />}

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-modal-in">
        
        {/* Modal Top Bar */}
        <div className="relative bg-gradient-to-r from-[#131b3b] via-[#1a234f] to-[#2c3691] text-white p-6 sm:p-7 border-b-2 border-[#ec2028]">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ec2028] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>FREE REGISTRATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              List Your Business on LiveCalicut
            </h2>
            <p className="text-xs text-slate-300 font-normal leading-relaxed">
              Connect directly with Calicut citizens. Free verification by our team.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {successResponse ? (
            <div className="text-center space-y-6 py-4 animate-modal-in">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf3] text-[#12b76a] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#f4f6fa] text-[#2c3691] text-xs font-bold uppercase tracking-widest border border-[#e4e7ec]">
                  Ref: {successResponse.referenceId}
                </span>
                <h3 className="text-2xl font-extrabold text-[#131b3b]">
                  Thank you for choosing LiveCalicut!
                </h3>
                <p className="text-sm text-[#475467] max-w-md mx-auto leading-relaxed">
                  Your registration details for <strong className="text-[#131b3b]">{successResponse.businessName}</strong> have been received and sent for verification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#475467] text-left space-y-2">
                <p className="font-bold text-[#131b3b] uppercase tracking-wide">Next steps:</p>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#2c3691] text-white flex items-center justify-center text-[9px] font-bold">1</span>
                  <span>Team verifies business operating address in Calicut.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#2c3691] text-white flex items-center justify-center text-[9px] font-bold">2</span>
                  <span>Direct phone or WhatsApp follow-up for next steps.</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#131b3b] hover:bg-[#1e293b] text-white text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
                <button
                  onClick={handleReset}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#d0d5dd] hover:bg-[#f8fafc] text-xs font-semibold text-[#475467] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Register another</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Direct WhatsApp Option */}
              <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#ecfdf3] via-[#f0fdf4] to-white border border-[#a7f3d0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#25d366] text-white flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#065f46]">
                    Register directly via WhatsApp or Phone
                  </p>
                  <p className="text-[11px] text-[#475467]">
                    WhatsApp: <strong className="text-[#131b3b] font-bold">{LIVECALICUT_WHATSAPP.display}</strong> &bull; Call: <a href={LIVECALICUT_PHONE.telLink} className="text-[#131b3b] font-bold underline hover:text-[#2c3691]">{LIVECALICUT_PHONE.display}</a>
                  </p>
                </div>
              </div>

              <a
                href={LIVECALICUT_WHATSAPP.getLink('Hello LiveCalicut team, I would like to register my business via WhatsApp.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25d366] hover:bg-[#20ba59] text-white text-[11px] font-bold shadow-xs shrink-0 cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Us</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              
              {/* Honeypot hidden input */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {submitError && (
                <div className="p-3.5 rounded-xl bg-[#fef3f2] border border-[#fee4e2] flex items-start gap-2.5 text-xs text-[#b42318]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Business Name */}
              <div>
                <label htmlFor="modal-businessName" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                  Business Name <span className="text-[#ec2028]">*</span>
                </label>
                <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 ${errors.businessName ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                  <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                    <Store className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="modal-businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Paragon Restaurant, Calicut Footwear"
                    className="w-full bg-transparent py-2.5 sm:py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                {touched.businessName && errors.businessName && (
                  <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.businessName}</p>
                )}
              </div>

              {/* Category Dropdown */}
              <div>
                <label htmlFor="modal-businessCategory" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                  Business Category <span className="text-[#ec2028]">*</span>
                </label>
                <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 relative ${errors.businessCategory ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                  <select
                    id="modal-businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full bg-transparent py-2.5 sm:py-3 pl-3.5 pr-10 text-sm text-[#101828] appearance-none focus:outline-none cursor-pointer"
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select Category...</option>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 text-[#667085]">
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
                  <label htmlFor="modal-otherCategory" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Specify Your Category <span className="text-[#ec2028]">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-otherCategory"
                    name="otherCategory"
                    value={formData.otherCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Photography Studio, Artisanal Bakery"
                    className="w-full rounded-xl border border-[#d0d5dd] bg-white py-2.5 sm:py-3 px-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:border-[#2c3691] focus:ring-4 focus:ring-[#2c3691]/10 focus:outline-none"
                    disabled={isSubmitting}
                    required
                  />
                  {touched.otherCategory && errors.otherCategory && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.otherCategory}</p>
                  )}
                </div>
              )}

              {/* Name & Mobile side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-fullName" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Contact Person Name <span className="text-[#ec2028]">*</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 ${errors.fullName ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="modal-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Arjun Nair"
                      className="w-full bg-transparent py-2.5 sm:py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-mobile" className="block text-xs font-bold uppercase tracking-wider text-[#344054] mb-1.5">
                    Mobile Number <span className="text-[#ec2028]">*</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 overflow-hidden ${errors.mobile ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <span className="inline-flex items-center px-3 sm:px-3.5 py-2.5 sm:py-3 border-r border-[#d0d5dd] bg-[#f8fafc] text-xs font-bold text-[#475467] shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="modal-mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="98470 12345"
                      className="w-full bg-transparent py-2.5 sm:py-3 px-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {touched.mobile && errors.mobile && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.mobile}</p>
                  )}
                </div>
              </div>

              {/* Area in Calicut */}
              <div>
                <label htmlFor="modal-businessLocation" className="block text-xs font-medium text-[#475467] mb-1.5">
                  Area / Ward in Calicut <span className="text-[11px] text-[#98a2b3]">(Optional)</span>
                </label>
                <div className="flex items-center rounded-xl border border-[#d0d5dd] bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 relative">
                  <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    id="modal-businessLocation"
                    name="businessLocation"
                    value={formData.businessLocation}
                    onChange={handleChange}
                    className="w-full bg-transparent py-2.5 sm:py-3 pr-10 text-sm text-[#101828] appearance-none focus:outline-none cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Calicut Hub...</option>
                    {CALICUT_LOCATIONS.map((loc) => (
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

              {/* Optional Email & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-email" className="block text-xs font-medium text-[#475467] mb-1.5">
                    Email Address <span className="text-[11px] text-[#98a2b3]">(Optional)</span>
                  </label>
                  <div className={`flex items-center rounded-xl border bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10 ${errors.email ? 'border-[#fda29b] focus-within:border-[#d92d20] focus-within:ring-[#f04438]/20' : 'border-[#d0d5dd]'}`}>
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="business@example.com"
                      className="w-full bg-transparent py-2.5 sm:py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-xs text-[#d92d20] mt-1 font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-websiteOrSocial" className="block text-xs font-medium text-[#475467] mb-1.5">
                    Website or Instagram <span className="text-[11px] text-[#98a2b3]">(Optional)</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-[#d0d5dd] bg-white transition-all focus-within:border-[#2c3691] focus-within:ring-4 focus-within:ring-[#2c3691]/10">
                    <div className="pl-3.5 pr-2.5 text-[#98a2b3] shrink-0 pointer-events-none flex items-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="modal-websiteOrSocial"
                      name="websiteOrSocial"
                      value={formData.websiteOrSocial}
                      onChange={handleChange}
                      placeholder="instagram.com/mybrand"
                      className="w-full bg-transparent py-2.5 sm:py-3 pr-3.5 text-sm text-[#101828] placeholder:text-[#98a2b3] focus:outline-none"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="modal-consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="mt-0.5 h-4 w-4 rounded border-[#d0d5dd] text-[#2c3691] focus:ring-[#2c3691] cursor-pointer"
                  />
                  <span className="text-xs text-[#475467] leading-relaxed select-none">
                    I agree to be contacted by LiveCalicut regarding my registration under the{' '}
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
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ec2028] hover:bg-[#d61820] disabled:bg-[#fecdd3] text-white text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Free Registration</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#667085]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#12b76a]" />
                <span>Delivered directly to hello@livecalicut.com &bull; 100% Free verification</span>
              </div>

            </form>
          </>
          )}
        </div>

      </div>
    </div>
  );
};
