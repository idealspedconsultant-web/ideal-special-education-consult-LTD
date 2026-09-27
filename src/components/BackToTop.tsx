import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  reducedMotion?: boolean;
  onScrollToTop?: () => void;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  reducedMotion = false,
  onScrollToTop,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const heroElement = document.getElementById('hero');

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }

      // Check if scrolled past the first section (hero)
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        // If bottom of hero is above or near the top of the viewport (i.e. scrolled past it)
        const pastHero = heroRect.bottom <= 80;
        setIsVisible(pastHero);
      } else {
        // Fallback: appear after 450px of scrolling
        setIsVisible(scrollY > 450);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }

    // Set focus back to main content / skip link for screen readers
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus({ preventScroll: true });
    }
  };

  // Circumference for 36px diameter circle with 2px stroke (radius ~16)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{
            duration: reducedMotion ? 0.1 : 0.25,
            ease: 'easeOut',
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center group"
        >
          <button
            id="back-to-top-button"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            title="Back to top"
            className="relative flex items-center gap-2 pl-3 pr-4 py-2.5 sm:py-3 bg-[#004872] hover:bg-[#003453] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7ec7ff] focus-visible:ring-offset-2 border border-[#005d93] active:scale-95"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <div className="relative w-8 h-8 flex items-center justify-center -ml-1">
              <svg 
                className="w-8 h-8 transform -rotate-90 pointer-events-none" 
                viewBox="0 0 44 44"
                aria-hidden="true"
              >
                {/* Background Ring */}
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-[#003453]"
                  strokeWidth="3"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-[#7ec7ff] transition-all duration-150"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              {/* Arrow Up Icon */}
              <ArrowUp 
                className="w-4 h-4 text-white absolute transition-transform duration-200 group-hover:-translate-y-0.5" 
                aria-hidden="true" 
              />
            </div>

            {/* Accessible Text Label */}
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white select-none whitespace-nowrap">
              Back to top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
