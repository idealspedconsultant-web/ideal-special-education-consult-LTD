import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Heart, 
  MapPin, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Ear, 
  Eye, 
  Puzzle, 
  Accessibility, 
  ArrowRight
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';
import { DomainTalkModal, AccessibilityDomainId, DOMAINS_DATA } from './DomainTalkModal';

interface HeroSectionProps {
  onBookSession: (serviceTitle?: string) => void;
  onDonate: () => void;
  onExploreServices: () => void;
  onReplayIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookSession,
  onDonate,
  onExploreServices,
  onReplayIntro,
}) => {
  const [selectedDomainModal, setSelectedDomainModal] = useState<AccessibilityDomainId | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<AccessibilityDomainId>('deaf-hearing');
  return (
    <section 
      id="hero" 
      aria-label="Welcome and Introduction"
      className="relative overflow-hidden bg-gradient-to-b from-[#f7f9ff] via-[#eef4ff] to-[#f7f9ff] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#dfe9f8]"
    >
      {/* Decorative architectural background accents with gentle floating animation */}
      <motion.div 
        animate={{ 
          y: [-15, 15, -15],
          scale: [1, 1.08, 1],
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#cee5ff]/40 blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          y: [15, -15, 15],
          scale: [1, 1.12, 1],
        }}
        transition={{ 
          duration: 11, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#b3f092]/25 blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Actions (7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline: Clean Editorial Kicker (Zero-Pill Discipline) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#004872] uppercase tracking-wider mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#366a1d] shrink-0" />
              <span>{ORGANISATION_INFO.tagline}</span>
            </motion.div>

            {/* Main Headline with text-wrap balance to avoid single-word orphans */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold text-[#004872] leading-[1.16] tracking-tight max-w-3xl"
              style={{ textWrap: 'balance' }}
            >
              Professional, Learner-Centred Special Education &amp; Inclusion Consulting
            </motion.h1>

            {/* Supporting Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-[#41474f] leading-relaxed max-w-2xl font-normal"
            >
              At <strong className="font-semibold text-[#121c27]">Ideal Special Education Consult LTD</strong>, 
              we build a society where every child and youth has access to appropriate education, developmental intervention, 
              classroom accommodations, and an empowering environment to thrive.
            </motion.p>

            {/* Clean Unboxed Location & Contact Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#41474f]"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#366a1d] shrink-0" />
                <span>Opposite LASU Main Campus, Ojo</span>
              </span>
              <span className="text-slate-300 font-bold" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Phone className="w-4 h-4 text-[#004872] shrink-0" />
                <span>08163420864</span>
              </span>
            </motion.div>

            {/* Prominent Call to Action Buttons with Distinct Animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA: Book a Session with vibrant hover bounce */}
              <motion.button
                id="btn-hero-book-session"
                type="button"
                onClick={() => onBookSession()}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3, 
                  boxShadow: '0 12px 25px -4px rgba(0, 72, 114, 0.4)' 
                }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#003453] shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Session</span>
              </motion.button>

              {/* Secondary CTA: Donate to Support with pulsing heart */}
              <motion.button
                id="btn-hero-donate-support"
                type="button"
                onClick={onDonate}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3, 
                  borderColor: '#2e5a19',
                  boxShadow: '0 10px 20px -4px rgba(54, 106, 29, 0.25)' 
                }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-[#366a1d] bg-white border-2 border-[#366a1d] hover:bg-[#b3f092]/15 shadow-xs transition-all cursor-pointer"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                  <Heart className="w-5 h-5 text-[#366a1d] fill-[#366a1d]/20" />
                </motion.div>
                <span>Donate to Support</span>
              </motion.button>

              {/* Tertiary: Explore Services */}
              <motion.button
                id="btn-hero-explore-services"
                type="button"
                onClick={onExploreServices}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#004872] hover:underline cursor-pointer group"
              >
                <span>Explore 10 Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </motion.button>
            </motion.div>

            {/* Trust & Inclusivity Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 pt-6 border-t border-[#dfe9f8] grid grid-cols-2 sm:grid-cols-3 gap-3 w-full"
            >
              {[
                'Evidence-Based IEPs',
                'Certified Specialists',
                'Accessibility Compliant',
              ].map((badge, idx) => (
                <motion.div
                  key={badge}
                  whileHover={{ scale: 1.04, x: 2 }}
                  className="flex items-center gap-2 text-xs text-[#41474f] cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0" />
                  <span className="font-medium">{badge}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Visual Shield Card & Authentic Brand Emblem with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Right Column: Inclusive Classroom Feature Visual */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 45px -12px rgba(0, 72, 114, 0.22)' 
              }}
              className="w-full max-w-lg bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-[#e4effe] relative overflow-hidden transition-all duration-300 group"
            >
              {/* Image Frame with Inclusive Classroom Photograph */}
              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-100 aspect-4/3 bg-[#f0f5ff]">
                <img
                  src="/inclusive-classroom.jpg"
                  alt="Inclusive classroom environment with diverse learners and special education educator engaged in accessible learning"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#004872]/90 backdrop-blur-md text-white shadow-sm border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
                    Inclusive Classroom
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-[#366a1d] shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#366a1d]" />
                    Accessible Learning
                  </span>
                </div>

                {/* Bottom Caption inside Image Frame */}
                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                  <p className="font-headline font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
                    Empowering Every Child Through Inclusive Education
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/90 font-medium mt-0.5 drop-shadow-xs">
                    Individualised Learning • Assistive Tools • Dignified Support
                  </p>
                </div>
              </div>

              {/* Integrated Accessibility Domains: Specific, Distinct & Learner-Focused */}
              <div className="mt-4 pt-3.5 border-t border-[#eef4ff]">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="text-[11px] font-extrabold text-[#004872] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#366a1d]" />
                    <span>Inclusive Learner Domains & Our Vision</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2e7d32] bg-[#e8f5e9] px-2 py-0.5 rounded-full border border-[#c8e6c9]">
                    <span>Click for Photos & Vision</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                  Click on each learner category below to explore authentic photos, what the section covers, and our dedicated vision for them:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {/* 1. Deaf & Hearing (Oceanic Cyan / Blue Theme) */}
                  <motion.button 
                    id="btn-domain-deaf-hearing"
                    type="button"
                    onClick={() => setSelectedDomainModal('deaf-hearing')}
                    onMouseEnter={() => setHoveredDomain('deaf-hearing')}
                    whileHover={{ scale: 1.025, y: -2, boxShadow: '0 8px 18px rgba(0, 116, 182, 0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-2xl transition-all cursor-pointer text-left group border-2 ${
                      hoveredDomain === 'deaf-hearing' 
                        ? 'bg-[#f0f9ff] border-[#0074b6] shadow-xs' 
                        : 'bg-white hover:bg-[#f0f9ff] border-[#bae6fd]'
                    }`}
                    aria-label="Deaf and Hearing Support. Click to open specific photos, vision, and specialist talk"
                  >
                    {/* Learner photo thumbnail + Icon badge */}
                    <div className="relative shrink-0 mt-0.5">
                      <img 
                        src="/learners/deaf-hearing.jpg" 
                        alt="Deaf & Hearing Learners"
                        className="w-10 h-10 rounded-xl object-cover border border-[#bae6fd] shadow-2xs group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[#0074b6] text-white flex items-center justify-center shadow-xs">
                        <Ear className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-xs text-[#004872] block truncate group-hover:text-[#0074b6] transition-colors">
                          Deaf & Hearing
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#0074b6] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <span className="text-[10px] font-bold text-[#0284c7] block truncate">
                        Sign Languages (NSL, BSL, ASL)
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                        Vision: Total Visual-Linguistic Access
                      </span>
                    </div>
                  </motion.button>

                  {/* 2. Vision & Sensory (Forest Emerald Theme) */}
                  <motion.button 
                    id="btn-domain-vision-sensory"
                    type="button"
                    onClick={() => setSelectedDomainModal('vision-sensory')}
                    onMouseEnter={() => setHoveredDomain('vision-sensory')}
                    whileHover={{ scale: 1.025, y: -2, boxShadow: '0 8px 18px rgba(46, 125, 50, 0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-2xl transition-all cursor-pointer text-left group border-2 ${
                      hoveredDomain === 'vision-sensory' 
                        ? 'bg-[#f0fdf4] border-[#2e7d32] shadow-xs' 
                        : 'bg-white hover:bg-[#f0fdf4] border-[#bbf7d0]'
                    }`}
                    aria-label="Vision and Low Vision Support. Click to open specific photos, vision, and specialist talk"
                  >
                    {/* Learner photo thumbnail + Icon badge */}
                    <div className="relative shrink-0 mt-0.5">
                      <img 
                        src="/learners/vision-sensory.jpg" 
                        alt="Visually Impaired Learners"
                        className="w-10 h-10 rounded-xl object-cover border border-[#bbf7d0] shadow-2xs group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[#2e7d32] text-white flex items-center justify-center shadow-xs">
                        <Eye className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-xs text-[#14532d] block truncate group-hover:text-[#2e7d32] transition-colors">
                          Vision & Low Vision
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#2e7d32] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <span className="text-[10px] font-bold text-[#16a34a] block truncate">
                        Braille & Photophobia Support
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                        Vision: Autonomous Mobility
                      </span>
                    </div>
                  </motion.button>

                  {/* 3. Learning Differences (Royal Purple & Violet Theme) */}
                  <motion.button 
                    id="btn-domain-learning-differences"
                    type="button"
                    onClick={() => setSelectedDomainModal('learning-differences')}
                    onMouseEnter={() => setHoveredDomain('learning-differences')}
                    whileHover={{ scale: 1.025, y: -2, boxShadow: '0 8px 18px rgba(124, 58, 237, 0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-2xl transition-all cursor-pointer text-left group border-2 ${
                      hoveredDomain === 'learning-differences' 
                        ? 'bg-[#faf5ff] border-[#7c3aed] shadow-xs' 
                        : 'bg-white hover:bg-[#faf5ff] border-[#e9d5ff]'
                    }`}
                    aria-label="Learning Differences (ADHD, Autism & Dyslexia). Click to open specific photos, vision, and specialist talk"
                  >
                    {/* Learner photo thumbnail + Icon badge */}
                    <div className="relative shrink-0 mt-0.5">
                      <img 
                        src="/learners/learning-differences.jpg" 
                        alt="Neurodivergent Learners"
                        className="w-10 h-10 rounded-xl object-cover border border-[#e9d5ff] shadow-2xs group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[#7c3aed] text-white flex items-center justify-center shadow-xs">
                        <Puzzle className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-xs text-[#581c87] block truncate group-hover:text-[#7c3aed] transition-colors">
                          Learning Differences
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#7c3aed] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <span className="text-[10px] font-bold text-[#9333ea] block truncate">
                        ADHD, Autism & Phonics
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                        Vision: Celebrated Brilliance
                      </span>
                    </div>
                  </motion.button>

                  {/* 4. Physical Access (Deep Royal Navy Theme) */}
                  <motion.button 
                    id="btn-domain-physical-access"
                    type="button"
                    onClick={() => setSelectedDomainModal('physical-access')}
                    onMouseEnter={() => setHoveredDomain('physical-access')}
                    whileHover={{ scale: 1.025, y: -2, boxShadow: '0 8px 18px rgba(0, 72, 114, 0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-start gap-2.5 p-2.5 rounded-2xl transition-all cursor-pointer text-left group border-2 ${
                      hoveredDomain === 'physical-access' 
                        ? 'bg-[#eff6ff] border-[#004872] shadow-xs' 
                        : 'bg-white hover:bg-[#eff6ff] border-[#bfdbfe]'
                    }`}
                    aria-label="Physical and Mobility Access. Click to open specific photos, vision, and specialist talk"
                  >
                    {/* Learner photo thumbnail + Icon badge */}
                    <div className="relative shrink-0 mt-0.5">
                      <img 
                        src="/learners/physical-access.jpg" 
                        alt="Physical & Mobility Learners"
                        className="w-10 h-10 rounded-xl object-cover border border-[#bfdbfe] shadow-2xs group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[#004872] text-white flex items-center justify-center shadow-xs">
                        <Accessibility className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-xs text-[#004872] block truncate group-hover:text-[#0284c7] transition-colors">
                          Physical Access
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#004872] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <span className="text-[10px] font-bold text-[#0369a1] block truncate">
                        Ramps & Fine Motor Posture
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                        Vision: 100% Barrier-Free
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Dynamic Active Spotlight Preview Bar */}
              {hoveredDomain && DOMAINS_DATA[hoveredDomain] && (
                <div className={`mt-3 p-3 rounded-2xl border transition-all ${DOMAINS_DATA[hoveredDomain].lightBg} ${DOMAINS_DATA[hoveredDomain].borderColor}`}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#004872] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#366a1d] animate-pulse" />
                      <span>Spotlight: {DOMAINS_DATA[hoveredDomain].title}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedDomainModal(hoveredDomain)}
                      className="text-[11px] font-bold text-[#004872] hover:text-[#0074b6] underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Gallery & Vision</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 italic leading-snug line-clamp-2">
                    "{DOMAINS_DATA[hoveredDomain].ourVisionToThem.statement}"
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Interactive Domain Talk & Audio Modal */}
      {selectedDomainModal && (
        <DomainTalkModal
          initialDomainId={selectedDomainModal}
          isOpen={Boolean(selectedDomainModal)}
          onClose={() => setSelectedDomainModal(null)}
          onBookDomainSession={(serviceTitle) => {
            setSelectedDomainModal(null);
            onBookSession(serviceTitle);
          }}
        />
      )}
    </section>
  );
};
