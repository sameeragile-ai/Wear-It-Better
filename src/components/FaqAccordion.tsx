import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../constants';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-20 lg:py-28 bg-[#FBF8F3] text-[#2B2621] border-t border-[#EAE2D5]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
            Client Assistance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7A6F63]">
            Answers regarding our tailoring, formulation extraits, global logistics, and bespoke atelier appointments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-grad-champagne border-[#B08A3E]/50 shadow-warm-md'
                    : 'bg-white border-[#EAE2D5] hover:border-[#B08A3E]/30 shadow-warm-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B]"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#2B2621] font-semibold leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full border transition-all shrink-0 ${
                      isOpen
                        ? 'bg-grad-gold text-[#2B2621] border-transparent shadow-warm-sm'
                        : 'border-[#EAE2D5] bg-[#FBF8F3] text-[#7A6F63]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-[#2B2621]/80 leading-relaxed border-t border-[#EAE2D5]/70 pt-4 font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
