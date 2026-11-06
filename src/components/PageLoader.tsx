import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('wib_seen_loader');
    if (!hasSeenLoader) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('wib_seen_loader', 'true');
        if (onComplete) onComplete();
      }, 1300);
      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FBF8F3] text-[#2B2621] overflow-hidden"
          style={{ background: 'var(--grad-hero)' }}
        >
          {/* Subtle Ambient Drifting Glow Orbs */}
          <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-[#F4E1DA]/60 blur-3xl pointer-events-none animate-drift-slow" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-[#E9D7AE]/50 blur-3xl pointer-events-none animate-drift-slow" />

          {/* Animated Gold-Gradient Ring & Monogram */}
          <div className="relative flex items-center justify-center z-10">
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 overflow-visible"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="loaderGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B08A3E" />
                  <stop offset="50%" stopColor="#D4B06A" />
                  <stop offset="100%" stopColor="#E9D7AE" />
                </linearGradient>
              </defs>

              {/* Thin Outer Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#loaderGoldGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />

              {/* Monogram 'W' Drawing In */}
              <motion.path
                d="M28 35 L38 68 L50 45 L62 68 L72 35"
                stroke="url(#loaderGoldGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.15 }}
              />
            </svg>
          </div>

          {/* Brand Wordmark in Serif with Gradient Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-center z-10"
          >
            <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-grad-heading uppercase font-medium">
              Wear It Better
            </h1>
            <p className="mt-1 text-[11px] tracking-[0.3em] uppercase text-[#8A6A2B] font-medium">
              New York · Fifth Avenue Salon
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
