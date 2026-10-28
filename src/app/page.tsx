'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TheProblem } from '@/components/TheProblem';
import { IntroducingLiveCalicut } from '@/components/IntroducingLiveCalicut';
import { ExploreCategories } from '@/components/ExploreCategories';
import { WhyRegister } from '@/components/WhyRegister';
import { WhoCanRegister } from '@/components/WhoCanRegister';
import { HowItWorks } from '@/components/HowItWorks';
import { CommunitySection } from '@/components/CommunitySection';
import { RegistrationForm } from '@/components/RegistrationForm';
import { RegistrationModal } from '@/components/RegistrationModal';
import { FaqSection } from '@/components/FaqSection';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';
import { LegalModal } from '@/components/LegalModal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Initialize smooth scroll reveal animations
  useScrollAnimation();

  // Handler to open the attractive popup contact form
  const openRegisterModal = (category?: string) => {
    setModalCategory(category || '');
    setIsModalOpen(true);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#ec2028]/15 selection:text-[#131b3b]">
      {/* Top Navbar */}
      <Navbar onRegisterClick={() => openRegisterModal()} />

      {/* SECTION 01 — HERO (Includes integrated 4-sector ecosystem dock) */}
      <Hero
        onRegisterClick={(category) => openRegisterModal(category)}
        onExploreClick={scrollToExplore}
      />

      {/* SECTION 02 — THE PROBLEM */}
      <TheProblem onRegisterClick={() => openRegisterModal()} />

      {/* SECTION 04 — INTRODUCING LIVECALICUT */}
      <IntroducingLiveCalicut onRegisterClick={() => openRegisterModal()} />

      {/* SECTION 05 — EXPLORE LOCAL CATEGORIES */}
      <ExploreCategories onCategorySelect={(catId) => openRegisterModal(catId)} />

      {/* SECTION 06 — WHY REGISTER YOUR BUSINESS? */}
      <WhyRegister onRegisterClick={() => openRegisterModal()} />

      {/* SECTION 07 — WHO CAN REGISTER? */}
      <WhoCanRegister onRegisterClick={() => openRegisterModal()} />

      {/* SECTION 08 — HOW IT WORKS */}
      <HowItWorks />

      {/* SECTION 09 — THE LIVECALICUT COMMUNITY */}
      <CommunitySection />

      {/* SECTION 10 — ON-PAGE REGISTRATION FORM */}
      <RegistrationForm
        initialCategory={modalCategory}
        onOpenPrivacy={() => setLegalModalType('privacy')}
      />

      {/* SECTION 11 — FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* SECTION 12 — FINAL CTA */}
      <FinalCta onRegisterClick={() => openRegisterModal()} />

      {/* FOOTER */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onRegisterClick={() => openRegisterModal()}
      />

      {/* Mobile Sticky Action Bar */}
      <StickyMobileCta onRegisterClick={() => openRegisterModal()} />

      {/* Interactive Registration Popup Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={modalCategory}
        onOpenPrivacy={() => {
          setIsModalOpen(false);
          setLegalModalType('privacy');
        }}
      />

      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsAppButton />

      {/* Accessible In-Page Legal Modal */}
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </main>
  );
}
