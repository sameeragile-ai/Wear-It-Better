import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.department === 'menswear') {
      setQuickViewProduct(product);
    } else {
      addToCart(product, product.sizes[0] || '50ml', 1);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const displayImage = isHovered && product.secondaryImage ? product.secondaryImage : product.image;

  // Category badge colors
  const getBadgeStyle = () => {
    if (product.badge === 'Almost gone' || product.badge === 'Sale') {
      return 'bg-[#9C4A4F] text-white border-transparent';
    }
    if (product.categoryKey === 'her') {
      return 'bg-grad-rose-gold text-white border-transparent';
    }
    return 'bg-grad-gold text-[#2B2621] border-transparent';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between rounded-2xl p-3 sm:p-4 bg-grad-card border border-[#EAE2D5] hover:border-[#B08A3E]/60 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 text-[#2B2621]"
    >
      {/* Top: Image & Actions */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#F3EDE3]">
        <SmartImage
          src={displayImage}
          alt={product.name}
          aspectRatio="portrait"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-warm-sm z-10 ${getBadgeStyle()}`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist Button: fills with rose gold gradient when active */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 shadow-warm-sm border border-[#EAE2D5]/70 ${
            isWishlisted
              ? 'bg-grad-rose-gold text-white'
              : 'bg-white/80 hover:bg-white text-[#2B2621]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Desktop Quick Actions Slide-up on Hover */}
        <div className="hidden lg:flex absolute inset-x-2.5 bottom-2.5 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-10">
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 rounded-xl bg-white/95 hover:bg-white text-[#2B2621] text-xs font-bold border border-[#EAE2D5] hover:border-[#B08A3E] transition-all flex items-center justify-center gap-1.5 shadow-warm-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#8A6A2B]" />
            <span>Quick View</span>
          </button>
          <button
            type="button"
            onClick={handleAddClick}
            className="py-2 px-3 rounded-xl btn-grad-gold text-[#2B2621] text-xs font-bold transition-all flex items-center justify-center shadow-warm-sm"
            title="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="pt-3.5 pb-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 text-[#7A6F63]">
            <span className="uppercase tracking-wider font-semibold">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#B08A3E] fill-current" />
              <span className="font-bold text-[#2B2621]">{product.rating}</span>
              <span className="text-[#7A6F63]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={handleQuickView}
            className="font-serif text-base sm:text-lg font-semibold tracking-tight cursor-pointer hover:text-[#8A6A2B] transition-colors leading-snug line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Scent notes or fabric teaser */}
          <p className="text-[11px] text-[#7A6F63] mt-1 line-clamp-1">
            {product.fabricOrNotes}
          </p>
        </div>

        {/* Price & Mobile Touch Action */}
        <div className="pt-3 mt-2 border-t border-[#EAE2D5] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold tracking-tight tabular-nums text-[#8A6A2B]">
              {formatPrice(product.price)}
            </span>
            {product.sizes.length > 1 && product.department === 'fragrance' && (
              <span className="text-[10px] text-[#7A6F63]">/ 50ml</span>
            )}
          </div>

          {/* Mobile / Tablet Touch Button: always visible */}
          <button
            type="button"
            onClick={handleQuickView}
            className="lg:hidden text-xs font-bold px-3 py-1.5 rounded-full btn-grad-gold text-[#2B2621] active:scale-95 shadow-warm-sm"
          >
            Select
          </button>
        </div>
      </div>
    </motion.div>
  );
};
