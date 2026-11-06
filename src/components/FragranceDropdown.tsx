import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Heart, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FragranceCategory } from '../types';

interface FragranceDropdownProps {
  onClose: () => void;
}

export const FragranceDropdown: React.FC<FragranceDropdownProps> = ({ onClose }) => {
  const { setFragranceFilter, formatPrice } = useStore();

  const options: {
    label: string;
    key: FragranceCategory;
    fromPrice: number;
    description: string;
    icon: React.ElementType;
    iconColor: string;
  }[] = [
    {
      label: 'For Him',
      key: 'him',
      fromPrice: 145,
      description: 'Crisp cedar, smoked vetiver & cardamom',
      icon: Flame,
      iconColor: 'from-[#B08A3E] to-[#D4B06A]',
    },
    {
      label: 'For Her',
      key: 'her',
      fromPrice: 155,
      description: 'Bulgarian rose, saffron & golden neroli',
      icon: Heart,
      iconColor: 'from-[#C99283] to-[#E4B9A8]',
    },
    {
      label: 'Unisex Extraits',
      key: 'unisex',
      fromPrice: 170,
      description: 'Rare Cambodian oud, smoked leather & resins',
      icon: Sparkles,
      iconColor: 'from-[#B08A3E] to-[#C99283]',
    },
    {
      label: 'The Discovery Set',
      key: 'all',
      fromPrice: 65,
      description: 'Five 10ml flacons + $50 full-bottle voucher',
      icon: Compass,
      iconColor: 'from-[#8A6A2B] to-[#E9D7AE]',
    },
  ];

  const handleSelect = (key: FragranceCategory) => {
    setFragranceFilter(key);
    onClose();
    const el = document.getElementById('fragrances');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] p-3 rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#EAE2D5] text-[#2B2621] shadow-warm-xl z-50 pointer-events-auto"
    >
      <div className="px-3 py-2 border-b border-[#EAE2D5] mb-1 flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8A6A2B]">
          Artisanal Parfums
        </span>
        <span className="text-[10px] text-[#7A6F63] font-medium">24–30% Extrait Concentration</span>
      </div>

      <div className="space-y-1">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => handleSelect(opt.key)}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#E9D7AE]/25 border border-transparent hover:border-[#EAE2D5] transition-all text-left group"
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${opt.iconColor} flex items-center justify-center shrink-0 shadow-warm-sm text-white`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm text-[#2B2621] group-hover:text-[#8A6A2B] font-medium transition-colors truncate">
                    {opt.label}
                  </h4>
                  <span className="text-xs font-bold text-[#8A6A2B] tabular-nums">
                    from {formatPrice(opt.fromPrice)}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6F63] truncate mt-0.5">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
