import React from 'react';

interface IdealLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
}

/**
 * IdealLogo: Renders the EXACT uploaded official corporate logo picture.
 * Strictly intact - no SVG conversion, no text separation, no modification,
 * preserving 100% of the original emblem, colours, and typography as uploaded.
 */
export const IdealLogo: React.FC<IdealLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Dimension presets tailored for clean presentation across all viewports
  const sizeClasses = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-12 h-12 sm:w-16 sm:h-16',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
    xl: 'w-36 h-36 sm:w-44 sm:h-44',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 select-none ${className}`}
      title="Ideal Special Education Consult LTD"
    >
      <div className={`relative ${sizeClasses} aspect-square flex items-center justify-center bg-white rounded-xl p-1 shadow-2xs border border-slate-200/80`}>
        <img
          src="/logo-ideal.png"
          alt="Ideal Special Education Consult LTD Official Logo"
          className="w-full h-full object-contain aspect-square select-none pointer-events-none"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};
