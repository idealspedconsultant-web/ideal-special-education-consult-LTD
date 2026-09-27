import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  Heart, 
  Calendar, 
  Eye, 
  Type, 
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Info
} from 'lucide-react';
import { IdealLogo } from './IdealLogo';
import { ORGANISATION_INFO } from '../data/orgData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAuthorizedAccess: () => void;
  onReplayLoading: () => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  textScale: 'normal' | 'large' | 'xl';
  setTextScale: (scale: 'normal' | 'large' | 'xl') => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  onOpenAuthorizedAccess,
  onReplayLoading,
  highContrast,
  setHighContrast,
  textScale,
  setTextScale,
  reducedMotion,
  setReducedMotion,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  // Streamlined primary links for dedicated page routing
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Us' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f7f9ff]/95 backdrop-blur-md border-b border-[#dfe9f8] shadow-xs transition-colors">
      {/* Top Utility Bar (Strictly hidden on mobile so header begins cleanly with logo) */}
      <div className="hidden md:block bg-[#004872] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse shrink-0" />
            <span className="font-semibold text-white">Special Education & Inclusion Services</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/80">LASU Axis, Ojo</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto shrink-0">
            {/* Direct WhatsApp link with animated bounce */}
            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-[#b3f092] hover:text-white transition-colors focus:ring-1 focus:ring-white rounded px-1 cursor-pointer"
              aria-label="Direct WhatsApp Message or Video Call Support"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">WhatsApp Support</span>
            </motion.a>

            {/* Quick Call */}
            <motion.a
              href={`tel:${ORGANISATION_INFO.phones[0].raw}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-white hover:text-[#b3d8ff] transition-colors focus:ring-1 focus:ring-white rounded px-1 cursor-pointer"
              aria-label={`Call office directly at ${ORGANISATION_INFO.phones[0].display}`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium">{ORGANISATION_INFO.phones[0].display}</span>
            </motion.a>

            {/* Accessibility Quick Toggle */}
            <motion.button
              id="btn-accessibility-drawer-toggle"
              type="button"
              onClick={() => setAccessibilityOpen(!accessibilityOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 bg-[#003453] hover:bg-[#1b6091] text-white px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-colors border border-white/20"
              aria-expanded={accessibilityOpen}
              aria-label="Toggle Accessibility Preferences"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Accessibility</span>
            </motion.button>

            {/* Authorized Staff Access */}
            <motion.button
              id="btn-authorized-access-top"
              type="button"
              onClick={onOpenAuthorizedAccess}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 bg-[#366a1d] hover:bg-[#2b5417] text-[#b3f092] hover:text-white px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer transition-colors border border-[#b3f092]/30 shadow-2xs"
              aria-label="Open Authorized Assessment and Staff Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Access</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Accessibility Control Panel Dropdown with Spring Animation */}
      <AnimatePresence>
        {accessibilityOpen && (
          <motion.div 
            id="accessibility-control-panel"
            role="region" 
            aria-label="Accessibility settings"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden bg-[#eef4ff] border-b border-[#c1c7d0] px-4 py-3 sm:px-8"
          >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-5">
                {/* Text Size Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#004872] flex items-center gap-1">
                    <Type className="w-3.5 h-3.5" /> Text Scale:
                  </span>
                  <div className="inline-flex rounded-md shadow-xs bg-white p-0.5 border border-[#c1c7d0]">
                    {(['normal', 'large', 'xl'] as const).map((scale) => (
                      <motion.button
                        key={scale}
                        type="button"
                        onClick={() => setTextScale(scale)}
                        whileTap={{ scale: 0.92 }}
                        className={`px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors ${
                          textScale === scale 
                            ? 'bg-[#004872] text-white shadow-2xs' 
                            : 'text-[#41474f] hover:bg-slate-100'
                        }`}
                        aria-label={`${scale} font scale`}
                      >
                        {scale === 'normal' ? '100%' : scale === 'large' ? '115%' : '130%'}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* High Contrast Mode */}
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    onClick={() => setHighContrast(!highContrast)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-xs font-medium rounded border transition-colors cursor-pointer ${
                      highContrast 
                        ? 'bg-black text-white border-black shadow-xs' 
                        : 'bg-white text-[#121c27] border-[#c1c7d0] hover:bg-slate-50'
                    }`}
                    aria-pressed={highContrast}
                  >
                    {highContrast ? 'High Contrast: Active' : 'Toggle High Contrast'}
                  </motion.button>
                </div>

                {/* Reduced Motion Toggle */}
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    onClick={() => setReducedMotion(!reducedMotion)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 text-xs font-medium rounded border transition-colors cursor-pointer ${
                      reducedMotion 
                        ? 'bg-[#366a1d] text-white border-[#366a1d]' 
                        : 'bg-white text-[#121c27] border-[#c1c7d0] hover:bg-slate-50'
                    }`}
                    aria-pressed={reducedMotion}
                  >
                    {reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
                  </motion.button>
                </div>

                {/* Replay Brand Animation */}
                <motion.button
                  type="button"
                  onClick={onReplayLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-semibold text-[#004872] hover:text-[#0074b6] flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded border border-[#c1c7d0] shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0074b6] animate-spin-slow" /> Replay Brand Intro
                </motion.button>
              </div>

              <button
                type="button"
                onClick={() => setAccessibilityOpen(false)}
                className="text-xs text-[#41474f] hover:text-black font-semibold ml-auto cursor-pointer"
              >
                Close Preferences ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Clean Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name (Strictly without Lagos) */}
        <motion.button
          id="btn-nav-brand-home"
          type="button"
          onClick={() => handleNavClick('home')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-[#004872] rounded-lg p-1 transition-transform cursor-pointer group shrink-0"
          aria-label="Ideal Special Education Consult Homepage"
        >
          <IdealLogo variant="horizontal" size="md" />
        </motion.button>

        {/* Clean Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.button
                key={link.id}
                id={`nav-link-${link.id}`}
                type="button"
                onClick={() => handleNavClick(link.id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#004872] bg-[#e4effe]'
                    : 'text-[#41474f] hover:text-[#004872] hover:bg-white/80'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#004872] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Action CTAs: Limited to 2 essential buttons + Intro Sparkle */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Replay Brand Intro Sparkle button */}
          <motion.button
            type="button"
            onClick={onReplayLoading}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-[#004872] hover:bg-[#e4effe] rounded-lg border border-[#c1c7d0] transition-colors cursor-pointer"
            title="Play Brand Loading Animation"
            aria-label="Play Brand Loading Animation"
          >
            <Sparkles className="w-4 h-4 text-[#0074b6]" />
          </motion.button>

          {/* Donate Pill */}
          <motion.button
            id="btn-nav-donate-cta"
            type="button"
            onClick={() => handleNavClick('donate')}
            whileHover={{ scale: 1.04, y: -1.5, borderColor: '#2e5a19' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold text-[#366a1d] bg-white border border-[#366a1d] hover:bg-[#b3f092]/20 transition-all cursor-pointer shadow-2xs"
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            >
              <Heart className="w-4 h-4 text-[#366a1d] fill-[#366a1d]/20" />
            </motion.div>
            <span>Donate</span>
          </motion.button>

          {/* Book a Session CTA (Primary Accent) */}
          <motion.button
            id="btn-nav-book-cta"
            type="button"
            onClick={() => handleNavClick('booking')}
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 8px 20px -4px rgba(0, 72, 114, 0.35)' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white bg-[#004872] hover:bg-[#003453] shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Session</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            id="btn-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-[#121c27] hover:text-[#004872] hover:bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004872]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden bg-white border-b border-[#dfe9f8] px-4 py-5 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-base font-semibold transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? 'bg-[#e4effe] text-[#004872]'
                      : 'text-[#121c27] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#dfe9f8] space-y-2">
              <motion.button
                type="button"
                onClick={() => handleNavClick('booking')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-base font-bold text-white bg-[#004872] hover:bg-[#003453] cursor-pointer shadow-sm"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Session</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleNavClick('donate')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-base font-bold text-[#366a1d] bg-white border-2 border-[#366a1d] cursor-pointer"
              >
                <Heart className="w-5 h-5" />
                <span>Donate to Support</span>
              </motion.button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <motion.button
                  type="button"
                  onClick={() => {
                    onOpenAuthorizedAccess();
                    setMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#004872] bg-[#eef4ff] rounded-lg border border-[#c1c7d0] cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#366a1d]" />
                  Authorized Access
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setAccessibilityOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#004872] bg-[#eef4ff] rounded-lg border border-[#c1c7d0] cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#0074b6]" />
                  Accessibility
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
