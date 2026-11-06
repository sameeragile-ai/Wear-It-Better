import React from 'react';
import { motion } from 'framer-motion';
import { BESPOKE_STEPS } from '../constants';
import { useStore } from '../context/StoreContext';

export const BespokeProcess: React.FC = () => {
  const { setIsFittingModalOpen } = useStore();

  return (
    <section
      id="bespoke"
      aria-label="Bespoke Process"
      className="py-20 lg:py-28 bg-grad-warm text-[#2B2621] relative overflow-hidden border-t border-[#EAE2D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
            The Bespoke Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
            Four Steps to Individual Perfection
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7A6F63]">
            From initial silhouette consultation to the moment your custom hand-stitched garment is delivered in its monogrammed travel case.
          </p>
        </div>

        {/* 4 Sequential Steps with Connecting Line */}
        <div className="relative">
          {/* Connecting line on desktop (horizontal) */}
          <div
            className="hidden lg:block absolute top-1/2 -translate-y-8 left-12 right-12 h-[2px] bg-[#EAE2D5] pointer-events-none"
            aria-hidden="true"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-grad-gold origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {BESPOKE_STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-[#EAE2D5] hover:border-[#B08A3E]/60 shadow-warm-sm hover:shadow-warm-md transition-all group"
              >
                <div>
                  {/* Step Monogram Circle with Gold Gradient */}
                  <div className="w-12 h-12 rounded-2xl bg-grad-champagne border border-[#EAE2D5] flex items-center justify-center mb-6 shadow-warm-sm">
                    <span className="font-mono text-sm font-bold text-[#8A6A2B]">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B2621] font-medium group-hover:text-[#8A6A2B] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[#8A6A2B] font-bold mt-1 mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#7A6F63] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EAE2D5] flex items-center justify-between text-[11px] text-[#7A6F63]">
                  <span>Milestone {index + 1} of 4</span>
                  <span className="font-mono text-[#8A6A2B] font-bold">0{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fitting Trigger CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setIsFittingModalOpen(true)}
            className="py-3.5 px-8 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase shadow-warm-md inline-flex items-center gap-2"
          >
            <span>Initiate Bespoke Consultation</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
