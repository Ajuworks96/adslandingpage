import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface TheProblemProps {
  onRegisterClick: () => void;
}

export const TheProblem: React.FC<TheProblemProps> = ({ onRegisterClick }) => {
  return (
    <section id="problem" className="py-14 sm:py-20 bg-[#fbfbfa] reveal-init">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fee2e2] text-[#b91c1c] text-xs font-bold uppercase tracking-wider">
            Local Discovery Challenge
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#131b3b] tracking-tight leading-snug">
            നിങ്ങളുടെ ബിസിനസ് ആളുകൾക്ക് <br className="hidden sm:inline" />
            എളുപ്പത്തിൽ കണ്ടെത്താനാകുന്നുണ്ടോ?
          </h2>
          <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
            Kozhikode-ൽ ഒരു മികച്ച സേവനമോ കടയോ ഭക്ഷണശാലയോ ആവശ്യമുള്ളപ്പോൾ, ആളുകൾ ഒന്നിലധികം ആപ്പുകളിലും സോഷ്യൽ മീഡിയകളിലും പരതി വലയുകയാണ് പതിവ്.
          </p>
        </div>

        {/* Editorial Comparison: Fragmented Search vs Unified Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Fragmented Search */}
          <div className="bg-white rounded-2xl border border-[#fee2e2] p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-[#fef2f2]">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#b91c1c]">Current Reality</span>
                <h3 className="text-xl font-bold text-[#131b3b] mt-0.5">Fragmented Local Discovery</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#fee2e2] flex items-center justify-center text-[#dc2626]">
                <XCircle className="w-5 h-5" />
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-[#475467]">
              <li className="flex items-start gap-3">
                <span className="text-[#dc2626] font-bold mt-0.5 shrink-0">&times;</span>
                <span><strong>Scattered Information:</strong> Customers search through disconnected social feeds, outdated directories, and random chat groups.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#dc2626] font-bold mt-0.5 shrink-0">&times;</span>
                <span><strong>Outdated Contact Details:</strong> Changed phone numbers, incorrect timings, and missing locations lead to lost customer trust.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#dc2626] font-bold mt-0.5 shrink-0">&times;</span>
                <span><strong>No Unified Calicut Hub:</strong> Great local establishments get lost unless a customer already knows the exact brand name.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#dc2626] font-bold mt-0.5 shrink-0">&times;</span>
                <span><strong>Wasted Advertising Budgets:</strong> Spending on general ads that reach people outside Kozhikode instead of local shoppers.</span>
              </li>
            </ul>
          </div>

          {/* Connected Local Ecosystem */}
          <div className="bg-white rounded-2xl border-2 border-[#2c3691]/20 p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#2c3691] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-bl-xl">
              The Solution
            </div>

            <div className="flex items-center justify-between pb-6 border-b border-[#f2f4f7]">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#2c3691]">LiveCalicut Approach</span>
                <h3 className="text-xl font-bold text-[#131b3b] mt-0.5">A Connected Kozhikode Ecosystem</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2c3691]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-[#344054]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a] mt-0.5 shrink-0" />
                <span><strong>One Dedicated City Platform:</strong> Bringing Kozhikode businesses, services, and opportunities together in one intuitive space.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a] mt-0.5 shrink-0" />
                <span><strong>Verified Essential Information:</strong> Clear phone number, category, neighborhood hub, and direct contact details.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a] mt-0.5 shrink-0" />
                <span><strong>Neighborhood & Hub Visibility:</strong> Customers can discover your service when searching specific areas like SM Street, Mavoor Road, or Cyberpark.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#12b76a] mt-0.5 shrink-0" />
                <span><strong>Simple & Transparent:</strong> Free registration to start, reviewed by a team that actually understands Kozhikode.</span>
              </li>
            </ul>

            <div className="mt-8 pt-5 border-t border-[#f2f4f7] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#475467]">
                Ready to be part of the change?
              </span>
              <button
                onClick={onRegisterClick}
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec2028] hover:text-[#d61820] cursor-pointer"
              >
                <span>Register your business now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
