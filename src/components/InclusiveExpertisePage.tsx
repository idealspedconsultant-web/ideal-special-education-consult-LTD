import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Eye, 
  Ear, 
  Brain, 
  Zap, 
  BookOpen, 
  Accessibility, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Phone, 
  MessageCircle,
  School,
  Laptop
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';

interface InclusiveExpertisePageProps {
  onNavigate: (page: string) => void;
  onBookSession: (serviceTitle?: string) => void;
}

export const InclusiveExpertisePage: React.FC<InclusiveExpertisePageProps> = ({
  onNavigate,
  onBookSession
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const disabilityDomains = [
    {
      id: 'visual-impairment',
      category: 'sensory',
      title: 'Visual Impairments & Low Vision',
      badge: 'Sensory & Optical Access',
      icon: <Eye className="w-7 h-7 text-[#1b6091]" />,
      summary: 'Comprehensive pedagogical adaptations for learners with partial sight, low vision, cortical visual impairment (CVI), and total blindness.',
      coreAreas: [
        'Braille instruction, transcription, and tactile graphics production',
        'Orientation & Mobility (O&M) and independent navigation coaching',
        'High-contrast classroom adaptations, task lighting, and glare management',
        'Optical assistive technologies, screen magnifiers, and refreshable Braille displays',
        'Photophobia mitigation and visual fatigue reduction protocols'
      ],
      visionStatement: 'Ensuring visually impaired learners experience total informational autonomy, active classroom participation, and barrier-free literacy.',
      image: '/learners/vision-sensory.jpg',
      themeBorder: 'border-l-4 border-l-[#1b6091]'
    },
    {
      id: 'deaf-hearing',
      category: 'sensory',
      title: 'Deaf & Hard of Hearing Education',
      badge: 'Visual-Linguistic Access',
      icon: <Ear className="w-7 h-7 text-[#0074b6]" />,
      summary: 'Bilingual and visual learning frameworks designed for deaf, deafblind, and hard of hearing children and youth.',
      coreAreas: [
        'Nigerian Sign Language (NSL), British Sign Language (BSL), and American Sign Language (ASL)',
        'Certified educational sign language interpretation for classrooms and examinations',
        'Auditory-verbal support, FM system / hearing aid integration, and acoustic optimization',
        'Bilingual-bicultural deaf education curricula and peer sensitization',
        'Visual alert systems, captioned media, and speech-to-text assistive aids'
      ],
      visionStatement: 'Promoting a language-rich visual ecosystem where sign language and auditory access empower every deaf child without social isolation.',
      image: '/learners/deaf-hearing.jpg',
      themeBorder: 'border-l-4 border-l-[#0074b6]'
    },
    {
      id: 'autism-sensory',
      category: 'neurodiversity',
      title: 'Autism Spectrum & Sensory Differences',
      badge: 'Neuro-Affirming Frameworks',
      icon: <Brain className="w-7 h-7 text-[#7c3aed]" />,
      summary: 'Empowering autistic and sensory-diverse learners through predictable routines, communication access, and sensory comfort.',
      coreAreas: [
        'Individual sensory profiles (sensory diets, proprioceptive input, calming breaks)',
        'Visual schedules, social narratives, and low-anxiety structured learning spaces',
        'Non-verbal communication, Picture Exchange Communication (PECS), and AAC apps',
        'Special interest integration into academic curriculum to boost deep learning',
        'Classroom acoustic and lighting audits to prevent sensory overload'
      ],
      visionStatement: 'Celebrating neurodivergence with dignity, eliminating restrictive practices, and building calm spaces where autistic learners thrive.',
      image: '/learners/learning-differences.jpg',
      themeBorder: 'border-l-4 border-l-[#7c3aed]'
    },
    {
      id: 'adhd-executive',
      category: 'neurodiversity',
      title: 'ADHD & Executive Functioning',
      badge: 'Focus & Cognitive Scaffolding',
      icon: <Zap className="w-7 h-7 text-[#d97706]" />,
      summary: 'Actionable strategies for learners with inattentive, hyperactive, or combined ADHD profiles and executive function challenges.',
      coreAreas: [
        'Task chunking, dynamic pacing, and time-management scaffolding (Pomodoro/visual timers)',
        'Active seating (wobble stools, standing desks, resistance bands) for motor release',
        'Working memory support: checklists, color-coded binders, and audio instructions',
        'Self-regulation and positive reinforcement systems co-designed with the learner',
        'Teacher coaching on compassionate redirection and stimulus modulation'
      ],
      visionStatement: 'Channeling high energy and intense curiosity into sustained academic achievement and executive confidence.',
      image: '/learners/learning-differences.jpg',
      themeBorder: 'border-l-4 border-l-[#d97706]'
    },
    {
      id: 'dyslexia-spld',
      category: 'cognition',
      title: 'Dyslexia, Dyscalculia & Specific Learning Differences',
      badge: 'Structured Literacy & Numeracy',
      icon: <BookOpen className="w-7 h-7 text-[#059669]" />,
      summary: 'Evidence-based multi-sensory interventions for reading, writing, mathematical processing, and fine-motor coordination.',
      coreAreas: [
        'Orton-Gillingham based structured literacy and phonetic decoding training',
        'Dyscalculia concrete-representational-abstract (CRA) math instruction',
        'Dysgraphia accommodations: typing instruction, speech-to-text, and pencil grip ergonomics',
        'Dyslexia-friendly fonts, tinted overlays, and accessible digital reading tools',
        'Exam accommodations: extra time, reader/scribe advocacy, and oral assessments'
      ],
      visionStatement: 'Demystifying learning differences and proving that cognitive diversity is not an intellectual ceiling.',
      image: '/learners/learning-differences.jpg',
      themeBorder: 'border-l-4 border-l-[#059669]'
    },
    {
      id: 'physical-motor',
      category: 'physical',
      title: 'Physical, Motor & Health Needs',
      badge: 'Mobility & Universal Access',
      icon: <Accessibility className="w-7 h-7 text-[#0284c7]" />,
      summary: 'Ergonomic, physical, and assistive technological accommodations for learners with cerebral palsy, motor delays, or mobility aids.',
      coreAreas: [
        'Classroom barrier removal (doorways, ramps, accessible seating, height-adjustable desks)',
        'Assistive writing aids: specialized grips, weighted pens, and adapted tablet mounts',
        'Alternative computer access: switch interfaces, eye-gaze systems, and head mice',
        'Positioning and physical fatigue management in collaboration with pediatric PTs',
        'Inclusive physical education (Adapted PE) and playground accessibility planning'
      ],
      visionStatement: 'Guaranteeing that physical limitations never restrict a child from accessing the full educational and social life of their school.',
      image: '/inclusive-classroom.jpg',
      themeBorder: 'border-l-4 border-l-[#0284c7]'
    },
    {
      id: 'slcn-communication',
      category: 'communication',
      title: 'Speech, Language & Communication Needs (SLCN)',
      badge: 'Augmentative & Expressive Support',
      icon: <MessageSquare className="w-7 h-7 text-[#dc2626]" />,
      summary: 'Multi-modal communication strategies for verbal apraxia, developmental language delays, and selective mutism.',
      coreAreas: [
        'Augmentative and Alternative Communication (AAC) device selection and customization',
        'Receptive language comprehension tools: visual symbol systems and simplified syntax',
        'Expressive language expansion through structured conversational modeling',
        'Collaborative planning with clinical Speech-Language Pathologists (SLPs)',
        'Peer communication circles to foster natural social engagement'
      ],
      visionStatement: 'Giving every child a robust, reliable voice through verbal, gestural, graphic, or digital modalities.',
      image: '/inclusive-classroom.jpg',
      themeBorder: 'border-l-4 border-l-[#dc2626]'
    }
  ];

  const filteredDomains = activeTab === 'all' 
    ? disabilityDomains 
    : disabilityDomains.filter(d => d.category === activeTab);

  return (
    <div className="flex flex-col w-full bg-[#f7f9ff]">
      
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section 
        aria-label="Inclusive Expertise Overview"
        className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 bg-white border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#366a1d] uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#366a1d]" />
            <span>Comprehensive Special Education Practice</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004872] leading-[1.18] tracking-tight">
                Inclusive Expertise Across All Disability Domains
              </h1>
              
              <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed max-w-3xl">
                At <strong className="font-bold text-[#121c27]">Ideal Special Education Consult LTD</strong>, 
                our clinical expertise is not limited to a single impairment. We provide comprehensive, 
                evidence-based accommodations for <strong className="text-[#004872]">visual impairments and low vision</strong>, 
                <strong className="text-[#004872]"> Deaf education and sign language</strong>, 
                <strong className="text-[#004872]"> neurodivergence (Autism &amp; ADHD)</strong>, 
                <strong className="text-[#004872]"> dyslexia</strong>, 
                <strong className="text-[#004872]"> physical disabilities</strong>, and 
                <strong className="text-[#004872]"> communication needs</strong>.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  onClick={() => onBookSession()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Specialist Consultation</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => onNavigate('services')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-xl text-base font-bold text-[#004872] bg-[#f0f4fa] hover:bg-[#e2eaf5] border border-[#b3d8ff] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Our 10 Services</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#eef4ff] rounded-3xl p-6 sm:p-7 border border-[#b3d8ff] shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#004872] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-[#366a1d]" />
                <span>Whole-Child Philosophy</span>
              </div>
              <p className="text-sm sm:text-base text-[#1e293b] leading-relaxed">
                We believe that every child can learn when given accessible modalities, appropriate assistive technology, and educators trained in inclusive pedagogy.
              </p>
              <div className="mt-4 pt-4 border-t border-[#b3d8ff] text-xs font-semibold text-[#004872] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#366a1d]" />
                <span>Opposite LASU Main Campus, Ojo, Lagos</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CATEGORY FILTER TABS
          ========================================================================= */}
      <section 
        aria-label="Filter Disability Domains"
        className="py-6 bg-[#f0f4fa] border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Disabilities & Needs' },
              { id: 'sensory', label: 'Visual & Hearing (Sensory)' },
              { id: 'neurodiversity', label: 'Autism & ADHD (Neurodivergence)' },
              { id: 'cognition', label: 'Dyslexia & Learning (Cognition)' },
              { id: 'physical', label: 'Physical & Motor Needs' },
              { id: 'communication', label: 'Speech & AAC Communication' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#004872] text-white shadow-xs'
                    : 'bg-white text-[#334155] hover:bg-slate-100 border border-[#dfe9f8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DOMAIN CARDS (COMPREHENSIVE SPECTRUM)
          ========================================================================= */}
      <section 
        aria-label="Detailed Disability Domains"
        className="py-16 sm:py-20 bg-[#f7f9ff] border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filteredDomains.map((domain) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`bg-white rounded-3xl p-6 sm:p-10 border border-[#dfe9f8] shadow-xs ${domain.themeBorder}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Header & Vision */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-13 h-13 rounded-2xl bg-[#f0f4fa] flex items-center justify-center shrink-0">
                      {domain.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        {domain.badge}
                      </span>
                      <h2 className="font-headline text-2xl font-bold text-[#004872]">
                        {domain.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-base text-[#334155] leading-relaxed mt-4 font-normal">
                    {domain.summary}
                  </p>

                  <div className="mt-5 p-4 rounded-2xl bg-[#f7f9ff] border border-[#e2e8f0]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#366a1d] block mb-1">
                      Our Clinical Vision:
                    </span>
                    <p className="text-sm text-[#1e293b] leading-relaxed italic">
                      "{domain.visionStatement}"
                    </p>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => onBookSession(`Consultation: ${domain.title}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#004872] hover:bg-[#1b6091] transition-colors cursor-pointer shadow-2xs"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Consult on This Condition</span>
                    </button>
                  </div>
                </div>

                {/* Right Core Accommodations */}
                <div className="lg:col-span-7 bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-slate-200">
                  <h3 className="font-headline text-lg font-bold text-[#004872] mb-4">
                    Key Accommodations &amp; Clinical Deliverables:
                  </h3>

                  <div className="space-y-3">
                    {domain.coreAreas.map((area, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#1e293b]">
                        <CheckCircle2 className="w-5 h-5 text-[#366a1d] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{area}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
                    <span>Available at our Ojo, Lagos clinic or virtually nationwide.</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="font-bold text-[#004872] hover:underline cursor-pointer"
                    >
                      Ask Specialist →
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CROSS-DISABILITY SUPPORT CALLOUT
          ========================================================================= */}
      <section 
        aria-label="Universal Classroom Accommodations"
        className="py-16 sm:py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#004872] uppercase tracking-wider mb-3">
            <School className="w-5 h-5 text-[#366a1d]" />
            <span>Inclusive School Partnerships</span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight">
            Is Your School Ready to Include Every Child?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mx-auto">
            We conduct institutional environmental audits, train general classroom teachers, and create individualized accommodation plans to transform traditional schools into barrier-free inclusive spaces.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={() => onBookSession('Inclusive School Environment Audits & Advisory')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book School Environment Audit</span>
            </motion.button>

            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult%20LTD,%20I%20would%20like%20to%20enquire%20about%20your%20Inclusive%20Expertise%20and%20support%20for%20a%20learner.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl text-base font-bold text-[#366a1d] bg-[#f0f9ed] hover:bg-[#e2f5dc] border border-[#366a1d] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat With an Inclusion Specialist</span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => onNavigate('home')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              ← Back to Home
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
};
