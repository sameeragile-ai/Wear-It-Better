import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { PageLoader } from './components/PageLoader';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { TrustStrip } from './components/TrustStrip';
import { PrimaryCollections } from './components/PrimaryCollections';
import { MenswearShop } from './components/MenswearShop';
import { FragrancesShop } from './components/FragrancesShop';
import { AtelierSection } from './components/AtelierSection';
import { BespokeProcess } from './components/BespokeProcess';
import { WhyUsSection } from './components/WhyUsSection';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { FaqAccordion } from './components/FaqAccordion';
import { NewsletterSection } from './components/NewsletterSection';
import { BookFittingSection } from './components/BookFittingSection';
import { Footer } from './components/Footer';

// Drawers & Modals
import { MobileMenu } from './components/MobileMenu';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CommandSearch } from './components/CommandSearch';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SignInModal } from './components/SignInModal';
import { PolicyModal } from './components/PolicyModal';
import { FittingModal } from './components/FittingModal';
import { ToastContainer } from './components/ToastContainer';

function MainAppContent() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#2B2621] relative selection:bg-[#B8964E]/30 selection:text-[#2B2621] overflow-x-clip">
      {/* Page Loader on first session visit */}
      <PageLoader />

      {/* Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* Signature Sticky Floating Glass Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content">
        {/* 6.1 Hero Slider */}
        <HeroSlider />

        {/* 6.2 Trust Strip Marquee */}
        <TrustStrip />

        {/* 6.3 Primary Collections */}
        <PrimaryCollections />

        {/* 6.4 Luxury Menswear Shop */}
        <MenswearShop />

        {/* 6.5 Studio Fragrances Shop */}
        <FragrancesShop />

        {/* 6.6 Atelier Craftsmanship */}
        <AtelierSection />

        {/* 6.7 Bespoke Process */}
        <BespokeProcess />

        {/* 6.8 Why Wear It Better */}
        <WhyUsSection />

        {/* 6.9 Collector Testimonials */}
        <TestimonialsCarousel />

        {/* 6.10 FAQ Accordion */}
        <FaqAccordion />

        {/* 6.11 Join the Inner Circle */}
        <NewsletterSection />

        {/* 6.12 Book a Fitting / Contact */}
        <BookFittingSection />
      </main>

      {/* 6.13 Footer (Dark) */}
      <Footer />

      {/* Mobile Sticky Navigation & Bottom Bar */}
      <MobileMenu />
      <MobileBottomBar isScrolledPastHero={isPastHero} />

      {/* Interactive Overlays */}
      <CommandSearch />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <SignInModal />
      <PolicyModal />
      <FittingModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
