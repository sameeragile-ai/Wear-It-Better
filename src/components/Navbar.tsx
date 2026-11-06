import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Sparkles, User } from 'lucide-react';
import { useScrollState } from '../hooks/useScrollState';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useStore } from '../context/StoreContext';
import { NavLinks } from './NavLinks';
import { CartButton } from './CartButton';
import { CurrencySelect } from './CurrencySelect';

export const Navbar: React.FC = () => {
  const { isScrolled, progress } = useScrollState();
  const activeSection = useScrollSpy(['hero', 'shop-menswear', 'fragrances', 'atelier', 'bespoke', 'testimonials', 'contact']);

  const {
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
    setIsSignInOpen,
    setIsFittingModalOpen,
  } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFitting = () => {
    setIsFittingModalOpen(true);
  };

  return (
    <>
      {/* Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 z-[100] px-4 py-2 bg-grad-gold text-[#2B2621] font-bold text-xs rounded-full shadow-warm-md"
      >
        Skip to content
      </a>

      {/* Main Navigation Header */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300"
      >
        <motion.div
          animate={{
            maxWidth: isScrolled ? '1180px' : '100%',
            width: isScrolled ? 'calc(100% - 24px)' : '100%',
            marginTop: isScrolled ? 12 : 0,
            borderRadius: isScrolled ? 9999 : 0,
            height: isScrolled ? 64 : 88,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          style={{
            backdropFilter: isScrolled ? 'blur(18px) saturate(160%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(18px) saturate(160%)' : 'none',
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(255,255,255,0.78), rgba(251,248,243,0.65))'
              : 'transparent',
          }}
          className={`pointer-events-auto relative w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 text-[#2B2621] transition-colors duration-300 overflow-hidden ${
            isScrolled
              ? 'shadow-[0_10px_40px_-12px_rgba(120,90,40,0.22),0_2px_8px_rgba(43,38,33,0.06)] border border-[#EAE2D5]'
              : 'border-b border-transparent'
          }`}
        >
          {/* Animated Gradient Border Loop on Scrolled Pill */}
          {isScrolled && (
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none p-[1px] overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute -inset-[100%] animate-spin-slow opacity-40"
                style={{
                  background:
                    'conic-gradient(from 0deg, #B08A3E, #E9D7AE, #C99283, #B08A3E)',
                }}
              />
              <div className="w-full h-full rounded-[inherit] bg-white/70 backdrop-blur-md" />
            </div>
          )}

          {/* LEFT ZONE: Logo & Monogram */}
          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Wear It Better — Home"
              className="group flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B] rounded-full p-1"
            >
              {/* Monogram circle with soft gold-to-rose pulsing glow */}
              <div className="relative w-10 h-10 rounded-full border border-[#B08A3E]/60 flex items-center justify-center bg-white shadow-warm-sm group-hover:border-[#8A6A2B] transition-colors">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B08A3E]/20 to-[#C99283]/20 animate-pulse-soft pointer-events-none"
                  aria-hidden="true"
                />
                <motion.span
                  whileHover={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="font-serif text-[#8A6A2B] text-lg font-bold tracking-wider inline-block select-none"
                >
                  W
                </motion.span>
              </div>

              {/* Wordmark: Gracefully stays minimal when scrolled */}
              <motion.div
                animate={{
                  opacity: isScrolled ? (window.innerWidth < 1024 ? 0 : 0.85) : 1,
                  display: isScrolled && window.innerWidth < 1024 ? 'none' : 'block',
                }}
                className="hidden sm:block leading-tight"
              >
                <span className="font-serif text-lg tracking-[0.18em] uppercase font-semibold text-grad-heading block">
                  Wear It Better
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#8A6A2B] block font-medium">
                  New York · Atelier
                </span>
              </motion.div>
            </button>
          </div>

          {/* CENTRE ZONE: NavLinks (Desktop) */}
          <div className="relative z-10 hidden lg:flex items-center justify-center">
            <NavLinks activeSection={activeSection} />
          </div>

          {/* RIGHT ZONE: Controls, Cart, CTA & Mobile Hamburger */}
          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Currency Selector (Desktop / Tablet) */}
            <div className="hidden sm:block">
              <CurrencySelect />
            </div>

            {/* Command Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search command palette"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all duration-200 border border-[#EAE2D5] bg-white/70 hover:bg-[#E9D7AE]/30 text-[#2B2621] shadow-warm-sm"
            >
              <Search className="w-4 h-4 text-[#8A6A2B]" />
              <span className="hidden xl:inline tracking-wider font-medium">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] text-[#7A6F63] px-1.5 py-0.5 rounded bg-[#F3EDE3] border border-[#EAE2D5]">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Button with --grad-rose-gold badge */}
            <button
              type="button"
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Wishlist with ${wishlist.length} items`}
              className="relative p-2 rounded-full transition-all duration-200 border border-[#EAE2D5] bg-white/70 hover:bg-[#E9D7AE]/30 text-[#2B2621] shadow-warm-sm hidden sm:flex items-center justify-center"
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

            {/* Sign In text link / Account icon */}
            <button
              type="button"
              onClick={() => setIsSignInOpen(true)}
              className="hidden lg:inline-flex items-center text-xs font-semibold tracking-wider uppercase px-2 py-1 text-[#2B2621]/80 hover:text-[#8A6A2B] transition-colors relative group whitespace-nowrap"
            >
              <span className="hidden xl:inline">Sign In</span>
              <User className="xl:hidden w-4 h-4 text-[#7A6F63]" />
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#8A6A2B] transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Book a Fitting Pill */}
            <button
              type="button"
              onClick={handleBookFitting}
              className="relative overflow-hidden group py-2 px-3.5 sm:px-4 rounded-full btn-grad-gold text-[#2B2621] text-xs font-bold tracking-wider uppercase shadow-warm-sm hidden md:flex items-center gap-1.5 shrink-0"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 animate-shine pointer-events-none" />
              <Sparkles className="w-3.5 h-3.5 text-[#2B2621] shrink-0" />
              <span className="whitespace-nowrap hidden lg:inline">Book a Fitting</span>
              <span className="whitespace-nowrap lg:hidden">Fitting</span>
            </button>

            {/* HAMBURGER for Mobile & Tablet (<1024px) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-2 rounded-full transition-colors flex flex-col justify-center items-center gap-1.5 w-10 h-10 border border-[#EAE2D5] bg-white/80 text-[#2B2621] shadow-warm-sm"
            >
              <span
                className={`w-5 h-[1.5px] bg-[#2B2621] transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-[#2B2621] transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>

          {/* 2px Gold Progress Bar along bottom edge */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#EAE2D5]/50 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleX: progress, transformOrigin: '0%' }}
              className="h-full w-full bg-grad-gold"
            />
          </div>
        </motion.div>
      </motion.header>
    </>
  );
};
