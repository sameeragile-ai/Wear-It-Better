import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export const PrimaryCollections: React.FC = () => {
  const { setMenswearFilter, setFragranceFilter } = useStore();

  const collections = [
    {
      title: 'Menswear Apparel',
      description: 'Handwoven silk kurtas, champagne brocades & bespoke virgin wool suits.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80&auto=format',
      target: 'shop-menswear',
      onClick: () => {
        setMenswearFilter('all');
        document.getElementById('shop-menswear')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: "Men's Perfumes",
      description: 'Smoked vetiver, crushed pepper & Australian sandalwood extracts.',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80&auto=format',
      target: 'fragrances',
      onClick: () => {
        setFragranceFilter('him');
        document.getElementById('fragrances')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: "Women's Perfumes",
      description: 'Bulgarian rose, saffron threads & sparkling orange blossom balm.',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=80&auto=format',
      target: 'fragrances',
      onClick: () => {
        setFragranceFilter('her');
        document.getElementById('fragrances')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <section
      id="collections"
      aria-label="Signature Collections"
      className="py-20 lg:py-28 bg-[#FBF8F3] text-[#2B2621]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#8A6A2B] block mb-2">
              Curated Portfolios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-grad-heading font-normal tracking-tight">
              Primary Collections
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#7A6F63] max-w-md">
            Hand-finished garments and pure extrait formulations crafted in small, numbered studio batches.
          </p>
        </div>

        {/* 3 Tall Cards: Desktop 3 cols, Tablet 3 shorter, Mobile horizontal snap carousel with peek */}
        <div className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {collections.map((col) => (
            <div
              key={col.title}
              onClick={col.onClick}
              className="group cursor-pointer relative rounded-3xl overflow-hidden bg-white shadow-warm-md hover:shadow-warm-xl transition-all duration-500 flex flex-col justify-end aspect-[3/4] border border-[#EAE2D5] hover:border-[#B08A3E]/60 shrink-0 w-[82vw] sm:w-[60vw] md:w-auto snap-center"
            >
              <SmartImage
                src={col.image}
                alt={col.title}
                aspectRatio="tall"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Light Image Overlay Gradient (40% transparent to Ivory-Porcelain) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 35%, rgba(251,248,243,0.7) 65%, rgba(251,248,243,0.96) 100%)',
                }}
              />

              {/* Frosted Caption Overlay */}
              <div className="relative z-10 p-6 sm:p-7 text-[#2B2621]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#2B2621] group-hover:text-[#8A6A2B] transition-colors">
                    {col.title}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-white/90 group-hover:bg-grad-gold border border-[#EAE2D5] shadow-warm-sm flex items-center justify-center text-[#2B2621] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#7A6F63] line-clamp-2 mb-4 font-normal leading-relaxed">
                  {col.description}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8A6A2B] group-hover:underline underline-offset-4">
                  <span>Shop collection</span>
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
