import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface Slide {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaTarget: string;
  secondaryCtaText: string;
  secondaryCtaTarget: string;
  largeImage: string;
  smallImage: string;
  meshTint: string; // for subtle mesh gradient shift
}

export const HeroSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 'perfume',
      tagline: 'Quiet Luxury Extrait de Parfum',
      title: 'Artisanal Parfumerie',
      subtitle: 'Composed with aged Cambodian agarwood, smoldering Havana tobacco, and hand-harvested botanical absolutes in minimalist heavy glass.',
      primaryCtaText: 'Shop perfumes',
      primaryCtaTarget: '#fragrances',
      secondaryCtaText: 'Explore menswear',
      secondaryCtaTarget: '#shop-menswear',
      largeImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=80&auto=format',
      smallImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80&auto=format',
      meshTint: 'radial-gradient(at 20% 30%, #F4E1DA 0px, transparent 60%)',
    },
    {
      id: 'menswear',
      tagline: 'Heritage Meets Modern Tailoring',
      title: 'Heritage, Tailored',
      subtitle: 'Mastercrafted mulberry silk kurtas, champagne brocade waistcoats, and precision Italian virgin wool silhouettes cut by hand in New York.',
      primaryCtaText: 'Explore menswear',
      primaryCtaTarget: '#shop-menswear',
      secondaryCtaText: 'Book a fitting',
      secondaryCtaTarget: '#contact',
      largeImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=80&auto=format',
      smallImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80&auto=format',
      meshTint: 'radial-gradient(at 80% 25%, #E9D7AE 0px, transparent 60%)',
    },
    {
      id: 'winter',
      tagline: 'Limited Studio Capsule',
      title: 'The Winter Edition',
      subtitle: 'Structured double-breasted sand blazers, textured stone pieces, and smoky extract flacons crafted for discerning collectors.',
      primaryCtaText: 'Discover collection',
      primaryCtaTarget: '#shop-menswear',
      secondaryCtaText: 'Fragrance portfolio',
      secondaryCtaTarget: '#fragrances',
      largeImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80&auto=format',
      smallImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=900&q=80&auto=format',
      meshTint: 'radial-gradient(at 50% 80%, #E6ECEA 0px, transparent 60%)',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSlide = slides[current];

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Campaign Hero Carousel"
      className="relative min-h-[100svh] bg-[#FBF8F3] text-[#2B2621] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
      style={{ background: 'var(--grad-hero)' }}
    >
      {/* Drifting Soft Gradient Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#F4E1DA]/50 blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute top-10 right-10 w-[28rem] h-[28rem] rounded-full bg-[#E9D7AE]/45 blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#E6ECEA]/60 blur-3xl pointer-events-none animate-drift-slow" />

      {/* Subtle Slide Mesh Tint Layer */}
      <motion.div
        key={`tint-${activeSlide.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: activeSlide.meshTint }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Kicker */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#EAE2D5] text-[#8A6A2B] text-xs font-bold tracking-[0.2em] uppercase shadow-warm-sm backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#B08A3E]" />
                  <span>{activeSlide.tagline}</span>
                </div>

                {/* Headline in Cormorant Garamond with --grad-heading */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-grad-heading leading-[1.05] text-balance">
                  {activeSlide.title}
                </h1>

                {/* Subtitle in Taupe */}
                <p className="text-base sm:text-lg text-[#7A6F63] font-normal leading-relaxed max-w-xl">
                  {activeSlide.subtitle}
                </p>

                {/* Dual CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href={activeSlide.primaryCtaTarget}
                    onClick={(e) => handleCtaClick(e, activeSlide.primaryCtaTarget)}
                    className="py-3.5 px-7 rounded-full btn-grad-gold text-[#2B2621] font-bold text-xs tracking-wider uppercase text-center shadow-warm-md flex items-center justify-center gap-2 group"
                  >
                    <span>{activeSlide.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#2B2621] group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={activeSlide.secondaryCtaTarget}
                    onClick={(e) => handleCtaClick(e, activeSlide.secondaryCtaTarget)}
                    className="py-3.5 px-6 rounded-full border border-[#B08A3E]/50 hover:bg-grad-champagne text-[#2B2621] text-xs font-bold tracking-wider uppercase text-center transition-all bg-white/70 backdrop-blur-sm shadow-warm-sm"
                  >
                    <span>{activeSlide.secondaryCtaText}</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Layered Bright Image Composition */}
          <div className="lg:col-span-6 order-2 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Soft Gradient Circle in background */}
                  <div className="absolute -inset-4 sm:-inset-8 rounded-full bg-gradient-to-tr from-[#F4E1DA] via-[#E9D7AE] to-[#E6ECEA] opacity-50 blur-2xl pointer-events-none" />

                  {/* Large Primary Image with Slow Zoom */}
                  <div className="relative rounded-3xl overflow-hidden shadow-warm-xl border border-[#EAE2D5] aspect-[4/3] bg-white">
                    <motion.div
                      animate={{ scale: [1, 1.04] }}
                      transition={{ duration: 7, ease: 'easeOut' }}
                      className="w-full h-full"
                    >
                      <SmartImage
                        src={activeSlide.largeImage}
                        alt={activeSlide.title}
                        aspectRatio="landscape"
                        priority={true}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Overlapping Secondary Accent Image with --grad-border frame */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.55 }}
                    className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-40 sm:w-56 rounded-2xl overflow-hidden border-2 border-[#B08A3E]/40 shadow-warm-xl aspect-square bg-white"
                  >
                    <SmartImage
                      src={activeSlide.smallImage}
                      alt="Artisanal detail"
                      aspectRatio="square"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Stamp Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EAE2D5] text-[#8A6A2B] text-[10px] font-bold tracking-widest uppercase shadow-warm-sm">
                    Fifth Ave Atelier
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Carousel Controls & Autoplay Progress Bar */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between border-t border-[#EAE2D5] pt-6">
          {/* Slide Dots */}
          <div className="flex items-center gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="relative group p-1"
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === index ? 'w-8 bg-grad-gold' : 'w-2 bg-[#EAE2D5] group-hover:bg-[#B08A3E]/50'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Autoplay Progress Line Indicator */}
          <div className="hidden sm:block flex-1 max-w-xs mx-8 h-[2px] bg-[#EAE2D5] overflow-hidden rounded-full">
            <motion.div
              key={current + (isPaused ? '-paused' : '')}
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '0%' : '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
              className="h-full bg-grad-gold"
            />
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-2.5 rounded-full border border-[#EAE2D5] bg-white text-[#2B2621] hover:bg-[#E9D7AE]/30 transition-colors shadow-warm-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-2.5 rounded-full border border-[#EAE2D5] bg-white text-[#2B2621] hover:bg-[#E9D7AE]/30 transition-colors shadow-warm-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
