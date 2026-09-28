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
    shortDescription: 'Comprehensive developmental screening, individualized early intervention plans, progress monitoring, and multidisciplinary referrals for infants, toddlers, and young children.',
    fullDescription: 'Our Early Intervention services provide essential foundational support during the critical early years of child development. We evaluate developmental milestones, design individualized early intervention plans, conduct continuous progress monitoring and structured follow-up, and coordinate timely referrals to other specialized professionals when necessary, ensuring holistic, evidence-based care for infants, toddlers, and young children across all abilities.',
    iconName: 'Sparkles',
    deliverables: [
      'Individualized early intervention plans tailored to each child’s unique developmental profile',
      'Continuous progress monitoring and structured follow-up evaluations',
      'Timely referral to other medical, clinical, and allied professionals when necessary (e.g. pediatricians, ophthalmologists, audiologists, SLPs, OTs)',
      'Developmental milestone tracking & baseline screening for infants, toddlers, and young children',
      'Play-based sensory-motor stimulation and home routines empowering parents and caregivers'
    ],
    beneficiaries: [
      'Infants (Birth to 12 Months)',
      'Toddlers (Ages 1 to 3 Years)',
      'Young Children (Ages 3 to 6+ Years)',
      'Parents, Primary Caregivers & Preschool Educators'
    ],
    ageCategories: [
      { 
        category: 'Infants', 
        ageRange: 'Birth – 12 Months', 
        focus: 'Early sensory responses, visual tracking, motor reflexes, developmental milestones & responsive parental bonding.' 
      },
      { 
        category: 'Toddlers', 
        ageRange: '1 – 3 Years', 
        focus: 'Emerging speech and communication, gross & fine motor coordination, play-based sensory exploration & behavioral foundations.' 
      },
      { 
        category: 'Young Children', 
        ageRange: '3 – 6+ Years', 
        focus: 'School readiness, foundational cognitive concepts, social-emotional development & individualized early intervention plans.' 
      }
    ],
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
    id: 'sensory-and-disability-accessibility',
    title: 'Visual Impairment, Deaf Accessibility & Assistive Support',
    shortDescription: 'Comprehensive accommodations for visual impairments (Braille, low-vision aids), Deaf accessibility (NSL, BSL, ASL), and assistive technologies for diverse disabilities.',
    fullDescription: 'We champion holistic accessibility across sensory and physical needs. For visually impaired and low-vision learners, we provide Braille instruction, large-print modifications, orientation & mobility (O&M) guidance, and assistive optical/digital accommodations. For Deaf and hard-of-hearing learners, we coordinate multi-system sign language instruction (Nigerian Sign Language, British Sign Language, American Sign Language) and acoustic adaptations. We also design assistive solutions for learners with motor and multiple disabilities.',
    iconName: 'Eye',
    deliverables: [
      'Visual impairment accommodations: Braille transcription, tactile learning aids, large-print materials & lighting optimization',
      'Orientation & Mobility (O&M) training for independent, confident school and community navigation',
      'Sign language facilitation & interpreter coordination (NSL, BSL, and ASL) for academic and social inclusion',
      'Bilingual-bicultural literacy strategies & visual communication schedules',
      'Assistive technology integration for visual, auditory, motor, and speech communication needs',
      'Classroom environmental audits: acoustic management, anti-glare measures, and universal physical access'
    ],
    beneficiaries: [
      'Visually Impaired & Low-Vision Learners',
      'Deaf & Hard-of-Hearing Learners',
      'Learners with Physical & Multiple Disabilities',
      'Families & Inclusive Educational Institutions'
    ],
    ctaLabel: 'Explore Accessibility Services'
  }
];

export const DISABILITIES_SUPPORTED = [
  {
    id: 'visual-impairments',
    title: 'Visual Impairments & Low Vision',
    icon: 'Eye',
    summary: 'From low vision and photophobia to total blindness, we design tailored optical, tactile, and environmental learning solutions.',
    examples: ['Low Vision & Partial Sight', 'Total Blindness', 'Cerebral Visual Impairment (CVI)', 'Albinism-Related Vision Needs', 'Visual Field Deficits'],
    interventions: ['Braille Instruction & Transcription', 'Large Print & High-Contrast Formatting', 'Tactile Diagrams & Manipulatives', 'Orientation & Mobility (O&M)', 'Screen Readers & Digital Assistive Tech']
  },
  {
    id: 'deaf-hearing',
    title: 'Deaf & Hard of Hearing',
    icon: 'Ear',
    summary: 'Total communication access integrating multi-system sign language, bilingual literacy, and acoustic classroom optimization.',
    examples: ['Deafness', 'Hard of Hearing', 'Auditory Neuropathy', 'Unilateral / Bilateral Hearing Loss'],
    interventions: ['Nigerian Sign Language (NSL)', 'British Sign Language (BSL)', 'American Sign Language (ASL)', 'Visual Timetables & Cues', 'Classroom Acoustic & Lighting Adjustments']
  },
  {
    id: 'neurodivergence',
    title: 'Autism & Attention Differences (ADHD)',
    icon: 'Puzzle',
    summary: 'Strength-based, neurodiversity-affirming frameworks focusing on sensory regulation, executive functioning, and communication.',
    examples: ['Autism Spectrum Disorder (ASD)', 'ADHD (Inattentive, Hyperactive, Combined)', 'Executive Function Challenges'],
    interventions: ['Sensory-Friendly Classroom Design', 'Visual Schedules & Social Stories', 'Movement Breaks & Fidget Tools', 'Structured Predictable Routines']
  },
  {
    id: 'learning-differences',
    title: 'Specific Learning Difficulties (SpLD)',
    icon: 'BookOpen',
    summary: 'Multisensory evidence-based remediation targeting literacy, numeracy, and cognitive processing variations.',
    examples: ['Dyslexia (Reading & Decoding)', 'Dyscalculia (Math & Numbers)', 'Dysgraphia (Writing & Fine Motor)', 'Working Memory Differences'],
    interventions: ['Orton-Gillingham Multisensory Phonics', 'Concrete-to-Abstract Math Support', 'Text-to-Speech & Speech-to-Text', 'Extended Testing Time Accommodations']
  },
  {
    id: 'physical-motor',
    title: 'Physical & Motor Disabilities',
    icon: 'Activity',
    summary: 'Promoting independent participation and physical inclusion across schools and community spaces.',
    examples: ['Cerebral Palsy', 'Mobility & Wheelchair Needs', 'Dyspraxia (Developmental Coordination Disorder)', 'Fine & Gross Motor Delays'],
    interventions: ['Physical Accessibility & Ramp Audits', 'Ergonomic Seating & Postural Support', 'Adapted Writing Tools & Grips', 'Assistive Switch & Tech Input']
  },
  {
    id: 'developmental-speech',
    title: 'Speech, Language & Developmental Delays',
    icon: 'Heart',
    summary: 'Facilitating functional communication, life skills, and developmental milestone achievement.',
    examples: ['Speech & Language Delays', 'Down Syndrome', 'Global Developmental Delay (GDD)', 'Intellectual Disabilities'],
    interventions: ['Augmentative & Alternative Communication (AAC)', 'Functional Life Skills Training', 'Allied Health Referral Coordination', 'Step-by-Step Task Analysis']
  }
];
