import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLockBody } from '../hooks/useLockBody';
import { SmartImage } from './SmartImage';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const product = quickViewProduct;
  useLockBody(Boolean(product));

  useEffect(() => {
    if (product) {
      if (product.department === 'fragrance') {
        setSelectedSize(product.sizes[0] || '50ml');
      } else {
        setSelectedSize(product.sizes[1] || product.sizes[0] || 'M');
      }
      setQuantity(1);
      setSizeError(false);
      setAddedAnimation(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, setQuickViewProduct]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  let effectiveUnitPrice = product.price;
  if (product.department === 'fragrance' && selectedSize.includes('100ml')) {
    effectiveUnitPrice = product.price + 60;
  }

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#2B2621]/40 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0"
          onClick={() => setQuickViewProduct(null)}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-[#EAE2D5] rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(138,106,43,0.18),0_10px_30px_rgba(43,38,33,0.08)] overflow-hidden text-[#2B2621] flex flex-col md:flex-row max-h-[90vh] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Drag Indicator Bar */}
          <div className="sm:hidden pt-3 pb-1 flex justify-center bg-[#FBF8F3]">
            <div className="w-12 h-1 bg-[#EAE2D5] rounded-full" />
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close product preview"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FBF8F3]/90 hover:bg-[#F3EDE3] text-[#2B2621] transition-colors border border-[#EAE2D5] shadow-warm-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Product Imagery */}
          <div className="md:w-1/2 relative bg-gradient-to-br from-[#FBF8F3] via-[#F3EDE3] to-[#EAE2D5]/30 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#EAE2D5]">
            <div className="w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden aspect-[3/4] shadow-warm-md border border-[#EAE2D5] bg-white">
              <SmartImage
                src={product.image}
                alt={product.name}
                aspectRatio="portrait"
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span className="absolute top-6 left-6 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/95 text-[#8A6A2B] border border-[#EAE2D5] shadow-warm-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#7A6F63]">
                <span className="uppercase tracking-widest text-[#8A6A2B] font-semibold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#8A6A2B] fill-current" />
                  <span className="font-semibold text-[#2B2621]">{product.rating}</span>
                  <span className="text-[#7A6F63]">({product.reviewCount} client reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2621] font-medium leading-tight">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-serif text-[#8A6A2B] font-semibold tabular-nums">
                    {formatPrice(effectiveUnitPrice)}
                  </span>
                  {product.sizes.length > 1 && product.department === 'fragrance' && (
                    <span className="text-xs text-[#7A6F63]">({selectedSize})</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#7A6F63] leading-relaxed">
                {product.description}
              </p>

              {/* Notes or Tailoring Specifications */}
              {product.notes && product.notes.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#7A6F63] block mb-2">
                    {product.department === 'fragrance' ? 'Key Scent Notes' : 'Tailoring & Construction'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-[#FBF8F3] text-[#2B2621] border border-[#EAE2D5]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#2B2621]">
                    {product.department === 'fragrance' ? 'Bottle Volume' : 'Size Selection'} *
                  </span>
                  {sizeError && (
                    <span className="text-xs text-rose-500 font-medium">Please select a size</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                        selectedSize === size
                          ? 'btn-grad-gold text-[#2B2621] border-transparent shadow-warm-sm'
                          : 'bg-[#FBF8F3] text-[#2B2621] border-[#EAE2D5] hover:bg-[#F3EDE3]'
                      }`}
                    >
                      {size}
                      {product.department === 'fragrance' && size === '100ml' && ' (+$60)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="pt-2 flex items-center gap-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#2B2621]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#EAE2D5] rounded-xl bg-[#FBF8F3] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 rounded-lg hover:bg-[#F3EDE3] text-[#2B2621] disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-mono font-semibold tabular-nums text-[#2B2621]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1.5 rounded-lg hover:bg-[#F3EDE3] text-[#2B2621] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-[#EAE2D5] flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-full btn-grad-gold text-[#2B2621] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-warm-md hover:opacity-95 transition-all"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — {formatPrice(effectiveUnitPrice * quantity)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label="Save to wishlist"
                className={`p-3.5 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-[#8A6A2B] text-white border-[#8A6A2B] shadow-warm-sm'
                    : 'border-[#EAE2D5] bg-[#FBF8F3] text-[#2B2621] hover:bg-[#F3EDE3]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
