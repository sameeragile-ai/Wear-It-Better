import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Shirt, Droplet, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { SmartImage } from './SmartImage';

export const CommandSearch: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    setQuickViewProduct,
    formatPrice,
  } = useStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animated placeholder typing
  const placeholderPhrases = useMemo(
    () => ['Search oud, kurta, waistcoat...', 'Search Italian wool suit...', 'Search Dark Elixir or Studio Blanc...', 'Search silk kameez shalwar...'],
    []
  );
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isSearchOpen) return;
    const phrase = placeholderPhrases[placeholderIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === phrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % placeholderPhrases.length);
      } else {
        setCurrentText(
          isDeleting ? phrase.substring(0, currentText.length - 1) : phrase.substring(0, currentText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, placeholderIndex, placeholderPhrases, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Filtering
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { menswear: [], fragrances: [], notesMatches: [] };

    const menswearMatches = PRODUCTS.filter(
      (p) =>
        p.department === 'menswear' &&
        (p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.notes && p.notes.some((n) => n.toLowerCase().includes(q))))
    );

    const fragranceMatches = PRODUCTS.filter(
      (p) =>
        p.department === 'fragrance' &&
        (p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabricOrNotes.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q))
    );

    const notesMatches = PRODUCTS.filter(
      (p) =>
        p.notes &&
        p.notes.some((n) => n.toLowerCase().includes(q)) &&
        !fragranceMatches.some((f) => f.id === p.id) &&
        !menswearMatches.some((m) => m.id === p.id)
    );

    return {
      menswear: menswearMatches,
      fragrances: fragranceMatches,
      notesMatches,
    };
  }, [query]);

  const flatResults = useMemo(() => {
    return [...results.menswear, ...results.fragrances, ...results.notesMatches];
  }, [results]);

  const handleSelectProduct = (product: Product) => {
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  const handleKeyDownNavigation = (e: React.KeyboardEvent) => {
    if (flatResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[selectedIndex]) {
        handleSelectProduct(flatResults[selectedIndex]);
      }
    }
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#2B2621]/40 backdrop-blur-md">
        <div
          className="absolute inset-0"
          onClick={() => setIsSearchOpen(false)}
          aria-hidden="true"
        />

        {/* Modal Window in White Porcelain with Soft Warm Shadow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white border border-[#EAE2D5] rounded-3xl shadow-warm-xl overflow-hidden text-[#2B2621] flex flex-col max-h-[82vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header & Input */}
          <div className="p-4 sm:p-6 border-b border-[#EAE2D5] flex items-center gap-3.5 bg-[#FBF8F3]">
            <Search className="w-5 h-5 text-[#8A6A2B] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDownNavigation}
              placeholder={currentText || 'Search oud, kurta, waistcoat…'}
              className="w-full bg-transparent text-[#2B2621] placeholder-[#7A6F63]/60 text-base sm:text-lg focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-[#7A6F63] hover:text-[#2B2621] hover:bg-[#EAE2D5]/50"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block text-[10px] tracking-widest text-[#8A6A2B] px-2 py-0.5 rounded border border-[#B08A3E]/30 bg-white">
                ESC
              </kbd>
            )}
          </div>

          {/* Body: Recent Searches OR Results */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 divide-y divide-[#EAE2D5]/60">
            {!query ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#7A6F63]">
                  <span className="font-bold tracking-wider uppercase text-[#8A6A2B]">
                    Recent Searches
                  </span>
                  {recentSearches.length > 0 && (
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="hover:text-[#2B2621] transition-colors text-[11px] font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 rounded-full text-xs bg-[#F3EDE3] hover:bg-[#E9D7AE]/40 text-[#2B2621] border border-[#EAE2D5] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#8A6A2B] block mb-2.5">
                    Curated Categories
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Silk Kurtas', 'Italian Wool Suits', 'Cambodian Oud', 'Dark Elixir', 'Waistcoats', 'Discovery Set'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="text-left p-2.5 rounded-xl bg-[#FBF8F3] hover:bg-[#E9D7AE]/30 border border-[#EAE2D5] text-xs text-[#2B2621] transition-all flex items-center justify-between group shadow-warm-sm"
                      >
                        <span className="truncate">{item}</span>
                        <ArrowRight className="w-3 h-3 text-[#8A6A2B] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : flatResults.length === 0 ? (
              <div className="py-12 text-center text-[#7A6F63] space-y-2">
                <p className="font-serif text-lg text-[#2B2621]">No matches found for "{query}"</p>
                <p className="text-xs">
                  Try searching for <span className="text-[#8A6A2B] font-semibold underline cursor-pointer" onClick={() => setQuery('oud')}>oud</span>, <span className="text-[#8A6A2B] font-semibold underline cursor-pointer" onClick={() => setQuery('kurta')}>kurta</span>, or <span className="text-[#8A6A2B] font-semibold underline cursor-pointer" onClick={() => setQuery('suit')}>suit</span>.
                </p>
              </div>
            ) : (
              <div className="space-y-6 pt-1">
                {/* Menswear */}
                {results.menswear.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8A6A2B]">
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Menswear ({results.menswear.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {results.menswear.map((product) => {
                        const index = flatResults.findIndex((p) => p.id === product.id);
                        const isSelected = selectedIndex === index;
                        return (
                          <div
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex items-center gap-3.5 p-2 rounded-2xl cursor-pointer transition-all border ${
                              isSelected
                                ? 'bg-[#E9D7AE]/35 border-[#B08A3E]'
                                : 'bg-[#FBF8F3] border-[#EAE2D5] hover:bg-white'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EAE2D5]">
                              <SmartImage
                                src={product.image}
                                alt={product.name}
                                aspectRatio="square"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm font-semibold truncate text-[#2B2621]">{product.name}</h4>
                              <p className="text-[11px] text-[#7A6F63] truncate">{product.category}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-[#8A6A2B] tabular-nums">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fragrances */}
                {results.fragrances.length > 0 && (
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8A6A2B]">
                      <Droplet className="w-3.5 h-3.5" />
                      <span>Studio Fragrances ({results.fragrances.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {results.fragrances.map((product) => {
                        const index = flatResults.findIndex((p) => p.id === product.id);
                        const isSelected = selectedIndex === index;
                        return (
                          <div
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex items-center gap-3.5 p-2 rounded-2xl cursor-pointer transition-all border ${
                              isSelected
                                ? 'bg-[#E9D7AE]/35 border-[#B08A3E]'
                                : 'bg-[#FBF8F3] border-[#EAE2D5] hover:bg-white'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EAE2D5]">
                              <SmartImage
                                src={product.image}
                                alt={product.name}
                                aspectRatio="square"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm font-semibold truncate text-[#2B2621]">{product.name}</h4>
                              <p className="text-[11px] text-[#7A6F63] truncate">{product.fabricOrNotes}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-[#8A6A2B] tabular-nums">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Scent notes or fabrics matches */}
                {results.notesMatches.length > 0 && (
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8A6A2B]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Matching Ingredients & Notes</span>
                    </div>
                    <div className="space-y-1.5">
                      {results.notesMatches.map((product) => {
                        const index = flatResults.findIndex((p) => p.id === product.id);
                        const isSelected = selectedIndex === index;
                        return (
                          <div
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex items-center gap-3.5 p-2 rounded-2xl cursor-pointer transition-all border ${
                              isSelected
                                ? 'bg-[#E9D7AE]/35 border-[#B08A3E]'
                                : 'bg-[#FBF8F3] border-[#EAE2D5] hover:bg-white'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#EAE2D5]">
                              <SmartImage
                                src={product.image}
                                alt={product.name}
                                aspectRatio="square"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm font-semibold truncate text-[#2B2621]">{product.name}</h4>
                              <p className="text-[11px] text-[#7A6F63] truncate">
                                Notes: {product.notes?.join(' · ')}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-[#8A6A2B] tabular-nums">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-6 py-3 border-t border-[#EAE2D5] bg-[#FBF8F3] flex items-center justify-between text-[11px] text-[#7A6F63]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#EAE2D5] text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#EAE2D5] text-[10px]">↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3 text-[#8A6A2B]" /> to select
              </span>
            </div>
            <span>Press ESC to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
