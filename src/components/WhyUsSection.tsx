import React from 'react';
import { Sparkles, Scissors, Truck, ShieldCheck } from 'lucide-react';
import { WHY_US_BENEFITS } from '../constants';

export const WhyUsSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Sparkles,
    Scissors,
    Truck,
    ShieldCheck,
  };

  return (
    <section
      id="why-us"
      aria-label="Why Wear It Better"
      className="py-20 lg:py-24 bg-[#FBF8F3] text-[#2B2621] border-t border-[#EAE2D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
            The House Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-grad-heading font-normal tracking-tight">
            Why Wear It Better
          </h2>
          <p className="mt-2 text-sm text-[#7A6F63]">
            Every garment and flacon is held to the uncompromising standards of our New York salon.
          </p>
        </div>

        {/* 4 columns desktop, 2 tablet, 2 mobile (1 under 380px) */}
        <div className="grid grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_BENEFITS.map((b) => {
            const Icon = iconMap[b.icon] || Sparkles;
            return (
              <div
                key={b.title}
                className="p-6 rounded-3xl bg-white border border-[#EAE2D5] hover:border-[#B08A3E]/40 shadow-warm-sm hover:shadow-warm-md transition-all space-y-3.5"
              >
                {/* Soft Champagne Gradient Circle with Gold Icon */}
                <div className="w-12 h-12 rounded-2xl bg-grad-champagne border border-[#EAE2D5] flex items-center justify-center text-[#8A6A2B] shadow-warm-sm">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#2B2621]">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6F63] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
