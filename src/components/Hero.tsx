'use client';

import React, { useState } from 'react';
import { ArchiteqHero } from './ArchiteqHero';
import { LiveCalicutHero } from './Hero.livecalicut.backup';
import { Sparkles, Layers, Eye } from 'lucide-react';

interface HeroProps {
  onRegisterClick?: (category?: string) => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreClick }) => {
  // Primary view is the requested Architeq Architectural Hero section matching the mockup
  const [activeHero, setActiveHero] = useState<'architeq' | 'directory'>('architeq');
  const [showIntegratedNav, setShowIntegratedNav] = useState(true);

  return (
    <div className="relative">
      {/* Active Hero Section */}
      {activeHero === 'architeq' ? (
        <div className="w-full">
          <ArchiteqHero
            onTalkClick={() => onRegisterClick?.()}
            onExploreClick={onExploreClick}
            showNavigation={showIntegratedNav}
          />
        </div>
      ) : (
        <LiveCalicutHero
          onRegisterClick={onRegisterClick || (() => {})}
          onExploreClick={onExploreClick || (() => {})}
        />
      )}

      {/* Hero Switcher Pill (Floating in bottom-right corner for easy previewing & customization) */}
      <aside aria-label="Hero section switcher" className="fixed bottom-6 right-6 z-40">
        <div className="bg-[#12161a]/95 backdrop-blur-md text-white border border-white/15 px-3.5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
            <Layers className="w-3.5 h-3.5 text-[#84cc16]" />
            <span className="hidden sm:inline">Hero Style:</span>
          </div>

          <div className="flex items-center bg-white/10 p-0.5 rounded-xl">
            <button
              onClick={() => setActiveHero('architeq')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeHero === 'architeq'
                  ? 'bg-[#65a30d] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Architeq (New)</span>
            </button>

            <button
              onClick={() => setActiveHero('directory')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeHero === 'directory'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              LiveCalicut Directory
            </button>
          </div>

          {activeHero === 'architeq' && (
            <button
              onClick={() => setShowIntegratedNav(!showIntegratedNav)}
              title="Toggle integrated Architeq top navigation bar"
              className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                showIntegratedNav
                  ? 'border-[#84cc16]/50 text-[#84cc16] bg-[#84cc16]/10'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>{showIntegratedNav ? 'Nav Visible' : 'Nav Hidden'}</span>
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};
