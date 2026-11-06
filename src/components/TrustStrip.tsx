import React from 'react';
import { TRUST_PROMISES } from '../constants';

export const TrustStrip: React.FC = () => {
  const marqueeItems = [...TRUST_PROMISES, ...TRUST_PROMISES, ...TRUST_PROMISES];

  return (
    <div
      aria-label="Brand promises"
      className="relative z-20 bg-white py-4 overflow-hidden text-[#2B2621] select-none shadow-warm-sm"
    >
      {/* 1px Gradient Divider Line on Top */}
      <div className="absolute top-0 left-0 right-0 divider-grad" />

      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {marqueeItems.map((promise, idx) => (
          <div key={idx} className="flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide">
            {/* Small Gold-Gradient Diamond */}
            <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 10 10" fill="none">
              <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="url(#diamondGold)" />
              <defs>
                <linearGradient id="diamondGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B08A3E" />
                  <stop offset="100%" stopColor="#E9D7AE" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[#2B2621]/90 font-medium">{promise}</span>
            <span className="font-serif italic text-base text-[#8A6A2B] opacity-60">W</span>
          </div>
        ))}
      </div>

      {/* 1px Gradient Divider Line on Bottom */}
      <div className="absolute bottom-0 left-0 right-0 divider-grad" />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};
