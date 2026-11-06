import { useState, useEffect, useRef } from 'react';

export interface ScrollState {
  isScrolled: boolean;
  progress: number;
  navTheme: 'light' | 'dark';
}

export function useScrollState(): ScrollState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const isScrolledRef = useRef(false);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const nextIsScrolled = scrollY >= 24;

      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      
      // Only trigger progress state updates when change is meaningful (> 0.01) to eliminate re-render churn
      if (Math.abs(currentProgress - lastProgressRef.current) > 0.008) {
        lastProgressRef.current = currentProgress;
        setProgress(currentProgress);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrolled, progress, navTheme: 'light' };
}
