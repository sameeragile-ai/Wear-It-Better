import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, Heart, Sparkles, User } from 'lucide-react';
import { useScrollState } from '../hooks/useScrollState';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useStore } from '../context/StoreContext';
import { NavLinks } from './NavLinks';
import { CartButton } from './CartButton';
import { CurrencySelect } from './CurrencySelect';

export const Navbar: React.FC = () => {
  const { isScrolled } = useScrollState();
  const activeSection = useScrollSpy(['hero', 'shop-menswear', 'fragrances', 'atelier', 'bespoke', 'testimonials', 'contact']);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');

  const {
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
    setIsSignInOpen,
    setIsFittingModalOpen,
    isAnnouncementVisible,
  } = useStore();

  // Ultra-efficient GPU-driven progress bar via Framer Motion without React re-render churn
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFitting = () => {
    setIsFittingModalOpen(true);
  };

  // When at top of page and announcement bar is visible, navbar sits immediately below it (36px).
  // Once scrolled past 24px or announcement is dismissed, it pins to top: 0.
  const topPosition = !isScrolled && isAnnouncementVisible ? 36 : 0;

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 z-[100] px-4 py-2 bg-grad-gold text-[#2B2621] font-bold text-xs rounded-full shadow-warm-md"
      >
        Skip to content
      </a>

      {/* Main Navigation Header */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ top: `${topPosition}px` }}
        className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-[top] duration-300 ease-out"
      >
        <motion.div
          animate={{
            maxWidth: isScrolled ? (isMobile ? '100%' : '1180px') : '100%',
            width: isScrolled ? (isMobile ? 'calc(100% - 16px)' : 'calc(100% - 24px)') : '100%',
            marginTop: isScrolled ? (isMobile ? 8 : 12) : 0,
            borderRadius: isScrolled ? 9999 : 0,
            height: isScrolled ? (isMobile ? 58 : 64) : (isMobile ? 70 : 88),
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          style={{
            backdropFilter: isScrolled ? 'blur(18px) saturate(160%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(18px) saturate(160%)' : 'none',
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(251,248,243,0.78))'
              : 'linear-gradient(180deg, rgba(251,248,243,0.92) 0%, rgba(251,248,243,0.7) 60%, transparent 100%)',
          }}
          className={`pointer-events-auto relative w-full flex items-center justify-between px-3 sm:px-6 lg:px-8 text-[#2B2621] transition-shadow duration-300 overflow-hidden ${
            isScrolled
              ? 'shadow-[0_10px_40px_-10px_rgba(138,106,43,0.22),0_2px_10px_rgba(43,38,33,0.06)] border border-[#EAE2D5]'
              : 'border-b border-[#EAE2D5]/40'
          }`}
        >
          {/* Animated 1px Conic Gradient Border Loop on Scrolled Pill */}
          {isScrolled && (
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none p-[1px] overflow-hidden z-0"
              aria-hidden="true"
            >
              <div
                className="absolute -inset-[100%] animate-spin-slow opacity-40 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, #B08A3E, #E9D7AE, #C99283, #B08A3E)',
                }}
              />
              <div className="w-full h-full rounded-[inherit] bg-white/80" />
            </div>
          )}

          {/* LEFT ZONE: Monogram & Brand Logo */}
          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Wear It Better — Home"
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B] rounded-full p-1 -ml-1 transition-transform"
            >
              {/* Circular monogram badge with soft pulsing gold glow */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#B08A3E]/60 flex items-center justify-center bg-white shadow-warm-sm group-hover:border-[#8A6A2B] transition-colors shrink-0">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B08A3E]/20 to-[#C99283]/20 animate-pulse-soft pointer-events-none"
                  aria-hidden="true"
                />
                <motion.span
                  whileHover={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="font-serif text-[#8A6A2B] text-base sm:text-lg font-bold tracking-wider inline-block select-none"
                >
                  W
                </motion.span>
              </div>

              {/* Wordmark: Adapts cleanly across mobile, tablet & desktop */}
              <div className="hidden sm:block leading-tight">
                <span className="font-serif text-base sm:text-lg tracking-[0.16em] uppercase font-semibold text-grad-heading block truncate">
                  Wear It Better
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#8A6A2B] hidden lg:block font-medium">
                  New York · Atelier
                </span>
              </div>
            </button>
          </div>

          {/* CENTRE ZONE: Navigation Links (Desktop ≥1024px) */}
          <div className="relative z-10 hidden lg:flex items-center justify-center">
            <NavLinks activeSection={activeSection} />
          </div>

          {/* RIGHT ZONE: Controls, Cart, CTA & Mobile Hamburger */}
          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Currency Selector (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <CurrencySelect />
            </div>

            {/* Command Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search command palette"
              className="min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 p-2 sm:px-3 sm:py-1.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all duration-200 border border-[#EAE2D5] bg-white/80 hover:bg-[#E9D7AE]/30 text-[#2B2621] shadow-warm-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B]"
            >
              <Search className="w-4 h-4 text-[#8A6A2B]" />
              <span className="hidden xl:inline tracking-wider font-medium">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] text-[#7A6F63] px-1.5 py-0.5 rounded bg-[#F3EDE3] border border-[#EAE2D5]">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button (Tablet & Desktop) */}
            <button
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Wishlist with ${wishlist.length} items`}
              className="relative min-w-[40px] min-h-[40px] sm:min-w-0 sm:min-h-0 p-2 rounded-full transition-all duration-200 border border-[#EAE2D5] bg-white/80 hover:bg-[#E9D7AE]/30 text-[#2B2621] shadow-warm-sm hidden sm:flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B]"
            >
              <Heart className="w-4 h-4 text-[#C99283]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-grad-rose-gold text-white text-[9px] font-bold flex items-center justify-center shadow-warm-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <CartButton />

            {/* Sign In link (Desktop ≥1280px) */}
            <button
              type="button"
              onClick={() => setIsSignInOpen(true)}
              className="hidden xl:inline-flex items-center text-xs font-semibold tracking-wider uppercase px-2 py-1 text-[#2B2621]/80 hover:text-[#8A6A2B] transition-colors relative group whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6A2B] rounded"
            >
              <span>Sign In</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8A6A2B] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Book a Fitting Pill (Tablet & Desktop) */}
            <button
              type="button"
              onClick={handleBookFitting}
              className="relative overflow-hidden group py-2 px-3 sm:px-4 rounded-full btn-grad-gold text-[#2B2621] text-xs font-bold tracking-wider uppercase shadow-warm-sm hidden md:flex items-center gap-1.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B]"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-shine pointer-events-none" />
              <Sparkles className="w-3.5 h-3.5 text-[#2B2621] shrink-0" />
              <span className="whitespace-nowrap hidden lg:inline">Book a Fitting</span>
              <span className="whitespace-nowrap lg:hidden">Fitting</span>
            </button>

            {/* Animated 2-Line Hamburger (<1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden min-w-[40px] min-h-[40px] w-10 h-10 p-2 rounded-full transition-colors flex flex-col justify-center items-center gap-[6px] border border-[#EAE2D5] bg-white/90 text-[#2B2621] shadow-warm-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B] shrink-0"
            >
              <span
                className={`w-5 h-[1.5px] bg-[#2B2621] rounded-full transition-transform duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[3.75px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-[#2B2621] rounded-full transition-transform duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[3.75px]' : ''
                }`}
              />
            </button>
          </div>

          {/* 2px Gold Progress Bar along bottom edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAE2D5]/40 pointer-events-none overflow-hidden z-20"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleX, transformOrigin: '0%' }}
              className="h-full w-full bg-grad-gold"
            />
          </div>
        </motion.div>
      </motion.header>
    </>
  );
};
