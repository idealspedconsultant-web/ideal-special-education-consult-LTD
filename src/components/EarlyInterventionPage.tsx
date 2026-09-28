import React from 'react';
import { motion } from 'motion/react';
import { 
  Baby, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Activity, 
  Eye, 
  Ear, 
  Brain, 
  ShieldCheck, 
  HeartHandshake, 
  ChevronRight,
  Phone,
  MessageCircle,
  Stethoscope,
  Smile
} from 'lucide-react';
import { ORGANISATION_INFO } from '../data/orgData';

interface EarlyInterventionPageProps {
  onNavigate: (page: string) => void;
  onBookSession: (serviceTitle?: string) => void;
}

export const EarlyInterventionPage: React.FC<EarlyInterventionPageProps> = ({ 
  onNavigate, 
  onBookSession 
}) => {

  const coreCommitments = [
    {
      num: '01',
      title: 'Progress Monitoring and Follow Up',
      description: 'Continuous, systematic milestone tracking using validated developmental screening tools. We schedule regular reassessments to chart developmental velocity, adapt intervention strategies in real-time, and ensure skills transfer naturally from clinical sessions to home and preschool environments.',
      features: [
        'Periodic developmental velocity re-evaluations',
        'Home-based sensory and motor activity logs',
        'Detailed graphical progress reports for parents and pediatricians',
        'Predictive goal adjustment as developmental breakthroughs occur'
      ],
      icon: <Activity className="w-6 h-6 text-[#004872]" />,
      color: 'border-l-4 border-l-[#004872]'
    },
    {
      num: '02',
      title: 'Referral to Other Professionals When Necessary',
      description: 'Child development requires an integrated, multi-disciplinary approach. When clinical indicators point to specialized medical, sensory, or therapeutic needs beyond consulting, we coordinate seamless, structured referrals to verified clinical specialists and collaborate on care plans.',
      features: [
        'Pediatric Ophthalmologists & Optometrists (visual impairment / cortical vision)',
        'Audiologists & ENT Surgeons (auditory screening, hearing aids, cochlear support)',
        'Speech-Language Pathologists (SLPs) & Feeding Therapists',
        'Occupational Therapists (OTs) & Pediatric Physical Therapists (PTs)',
        'Developmental Pediatricians & Child Neurologists'
      ],
      icon: <Stethoscope className="w-6 h-6 text-[#366a1d]" />,
      color: 'border-l-4 border-l-[#366a1d]'
    },
    {
      num: '03',
      title: 'Individualized Early Intervention Plans (IEIP)',
      description: 'No two infants or toddlers learn the same way. Every child receives a bespoke intervention blueprint grounded in play, family routines, sensory comfort, and baseline strengths, establishing firm neural foundations during the critical early years.',
      features: [
        'Strength-based, culturally congruent developmental objectives',
        'Parent-coaching frameworks embedded into daily family bath, meal, and play routines',
        'Assistive positioning and tactile/visual accommodation recommendations',
        'Transition roadmaps preparing toddlers for inclusive nursery and kindergarten'
      ],
      icon: <Brain className="w-6 h-6 text-[#0074b6]" />,
      color: 'border-l-4 border-l-[#0074b6]'
    }
  ];

  const ageCategories = [
    {
      stage: 'Infants',
      ageSpan: 'Birth – 12 Months',
      badge: 'Sensory Awakening & Neural Foundations',
      description: 'Critical window for early reflex integration, visual tracking, auditory responsiveness, and initial mother-infant emotional bonding.',
      milestones: [
        'Visual fixating, bilateral tracking, and pupillary light response',
        'Startle and orienting response to environmental sounds and voices',
        'Head control, tummy time tolerance, and symmetrical limb movement',
        'Early vocal reciprocity (cooing, smiling, reciprocal gaze)'
      ],
      interventions: 'Gentle sensory regulation, tactile stimulation, parent bonding support, and early diagnostic screening for visual or hearing differences.'
    },
    {
      stage: 'Toddlers',
      ageSpan: '1 – 3 Years',
      badge: 'Exploration, Mobility & Functional Expression',
      description: 'Rapid physical expansion, emerging vocabulary or sign language, sensory exploration, and early social interaction with peers.',
      milestones: [
        'Independent mobility, balance, climbing, and bilateral hand use',
        'First words, gestures, sign language signs, or receptive understanding',
        'Play with toys functionally (stacking, cause-and-effect, imitation)',
        'Responding to familiar names, simple instructions, and shared attention'
      ],
      interventions: 'Play-based speech & sign intervention, occupational sensory diets, behavioral scaffolding, and individualized parent-mediated strategies.'
    },
    {
      stage: 'Young Children',
      ageSpan: '3 – 6+ Years',
      badge: 'Preschool Readiness & Social-Cognitive Growth',
      description: 'Preparation for inclusive nursery and primary education, peer collaboration, pre-academic learning, and emotional self-regulation.',
      milestones: [
        'Multi-word sentence structures, complex signing, or AAC system usage',
        'Fine motor readiness (pencil grip, scissor safety, block building)',
        'Social cooperation, turn-taking, and emotional self-expression',
        'Pre-academic concepts (categorization, spatial awareness, numbers, letters)'
      ],
      interventions: 'Inclusive classroom transition plans, pre-academic IEP goals, assistive learning accommodations, and educator capacity training.'
    }
  ];

  const focusDomains = [
    {
      title: 'Sensory & Perceptual Processing',
      description: 'Supporting visual perception, tactile responsiveness, sound discrimination, vestibular balance, and proprioceptive body awareness.',
      icon: <Eye className="w-5 h-5 text-[#004872]" />
    },
    {
      title: 'Speech, Sign & Communication',
      description: 'Laying foundations for verbal speech, sign language (NSL, BSL, ASL), gestural communication, and augmentative AAC tools.',
      icon: <Ear className="w-5 h-5 text-[#366a1d]" />
    },
    {
      title: 'Motor & Physical Development',
      description: 'Building core stability, fine motor grasp, bilateral coordination, and adaptive physical positioning for low-muscle tone or motor delays.',
      icon: <Activity className="w-5 h-5 text-[#0074b6]" />
    },
    {
      title: 'Social, Emotional & Adaptive Skills',
      description: 'Nurturing secure attachment, self-regulation, co-regulation techniques, feeding tolerance, and self-help independence.',
      icon: <Smile className="w-5 h-5 text-[#854d0e]" />
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#f7f9ff]">
      
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section 
        aria-label="Early Intervention Overview"
        className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 bg-white border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#366a1d] uppercase tracking-wider mb-3">
            <Baby className="w-4 h-4 text-[#366a1d]" />
            <span>Early Childhood Development</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004872] leading-[1.18] tracking-tight">
                Early Intervention Framework
              </h1>
              
              <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed max-w-3xl">
                The first six years of life represent the human brain's highest period of neuroplasticity. 
                At <strong className="font-bold text-[#121c27]">Ideal Special Education Consult LTD</strong>, 
                our early intervention protocols identify developmental divergence early and provide structured, 
                play-based support so every infant, toddler, and young child reaches their highest potential.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.button
                  type="button"
                  onClick={() => onBookSession('Early Intervention Support & Developmental Screening')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Early Assessment</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => onNavigate('inclusive-expertise')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-xl text-base font-bold text-[#004872] bg-[#f0f4fa] hover:bg-[#e2eaf5] border border-[#b3d8ff] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Disability Domains</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#f0f9ed] rounded-3xl p-6 sm:p-7 border-2 border-[#b3f092] shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2e7d32] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Why Early Action Matters</span>
              </div>
              <p className="text-sm sm:text-base text-[#1e293b] leading-relaxed">
                Intervening during early neurodevelopment prevents secondary complications, empowers parents with clear coping tools, and significantly improves long-term educational inclusion.
              </p>
              <div className="mt-4 pt-4 border-t border-[#c8e6c9] space-y-2 text-xs sm:text-sm font-semibold text-[#14532d]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0" />
                  <span>Infants (Birth – 12 Mos)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0" />
                  <span>Toddlers (1 – 3 Yrs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0" />
                  <span>Young Children (3 – 6+ Yrs)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          1. THREE CORE COMMITMENTS
          ========================================================================= */}
      <section 
        aria-label="Core Early Intervention Commitments"
        className="py-16 sm:py-20 bg-[#f7f9ff] border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#366a1d]">
              Our Professional Pillars
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004872] tracking-tight mt-1">
              Three Core Early Intervention Commitments
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
              Every early childhood intake at Ideal SpEd Consult LTD is governed by these three non-negotiable commitments to child welfare and family empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreCommitments.map((comm) => (
              <motion.div
                key={comm.num}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-white rounded-3xl p-7 sm:p-8 border border-[#dfe9f8] shadow-xs flex flex-col justify-between ${comm.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#f0f4fa] flex items-center justify-center">
                      {comm.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      Pillar {comm.num}
                    </span>
                  </div>

                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#004872] mb-3">
                    {comm.title}
                  </h3>

                  <p className="text-base text-[#334155] leading-relaxed mb-6 font-normal">
                    {comm.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Key Capabilities Included:
                    </span>
                    {comm.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-[#1e293b]">
                        <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onBookSession(comm.title)}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold text-[#004872] bg-[#f0f4fa] hover:bg-[#e4effe] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. AGE CATEGORIZATION (INFANTS, TODDLERS & YOUNG CHILDREN)
          ========================================================================= */}
      <section 
        aria-label="Age Categorization: Infants, Toddlers and Young Children"
        className="py-16 sm:py-20 bg-white border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#004872]">
              Developmental Milestones by Life Stage
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004872] tracking-tight mt-1">
              Age Categorization &amp; Targeted Interventions
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
              Children develop across diverse timelines. We tailor our assessment tools, stimulation strategies, and family coaching to the child's exact developmental stage.
            </p>
          </div>

          <div className="space-y-8">
            {ageCategories.map((cat, idx) => (
              <div 
                key={cat.stage}
                className="bg-[#f7f9ff] rounded-3xl p-6 sm:p-10 border border-[#dfe9f8] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Column 1: Stage Info */}
                <div className="lg:col-span-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#004872] text-white text-xs font-bold uppercase tracking-wider mb-3">
                    <Baby className="w-3.5 h-3.5" />
                    <span>Stage {idx + 1}</span>
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#004872]">
                    {cat.stage}
                  </h3>
                  <span className="text-base font-bold text-[#366a1d] block mt-1">
                    {cat.ageSpan}
                  </span>
                  <div className="mt-3 inline-block bg-white px-3 py-1 rounded-lg border border-[#dfe9f8] text-xs font-bold text-[#0074b6]">
                    {cat.badge}
                  </div>
                  <p className="mt-4 text-base text-[#334155] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Column 2: Milestones & Interventions */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8f0] shadow-2xs">
                  <h4 className="font-headline text-lg font-bold text-[#004872] mb-3">
                    Target Developmental Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {cat.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2.5 text-sm text-[#1e293b]">
                        <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                        <span className="leading-snug">{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#004872] block mb-1">
                      Our Clinical &amp; Educational Focus:
                    </span>
                    <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                      {cat.interventions}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. FOCUS DOMAINS
          ========================================================================= */}
      <section 
        aria-label="Core Developmental Focus Domains"
        className="py-16 sm:py-20 bg-[#f7f9ff] border-b border-[#dfe9f8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#366a1d]">
              Holistic Child Assessment
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004872] tracking-tight mt-1">
              Developmental Focus Domains
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
              Our specialists evaluate and support every interconnected dimension of a child's early developmental architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusDomains.map((domain, dIdx) => (
              <div 
                key={dIdx}
                className="bg-white rounded-2xl p-6 border border-[#dfe9f8] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f0f4fa] flex items-center justify-center mb-4">
                    {domain.icon}
                  </div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-[#004872] mb-2">
                    {domain.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
                    {domain.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. CALL TO ACTION: Consult With Our Early Childhood Team
          ========================================================================= */}
      <section 
        aria-label="Schedule Early Childhood Consultation"
        className="py-16 sm:py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#366a1d] uppercase tracking-wider mb-3">
            <HeartHandshake className="w-5 h-5" />
            <span>Partnering with Parents &amp; Pediatricians</span>
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004872] tracking-tight">
            Give Your Child the Strongest Developmental Start
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl mx-auto">
            If you notice developmental delays, sensory sensitivities, communication differences, or visual/hearing divergences in your child, early consulting is the greatest gift you can provide.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={() => onBookSession('Early Intervention Support & Developmental Screening')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#004872] hover:bg-[#1b6091] shadow-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Early Intervention Intake</span>
            </motion.button>

            <motion.a
              href={`https://wa.me/${ORGANISATION_INFO.whatsappNumber.replace('+', '')}?text=Hello%20Ideal%20Special%20Education%20Consult%20LTD,%20I%20would%20like%20to%20enquire%20about%20Early%20Intervention%20for%20my%20child.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl text-base font-bold text-[#366a1d] bg-[#f0f9ed] hover:bg-[#e2f5dc] border border-[#366a1d] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Early Support</span>
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
