import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => {
    setIndex((prevIdx) => (prevIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setIndex((prevIdx) => (prevIdx + 1) % TESTIMONIALS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    touchStartX.current = null;
  };

  const currentItem = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-label="Collector Testimonials"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="py-20 lg:py-28 bg-grad-cool text-[#2B2621] border-t border-[#EAE2D5] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
            Collector Feedback
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
            Words From Our Patrons
          </h2>
          <p className="mt-2 text-sm text-[#7A6F63]">
            Reviews from gentlemen and fragrance collectors across New York, London, and Lahore.
          </p>
        </div>

        {/* Carousel Container on White Porcelain with --grad-border */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-warm-xl border border-[#EAE2D5]">
          <Quote className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 text-[#E9D7AE]/70 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Stars & Rating */}
              <div className="flex items-center gap-1.5">
                {[...Array(currentItem.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#B08A3E] fill-current" />
                ))}
                <span className="text-xs font-bold text-[#8A6A2B] ml-2">5.0 Perfect Rating</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2B2621] font-medium tracking-tight">
                "{currentItem.title}"
              </h3>

              {/* Quote */}
              <p className="text-base sm:text-xl text-[#7A6F63] font-serif italic leading-relaxed">
                "{currentItem.quote}"
              </p>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#EAE2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-bold text-[#2B2621]">
                      {currentItem.name}
                    </span>
                    {currentItem.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified buyer
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8A6A2B] mt-0.5 font-semibold">
                    Purchased: {currentItem.productPurchased}
                  </p>
                </div>

                <span className="text-xs text-[#7A6F63] font-mono">
                  {index + 1} / {TESTIMONIALS.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows */}
          <div className="mt-8 pt-6 border-t border-[#EAE2D5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className="p-1"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === idx ? 'w-6 bg-grad-gold' : 'w-2 bg-[#EAE2D5]'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="p-2.5 rounded-full border border-[#EAE2D5] bg-[#FBF8F3] hover:bg-[#E9D7AE]/30 text-[#2B2621] transition-colors shadow-warm-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="p-2.5 rounded-full border border-[#EAE2D5] bg-[#FBF8F3] hover:bg-[#E9D7AE]/30 text-[#2B2621] transition-colors shadow-warm-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
