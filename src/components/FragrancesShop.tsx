import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { FragranceCategory } from '../types';

export const FragrancesShop: React.FC = () => {
  const { fragranceFilter, setFragranceFilter, addToCart, formatPrice } = useStore();

  const tabs: { label: string; key: FragranceCategory }[] = [
    { label: 'All Fragrances', key: 'all' },
    { label: 'For Him', key: 'him' },
    { label: 'For Her', key: 'her' },
    { label: 'Unisex Extraits', key: 'unisex' },
  ];

  const discoverySet = PRODUCTS.find((p) => p.id === 'wib-frag-discovery') || PRODUCTS[PRODUCTS.length - 1];

  const filteredFragrances = PRODUCTS.filter((p) => {
    if (p.department !== 'fragrance') return false;
    if (p.id === 'wib-frag-discovery') return false;
    if (fragranceFilter === 'all') return true;
    return p.categoryKey === fragranceFilter;
  });

  const handleAddDiscoverySet = () => {
    addToCart(discoverySet, '5 × 10ml Set', 1);
  };

  return (
    <section
      id="fragrances"
      aria-label="Studio Fragrances"
      className="py-20 lg:py-28 bg-grad-cool text-[#2B2621] relative overflow-hidden border-t border-[#EAE2D5]"
    >
      {/* Decorative Soft Gradient Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#E9D7AE]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#F4E1DA]/35 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
            Haute Parfumerie
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
            Studio Fragrances
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7A6F63]">
            Formulated at high Extrait de Parfum concentration (24–30%). Rare aged Cambodian agarwood, golden neroli, and smoked amber hand-bottled in minimalist heavy glass.
          </p>
        </div>

        {/* Filter Tabs with Sliding Gold Gradient Indicator */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-4 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="p-1.5 rounded-full bg-white/80 border border-[#EAE2D5] flex items-center gap-1 shrink-0 shadow-warm-sm">
            {tabs.map((tab) => {
              const isActive = fragranceFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFragranceFilter(tab.key)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap z-10 ${
                    isActive ? 'text-[#2B2621]' : 'text-[#7A6F63] hover:text-[#2B2621]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeFragranceTab"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-grad-gold shadow-warm-sm z-[-1]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discovery Set Promo Banner on --grad-champagne-panel */}
        <div className="mb-14 rounded-3xl bg-grad-champagne border border-[#EAE2D5] p-6 sm:p-8 lg:p-10 shadow-warm-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/40 blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#EAE2D5] text-[#8A6A2B] text-xs font-bold tracking-widest uppercase shadow-warm-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#B08A3E]" />
                <span>The Complete Portfolio Trial</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2B2621] font-medium tracking-tight">
                The Artisanal Discovery Set
              </h3>

              <p className="text-sm text-[#7A6F63] leading-relaxed max-w-2xl">
                Experience all five signature extraits in 10ml travel atomizers — Studio Blanc, Dark Elixir, Mystique Rose, Spiced Rage, and Black Phantom Oud. Includes a <strong className="text-[#8A6A2B] font-bold">$50 voucher</strong> redeemable against any full-size bottle within 6 months.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#2B2621]/80 pt-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#8A6A2B]" /> 5 × 10ml Extrait Flacons
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#8A6A2B]" /> $50 Voucher Enclosed
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#8A6A2B]" /> Luxury Embossed Case
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7A6F63] font-semibold block">Investment</span>
                <span className="text-3xl sm:text-4xl font-serif text-[#8A6A2B] font-bold tabular-nums">
                  {formatPrice(discoverySet.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddDiscoverySet}
                className="w-full sm:w-auto lg:w-full py-3.5 px-6 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Discovery Set to Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fragrance Cards Grid: 2 cols mobile, 2 tablet, 3 desktop */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFragrances.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
