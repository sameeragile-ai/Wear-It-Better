import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ANNOUNCEMENT_MESSAGES } from '../constants';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { isAnnouncementVisible, dismissAnnouncement } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isAnnouncementVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnnouncementVisible]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isAnnouncementVisible) return null;

  const currentMessage = ANNOUNCEMENT_MESSAGES[currentIndex];

  return (
    <aside
      aria-label="Announcement"
      className="relative z-40 h-9 bg-grad-champagne text-[#2B2621] flex items-center justify-center px-6 sm:px-8 border-b border-[#EAE2D5] text-xs tracking-wide select-none shadow-warm-sm"
    >
      <div className="relative h-full flex items-center justify-center overflow-hidden max-w-4xl mx-auto text-center font-medium">
        <AnimatePresence mode="wait">
          <motion.a
            key={currentIndex}
            href={currentMessage.link}
            onClick={(e) => handleLinkClick(e, currentMessage.link)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="group flex items-center gap-1.5 hover:text-[#8A6A2B] transition-colors truncate px-2"
          >
            {/* Show shortText under 380px, full text on standard screens */}
            <span className="hidden min-[380px]:inline truncate">{currentMessage.text}</span>
            <span className="inline min-[380px]:hidden truncate">{currentMessage.shortText}</span>
            <span className="text-[#8A6A2B] group-hover:translate-x-0.5 transition-transform text-xs" aria-hidden="true">
              →
            </span>
          </motion.a>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={dismissAnnouncement}
        aria-label="Dismiss announcement"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-1 text-[#2B2621]/60 hover:text-[#2B2621] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6A2B]"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
