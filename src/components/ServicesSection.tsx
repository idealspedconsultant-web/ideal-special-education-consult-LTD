import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Heart, 
  BookOpen, 
  ClipboardCheck, 
  Lightbulb, 
  Megaphone, 
  FileText, 
  Ear,
  Eye,
  ArrowRight,
  CheckCircle,
  X,
  Users,
  Check,
  Calendar
} from 'lucide-react';
import { SERVICES_LIST } from '../data/orgData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'direct-learner' | 'school-educator' | 'family-community'>('all');

  const getServiceIcon = (iconName: string) => {
    const iconClass = "w-6 h-6";
    switch (iconName) {
      case 'Sparkles': return <Sparkles className={iconClass} />;
      case 'GraduationCap': return <GraduationCap className={iconClass} />;
      case 'Building2': return <Building2 className={iconClass} />;
      case 'Heart': return <Heart className={iconClass} />;
      case 'BookOpen': return <BookOpen className={iconClass} />;
      case 'ClipboardCheck': return <ClipboardCheck className={iconClass} />;
      case 'Lightbulb': return <Lightbulb className={iconClass} />;
      case 'Megaphone': return <Megaphone className={iconClass} />;
      case 'FileText': return <FileText className={iconClass} />;
      case 'Ear': return <Ear className={iconClass} />;
      case 'Eye': return <Eye className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  // Filter helper based on service context
  const filteredServices = SERVICES_LIST.filter(s => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'direct-learner') {
      return ['early-intervention', 'learning-support', 'individual-support-plans', 'sensory-and-disability-accessibility', 'deaf-inclusion-and-accessibility'].includes(s.id);
    }
    if (activeFilter === 'school-educator') {
      return ['special-education-consultation', 'school-inclusion-support', 'teacher-training', 'individual-support-plans'].includes(s.id);
    }
    if (activeFilter === 'family-community') {
      return ['parent-guidance-and-support', 'assessment-and-referral-guidance', 'special-needs-awareness-and-advocacy'].includes(s.id);
    }
    return true;
  });

  return (
    <section 
      id="services" 
      aria-label="Core Services of Ideal Special Education Consult LTD"
      className="py-16 md:py-24 bg-[#f7f9ff] border-b border-[#dfe9f8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#004872] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#366a1d]" />
            <span>Comprehensive Educational Offerings</span>
          </div>
          <h2 
            className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Our 10 Core Special Education &amp; Inclusion Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#41474f] font-normal leading-relaxed">
            Tailored professional support across early intervention, educational diagnostics, school inclusion, 
            teacher capacity development, and specialized Deaf accessibility.
          </p>

          {/* Quick Filter Tabs with smooth transitions */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All 10 Services' },
              { id: 'direct-learner', label: 'Learners & Diagnostics' },
              { id: 'school-educator', label: 'Schools & Teachers' },
              { id: 'family-community', label: 'Families & Advocacy' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id 
                    ? 'bg-[#004872] text-white shadow-xs' 
                    : 'bg-white text-[#41474f] hover:bg-[#eef4ff] border border-[#c1c7d0]'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid (10 cards) with staggered motion */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => {
            const isHighlight = service.id === 'deaf-inclusion-and-accessibility' || service.id === 'early-intervention';

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 20px 30px -10px rgba(0, 72, 114, 0.15)',
                  borderColor: '#0074b6' 
                }}
                className={`bg-white rounded-3xl p-6 border transition-colors flex flex-col justify-between shadow-xs ${
                  isHighlight 
                    ? 'border-[#004872]/40 ring-1 ring-[#004872]/20' 
                    : 'border-[#dfe9f8]'
                }`}
              >
                <div>
                  {/* Icon & Index Badge with interactive animation */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className="w-12 h-12 rounded-2xl bg-[#e4effe] text-[#004872] flex items-center justify-center shrink-0 cursor-pointer shadow-2xs"
                    >
                      {getServiceIcon(service.iconName)}
                    </motion.div>
                    <span className="text-xs font-bold text-[#717880] tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#004872] mb-2 leading-snug">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-base text-[#334155] leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Key Deliverables preview (2 bullets) */}
                  <div className="space-y-2 pt-3 border-t border-[#f0f4f9] mb-4">
                    {service.deliverables.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#1e293b]">
                        <Check className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#dfe9f8] flex items-center justify-between gap-2 mt-2">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-sm font-bold text-[#004872] hover:text-[#1b6091] flex items-center gap-1.5 cursor-pointer group py-1"
                    aria-label={`View detailed scope for ${service.title}`}
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => onSelectServiceToBook(service.title)}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Request</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Banner Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          whileHover={{ scale: 1.01 }}
          className="mt-14 p-6 sm:p-8 bg-gradient-to-r from-[#004872] to-[#1b6091] text-white rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold">
              Require a Custom Combination of Services or School Audit?
            </h3>
            <p className="text-sm sm:text-base text-white/90 mt-1 max-w-2xl font-normal">
              We design integrated programs that combine early assessment, classroom inclusion coaching, and family advocacy.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => onSelectServiceToBook('Special Education Consultation')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 px-6 py-3.5 rounded-xl text-sm font-bold text-[#004872] bg-white hover:bg-slate-100 shadow-md transition-all cursor-pointer"
          >
            Speak With Our Consultants
          </motion.button>
        </motion.div>

      </div>

      {/* Service Detail Modal Dialog with AnimatePresence */}
      <AnimatePresence>
        {selectedService && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#dfe9f8] relative"
            >
              {/* Close Button */}
              <motion.button
                type="button"
                onClick={() => setSelectedService(null)}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-black hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#004872] cursor-pointer"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e4effe] text-[#004872] flex items-center justify-center shrink-0">
                  {getServiceIcon(selectedService.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#366a1d] uppercase tracking-wider">
                    Specialized Service
                  </span>
                  <h3 id="service-modal-title" className="font-headline text-xl sm:text-2xl font-bold text-[#004872]">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Full Description */}
              <div className="text-sm sm:text-base text-[#41474f] leading-relaxed mb-6">
                {selectedService.fullDescription}
              </div>

              {/* Deliverables */}
              <div className="mb-6 bg-[#f7f9ff] p-4 rounded-2xl border border-[#e4effe]">
                <h4 className="font-headline text-xs font-bold text-[#004872] uppercase tracking-wider mb-3">
                  Key Scope & Deliverables
                </h4>
                <div className="space-y-2">
                  {selectedService.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#121c27]">
                      <CheckCircle className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Categorization (when applicable, e.g. Early Intervention) */}
              {selectedService.ageCategories && (
                <div className="mb-6 bg-[#f0f9ed] p-4 rounded-2xl border border-[#b3f092]">
                  <h4 className="font-headline text-xs font-bold text-[#2e7d32] uppercase tracking-wider mb-2.5">
                    Age Categorization &amp; Developmental Focus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedService.ageCategories.map((ac, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-[#c8e6c9]">
                        <span className="text-xs font-bold text-[#2e7d32] block">{ac.category}</span>
                        <strong className="text-xs text-[#121c27] block font-semibold">{ac.ageRange}</strong>
                        <p className="text-[11px] text-[#475569] mt-1 leading-snug">{ac.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Beneficiaries */}
              <div className="mb-6">
                <h4 className="font-headline text-xs font-bold text-[#41474f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#004872]" />
                  Primary Beneficiaries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.beneficiaries.map((b, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#eef4ff] text-[#004872] border border-[#c1c7d0]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#dfe9f8] flex flex-wrap items-center justify-between gap-3">
                <motion.button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#41474f] hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onSelectServiceToBook(title);
                  }}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{selectedService.ctaLabel}</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
