import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  FileCheck2, 
  X, 
  ExternalLink,
  BookOpen,
  School,
  Heart,
  HelpCircle,
  CheckCircle2,
  Users
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenAuthorizedAccess?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // 4 Core Pillars (enticing summary without dumping 10 full services on the front page)
  const corePillars = [
    {
      id: 'iep',
      icon: <BookOpen className="w-6 h-6 text-[#004872]" />,
      title: 'Individualized Education Programs (IEP)',
      description: 'Comprehensive learner profiles, curriculum accommodations, and measurable developmental milestone tracking tailored to each child.',
      actionLabel: 'Learn About IEP Services',
      targetService: 'Individualized Support Plans (ISP) / IEP Development',
    },
    {
      id: 'inclusion',
      icon: <School className="w-6 h-6 text-[#366a1d]" />,
      title: 'Inclusive School & Classroom Audits',
      description: 'Institutional assessments evaluating physical accessibility, sensory accommodations, and inclusive pedagogical strategies for schools.',
      actionLabel: 'Explore School Audits',
      targetService: 'Inclusive School Environment Audits & Advisory',
    },
    {
      id: 'deaf-access',
      icon: <Users className="w-6 h-6 text-[#0074b6]" />,
      title: 'Deaf Accessibility & Sign Language',
      description: 'Specialized instruction in Nigerian Sign Language (NSL), British Sign Language (BSL), and American Sign Language (ASL) with certified interpreters.',
      actionLabel: 'View Deaf Services',
      targetService: 'Deaf Education & Sign Language Accessibility',
    },
    {
      id: 'training',
      icon: <Sparkles className="w-6 h-6 text-[#854d0e]" />,
      title: 'Educator Training & Family Guidance',
      description: 'Practical capacity-building workshops for teachers, and compassionate, empowering guidance for parents and families.',
      actionLabel: 'Discover Educator Training',
      targetService: 'Teacher & Staff Capacity Building (CPD)',
    },
  ];

  // 3 Primary Exploration Pathways
  const explorationPathways = [
    {
      page: 'services',
      title: 'Our 10 Core Services',
      badge: 'Comprehensive Offerings',
      description: 'Explore our full spectrum of specialized solutions from diagnostic evaluations to assistive technology integration.',
      cta: 'Explore All 10 Services',
      color: 'border-l-4 border-l-[#004872]',
    },
    {
      page: 'booking',
      title: 'Book a Consultation',
      badge: 'Intake & Appointments',
      description: 'Schedule an in-person consultation at our Ojo, Lagos clinic or request a secure virtual session nationwide and diaspora.',
      cta: 'Schedule an Appointment',
      color: 'border-l-4 border-l-[#366a1d]',
    },
    {
      page: 'donate',
      title: 'Support Inclusive Education',
      badge: 'Donations & Sponsorship',
      description: 'Partner with us to provide specialized educational resources and intervention for vulnerable and underserved learners.',
      cta: 'Make a Contribution',
      color: 'border-l-4 border-l-[#854d0e]',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#f7f9ff]">
      
      {/* =========================================================================
          1. HERO SECTION: Clean, welcoming, uncluttered, enticing
          ========================================================================= */}
      <section 
        aria-label="Welcome to Ideal Special Education Consult LTD"
        className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-[#dfe9f8] bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Tagline Kicker */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#366a1d] uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 text-[#366a1d] shrink-0" />
                <span>{ORGANISATION_INFO.tagline}</span>
              </div>

              {/* Main Headline with balanced wrap and Atkinson Hyperlegible */}
              <h1 
                className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004872] leading-[1.18] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Special Education &amp; Inclusion Consulting Tailored for Every Learner
              </h1>

              {/* Concise Description */}
              <p className="mt-5 text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl font-normal">
                At <strong className="font-bold text-[#121c27]">Ideal Special Education Consult LTD</strong>, 
                we advance educational equity and empower learners of all abilities. We partner with families, schools, 
                and organizations to provide individualized support plans, diagnostic evaluations, and inclusive educational frameworks.
              </p>

              {/* Location & Quick Contact - High Contrast Uniform Text */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#334155] font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#366a1d] shrink-0" />
                  <span>Opposite LASU Main Campus, Ojo, Lagos</span>
                </span>
                <span className="text-slate-300 font-bold" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#004872] shrink-0" />
                  <span>08163420864</span>
                </span>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <motion.button
                  id="btn-home-explore-services"
                  type="button"
                  onClick={() => onNavigate('services')}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  id="btn-home-book-consultation"
                  type="button"
                  onClick={() => onNavigate('booking')}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-base font-bold text-[#366a1d] bg-[#f0f9ed] hover:bg-[#e2f5dc] border-2 border-[#366a1d] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Consultation</span>
                </motion.button>
              </div>

              {/* Quick Trust Checklist */}
              <div className="mt-8 pt-6 border-t border-[#e2e8f0] w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0" />
                  <span>Certified Consultants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0" />
                  <span>RC Verified: 9820096</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0" />
                  <span>Virtual &amp; In-Person</span>
                </div>
              </div>

            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-lg border border-[#dfe9f8] bg-slate-50">
                <img
                  src="/inclusive-classroom.jpg"
                  alt="Inclusive classroom environment with teacher and diverse learners"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004872]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b3f092] mb-1">
                    Learner-Centred Inclusion
                  </span>
                  <h3 className="font-headline text-lg sm:text-xl font-bold leading-snug">
                    Unlocking Every Child's Potential
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-1">
                    Specialized learning interventions tailored for neurodiverse students, sensory needs, and diverse abilities.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CORE PILLARS OF SUPPORT: Enticing overview of primary focus areas
          ========================================================================= */}
      <section 
        aria-label="Core Pillars of Support"
        className="py-16 sm:py-20 bg-[#f7f9ff] border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-[#366a1d] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#366a1d]" />
              <span>Areas of Practice</span>
            </div>
            <h2 
              className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              How We Support Learners, Families &amp; Schools
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
              We provide structured, research-backed support designed to break down barriers and promote unconditional belonging.
            </p>
          </div>

          {/* 4 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {corePillars.map((pillar) => (
              <motion.div
                key={pillar.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dfe9f8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f0f4fa] flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#004872] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-[#334155] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#004872] hover:text-[#0074b6] transition-colors cursor-pointer group"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central CTA to View All Services */}
          <div className="mt-12 text-center">
            <motion.button
              type="button"
              onClick={() => onNavigate('services')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-xs transition-colors cursor-pointer"
            >
              <span>Explore All 10 Special Education Services</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <p className="text-sm text-[#475569] mt-2.5">
              Review diagnostic testing, early intervention, Deaf accessibility, and school audits on our dedicated Services page.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. CORPORATE TRUST & CAC REGISTRATION: Clear legal mandate with Certificate
          ========================================================================= */}
      <section 
        aria-label="Official Corporate Registration and Accreditation"
        className="py-12 sm:py-16 bg-white border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#004872] via-[#003453] to-[#004872] text-white p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <ShieldCheck className="w-7 h-7 text-[#b3f092]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#b3f092] uppercase tracking-wider block">
                  Official Corporate Accreditation
                </span>
                <h3 className="font-headline text-xl sm:text-2xl font-bold mt-0.5">
                  Ideal Special Education Consult LTD
                </h3>
                <p className="text-sm text-white/85 mt-1 max-w-xl leading-relaxed">
                  Incorporated under the Companies and Allied Matters Act 2020. Registration Number: <strong>RC 9820096</strong> · TIN: <strong>2622469536287</strong>.
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              id="btn-home-view-cac-cert"
              onClick={() => setShowCertificateModal(true)}
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
              whileTap={{ scale: 0.96 }}
              className="shrink-0 flex items-center gap-2 bg-white/15 hover:bg-white/25 px-5 py-3 rounded-xl border border-white/30 text-sm font-bold text-white transition-all cursor-pointer shadow-xs focus:ring-2 focus:ring-[#b3f092]"
              aria-haspopup="dialog"
              aria-label="View official Certificate of Incorporation from Corporate Affairs Commission"
            >
              <FileCheck2 className="w-4 h-4 text-[#b3f092]" />
              <span>View Certificate of Incorporation</span>
            </motion.button>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. EXPLORATION PATHWAYS: Options for visitors to explore dedicated pages
          ========================================================================= */}
      <section 
        aria-label="Explore Dedicated Pages"
        className="py-16 sm:py-20 bg-[#f7f9ff] border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 
              className="font-headline text-2xl sm:text-3xl font-extrabold text-[#004872] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Explore Our Dedicated Portals
            </h2>
            <p className="mt-2 text-base text-[#334155]">
              Select a section to learn more, schedule an appointment, or make an impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {explorationPathways.map((path) => (
              <motion.div
                key={path.page}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#dfe9f8] shadow-xs flex flex-col justify-between ${path.color}`}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    {path.badge}
                  </span>
                  <h3 className="font-headline text-xl font-bold text-[#004872] mb-2">
                    {path.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <motion.button
                    type="button"
                    onClick={() => onNavigate(path.page)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-[#004872] bg-[#f0f4fa] hover:bg-[#e2eaf5] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{path.cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#004872]" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. CALL TO ACTION & ASSISTANCE: Friendly closure inviting dialogue
          ========================================================================= */}
      <section 
        aria-label="Connect With Our Special Education Team"
        className="py-14 sm:py-16 bg-white border-b border-[#dfe9f8]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#366a1d] uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Have Questions About Your Child or Student?</span>
          </div>
          <h2 
            className="font-headline text-2xl sm:text-3xl font-extrabold text-[#004872] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            We Are Here to Listen, Guide, and Support
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mx-auto">
            Whether you need a confidential diagnostic evaluation, guidance on classroom accommodations, or sign language support, our consultants are ready to assist.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={() => onNavigate('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] transition-colors cursor-pointer"
            >
              Contact Our Office
            </motion.button>

            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult%20LTD,%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl text-base font-bold text-[#366a1d] bg-[#f0f9ed] hover:bg-[#e2f5dc] border border-[#366a1d] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => onNavigate('faq')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Read Common FAQs
            </motion.button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAC CERTIFICATE OF INCORPORATION MODAL (Clean, no download/print)
          ========================================================================= */}
      <AnimatePresence>
        {showCertificateModal && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-cac-cert-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004872] text-[#b3f092] flex items-center justify-center shrink-0 shadow-2xs">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#366a1d] uppercase tracking-wider block">
                      Federal Republic of Nigeria • Corporate Affairs Commission
                    </span>
                    <h3 id="home-cac-cert-title" className="font-headline text-lg sm:text-xl font-bold text-[#004872]">
                      Certificate of Incorporation
                    </h3>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl text-slate-400 hover:text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#004872] cursor-pointer shrink-0"
                  aria-label="Close certificate dialog"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Certificate Image Frame */}
              <div className="my-4">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner flex items-center justify-center p-2 sm:p-3">
                  <img
                    src="/certificate-cac.jpg"
                    alt="Certificate of Incorporation for Ideal Special Education Consult Ltd - RC 9820096, Tax Identification Number 2622469536287"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[58vh] object-contain rounded-xl shadow-xs"
                    loading="eager"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b3f092]" />
                    <span>Certified CAC Official Document</span>
                  </div>
                </div>
              </div>

              {/* Verified Corporate Information Grid */}
              <div className="bg-[#f7f9ff] rounded-2xl p-4 border border-[#e4effe] mb-4 text-xs space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-[#dfe9f8]">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Registered Entity Name</span>
                    <strong className="text-slate-900 text-xs sm:text-sm font-bold">IDEAL SPECIAL EDUCATION CONSULT LTD</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Registration Number</span>
                    <strong className="text-[#004872] font-mono text-xs sm:text-sm font-bold">RC NO. 9820096</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Tax Identification Number (TIN)</span>
                    <strong className="text-slate-800 font-mono text-xs font-semibold">2622469536287</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Statute &amp; Jurisdiction</span>
                    <span className="text-slate-700 text-xs">Companies &amp; Allied Matters Act 2020</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Clean, no download/print buttons) */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href="/certificate-cac.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#004872] bg-[#eef4ff] hover:bg-[#e4effe] border border-[#b3d8ff] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Full Resolution</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
