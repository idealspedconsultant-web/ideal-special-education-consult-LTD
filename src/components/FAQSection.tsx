import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  GraduationCap,
  Ear,
  Heart,
  Calendar,
  Phone
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';

interface FAQItem {
  id: string;
  category: 'iep' | 'inclusion' | 'early-intervention' | 'deaf-access' | 'general';
  question: string;
  answer: string;
  keyPoints?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What core services does a Special Education Consultant provide?',
    answer: 'A special education consultant provides specialized diagnostic evaluations, classroom observation profiles, Individual Support Plan (ISP/IEP) formulation, school inclusion audits, teacher capacity development, and family psychoeducation. Rather than a one-size-fits-all approach, we bridge the gap between educational clinical standards and the daily classroom realities in Nigeria and West Africa.',
    keyPoints: [
      'Comprehensive educational observation and baseline assessment',
      'Whole-school inclusion auditing and sensory environment adaptations',
      'Teacher CPD workshops on differentiated learning techniques',
      'Empathetic parent advocacy and home routine guidance'
    ]
  },
  {
    id: 'faq-2',
    category: 'iep',
    question: 'What is an Individual Support Plan (ISP) or IEP, and how is it created?',
    answer: 'An Individual Support Plan (ISP) or Individualized Education Program (IEP) is a formal, legally grounded educational blueprint designed for a specific learner. At Ideal SpEd Consult, we assemble baseline diagnostic observations, assess sensory and cognitive profiles, and partner with parents and educators to establish measurable SMART (Specific, Measurable, Achievable, Relevant, Time-bound) targets.',
    keyPoints: [
      'Baseline strength and difficulty mapping',
      'Customized termly learning objectives and modified evaluation rubrics',
      'Examination concessions (e.g. extra time, reader/scribe, quiet testing room)',
      'Quarterly multi-stakeholder progress reviews'
    ]
  },
  {
    id: 'faq-3',
    category: 'early-intervention',
    question: 'Why is Early Intervention so crucial for children with developmental delays?',
    answer: 'The foundational years from infancy to age six represent the most malleable period of brain development. Early intervention targets communication lags, sensory processing differences, and fine motor delays before they evolve into severe academic frustrations. By equipping parents with structured play routines and sensory integration exercises at home, children make significant cognitive strides.',
    keyPoints: [
      'Capitalizes on peak developmental neural plasticity (ages 0–6)',
      'Prevents secondary emotional distress and behavioral challenges',
      'Equips parents with practical home stimulation strategies',
      'Prepares toddlers for smooth preschool and nursery school inclusion'
    ]
  },
  {
    id: 'faq-4',
    category: 'inclusion',
    question: 'How do you support mainstream schools in implementing genuine inclusion?',
    answer: 'Mainstream schools frequently seek to be inclusive but face challenges with classroom management, large class sizes, or sensory overload. Ideal Special Education Consult conducts institutional inclusion audits, evaluates physical and acoustic accessibility, coaches shadow teachers, and trains classroom teachers in differentiated instructional design.',
    keyPoints: [
      'Step-by-step whole-school inclusion readiness roadmap',
      'Continuous coaching for shadow teachers and learning assistants',
      'Sensory-friendly environmental redesign (lighting, quiet zones, acoustics)',
      'Peer neurodiversity sensitization to eliminate bullying and stigma'
    ]
  },
  {
    id: 'faq-5',
    category: 'deaf-access',
    question: 'What specialized support is offered for Deaf and hard-of-hearing learners?',
    answer: 'We provide trilingual sign language facilitation across Nigerian Sign Language (NSL) for the national curriculum (WAEC, NECO, JAMB), British Sign Language (BSL) for Cambridge and British international schools, and American Sign Language (ASL) for American curricula. We also conduct acoustic dampening audits to mitigate noise from ceiling fans and generators, ensuring optimal use of residual hearing.',
    keyPoints: [
      'Trilingual sign literacy: NSL, BSL (two-handed fingerspelling), and ASL',
      'Curriculum-aligned signing for national and international examinations',
      'Acoustic noise-dampening guidance for classrooms and halls',
      'Deaf culture empowerment and visual bilingual-bicultural literacy'
    ]
  },
  {
    id: 'faq-6',
    category: 'iep',
    question: 'How do you support learners diagnosed with ADHD, Autism Spectrum, or Dyslexia?',
    answer: 'Our approach is rooted in neurodiversity-affirming pedagogy. For ADHD, we introduce structured visual timers, movement breaks, and executive functioning scaffolds. For autistic learners, we establish predictable visual schedules and low-sensory environments. For dyslexia and dyscalculia, our learning support specialists deploy multisensory Orton-Gillingham-aligned phonics and concrete-to-abstract mathematical models.',
    keyPoints: [
      'Multisensory phonics and evidence-based literacy remediation',
      'Executive function training: task chunking, timers, and visual organizers',
      'Sensory regulation strategies and non-punitive behavioral support',
      'Universal Design for Learning (UDL) classroom frameworks'
    ]
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'How does a parent or school schedule an appointment or audit?',
    answer: 'You can submit a consultation request directly through our online Booking portal on this website, send a message to our official WhatsApp line (0816 342 0864), or email idealspedconsultant@gmail.com. Submitting a request initiates a triage process where our consulting desk reviews your inquiry and contacts you within 24 to 48 hours to confirm specialist availability.',
    keyPoints: [
      'Convenient online booking form with instant reference confirmation',
      'Direct WhatsApp channel for quick enquiries and consultations',
      'Triage and specialist matching within 24–48 business hours',
      'Options for in-person evaluations or remote tele-consultations'
    ]
  },
  {
    id: 'faq-8',
    category: 'general',
    question: 'Where is Ideal Special Education Consult LTD located, and do you offer remote sessions?',
    answer: 'Our physical consultation office is strategically located opposite the main campus of Lagos State University (LASU) in Ojo, Lagos State, Nigeria. We provide in-person clinical observations and school visits across Lagos and neighboring states, as well as secure virtual consultations, sign-supported video conferences, and remote IEP reviews for clients nationwide and across the diaspora.',
    keyPoints: [
      'Physical Office: Opposite LASU Main Gate, Ojo Axis, Lagos',
      'On-site school audits and classroom observations across Nigeria',
      'Fully accessible remote video consultations (with sign language support)',
      'Diaspora family consultations and educational placement advisory'
    ]
  }
];

