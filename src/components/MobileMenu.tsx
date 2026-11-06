import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Youtube } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';
import { CurrencySelect } from './CurrencySelect';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setMenswearFilter,
    setFragranceFilter,
    menswearFilter,
    fragranceFilter,
    setIsSignInOpen,
    setIsFittingModalOpen,
  } = useStore();

  useLockBody(isMobileMenuOpen);

  const navLinks = [
    { num: '01', label: 'Menswear', id: 'shop-menswear' },
    { num: '02', label: 'Studio Fragrances', id: 'fragrances' },
    { num: '03', label: 'Atelier & Craft', id: 'atelier' },
    { num: '04', label: 'Bespoke Process', id: 'bespoke' },
    { num: '05', label: 'Client Reviews', id: 'testimonials' },
    { num: '06', label: 'Contact & Boutique', id: 'contact' },
  ];

  const categoryChips = [
    { label: 'Kurtas', type: 'menswear', filter: 'kurtas', target: 'shop-menswear' },
    { label: 'Waistcoats', type: 'menswear', filter: 'kurtas', target: 'shop-menswear' },
    { label: 'Suits', type: 'menswear', filter: 'suits', target: 'shop-menswear' },
    { label: 'Kameez Shalwar', type: 'menswear', filter: 'kameez', target: 'shop-menswear' },
    { label: 'For Him', type: 'fragrance', filter: 'him', target: 'fragrances' },
    { label: 'For Her', type: 'fragrance', filter: 'her', target: 'fragrances' },
    { label: 'Unisex', type: 'fragrance', filter: 'unisex', target: 'fragrances' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleChipClick = (chip: typeof categoryChips[0]) => {
    if (chip.type === 'menswear') {
      setMenswearFilter(chip.filter as any);
    } else {
      setFragranceFilter(chip.filter as any);
    }
    handleLinkClick(chip.target);
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 36px) 36px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[95] bg-[#FBF8F3] text-[#2B2621] flex flex-col justify-between overflow-y-auto px-6 py-6 pb-safe"
          style={{ background: 'var(--grad-hero)' }}
        >
          {/* Drifting Gold, Rose and Mist Blobs */}
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#F4E1DA]/60 blur-3xl pointer-events-none animate-drift-slow" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#E9D7AE]/50 blur-3xl pointer-events-none animate-drift-slow" />
          <div className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full bg-[#E6ECEA]/60 blur-3xl pointer-events-none animate-drift-slow" />

          {/* Paper Grain Overlay */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.035]" aria-hidden="true">
            <filter id="mobileNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#mobileNoise)" />
          </svg>

          {/* Top Bar inside Menu */}
          <div className="relative z-10 flex items-center justify-between pb-5 border-b border-[#EAE2D5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-[#B08A3E]/60 flex items-center justify-center bg-white shadow-warm-sm">
                <span className="font-serif text-[#8A6A2B] font-bold text-base">W</span>
              </div>
              <span className="font-serif text-lg tracking-widest uppercase font-medium text-grad-heading">
                Wear It Better
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2.5 rounded-full border border-[#EAE2D5] bg-white text-[#2B2621] hover:bg-[#E9D7AE]/30 focus:outline-none focus:ring-2 focus:ring-[#8A6A2B] shadow-warm-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Links */}
          <div className="relative z-10 my-auto py-8 space-y-4">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.45, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  onClick={() => handleLinkClick(item.id)}
                  className="w-full flex items-baseline gap-3 text-left group p-1"
                >
                  <span className="text-xs font-mono text-[#8A6A2B] font-semibold tracking-wider">
                    {item.num}
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl text-[#2B2621] group-hover:text-[#8A6A2B] transition-colors leading-tight font-medium">
                    {item.label}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="relative z-10 space-y-4 pt-5 border-t border-[#EAE2D5]">
            {/* Horizontal Swipeable Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categoryChips.map((chip) => {
                const isActive =
                  (chip.type === 'menswear' && menswearFilter === chip.filter) ||
                  (chip.type === 'fragrance' && fragranceFilter === chip.filter);

                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all shrink-0 font-medium border ${
                      isActive
                        ? 'bg-grad-gold text-[#2B2621] border-[#B08A3E] font-bold shadow-warm-sm'
                        : 'bg-white/80 hover:bg-[#E9D7AE]/30 text-[#2B2621] border-[#EAE2D5]'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Actions: Currency + Sign in */}
            <div className="flex items-center justify-between pt-1">
              <CurrencySelect />
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSignInOpen(true);
                }}
                className="text-xs text-[#2B2621]/80 hover:text-[#8A6A2B] transition-colors font-semibold tracking-wide underline underline-offset-4"
              >
                Client Sign In
              </button>
            </div>

            {/* Book a Fitting CTA */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsFittingModalOpen(true);
              }}
              className="w-full py-3.5 px-6 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase shadow-warm-md text-center"
            >
              Book a Fitting Consultation
            </button>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-6 pt-2 text-[#7A6F63]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-white/70 border border-[#EAE2D5] hover:text-[#8A6A2B] hover:border-[#B08A3E] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-white/70 border border-[#EAE2D5] hover:text-[#8A6A2B] hover:border-[#B08A3E] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2 rounded-full bg-white/70 border border-[#EAE2D5] hover:text-[#8A6A2B] hover:border-[#B08A3E] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
