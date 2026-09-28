/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrandLoadingScreen, BrandLazyLoader } from './components/BrandLoadingScreen';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { EarlyInterventionPage } from './components/EarlyInterventionPage';
import { InclusiveExpertisePage } from './components/InclusiveExpertisePage';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection } from './components/BookingSection';
import { DonationSection } from './components/DonationSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { PastEventsSection } from './components/PastEventsSection';

// Lazy-loaded modals using branded lazy loading fallback
const AuthorizedAccessModal = lazy(() => 
  import('./components/AuthorizedAccessModal').then(module => ({ default: module.AuthorizedAccessModal }))
);

export type PageId = 
  | 'home' 
  | 'early-intervention' 
  | 'inclusive-expertise' 
  | 'past-events'
  | 'services' 
  | 'about' 
  | 'booking' 
  | 'donate' 
  | 'faq' 
  | 'contact';

export default function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  
  // Accessibility state for persons with visual impairments
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState<'normal' | 'large' | 'xl'>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Modals state
  const [authorizedAccessOpen, setAuthorizedAccessOpen] = useState(false);
  
  const validPages: PageId[] = [
    'home', 
    'early-intervention', 
    'inclusive-expertise', 
    'past-events',
    'services', 
    'about', 
    'booking', 
    'donate', 
    'faq', 
    'contact'
  ];

  // Hash & History synchronization for browser back/forward and direct bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      } else if (hash === 'hero') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Synchronize accessibility classes to html element
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }

    root.classList.remove('text-scale-large', 'text-scale-xl');
    if (textScale === 'large') {
      root.classList.add('text-scale-large');
    } else if (textScale === 'xl') {
      root.classList.add('text-scale-xl');
    }
  }, [highContrast, textScale]);

  // Page navigation handler
  const handleNavigate = (pageId: string) => {
    const target = pageId === 'hero' ? 'home' : pageId;
    if (validPages.includes(target as PageId)) {
      setCurrentPage(target as PageId);
      window.location.hash = target;
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Pre-select service and navigate to dedicated booking page
  const handleSelectServiceToBook = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    handleNavigate('booking');
  };

  return (
    <div className={`min-h-screen bg-[#f7f9ff] text-[#121c27] flex flex-col font-body ${reducedMotion ? 'motion-reduce' : ''}`}>
      
      {/* 4-Dot Brand Loading Screen with smooth exit */}
      {showLoadingScreen && (
        <BrandLoadingScreen 
          onComplete={() => setShowLoadingScreen(false)} 
        />
      )}

      {/* Accessible Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#004872] focus:text-white focus:font-bold focus:rounded-md shadow-lg"
      >
        Skip directly to main content
      </a>

      {/* Navigation Bar & Accessibility Toolbar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={currentPage}
        onOpenAuthorizedAccess={() => setAuthorizedAccessOpen(true)}
        onReplayLoading={() => setShowLoadingScreen(true)}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        textScale={textScale}
        setTextScale={setTextScale}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
      />

      {/* =========================================================================
          MAIN CONTENT: Dedicated Pages Architecture
          Calm Front Page + Dedicated Subpages for Early Intervention,
          Inclusive Expertise, Services, Booking, About, Donation, FAQ, and Contact.
          ========================================================================= */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        
        {/* 1. FRONT PAGE: Calm, Enticing, Exploration Portals */}
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAuthorizedAccess={() => setAuthorizedAccessOpen(true)}
          />
        )}

        {/* 2. DEDICATED EARLY INTERVENTION PAGE */}
        {currentPage === 'early-intervention' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Early Intervention Framework</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleSelectServiceToBook('Early Intervention Support & Developmental Screening')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#004872] px-4 py-2 rounded-xl hover:bg-[#1b6091] transition-colors cursor-pointer shadow-2xs"
                >
                  Book Early Assessment →
                </button>
              </div>
            </nav>

            <EarlyInterventionPage
              onNavigate={handleNavigate}
              onBookSession={handleSelectServiceToBook}
            />
          </div>
        )}

        {/* 3. DEDICATED INCLUSIVE EXPERTISE PAGE (All Disabilities) */}
        {currentPage === 'inclusive-expertise' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Inclusive Expertise Across Disabilities</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('booking')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#004872] px-4 py-2 rounded-xl hover:bg-[#1b6091] transition-colors cursor-pointer shadow-2xs"
                >
                  Book Specialist Session →
                </button>
              </div>
            </nav>

            <InclusiveExpertisePage
              onNavigate={handleNavigate}
              onBookSession={handleSelectServiceToBook}
            />
          </div>
        )}

        {/* 4. PAST EVENTS, TALKS & PROGRAMS PAGE: Slideshow & Archive */}
        {currentPage === 'past-events' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Events &amp; Programs</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('booking')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#004872] px-4 py-2 rounded-xl hover:bg-[#1b6091] transition-colors cursor-pointer shadow-2xs"
                >
                  Invite Us to Speak →
                </button>
              </div>
            </nav>

            <PastEventsSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* 5. OUR SERVICES PAGE: Dedicated 10 Core Services with Category Filters */}
        {currentPage === 'services' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Our Services</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('booking')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#004872] px-4 py-2 rounded-xl hover:bg-[#1b6091] transition-colors cursor-pointer shadow-2xs"
                >
                  Book a Consultation →
                </button>
              </div>
            </nav>

            <ServicesSection
              onSelectServiceToBook={handleSelectServiceToBook}
            />
          </div>
        )}

        {/* 5. ABOUT US PAGE: Mission, Vision, Core Values, CAC Certificate */}
        {currentPage === 'about' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">About Us</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('services')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#004872] bg-white border border-[#b3d8ff] px-4 py-2 rounded-xl hover:bg-[#e4effe] transition-colors cursor-pointer"
                >
                  View Our Services →
                </button>
              </div>
            </nav>

            <AboutSection />
          </div>
        )}

        {/* 6. BOOKING PAGE: Dedicated Consultation Booking & Intake Workflow */}
        {currentPage === 'booking' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Book a Consultation</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('services')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#004872] bg-white border border-[#b3d8ff] px-4 py-2 rounded-xl hover:bg-[#e4effe] transition-colors cursor-pointer"
                >
                  Browse Services First →
                </button>
              </div>
            </nav>

            <BookingSection
              preselectedService={preselectedService}
              onClearPreselectedService={() => setPreselectedService(undefined)}
              onOpenAuthorizedAccess={() => setAuthorizedAccessOpen(true)}
            />
          </div>
        )}

        {/* 7. DONATE PAGE: Dedicated Support & Contribution Portal */}
        {currentPage === 'donate' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#366a1d]" aria-current="page">Donate &amp; Support</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#004872] bg-white border border-[#b3d8ff] px-4 py-2 rounded-xl hover:bg-[#e4effe] transition-colors cursor-pointer"
                >
                  ← Return to Home
                </button>
              </div>
            </nav>

            <DonationSection />
          </div>
        )}

        {/* 8. FAQ PAGE: Searchable Knowledge Base & Objections */}
        {currentPage === 'faq' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Frequently Asked Questions</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('booking')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#004872] px-4 py-2 rounded-xl hover:bg-[#1b6091] transition-colors cursor-pointer shadow-2xs"
                >
                  Book a Consultation →
                </button>
              </div>
            </nav>

            <FAQSection
              onBookSession={() => handleNavigate('booking')}
            />
          </div>
        )}

        {/* 9. CONTACT PAGE: Direct Communications & Ojo Lagos Location */}
        {currentPage === 'contact' && (
          <div>
            <nav aria-label="Breadcrumb" className="bg-[#eef4ff] border-b border-[#dfe9f8] py-4 px-4 sm:px-8">
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm sm:text-base">
                <ol className="flex items-center gap-2 text-[#334155]">
                  <li>
                    <button 
                      type="button" 
                      onClick={() => handleNavigate('home')} 
                      className="hover:text-[#004872] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <HomeIcon className="w-4 h-4" />
                      <span>Home</span>
                    </button>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </li>
                  <li>
                    <span className="font-bold text-[#004872]" aria-current="page">Contact &amp; Location</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={() => handleNavigate('booking')}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#366a1d] bg-[#f0f9ed] border border-[#366a1d] px-4 py-2 rounded-xl hover:bg-[#e2f5dc] transition-colors cursor-pointer"
                >
                  Schedule Appointment →
                </button>
              </div>
            </nav>

            <ContactSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAuthorizedAccess={() => setAuthorizedAccessOpen(true)}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
      />

      {/* Authorized Access & Assessment Modal (Lazy Loaded with Brand Lazy Loader) */}
      <Suspense fallback={authorizedAccessOpen ? <BrandLazyLoader message="Verifying Authorized Access Credentials..." /> : null}>
        {authorizedAccessOpen && (
          <AuthorizedAccessModal
            isOpen={authorizedAccessOpen}
            onClose={() => setAuthorizedAccessOpen(false)}
          />
        )}
      </Suspense>

      {/* Back to Top Button */}
      <BackToTop 
        reducedMotion={reducedMotion}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
      />

    </div>
  );
}