interface FAQSectionProps {
  onBookSession: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onBookSession }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Keep first question expanded by default
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery = 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.keyPoints && item.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section 
      id="faq" 
      aria-label="Frequently Asked Questions about Special Education"
      className="py-16 md:py-24 bg-[#f7f9ff] border-b border-[#dfe9f8] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e4effe] text-xs font-bold text-[#004872] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#366a1d]" />
            Authoritative Knowledge Base
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight">
            Frequently Asked Questions on Special Education
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#41474f] font-normal leading-relaxed">
            Essential answers on individualized education programs (IEP), school inclusion frameworks, 
            early developmental intervention, and accessible Deaf pedagogy.
          </p>
        </motion.div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-4">
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic: IEP, early intervention, Deaf, ADHD, autism, school audit..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#c1c7d0] rounded-xl text-sm text-[#121c27] focus:border-[#004872] focus:ring-2 focus:ring-[#004872] shadow-2xs transition-colors"
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'iep', label: 'IEP & Support Plans' },
              { id: 'inclusion', label: 'School Inclusion' },
              { id: 'early-intervention', label: 'Early Intervention' },
              { id: 'deaf-access', label: 'Deaf & Accessibility' },
              { id: 'general', label: 'Consultations & Location' },
            ].map(tab => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#004872] text-white shadow-2xs' 
                      : 'bg-white text-[#41474f] hover:bg-[#eef4ff] border border-[#c1c7d0]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, idx) => {
              const isOpen = Boolean(openItems[item.id]);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="bg-white rounded-2xl border border-[#dfe9f8] shadow-2xs overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer hover:bg-[#f7f9ff] transition-colors"
                  >
                    <span className="font-headline text-base sm:text-lg font-bold text-[#004872] leading-snug">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-7 h-7 rounded-lg bg-[#e4effe] text-[#004872] flex items-center justify-center shrink-0"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-[#dfe9f8] bg-[#fdfefe] px-5 sm:px-6 pt-4 pb-6"
                      >
                        <p className="text-sm sm:text-base text-[#41474f] leading-relaxed mb-4">
                          {item.answer}
                        </p>

                        {item.keyPoints && item.keyPoints.length > 0 && (
                          <div className="bg-[#f7f9ff] rounded-xl p-4 border border-[#e4effe] space-y-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#004872] block mb-2">
                              Core Insights:
                            </span>
                            {item.keyPoints.map((point, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#121c27]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#366a1d] shrink-0 mt-2" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#c1c7d0]">
              <p className="text-sm text-slate-500 mb-2">
                No matching questions found for "{searchQuery}".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold text-[#004872] hover:underline cursor-pointer"
              >
                Reset search filter
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#e4effe] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-[#004872]">
              Have a Specific Question About Your Child or School?
            </h3>
            <p className="text-xs sm:text-sm text-[#41474f]">
              Our consulting desk reviews every inquiry with complete confidentiality and care.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult,%20I%20have%20a%20question%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#366a1d] bg-white border border-[#366a1d] hover:bg-[#b3f092]/15 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={onBookSession}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#004872] hover:bg-[#003453] transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Session</span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
