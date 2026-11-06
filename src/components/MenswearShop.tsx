import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';
import { MenswearCategory } from '../types';

export const MenswearShop: React.FC = () => {
  const { menswearFilter, setMenswearFilter } = useStore();

  const tabs: { label: string; key: MenswearCategory }[] = [
    { label: 'All Menswear', key: 'all' },
    { label: 'Kurtas & Waistcoats', key: 'kurtas' },
    { label: 'Suits & Jackets', key: 'suits' },
    { label: 'Kameez Shalwar', key: 'kameez' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (p.department !== 'menswear') return false;
    if (menswearFilter === 'all') return true;
    return p.categoryKey === menswearFilter;
  });

  return (
    <section
      id="shop-menswear"
      aria-label="Luxury Menswear Collection"
      className="py-20 lg:py-28 bg-grad-warm text-[#2B2621] border-t border-[#EAE2D5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
            The Atelier Wardrobe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
            Luxury Menswear
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#7A6F63]">
            Hand-cut silhouettes combining pure mulberry silks, hand-worked zardozi embroidery, and fine Italian virgin wools in soft natural neutrals.
          </p>
        </div>

        {/* Filter Tabs with Sliding Gold Gradient Indicator */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-4 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="p-1.5 rounded-full bg-white/80 border border-[#EAE2D5] flex items-center gap-1 shrink-0 shadow-warm-sm">
            {tabs.map((tab) => {
              const isActive = menswearFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setMenswearFilter(tab.key)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap z-10 ${
                    isActive ? 'text-[#2B2621]' : 'text-[#7A6F63] hover:text-[#2B2621]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeMenswearTab"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-grad-gold shadow-warm-sm z-[-1]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid: 2 cols mobile, 3 tablet, 4 desktop */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
