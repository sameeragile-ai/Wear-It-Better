import React from 'react';
import { Sparkles, Scissors, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const AtelierSection: React.FC = () => {
  const { setIsFittingModalOpen } = useStore();

  const brandFacts = [
    {
      icon: Clock,
      stat: '40+ Hours',
      label: 'Per bespoke suit',
      description: 'Hand-basted canvas, pick-stitched lapels and hand-sewn buttonholes.',
    },
    {
      icon: Sparkles,
      stat: 'Small-Batch',
      label: 'Studio perfumes',
      description: 'Aged macerations and unadulterated rare botanicals in limited runs.',
    },
    {
      icon: Scissors,
      stat: 'Since 2014',
      label: 'Fifth Avenue Salon',
      description: 'A dedicated New York bespoke salon marrying heritage and modern cuts.',
    },
  ];

  return (
    <section
      id="atelier"
      aria-label="Atelier Craftsmanship"
      className="py-20 lg:py-28 bg-[#FBF8F3] text-[#2B2621] relative overflow-hidden border-t border-[#EAE2D5]"
    >
      {/* Blurred Gold Orb behind text */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E9D7AE]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Bright Craftsmanship Image with --grad-border offset frame */}
          <div className="lg:col-span-6 relative">
            {/* Offset Gradient Frame Accent */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-grad-champagne opacity-60 transform -rotate-1 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden shadow-warm-xl border border-[#EAE2D5] aspect-[4/3] bg-white">
              <SmartImage
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80&auto=format"
                alt="Master tailor hand stitching garment in New York atelier"
                aspectRatio="landscape"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Atelier Badge */}
            <div className="absolute -bottom-6 right-6 sm:bottom-6 sm:-right-4 p-4 rounded-2xl bg-white/95 text-[#2B2621] border border-[#EAE2D5] shadow-warm-lg max-w-[220px] backdrop-blur-md">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A6A2B] font-bold">
                Bespoke Standard
              </p>
              <p className="font-serif text-sm text-[#2B2621] mt-1 leading-snug">
                "We do not cut corners. We cut individual paper patterns."
              </p>
            </div>
          </div>

          {/* RIGHT: Craft Story & 3 Brand Facts */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block">
              The Heritage Behind Every Stitch
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight leading-tight">
              Where South Asian Artistry Meets Fifth Avenue Precision
            </h2>

            <p className="text-sm sm:text-base text-[#7A6F63] leading-relaxed">
              Every Wear It Better garment is a quiet testament to slow luxury. Our kurtas and sherwanis are cut with generous ease and finished with traditional hand-embroidered metallic threads that trace natural neckline contours. 
            </p>

            <p className="text-sm sm:text-base text-[#7A6F63] leading-relaxed">
              Parallel to our sartorial atelier, our in-house perfumery formulates extraits in heavy glass flacons — unhurried compositions built around raw Cambodian agarwood, smoldering incense resins, and crisp Mediterranean vetiver.
            </p>

            {/* 3 Brand Facts with Gradient Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {brandFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="p-4 rounded-2xl bg-white border border-[#EAE2D5] shadow-warm-sm space-y-1"
                  >
                    <Icon className="w-4 h-4 text-[#8A6A2B] mb-2" />
                    <h3 className="font-serif text-2xl font-bold text-grad-heading">
                      {fact.stat}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8A6A2B]">
                      {fact.label}
                    </p>
                    <p className="text-[11px] text-[#7A6F63] pt-1 leading-snug">
                      {fact.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setIsFittingModalOpen(true)}
                className="py-3.5 px-7 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase shadow-warm-md inline-flex items-center gap-2 group"
              >
                <span>Book a private fitting</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
