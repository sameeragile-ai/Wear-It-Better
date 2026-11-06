import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomBar: React.FC<{ isScrolledPastHero: boolean }> = ({ isScrolledPastHero }) => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    isCartOpen,
    isWishlistOpen,
    isSearchOpen,
    isMobileMenuOpen,
    isCheckoutOpen,
    quickViewProduct,
  } = useStore();

  const isAnyOverlayOpen =
    isCartOpen || isWishlistOpen || isSearchOpen || isMobileMenuOpen || isCheckoutOpen || Boolean(quickViewProduct);

  const shouldShow = isScrolledPastHero && !isAnyOverlayOpen;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.nav
          key="mobile-bottom-bar"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          aria-label="Mobile quick actions"
          className="md:hidden fixed bottom-3 left-4 right-4 z-40 h-14 rounded-full bg-white/85 backdrop-blur-xl border border-[#EAE2D5] text-[#2B2621] shadow-warm-lg flex items-center justify-around px-2 pb-safe"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(251,248,243,0.8))',
          }}
        >
          {/* Home */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center justify-center w-12 h-full text-[#7A6F63] hover:text-[#8A6A2B] transition-colors"
          >
            <Home className="w-4 h-4 text-[#8A6A2B]" />
            <span className="text-[9px] mt-0.5 tracking-wider uppercase font-semibold">Home</span>
          </button>

          {/* Shop */}
          <button
            type="button"
            onClick={() => scrollToSection('shop-menswear')}
            className="flex flex-col items-center justify-center w-12 h-full text-[#7A6F63] hover:text-[#8A6A2B] transition-colors"
          >
            <Compass className="w-4 h-4 text-[#8A6A2B]" />
            <span className="text-[9px] mt-0.5 tracking-wider uppercase font-semibold">Shop</span>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="relative flex flex-col items-center justify-center w-12 h-full text-[#7A6F63] hover:text-[#8A6A2B] transition-colors"
          >
            <div className="relative">
              <Heart className="w-4 h-4 text-[#C99283]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-grad-rose-gold text-white text-[8px] font-bold flex items-center justify-center shadow-warm-sm">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-[9px] mt-0.5 tracking-wider uppercase font-semibold">Wishlist</span>
          </button>

          {/* Bag */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center justify-center w-12 h-full text-[#7A6F63] hover:text-[#8A6A2B] transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#B08A3E]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-grad-gold text-[#2B2621] text-[8px] font-bold flex items-center justify-center shadow-warm-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[9px] mt-0.5 tracking-wider uppercase font-semibold">Bag</span>
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
