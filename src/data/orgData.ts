import { ServiceItem } from '../types';

export const ORGANISATION_INFO = {
  name: 'Ideal Special Education Consult LTD',
  shortName: 'Ideal SpEd Consult',
  legalEntity: 'Private Limited Company (LTD)',
  tagline: 'Creating Access. Promoting Inclusion. Empowering Learners.',
  address: 'Opposite Lagos State University, Ojo, Lagos State, Nigeria',
  phones: [
    { display: '08163420864', raw: '08163420864' },
    { display: '+234 813 514 2095', raw: '+2348135142095' },
  ],
  email: 'idealspedconsultant@gmail.com',
  whatsappNumber: '+2348163420864',
  vision: 'To contribute to a society where every learner has access to appropriate education, support, opportunity, and an environment where they can thrive.',
  mission: 'To provide professional, accessible, learner-centred special education and inclusion services that support learners, families, schools, teachers, and organisations.',
  coreValues: [
    {
      name: 'Inclusion',
      description: 'Championing unconditional belonging and removing structural and sensory barriers for every learner.',
      icon: 'HeartHandshake',
    },
    {
      name: 'Respect',
      description: 'Honouring the unique neurodivergence, dignity, and pace of every child and adult in our learning spaces.',
      icon: 'ShieldCheck',
    },
    {
      name: 'Professionalism',
      description: 'Delivering evidence-based special education strategies backed by rigorous pedagogical standards.',
      icon: 'Award',
    },
    {
      name: 'Empathy',
      description: 'Listening actively to families and educators with compassion, patience, and non-judgmental guidance.',
      icon: 'Smile',
    },
    {
      name: 'Integrity',
      description: 'Operating with complete transparency, confidentiality, ethical conduct, and child safeguarding.',
      icon: 'Lock',
    },
    {
      name: 'Collaboration',
      description: 'Working hand-in-hand with parents, schools, multidisciplinary therapists, and communities.',
      icon: 'Users',
    },
  ],
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'early-intervention',
    title: 'Early Intervention',
    shortDescription: 'Timely identification, developmental stimulation, and sensory support for toddlers and young children during foundational years.',
    fullDescription: 'Early Intervention focuses on the critical window of developmental plasticity from infancy to early primary. We evaluate developmental milestones, design play-based cognitive stimulation programs, and equip parents and preschool educators with early therapeutic strategies that mitigate long-term learning bottlenecks.',
    iconName: 'Sparkles',
    deliverables: [
      'Developmental milestone tracking & baseline screening',
      'Play-based sensory & motor integration activities',
      'Home-based early stimulation routines for parents',
      'Early communication and socio-emotional readiness'
    ],
    beneficiaries: ['Infants & Toddlers (Ages 0–6)', 'Preschool Educators', 'Parents & Primary Caregivers'],
    ctaLabel: 'Request Early Intervention Support'
  },
  {
    id: 'special-education-consultation',
    title: 'Special Education Consultation',
    shortDescription: 'Expert advisory services for academic institutions, educational leaders, and family advisory teams on special needs management.',
    fullDescription: 'Our consultation service bridges the gap between special education best practices and actual classroom reality. We review existing academic policies, recommend classroom environmental modifications, advise school leadership, and provide structured solutions for learners with diverse learning profiles.',
    iconName: 'GraduationCap',
    deliverables: [
      'Comprehensive institutional inclusion audit',
      'Curriculum modification & differentiated instruction advisory',
      'Classroom sensory-friendly environmental layout design',
      'Resource room development & assistive tool recommendations'
    ],
    beneficiaries: ['School Boards & Administrators', 'Academic Directors', 'Parent Consultation Groups'],
    ctaLabel: 'Book a Consultation'
  },
  {
    id: 'school-inclusion-support',
    title: 'School Inclusion Support',
    shortDescription: 'End-to-end guidance for mainstream schools striving to welcome, accommodate, and meaningfully educate diverse learners.',
    fullDescription: 'Mainstream schools often desire to be inclusive but lack specialized on-ground protocols. We offer whole-school inclusion readiness, classroom accommodation frameworks, shadowing guidance, and peer-sensitization initiatives to cultivate welcoming school ecosystems.',
    iconName: 'Building2',
    deliverables: [
      'Whole-school inclusion readiness roadmap',
      'Shadow teacher & learning support assistant coaching',
      'Peer empathy & anti-bullying neurodiversity workshops',
      'Termly inclusion tracking & learner progress reviews'
    ],
    beneficiaries: ['Mainstream Primary & Secondary Schools', 'Inclusion Coordinators', 'Classroom Teachers'],
    ctaLabel: 'Request School Inclusion'
  },
  {
    id: 'parent-guidance-and-support',
    title: 'Parent Guidance and Support',
    shortDescription: 'Empathetic, non-judgmental counseling, home education routines, and advocacy empowerment for parents of neurodiverse children.',
    fullDescription: 'Navigating a child’s diagnosis or learning difficulty can be emotionally demanding for families. We walk alongside parents, translating diagnostic reports into practical home strategies, guiding family communication, and empowering parents to become confident advocates for their children.',
    iconName: 'Heart',
    deliverables: [
      'Demystification of psycho-educational reports & clinical terms',
      'Structured home routine & visual schedule implementation',
      'Positive behaviour management strategies for families',
      'Parental support circles & advocacy coaching'
    ],
    beneficiaries: ['Parents of Children with Special Needs', 'Guardians & Extended Families'],
    ctaLabel: 'Connect for Parent Guidance'
  },
  {
    id: 'learning-support',
    title: 'Learning Support',
    shortDescription: 'Targeted remediation in literacy, numeracy, executive functioning, and study strategies tailored to individual learning styles.',
    fullDescription: 'Our Learning Support specialists deploy multisensory methods (visual, auditory, kinesthetic, and tactile) to assist learners struggling with dyslexia, dyscalculia, attention deficit differences, or processing lags, transforming frustration into academic self-efficacy.',
    iconName: 'BookOpen',
    deliverables: [
      'Multisensory phonics & remedial reading interventions',
      'Concrete-to-abstract mathematical reasoning support',
      'Executive functioning: organization, time management & focus',
      'Assistive reading & note-taking tech guidance'
    ],
    beneficiaries: ['Learners with Specific Learning Differences', 'Struggling Readers & Math Learners'],
    ctaLabel: 'Enquire for Learning Support'
  },
  {
    id: 'assessment-and-referral-guidance',
    title: 'Assessment and Referral Guidance',
    shortDescription: 'Educational screening, observational diagnostics, and clear navigation toward certified medical or therapeutic specialists.',
    fullDescription: 'Pinpointing a child’s specific learning barrier is the first vital step. We conduct observational assessments and educational screenings to identify learning patterns, while connecting families with vetted audiologists, speech-language pathologists, occupational therapists, and clinical psychologists when clinical diagnosis is required.',
    iconName: 'ClipboardCheck',
    deliverables: [
      'Qualitative educational & classroom observation profiles',
      'Sensory & motor checklist screenings',
      'Multi-disciplinary referral pathways with certified clinicians',
      'Pre-assessment and post-assessment parent debriefs'
    ],
    beneficiaries: ['Children undergoing evaluation', 'Families seeking clinical direction'],
    ctaLabel: 'Request Assessment Guidance'
  },
  {
    id: 'teacher-training',
    title: 'Teacher Training',
    shortDescription: 'Hands-on professional development workshops empowering educators with practical inclusive teaching methodologies.',
    fullDescription: 'We provide evidence-informed continuous professional development (CPD) for classroom teachers, subject masters, and school heads. Our modules demystify neurodiversity, teach differentiated task design, and demonstrate low-cost assistive materials suitable for the local educational context.',
    iconName: 'Lightbulb',
    deliverables: [
      'Interactive CPD workshops (In-person & Virtual)',
      'Differentiated instruction & assessment rubrics',
      'Positive behavioral intervention & classroom regulation',
      'Teacher toolkit of printable accommodations & visual cues'
    ],
    beneficiaries: ['Pre-service & In-service Teachers', 'School Subject Coordinators', 'Teaching Assistants'],
    ctaLabel: 'Book Teacher Training'
  },
  {
    id: 'special-needs-awareness-and-advocacy',
    title: 'Special Needs Awareness and Advocacy',
    shortDescription: 'Community sensitization, public forums, and stakeholder advocacy to dismantle stigma around disabilities and neurodivergence.',
    fullDescription: 'Stigma and misinformation remain significant hurdles for persons with disabilities in our communities. We organize targeted awareness campaigns, faith and community group dialogues, and media sensitization that shift public mindset from charity to fundamental human rights and dignity.',
    iconName: 'Megaphone',
    deliverables: [
      'Community sensitization & religious group presentations',
      'Anti-stigma public campaigns & educational handouts',
      'Policy advocacy & stakeholder engagement sessions',
      'Youth & peer disability awareness programs'
    ],
    beneficiaries: ['General Community', 'Religious Institutions', 'Civic & NGO Leaders'],
    ctaLabel: 'Invite Us for Advocacy'
  },
  {
    id: 'individual-support-plans',
    title: 'Individual Support Plans (ISP)',
    shortDescription: 'Collaborative development, implementation, and tracking of personalized Individualized Educational and Support Plans.',
    fullDescription: 'Every learner is distinct. We design customized Individual Support Plans (ISP) featuring measurable SMART goals, tailored classroom accommodations, modified testing guidelines, and periodic milestone evaluations co-created with parents and teachers.',
    iconName: 'FileText',
    deliverables: [
      'Comprehensive learner baseline & strengths profile',
      'Measurable termly SMART developmental goals',
      'Classroom accommodation & examination concession guides',
      'Periodic progress monitoring reviews with stakeholders'
    ],
    beneficiaries: ['Individual Learners', 'School Special Needs Departments', 'Parents'],
    ctaLabel: 'Develop an ISP'
  },
  {
    id: 'deaf-inclusion-and-accessibility',
    title: 'Deaf Inclusion and Accessibility',
    shortDescription: 'Multi-system sign language facilitation (NSL, BSL, ASL), visual learning adaptations, captioning guidance, and inclusive environments for Deaf and hard-of-hearing learners.',
    fullDescription: 'True inclusion ensures total communication access. We champion Deaf and Hard-of-Hearing learners through multi-system sign language training (Nigerian Sign Language, British Sign Language, and American Sign Language), visual spatial classroom orientation, visual timetable integration, accredited interpreter coordination, and acoustic environmental adjustments.',
    iconName: 'Ear',
    deliverables: [
      'Sign language training & sensitization (NSL, BSL & ASL) for schools & families',
      'Curriculum-aligned sign support for Nigerian National (WAEC/JAMB), British (Cambridge/IGCSE), and American schools',
      'Visual learning strategies & bilingual-bicultural literacy support',
      'Deaf-friendly classroom lighting & acoustic recommendations to dampen generator/fan noise',
      'Accredited examination and assembly sign language interpreting'
    ],
    beneficiaries: ['Deaf & Hard-of-Hearing Learners', 'Hearing Families of Deaf Children', 'Inclusive Schools (National & International)'],
    ctaLabel: 'Explore Deaf Inclusion Services'
  }
];
