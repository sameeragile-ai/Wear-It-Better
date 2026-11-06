import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../constants';
import { SmartImage } from './SmartImage';
import { MenswearCategory } from '../types';

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const { setMenswearFilter, setQuickViewProduct, formatPrice } = useStore();

  const featuredProduct = PRODUCTS.find((p) => p.id === 'wib-mens-01') || PRODUCTS[0];

  const categories: {
    name: string;
    key: MenswearCategory;
    count: number;
    image: string;
    subtitle: string;
  }[] = [
    {
      name: 'Kurtas & Waistcoats',
      key: 'kurtas',
      count: 3,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80&auto=format',
      subtitle: 'Pure mulberry silk & embroidered brocade',
    },
    {
      name: 'Suits & Jackets',
      key: 'suits',
      count: 3,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80&auto=format',
      subtitle: 'Italian virgin wool & soft tan lambskin',
    },
    {
      name: 'Kameez Shalwar',
      key: 'kameez',
      count: 2,
      image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=900&q=80&auto=format',
      subtitle: 'Egyptian Giza cotton & French sage linen',
    },
  ];

  const handleCategorySelect = (key: MenswearCategory) => {
    setMenswearFilter(key);
    onClose();
    const el = document.getElementById('shop-menswear');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    setQuickViewProduct(featuredProduct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[760px] p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#EAE2D5] text-[#2B2621] shadow-warm-xl z-50 pointer-events-auto"
      style={{
        boxShadow: '0 20px 50px -15px rgba(120,90,40,0.22), 0 2px 10px rgba(43,38,33,0.04)',
      }}
    >
      {/* Invisible hover bridge to maintain hover state across the top gap */}
      <div className="absolute -top-4 left-0 right-0 h-4 pointer-events-auto" aria-hidden="true" />
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: 3 Category Cards */}
        <div className="col-span-7 flex flex-col justify-between pr-4 border-r border-[#EAE2D5]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8A6A2B]">
                Menswear Collections
              </span>
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className="text-xs text-[#7A6F63] hover:text-[#8A6A2B] font-semibold flex items-center gap-1 transition-colors"
              >
                <span>View all menswear</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleCategorySelect(cat.key)}
                  className="w-full group flex items-center gap-3.5 p-2.5 rounded-2xl bg-[#FBF8F3] hover:bg-[#E9D7AE]/30 border border-[#EAE2D5]/70 hover:border-[#B08A3E]/40 transition-all text-left shadow-warm-sm"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#EAE2D5]">
                    <SmartImage
                      src={cat.image}
                      alt={cat.name}
                      aspectRatio="square"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base text-[#2B2621] group-hover:text-[#8A6A2B] font-medium transition-colors truncate">
                        {cat.name}
                      </h4>
                      <span className="text-[11px] text-[#7A6F63] font-medium">{cat.count} styles</span>
                    </div>
                    <p className="text-[11px] text-[#7A6F63] truncate mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Featured Product Card on --grad-champagne-panel */}
        <div className="col-span-5 flex flex-col justify-between p-4 rounded-2xl bg-grad-champagne border border-[#EAE2D5]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8A6A2B]">
                Featured Creation
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8A6A2B] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#B08A3E]/30">
                New Arrival
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-[#EAE2D5] group bg-white shadow-warm-sm">
              <SmartImage
                src={featuredProduct.image}
                alt={featuredProduct.name}
                aspectRatio="portrait"
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-white/95">
                <h4 className="font-serif text-sm font-semibold text-[#2B2621] truncate">
                  {featuredProduct.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-[#8A6A2B] tabular-nums">
                    {formatPrice(featuredProduct.price)}
                  </span>
                  <span className="text-[11px] text-[#7A6F63]">Mulberry Silk</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickView}
            className="mt-3.5 w-full py-2.5 px-4 rounded-full btn-grad-gold text-[#2B2621] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-warm-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#2B2621]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
