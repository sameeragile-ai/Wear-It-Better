import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const CartButton: React.FC = () => {
  const { cart, cartCount, cartSubtotal, cartBump, setIsCartOpen, formatPrice } = useStore();
  const [showPreview, setShowPreview] = useState(false);

  const previewItems = cart.slice(-3).reverse();

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Shopping bag with ${cartCount} items`}
        className="relative p-2 rounded-full transition-all duration-200 border border-[#EAE2D5] bg-white/70 hover:bg-[#E9D7AE]/30 text-[#2B2621] shadow-warm-sm flex items-center justify-center"
      >
        {/* Ripple ring on add */}
        <AnimatePresence>
          {cartBump && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#B08A3E] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Shake icon when bumped */}
        <motion.div
          animate={
            cartBump
              ? {
                  rotate: [0, -12, 12, -8, 8, 0],
                  transition: { duration: 0.45 },
                }
              : {}
          }
        >
          <ShoppingBag className="w-4 h-4 text-[#2B2621]" />
        </motion.div>

        {/* Gold Gradient Badge with Charcoal Number */}
        {cartCount > 0 && (
          <motion.span
            key={cartCount}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-grad-gold text-[#2B2621] text-[10px] font-bold flex items-center justify-center shadow-warm-sm"
          >
            {cartCount}
          </motion.span>
        )}
      </button>

      {/* Mini preview on desktop hover */}
      <AnimatePresence>
        {showPreview && cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="hidden lg:block absolute right-0 top-full mt-3 w-72 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-[#EAE2D5] text-[#2B2621] shadow-warm-xl z-50 pointer-events-auto"
          >
            {/* Invisible hover bridge */}
            <div className="absolute -top-4 left-0 right-0 h-4 pointer-events-auto" aria-hidden="true" />
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#EAE2D5]">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#8A6A2B]">
                Shopping Bag ({cartCount})
              </span>
              <span className="text-xs font-bold text-[#2B2621] tabular-nums">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              {previewItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-[#EAE2D5] bg-[#F3EDE3]">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      aspectRatio="square"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-xs font-semibold text-[#2B2621] truncate">{item.name}</h5>
                    <p className="text-[10px] text-[#7A6F63] truncate">
                      {item.size} × {item.quantity} · {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-[10px] text-center text-[#7A6F63] pt-1">
                  +{cart.length - 3} more items in bag
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPreview(false);
                setIsCartOpen(true);
              }}
              className="w-full py-2 px-3 rounded-full btn-grad-gold text-[#2B2621] text-xs font-bold flex items-center justify-center gap-1.5 shadow-warm-sm"
            >
              <span>View Bag & Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
