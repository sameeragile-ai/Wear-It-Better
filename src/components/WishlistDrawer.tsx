import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';
import { PRODUCTS } from '../constants';
import { SmartImage } from './SmartImage';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    moveToBagFromWishlist,
    formatPrice,
    setQuickViewProduct,
  } = useStore();

  useLockBody(isWishlistOpen);

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: typeof PRODUCTS[0]) => {
    // If product has multiple sizes, open Quick View so the user selects their size
    if (product.sizes.length > 1 && product.department === 'menswear') {
      setIsWishlistOpen(false);
      setQuickViewProduct(product);
    } else {
      moveToBagFromWishlist(product, product.sizes[0] || '50ml');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end bg-[#2B2621]/40 backdrop-blur-sm">
        <div
          className="absolute inset-0"
          onClick={() => setIsWishlistOpen(false)}
          aria-hidden="true"
        />

        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          aria-label="Wishlist drawer"
          className="relative w-full max-w-md bg-white text-[#2B2621] h-full shadow-2xl flex flex-col justify-between border-l border-[#EAE2D5] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE2D5] bg-[#FBF8F3]/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#8A6A2B] fill-current" />
              <h2 className="font-serif text-xl sm:text-2xl text-[#2B2621] font-medium tracking-tight">
                Saved Creations ({wishlist.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-2 rounded-full border border-[#EAE2D5] text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#F3EDE3] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-[#EAE2D5]/70 bg-white">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F3EDE3] border border-[#EAE2D5] flex items-center justify-center text-[#8A6A2B]">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#2B2621]">No saved items yet</h3>
                <p className="text-xs sm:text-sm text-[#7A6F63] max-w-xs leading-relaxed">
                  Click the heart icon on any garment or perfume to curate your personal wishlist.
                </p>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 py-3 px-6 rounded-full btn-grad-gold text-[#2B2621] text-xs font-semibold tracking-wider uppercase shadow-warm-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-[#EAE2D5] bg-[#FBF8F3]">
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      aspectRatio="portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base text-[#2B2621] leading-snug truncate">
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="text-[#7A6F63]/60 hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#7A6F63] truncate mt-0.5">
                        {product.category}
                      </p>
                      <p className="text-sm font-semibold text-[#8A6A2B] tabular-nums mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleMoveToBag(product)}
                        className="w-full py-2 px-3 rounded-xl bg-[#FBF8F3] hover:bg-[#F3EDE3] text-[#2B2621] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-[#EAE2D5]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#EAE2D5] bg-[#FBF8F3]">
              <p className="text-xs text-[#7A6F63] text-center">
                Items in your wishlist remain saved across your visits.
              </p>
            </div>
          )}
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};
