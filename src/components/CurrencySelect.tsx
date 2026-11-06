import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CURRENCIES } from '../constants';
import { Currency } from '../types';

export const CurrencySelect: React.FC = () => {
  const { currency, setCurrency } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (c: Currency) => {
    setCurrency(c);
    setIsOpen(false);
  };

  return (
    <div className="relative text-xs font-medium" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select currency"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 border border-[#EAE2D5] bg-white/70 hover:bg-[#E9D7AE]/30 text-[#2B2621] shadow-warm-sm"
      >
        <span className="font-semibold">{currency.code}</span>
        <span className="text-[#7A6F63]">{currency.symbol}</span>
        <ChevronDown className={`w-3 h-3 text-[#7A6F63] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-32 rounded-2xl py-1.5 z-50 shadow-warm-lg backdrop-blur-xl border border-[#EAE2D5] bg-white/95 text-[#2B2621]"
        >
          {Object.values(CURRENCIES).map((c) => (
            <button
              key={c.code}
              type="button"
              role="option"
              aria-selected={currency.code === c.code}
              onClick={() => handleSelect(c)}
              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#E9D7AE]/30 transition-colors ${
                currency.code === c.code ? 'text-[#8A6A2B] font-bold bg-[#FBF8F3]' : 'text-[#2B2621]/80'
              }`}
            >
              <span>{c.code}</span>
              <span className="text-[#7A6F63] font-mono">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
