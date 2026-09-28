import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Compass, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  Smile, 
  Lock, 
  Users, 
  Check, 
  Sparkles,
  Building,
  X,
  ExternalLink,
  FileCheck2,
  Calendar,
  Eye
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';

export const AboutSection: React.FC = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const iconMap: Record<string, React.ReactNode> = {
    HeartHandshake: <HeartHandshake className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    Award: <Award className="w-5 h-5" />,
    Smile: <Smile className="w-5 h-5" />,
    Lock: <Lock className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
  };

  return (
    <section 
      id="about" 
      aria-label="About Ideal Special Education Consult LTD"
      className="py-16 md:py-24 bg-white border-b border-[#dfe9f8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#004872] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#366a1d]" />
            <span>About Our Organisation</span>
          </div>
          <h2 
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Advancing Equity, Inclusion, &amp; Individualized Support
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#41474f] font-normal leading-relaxed">
            <strong className="text-[#121c27]">Ideal Special Education Consult LTD</strong> provides professional, accessible, and 
            learner-centred special education consulting services tailored to learners, families, schools, teachers, and organisations.
          </p>
        </motion.div>

        {/* Vision & Mission Cards with distinct hover elevations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -8, 
              boxShadow: '0 20px 30px -10px rgba(0, 72, 114, 0.15)',
              borderColor: '#0074b6'
            }}
            className="bg-[#f7f9ff] rounded-3xl p-6 sm:p-8 border border-[#e4effe] relative flex flex-col justify-between shadow-xs transition-colors cursor-default"
          >
            <div>
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-[#004872] text-white flex items-center justify-center mb-5 shadow-xs cursor-pointer"
              >
                <Compass className="w-6 h-6" />
              </motion.div>
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#004872]">Our Vision</span>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#121c27] mt-1 mb-4">
                A Society Where Every Learner Can Thrive
              </h3>
              <p className="text-base sm:text-lg text-[#1e293b] leading-relaxed italic">
                "{ORGANISATION_INFO.vision}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dfe9f8] text-sm font-semibold text-[#004872] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#366a1d]" />
              Guided by human dignity, equity, and educational rights.
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              y: -8, 
              boxShadow: '0 20px 30px -10px rgba(54, 106, 29, 0.15)',
              borderColor: '#4caf50'
            }}
            className="bg-[#f7f9ff] rounded-3xl p-6 sm:p-8 border border-[#e4effe] relative flex flex-col justify-between shadow-xs transition-colors cursor-default"
          >
            <div>
              <motion.div 
                whileHover={{ rotate: -15, scale: 1.1 }}
                className="w-12 h-12 rounded-2xl bg-[#366a1d] text-white flex items-center justify-center mb-5 shadow-xs cursor-pointer"
              >
                <Target className="w-6 h-6" />
              </motion.div>
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#366a1d]">Our Mission</span>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#121c27] mt-1 mb-4">
                Accessible, Learner-Centred Special Education Services
              </h3>
              <p className="text-base sm:text-lg text-[#1e293b] leading-relaxed italic">
                "{ORGANISATION_INFO.mission}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dfe9f8] text-sm font-semibold text-[#366a1d] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#366a1d]" />
              Supporting families, educators, and schools with excellence.
            </div>
          </motion.div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#366a1d]">Foundational Principles</span>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#004872] mt-1">
              Our Six Core Values
            </h3>
            <p className="mt-2 text-base text-[#334155]">
              Every evaluation, consultation, individual support plan, and school partnership is rooted in these non-negotiable principles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ORGANISATION_INFO.coreValues.map((val, idx) => (
              <motion.div 
                key={val.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02, 
                  boxShadow: '0 12px 24px -6px rgba(0, 72, 114, 0.12)',
                  borderColor: '#0074b6'
                }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#dfe9f8] hover:border-[#0074b6] transition-all cursor-default shadow-xs"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    className="w-12 h-12 rounded-xl bg-[#e4effe] text-[#004872] flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    {iconMap[val.icon] || <Award className="w-6 h-6" />}
                  </motion.div>
                  <h4 className="font-headline text-lg sm:text-xl font-bold text-[#004872]">
                    {val.name}
                  </h4>
                </div>
                <p className="text-base text-[#334155] leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Trust & Legal Mandate Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          whileHover={{ scale: 1.01 }}
          className="rounded-3xl bg-gradient-to-r from-[#004872] via-[#003453] to-[#004872] text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20"
            >
              <Building className="w-6 h-6 text-[#b3f092]" />
            </motion.div>
            <div>
              <h4 className="font-headline text-lg sm:text-xl font-bold">
                Registered Special Education Consultancy
              </h4>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Serving the educational ecosystem across Nigeria through individual learner assessments, inclusive classroom frameworks, 
                and institutional accessibility capacity building.
              </p>
            </div>
          </div>

          {/* Interactive Button to View Official Certificate */}
          <motion.button 
            type="button"
            id="btn-view-cac-certificate"
            onClick={() => setShowCertificateModal(true)}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2.5 rounded-xl border border-white/30 text-xs font-bold text-white transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#b3f092]"
            aria-haspopup="dialog"
            aria-expanded={showCertificateModal}
            aria-label="View official Certificate of Incorporation (RC: 9820096)"
          >
            <ShieldCheck className="w-4 h-4 text-[#b3f092] shrink-0" />
            <span>RC Verified Entity · View Certificate</span>
          </motion.button>
        </motion.div>

        {/* Official CAC Certificate of Incorporation Modal */}
        <AnimatePresence>
          {showCertificateModal && (
            <div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="cac-certificate-modal-title"
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
                      <h3 id="cac-certificate-modal-title" className="font-headline text-lg sm:text-xl font-bold text-[#004872]">
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
                      alt="Certificate of Incorporation for Ideal Special Education Consult Ltd - RC 9820096"
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
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Issuing Authority</span>
                      <strong className="text-slate-800 text-xs font-semibold">Corporate Affairs Commission (CAC), Abuja</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Statute &amp; Jurisdiction</span>
                      <span className="text-slate-700 text-xs">Companies &amp; Allied Matters Act 2020</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions - Download & Print removed per user request */}
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
    </section>
  );
};
