import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Youtube, Sparkles, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useScrollState } from '../hooks/useScrollState';
import { BOUTIQUE_INFO } from '../constants';

export const Footer: React.FC = () => {
  const {
    openPolicyModal,
    setIsFittingModalOpen,
    setMenswearFilter,
    setFragranceFilter,
    setIsSignInOpen,
  } = useStore();

  const { isScrolled } = useScrollState();

  // Mobile accordion state for footer columns
  const [openMobileCol, setOpenMobileCol] = useState<string | null>(null);

  const toggleMobileCol = (col: string) => {
    setOpenMobileCol(openMobileCol === col ? null : col);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCollectionClick = (department: 'menswear' | 'fragrance', filter: any) => {
    if (department === 'menswear') {
      setMenswearFilter(filter);
      scrollToSection('shop-menswear');
    } else {
      setFragranceFilter(filter);
      scrollToSection('fragrances');
    }
  };

  return (
    <footer
      id="footer"
      aria-label="Site Footer"
      className="bg-grad-footer text-[#2B2621] relative overflow-hidden pt-16 sm:pt-20 pb-16"
    >
      {/* 1px Gradient Divider Line on Top */}
      <div className="absolute top-0 left-0 right-0 divider-grad" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#EAE2D5]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#B08A3E]/60 flex items-center justify-center bg-white shadow-warm-sm">
                <span className="font-serif text-[#8A6A2B] font-bold text-lg">W</span>
              </div>
              <div>
                <span className="font-serif text-xl tracking-[0.18em] uppercase font-bold text-grad-heading block">
                  Wear It Better
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A6A2B] block font-semibold">
                  New York · Atelier
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#7A6F63] leading-relaxed max-w-sm">
              Quiet luxury menswear combining hand-stitched South Asian heritage with contemporary tailoring, complemented by an in-house artisanal perfume collection.
            </p>

            {/* Social Icons in Champagne Gradient Circles */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-grad-champagne border border-[#EAE2D5] flex items-center justify-center text-[#2B2621] hover:text-[#8A6A2B] shadow-warm-sm transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-grad-champagne border border-[#EAE2D5] flex items-center justify-center text-[#2B2621] hover:text-[#8A6A2B] shadow-warm-sm transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-grad-champagne border border-[#EAE2D5] flex items-center justify-center text-[#2B2621] hover:text-[#8A6A2B] shadow-warm-sm transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="lg:col-span-3 border-t md:border-t-0 border-[#EAE2D5] pt-4 md:pt-0">
            <button
              type="button"
              onClick={() => toggleMobileCol('collections')}
              className="w-full flex md:hidden items-center justify-between text-xs font-bold tracking-[0.2em] uppercase text-[#8A6A2B] py-2"
            >
              <span>Collections</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openMobileCol === 'collections' ? 'rotate-180' : ''}`} />
            </button>
            <h4 className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-[#8A6A2B] mb-3">
              Collections
            </h4>
            <ul className={`space-y-2.5 text-xs sm:text-sm text-[#7A6F63] ${openMobileCol === 'collections' ? 'block pt-2' : 'hidden md:block'}`}>
              <li>
                <button
                  type="button"
                  onClick={() => handleCollectionClick('menswear', 'kurtas')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Silk Kurtas & Brocade Waistcoats
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCollectionClick('menswear', 'suits')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Architectural Tailored Suits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCollectionClick('menswear', 'kameez')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Stone & Sage Kameez Shalwar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCollectionClick('fragrance', 'all')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Artisanal Perfumes (Extraits)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCollectionClick('fragrance', 'unisex')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Cambodian Oud & Dark Elixir
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('fragrances')}
                  className="hover:text-[#2B2621] font-bold text-[#8A6A2B] flex items-center gap-1"
                >
                  <span>The Discovery Set ($65)</span>
                  <Sparkles className="w-3 h-3 text-[#B08A3E]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care */}
          <div className="lg:col-span-2 border-t md:border-t-0 border-[#EAE2D5] pt-4 md:pt-0">
            <button
              type="button"
              onClick={() => toggleMobileCol('care')}
              className="w-full flex md:hidden items-center justify-between text-xs font-bold tracking-[0.2em] uppercase text-[#8A6A2B] py-2"
            >
              <span>Client Care</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openMobileCol === 'care' ? 'rotate-180' : ''}`} />
            </button>
            <h4 className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-[#8A6A2B] mb-3">
              Client Care
            </h4>
            <ul className={`space-y-2.5 text-xs sm:text-sm text-[#7A6F63] ${openMobileCol === 'care' ? 'block pt-2' : 'hidden md:block'}`}>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Shipping & Express Logistics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Sizing Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsSignInOpen(true)}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('privacy')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openPolicyModal('terms')}
                  className="hover:text-[#2B2621] font-medium transition-colors"
                >
                  Terms of Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique Atelier */}
          <div className="lg:col-span-3 border-t md:border-t-0 border-[#EAE2D5] pt-4 md:pt-0">
            <button
              type="button"
              onClick={() => toggleMobileCol('boutique')}
              className="w-full flex md:hidden items-center justify-between text-xs font-bold tracking-[0.2em] uppercase text-[#8A6A2B] py-2"
            >
              <span>Boutique Salon</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openMobileCol === 'boutique' ? 'rotate-180' : ''}`} />
            </button>
            <h4 className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-[#8A6A2B] mb-3">
              Boutique Atelier
            </h4>
            <div className={`space-y-2 text-xs text-[#7A6F63] leading-relaxed ${openMobileCol === 'boutique' ? 'block pt-2' : 'hidden md:block'}`}>
              <p className="text-[#2B2621] font-bold">{BOUTIQUE_INFO.address}</p>
              <p>{BOUTIQUE_INFO.hours}</p>
              <p>
                <a href={`mailto:${BOUTIQUE_INFO.email}`} className="hover:text-[#8A6A2B] font-medium transition-colors">
                  {BOUTIQUE_INFO.email}
                </a>
              </p>
              <p>
                <a href={`tel:${BOUTIQUE_INFO.phone}`} className="hover:text-[#8A6A2B] font-medium transition-colors">
                  {BOUTIQUE_INFO.phone}
                </a>
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsFittingModalOpen(true)}
                  className="px-4 py-2 rounded-full border border-[#B08A3E]/60 text-[#8A6A2B] hover:bg-grad-gold hover:text-[#2B2621] transition-all font-bold uppercase tracking-wider text-[11px] shadow-warm-sm bg-white"
                >
                  Book Private Fitting
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6F63] gap-4">
          <p>© 2026 Wear It Better. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => openPolicyModal('privacy')}
              className="hover:text-[#2B2621] transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => openPolicyModal('terms')}
              className="hover:text-[#2B2621] transition-colors"
            >
              Terms of Sale
            </button>
            <span aria-hidden="true">·</span>
            <span>New York · London · Lahore</span>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button: white with --grad-border and gold gradient icon */}
      {isScrolled && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE2D5] text-[#8A6A2B] hover:bg-grad-gold hover:text-[#2B2621] shadow-warm-lg transition-all duration-300"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
};
