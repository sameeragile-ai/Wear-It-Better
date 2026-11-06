import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { FragranceDropdown } from './FragranceDropdown';

interface NavLinksProps {
  activeSection: string;
}

export const NavLinks: React.FC<NavLinksProps> = ({ activeSection }) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<'menswear' | 'fragrances' | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const links = [
    { label: 'Menswear', id: 'shop-menswear', hasMegaMenu: true },
    { label: 'Fragrances', id: 'fragrances', hasDropdown: true },
    { label: 'Atelier', id: 'atelier' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  // Close dropdown on Escape key or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (linkId: string, type?: 'menswear' | 'fragrances') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoveredLink(linkId);
    if (type) {
      timerRef.current = setTimeout(() => {
        setOpenDropdown(type);
      }, 100); // 100ms hover intent
    } else {
      setOpenDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHoveredLink(null);
      setOpenDropdown(null);
    }, 200);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, type?: 'menswear' | 'fragrances') => {
    if (type && openDropdown !== type) {
      // Toggle dropdown open on mobile / touch if clicked
      e.preventDefault();
      setOpenDropdown(type);
      return;
    }
    setOpenDropdown(null);
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative flex items-center gap-1 xl:gap-2"
      onMouseLeave={handleMouseLeave}
    >
      {links.map((link) => {
        const isActive = activeSection === link.id;
        const isHovered = hoveredLink === link.id;
        const type = link.hasMegaMenu ? 'menswear' : link.hasDropdown ? 'fragrances' : undefined;

        return (
          <div
            key={link.id}
            className="relative"
            onMouseEnter={() => handleMouseEnter(link.id, type)}
          >
            <a
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id, type)}
              aria-haspopup={link.hasMegaMenu || link.hasDropdown ? 'true' : undefined}
              aria-expanded={
                link.hasMegaMenu && openDropdown === 'menswear'
                  ? true
                  : link.hasDropdown && openDropdown === 'fragrances'
                  ? true
                  : undefined
              }
              onFocus={() => {
                setHoveredLink(link.id);
                if (type) setOpenDropdown(type);
              }}
              className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors duration-200 flex items-center gap-1 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6A2B] ${
                isActive
                  ? 'text-grad-heading font-bold'
                  : 'text-[#2B2621]/80 hover:text-[#2B2621]'
              }`}
            >
              <span>{link.label}</span>
              {(link.hasMegaMenu || link.hasDropdown) && (
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 text-[#7A6F63] ${
                    (link.hasMegaMenu && openDropdown === 'menswear') ||
                    (link.hasDropdown && openDropdown === 'fragrances')
                      ? 'rotate-180 text-[#8A6A2B]'
                      : ''
                  }`}
                />
              )}

              {/* Active 2px gold dot beneath */}
              {isActive && (
                <motion.span
                  layoutId="activeSectionDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-grad-gold"
                />
              )}
            </a>

            {/* Hover Champagne Gradient Glass Pill Highlight */}
            {isHovered && (
              <motion.div
                layoutId="navHoverPill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full z-0 bg-grad-champagne opacity-60 border border-[#EAE2D5]"
              />
            )}

            {/* Dropdowns */}
            <AnimatePresence>
              {link.hasMegaMenu && openDropdown === 'menswear' && (
                <MegaMenu onClose={() => setOpenDropdown(null)} />
              )}
              {link.hasDropdown && openDropdown === 'fragrances' && (
                <FragranceDropdown onClose={() => setOpenDropdown(null)} />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
};
