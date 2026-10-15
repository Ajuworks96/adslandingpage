import React from 'react';
import { Store, Wrench, Compass, Users } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const items = [
    {
      icon: Store,
      title: 'Discover Local Businesses',
      desc: 'Shops, dining & commerce across Calicut',
    },
    {
      icon: Wrench,
      title: 'Connect with Local Services',
      desc: 'Trusted professional & neighborhood help',
    },
    {
      icon: Compass,
      title: 'Explore Calicut',
      desc: 'Food, culture, stays & city highlights',
    },
    {
      icon: Users,
      title: 'Build Local Connections',
      desc: 'Connecting people, business & opportunity',
    },
  ];

  return (
    <section className="border-y border-[#e4e7ec] bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 sm:gap-4 group p-2 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f4f6fa] border border-[#e4e7ec] flex items-center justify-center shrink-0 text-[#2c3691] group-hover:border-[#2c3691] group-hover:bg-[#2c3691]/5 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[14px] sm:text-[15px] font-bold text-[#131b3b] tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-[12px] sm:text-[13px] text-[#667085] leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
