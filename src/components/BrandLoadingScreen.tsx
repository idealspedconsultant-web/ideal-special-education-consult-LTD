import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IdealLogo } from './IdealLogo';
import { Sparkles } from 'lucide-react';

interface BrandLoadingScreenProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const BrandLoadingScreen: React.FC<BrandLoadingScreenProps> = ({
  onComplete,
}) => {
  const [phase, setPhase] = useState<'dots' | 'converge' | 'logo' | 'exit'>('dots');

  useEffect(() => {
    // Phase 1: 4 dots wave & pulse (0 to 1.1s)
    const t1 = setTimeout(() => {
      setPhase('converge');
    }, 1100);

    // Phase 2: Converge into Logo (1.1s to 1.65s)
    const t2 = setTimeout(() => {
      setPhase('logo');
    }, 1650);

    // Phase 3: Display Logo and tagline, then exit (1.65s to 2.8s)
    const t3 = setTimeout(() => {
      setPhase('exit');
    }, 2850);

    // Phase 4: Complete transition
    const t4 = setTimeout(() => {
      onComplete();
    }, 3250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  // Dot color definitions from the 4 brand badges
  const dots = [
    { id: 1, color: '#0074b6', label: 'Deaf & Hearing Inclusion' },
    { id: 2, color: '#4caf50', label: 'Vision & Perception' },
    { id: 3, color: '#43a047', label: 'Learning Differences Support' },
    { id: 4, color: '#004872', label: 'Mobility & Physical Access' },
  ];

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          id="brand-loading-screen"
          role="status"
          aria-live="polite"
          aria-label="Loading Ideal Special Education Consult portal"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#f7f9ff] via-[#eef4ff] to-[#f7f9ff] px-6 text-center select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
        >
          {/* Subtle brand background rings & glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-[#cee5ff] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-[#b3f092] opacity-40" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px]">
            {/* Phase 1 & 2: Four Animated Dots & Convergence */}
            {(phase === 'dots' || phase === 'converge') && (
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.25 } }}
              >
                {dots.map((dot, index) => {
                  const isConverging = phase === 'converge';

                  return (
                    <motion.div
                      key={dot.id}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-md"
                      style={{ backgroundColor: dot.color }}
                      animate={
                        isConverging
                          ? {
                              x: (index - 1.5) * -16,
                              scale: [1, 1.4, 0.2],
                              opacity: [1, 1, 0.2],
                              transition: { duration: 0.5, ease: 'easeInOut' },
                            }
                          : {
                              y: [-10, 10, -10],
                              scale: [1, 1.25, 1],
                              transition: {
                                duration: 0.85,
                                repeat: Infinity,
                                delay: index * 0.14,
                                ease: 'easeInOut',
                              },
                            }
                      }
                    />
                  );
                })}
              </motion.div>
            )}

            {/* Phase 3: Logo Reveal with clean scale and fade */}
            {phase === 'logo' && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="p-4 sm:p-5 bg-white rounded-3xl shadow-xl border border-[#e4effe]">
                  <IdealLogo variant="full" size="lg" />
                </div>

                <motion.p
                  className="mt-5 font-headline text-sm sm:text-base font-bold tracking-wide text-[#004872] max-w-sm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  Creating Access • Promoting Inclusion • Empowering Learners
                </motion.p>
              </motion.div>
            )}

            {/* Subtle loading progress indicator bar */}
            <div className="w-48 h-1 bg-[#dfe9f8] rounded-full mt-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0074b6] via-[#4caf50] to-[#004872]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Accessible Skip Button */}
          <button
            id="btn-skip-loading"
            type="button"
            onClick={onComplete}
            className="mt-6 text-xs font-semibold text-[#41474f] hover:text-[#004872] underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#004872] rounded px-3 py-1.5 transition-colors cursor-pointer"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export interface BrandLazyLoaderProps {
  message?: string;
  submessage?: string;
  fullscreen?: boolean;
}

/**
 * BrandLazyLoader - Branded Lazy Loading component using the official logo picture
 * and the 4 inclusion color dots for React Suspense and lazy-loaded components.
 */
export const BrandLazyLoader: React.FC<BrandLazyLoaderProps> = ({
  message = 'Loading Ideal Special Education Consult...',
  submessage = 'Creating Access • Promoting Inclusion • Empowering Learners',
  fullscreen = true,
}) => {
  const dots = [
    { id: 1, color: '#0074b6', label: 'Deaf & Hearing' },
    { id: 2, color: '#4caf50', label: 'Vision' },
    { id: 3, color: '#43a047', label: 'Learning Differences' },
    { id: 4, color: '#004872', label: 'Mobility' },
  ];

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none max-w-sm mx-auto">
      {/* The official logo picture in high-contrast card */}
      <div className="p-3.5 sm:p-4 bg-white rounded-3xl shadow-lg border border-[#e4effe] mb-4">
        <IdealLogo variant="full" size="md" />
      </div>

      {/* 4 Brand Inclusion Dots */}
      <div className="flex items-center gap-3 my-2" aria-hidden="true">
        {dots.map((dot, index) => (
          <motion.div
            key={dot.id}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-2xs"
            style={{ backgroundColor: dot.color }}
            animate={{
              y: [-6, 6, -6],
              scale: [1, 1.25, 1],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              delay: index * 0.14,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <p className="font-headline font-bold text-sm sm:text-base text-[#004872] mt-2">
        {message}
      </p>
      {submessage && (
        <p className="text-xs text-[#526070] mt-1 max-w-xs leading-relaxed">
          {submessage}
        </p>
      )}

      {/* Animated gradient progress bar */}
      <div className="w-48 h-1 bg-[#dfe9f8] rounded-full mt-4 overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-[#0074b6] via-[#4caf50] to-[#004872]"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );

  if (!fullscreen) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="w-full py-12 flex items-center justify-center bg-[#f7f9ff] rounded-2xl"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#f7f9ff] via-[#eef4ff] to-[#f7f9ff] px-4"
    >
      {content}
    </div>
  );
};

