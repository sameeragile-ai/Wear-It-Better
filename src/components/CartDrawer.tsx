import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';
import { SmartImage } from './SmartImage';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    shippingCost,
    cartTotal,
    amountToFreeShipping,
    freeShippingProgress,
    formatPrice,
    setIsCheckoutOpen,
  } = useStore();

  const [confirmClear, setConfirmClear] = useState(false);
  useLockBody(isCartOpen);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end bg-[#2B2621]/40 backdrop-blur-sm">
        {/* Backdrop click */}
        <div
          className="absolute inset-0"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />

        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          aria-label="Shopping bag drawer"
          className="relative w-full max-w-md bg-white text-[#2B2621] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE2D5] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE2D5] bg-[#FBF8F3]/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8A6A2B]" />
              <h2 className="font-serif text-xl sm:text-2xl text-[#2B2621] font-medium tracking-tight">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag"
              className="p-2 rounded-full border border-[#EAE2D5] text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#F3EDE3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 sm:px-6 py-3.5 bg-[#F3EDE3]/60 border-b border-[#EAE2D5]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-[#2B2621]">
                <Truck className="w-3.5 h-3.5 text-[#8A6A2B]" />
                {amountToFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#8A6A2B]">{formatPrice(amountToFreeShipping)}</strong> for free express shipping
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Complimentary Express Shipping Unlocked!
                  </span>
                )}
              </span>
              <span className="text-[11px] text-[#7A6F63]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#EAE2D5] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8A6A2B] via-[#B8964E] to-[#DCC08A] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-[#EAE2D5]/70 bg-white">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EDE3] border border-[#EAE2D5] flex items-center justify-center text-[#8A6A2B]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#2B2621]">Your bag is empty</h3>
                <p className="text-xs sm:text-sm text-[#7A6F63] max-w-xs leading-relaxed">
                  Discover our handcrafted silk kurtas, structured wool tailoring, and rare extrait perfumes.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 py-3 px-6 rounded-full btn-grad-gold text-[#2B2621] text-xs font-semibold tracking-wider uppercase shadow-warm-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-[#EAE2D5] bg-[#FBF8F3]">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      aspectRatio="portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Controls */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#2B2621] leading-snug truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from bag`}
                          className="text-[#7A6F63]/60 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#8A6A2B] mt-0.5 font-medium">
                        Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#EAE2D5] rounded-lg bg-[#FBF8F3]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#F3EDE3] text-[#2B2621] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold tabular-nums text-[#2B2621]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#F3EDE3] text-[#2B2621] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total line price */}
                      <span className="text-sm font-semibold text-[#8A6A2B] tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#EAE2D5] bg-[#FBF8F3] space-y-3.5">
              {/* Clear Bag option */}
              <div className="flex items-center justify-between text-xs text-[#7A6F63]">
                {confirmClear ? (
                  <div className="flex items-center gap-2 text-rose-600">
                    <span>Clear all items?</span>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setConfirmClear(false);
                      }}
                      className="font-semibold underline"
                    >
                      Yes, clear
                    </button>
                    <span>/</span>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="text-[#2B2621]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="hover:text-rose-600 transition-colors"
                  >
                    Clear shopping bag
                  </button>
                )}
                <span className="text-[#7A6F63]/80">Taxes calculated at checkout</span>
              </div>

              {/* Subtotal & Shipping */}
              <div className="space-y-1.5 text-xs text-[#7A6F63] pt-1">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#2B2621] text-sm tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Worldwide Express Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[11px]">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base sm:text-lg font-serif font-semibold text-[#2B2621] pt-2 border-t border-[#EAE2D5]">
                  <span>Total</span>
                  <span className="text-[#8A6A2B] font-mono tabular-nums">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-4 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-md hover:opacity-95 transition-opacity"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};
