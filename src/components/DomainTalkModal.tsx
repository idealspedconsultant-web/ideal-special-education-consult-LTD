import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Ear, 
  Eye, 
  Puzzle, 
  Accessibility, 
  X, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  MessageCircle, 
  Check, 
  Copy, 
  CheckCircle2, 
  Info, 
  Heart,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Target,
  Compass,
  Award,
  BookOpen,
  FileText,
  UserCheck,
  Languages,
  GraduationCap,
  Globe
} from 'lucide-react';

export type AccessibilityDomainId = 'deaf-hearing' | 'vision-sensory' | 'learning-differences' | 'physical-access';

export interface DomainData {
  id: AccessibilityDomainId;
  title: string;
  simplerTerm: string;
  simplerSubtext: string;
  tagline: string;
  headerBg: string;
  headerBorder: string;
  accentColor: string;
  lightBg: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  learnerImage: string;
  learnerImageAlt: string;
  learnerImageCaption: string;
  audioScript: string;
  whatItIs: string;
  whySimplerTerm?: string;
  whatThisSectionTalksAbout: {
    headline: string;
    summary: string;
    keyThemes: { title: string; desc: string }[];
  };
  ourVisionToThem: {
    headline: string;
    statement: string;
    corePillars: string[];
    pledge: string;
  };
  conditionsIncluded: string[];
  everydaySigns: string[];
  howIdealHelps: string[];
  classroomAccommodations: string[];
  reassuranceForParents: string;
  associatedService: string;
}

export const DOMAINS_DATA: Record<AccessibilityDomainId, DomainData> = {
  'deaf-hearing': {
    id: 'deaf-hearing',
    title: 'Deaf & Hard-of-Hearing Education',
    simplerTerm: 'Hearing & Sign Language Accessibility',
    simplerSubtext: 'Trilingual Sign Systems (NSL, BSL & ASL) & Acoustic Inclusion',
    tagline: 'Linguistic empowerment through Nigerian Sign Language (NSL), British Sign Language (BSL), and American Sign Language (ASL), visual curriculum design, acoustic optimization, and accredited examination accommodations.',
    headerBg: 'bg-[#003453]',
    headerBorder: 'border-[#004872]',
    accentColor: '#0074b6',
    lightBg: 'bg-[#f0f9ff]',
    borderColor: 'border-[#bae6fd]',
    icon: Ear,
    learnerImage: '/learners/deaf-hearing.jpg',
    learnerImageAlt: 'African Nigerian elementary school student and female special education teacher communicating enthusiastically using sign language (NSL, BSL, ASL) in an inclusive classroom in Lagos',
    learnerImageCaption: 'Specialized sign language instruction (NSL, BSL, and ASL) in an inclusive classroom in Lagos — bridging academic concepts through visual linguistics, fingerspelling literacy, and total communication.',
    audioScript: `Welcome to this specialist consultation briefing on Deaf and Hard-of-Hearing Education by Ideal Special Education Consult. 
When a child has a hearing challenge, their intelligence, creative genius, and academic capacity remain entirely intact. 
Hearing loss simply means auditory sound waves are perceived faintly, with distortion, or not at all. 
Our practice provides comprehensive sign language support across three core systems: Nigerian Sign Language (NSL) for national curriculums and local community integration; British Sign Language (BSL) with two-handed fingerspelling for Cambridge and British international schools; and American Sign Language (ASL) for American curricula and international university pathways. 
With bilingual visual teaching, multi-system sign literacy, and proper classroom acoustics, deaf children master complex subjects from advanced mathematics to literature. 
Ideal Special Education Consult provides full communication screenings, family sign language coaching across NSL, BSL, and ASL, and school accommodation audits across Lagos. 
Our vision is clear: communication without limits, dignity without compromise, and equal seats at every academic table.`,
    whatItIs: `Deafness and hearing differences mean sound waves cannot travel freely through the auditory canal or are processed differently by the auditory cortex. 
This encompasses mild hearing challenges (difficulty understanding a teacher over loud classroom fans or generators) to profound deafness where natural sign languages—including Nigerian Sign Language (NSL), British Sign Language (BSL), and American Sign Language (ASL)—serve as complete, rich, and cognitively vibrant primary languages. 
With bilingual visual teaching, multi-system sign literacy, and proper classroom acoustics, deaf children master complex subjects from advanced mathematics to literature.`,
    whySimplerTerm: `Why we focus on "Hearing & Sign Language Accessibility":
Audiological audiograms and decibel thresholds are valuable clinical tools, but parents and teachers need to know what to do on Monday morning: How does this learner receive instruction best? Whether through direct sightlines, Nigerian Sign Language (NSL) for WAEC/JAMB, British Sign Language (BSL) for Cambridge IGCSE, American Sign Language (ASL) for international curricula, or sound-dampening acoustic seating, understanding their daily linguistic reality changes everything.`,
    whatThisSectionTalksAbout: {
      headline: 'Deaf Pedagogy, Multi-System Sign Languages (NSL, BSL, ASL) & Acoustic Inclusion',
      summary: 'This section details evidence-based practices for educating deaf and hard-of-hearing learners across Nigerian national, British (Cambridge/IGCSE), and American international curricula. It addresses multi-dialect sign literacy (NSL, BSL, ASL), classroom acoustic dampening, early visual language acquisition, and advocacy for national and international examination accommodations (WAEC, NECO, JAMB, Cambridge, SAT).',
      keyThemes: [
        {
          title: 'Trilingual Sign Language Pedagogy (NSL · BSL · ASL)',
          desc: 'Tailoring instruction to each student’s educational pathway: Nigerian Sign Language (NSL) for national curriculums (WAEC/JAMB) and cultural identity; British Sign Language (BSL) with two-handed manual fingerspelling for Cambridge international schools; and American Sign Language (ASL) for American curricula and global university pathways.'
        },
        {
          title: 'Bilingual-Bicultural Education (Sign Languages & Written English)',
          desc: 'Deaf students acquire advanced academic concepts naturally when taught visually through sign language while simultaneously developing strong written English reading and writing literacy.'
        },
        {
          title: 'Classroom Acoustic Optimization & Noise Dampening',
          desc: 'Bare concrete walls, loud ceiling fans, and nearby diesel generators multiply listening fatigue. We audit school classrooms and implement cost-effective acoustic dampening (curtains, rubber chair ferrules, soft pinboards) to optimize residual hearing.'
        },
        {
          title: 'Early Sign Language Acquisition to Prevent Deprivation',
          desc: 'Language deprivation in early childhood poses the greatest risk to deaf children. Early exposure to natural sign languages (NSL, BSL, or ASL) ensures age-appropriate cognitive milestones, emotional resilience, and abstract thinking skills.'
        },
        {
          title: 'Line-of-Sight Seating & Visual Pacing in Instruction',
          desc: 'Training teachers to maintain constant face-to-face visual contact, avoid lecturing while writing on the blackboard, provide written lecture outlines in advance, and pair deaf students with dedicated peer note-buddies.'
        },
        {
          title: 'WAEC, NECO, JAMB & Cambridge Examination Accommodations',
          desc: 'Advocating for accredited sign language interpreters (NSL, BSL, ASL) in national and international examination halls, extended time allowances, and visual timing signals so deaf candidates demonstrate their true academic competence.'
        }
      ]
    },
    ourVisionToThem: {
      headline: 'Our Vision for Deaf & Hard-of-Hearing Learners',
      statement: 'We envision an educational landscape across Nigeria where deafness is never treated as silence, deficit, or a barrier to academic excellence. Every deaf and hard-of-hearing learner deserves to stand proudly at the podium of academic success—fluent in their chosen sign language system (NSL, BSL, or ASL), academically bilingual in written English, and embraced by inclusive institutions that value their perspective.',
      corePillars: [
        'Universal Sign Language Fluency (NSL, BSL, ASL) across families, educators, and inclusive classmates.',
        'Curriculum-Aligned Sign Instruction tailored to Nigerian National (WAEC/JAMB), British (Cambridge/IGCSE), and American international standards.',
        'Acoustically certified classrooms that eliminate listening fatigue and generator noise interference.',
        'Equal access to STEM subjects, national and international exams, and university degrees with certified interpreters.'
      ],
      pledge: 'At Ideal Special Education Consult, we pledge to equip every deaf learner with the linguistic tools (NSL, BSL, ASL), assistive technologies, and classroom advocacy needed to realize their highest academic and career ambitions.'
    },
    conditionsIncluded: [
      'Congenital & Pre-lingual Deafness (profound hearing loss prior to spoken language; primary sign language learners)',
      'Post-lingual Deafness (hearing loss acquired through illness or trauma; learning visual sign communication)',
      'Hard-of-Hearing & Moderate Hearing Differences (benefitting from amplification + visual cues + sign support)',
      'Auditory Processing Differences (difficulty deciphering spoken words amidst background noise)',
      'Unilateral Hearing Loss (single-sided hearing requiring strategic classroom seating)',
      'Children of Deaf Adults (CODA) navigating bilingual signed (NSL/BSL/ASL) and spoken home environments'
    ],
    everydaySigns: [
      'Frequently asking teachers or family members to repeat questions or instructions',
      'Intently watching the speaker’s mouth, lips, and hand gestures to decipher spoken sentences',
      'Significant struggle following discussions in reverberant or noisy classrooms with humming ceiling fans',
      'Speaking noticeably louder or softer than expected for the environment',
      'Tilting one ear toward the speaker or leaning forward with visible concentration',
      'Exhaustion, headaches, or irritability after long school lectures due to continuous listening strain',
      'Delayed vocabulary or spoken sentence structure in early childhood despite keen visual observation',
      'Expressing strong natural desire for visual gestures and sign communication to clarify thoughts'
    ],
    howIdealHelps: [
      'Comprehensive functional communication screenings and listening evaluations in Lagos',
      'Multi-System Sign Language Training: Customized coaching in NSL, BSL, and ASL for pupils, parents, siblings, and educators',
      'Curriculum-Specific Alignment: Adapting sign instruction for Nigerian national schools (WAEC/JAMB), British schools (Cambridge/IGCSE), and American international schools',
      'School classroom acoustic audits to mitigate generator noise, reverberation, and echo bounce',
      'Teacher professional development on visual lesson pacing, face-to-face delivery, and synchronized captioning',
      'Individualized Education Program (IEP) formulation with customized deaf accommodation plans',
      'Accredited sign language interpreters for school assemblies, parent-teacher conferences, and external exams'
    ],
    classroomAccommodations: [
      'Horseshoe or semi-circular classroom seating providing an unobstructed line-of-sight to the teacher, interpreter, and peers',
      'Accredited Sign Language Interpreters (fluent in NSL for WAEC/JAMB, BSL for Cambridge/Edexcel, or ASL for American curricula)',
      'Visual alert indicators (pulsing lights or tap signals) alongside auditory bells for period changes and emergency drills',
      'Pre-distributed lesson outlines, lecture slides, and key vocabulary lists with sign glossaries before classes begin',
      'Dedicated peer note-buddy so the deaf student can maintain eye contact with the teacher and interpreter without looking down to copy',
      'Acoustic treatments: rubber ferrules on chair/desk legs to eliminate scraping sounds and curtains to dampen echo',
      'Synchronized English subtitles and transcripts for all video lessons and recorded educational media',
      'Dual-system fingerspelling references: one-handed (NSL/ASL) and two-handed (BSL) visual charts displayed in the learning space'
    ],
    reassuranceForParents: 'Deafness is a linguistic difference, never a limitation on your child’s brilliance. With early sign language fluency (NSL, BSL, or ASL), accessible visual instruction, and loving acceptance, your child will read, write, lead, and achieve extraordinary academic and professional success.',
    associatedService: 'Inclusive Classroom Setup & Accessibility Audit'
  },

  'vision-sensory': {
    id: 'vision-sensory',
    title: 'Vision & Low Vision Support',
    simplerTerm: 'Vision & Sight Needs',
    simplerSubtext: 'Braille, Large Print & Albinism Support',
    tagline: 'Ensuring learners with low vision or blindness read, navigate, and excel with confidence and dignity.',
    headerBg: 'bg-[#14532d]',
    headerBorder: 'border-[#166534]',
    accentColor: '#2e7d32',
    lightBg: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    icon: Eye,
    learnerImage: '/learners/vision-sensory.jpg',
    learnerImageAlt: 'African Nigerian school student with low vision learning happily with Braille tactile books and large print magnifying digital tablet in a sunlit classroom',
    learnerImageCaption: 'Braille tactile literacy and adaptive digital magnification — empowering students with low vision and blindness to master academic curricula independently.',
    audioScript: `Welcome to this specialist briefing on Vision and Low Vision Support from Ideal Special Education Consult. 
Every child deserves clear access to knowledge. Visual challenges, whether low vision, albinism with photophobia, or total blindness, 
should never stop a child from learning. 
When schools provide large-print books, Braille instruction, anti-glare seating, and orientation cane training, 
visually impaired students shine brightly. 
Our specialists conduct functional vision assessments, adapt curriculum into high-contrast formats, and equip teachers with low-cost adaptations. 
Our vision is simple: loss of sight must never mean a loss of vision for a bright, unlimited future.`,
    whatItIs: `Vision differences mean standard chalkboard writing, tiny textbook print, or harsh lighting make studying exhausting or impossible. 
This includes children with low vision, partial sight, albinism with sensitivity to sunlight, refractive issues, and total blindness. 
When materials are translated into large print, tactile diagrams, Braille, or digital speech, their learning potential is fully unlocked.`,
    whySimplerTerm: `Why we say "Vision & Sight Needs":
Rather than confusing medical jargon regarding diopters or ocular pathology, we focus on functional sight: Can the student read the blackboard? Are they blinded by window glare? Do they need tactile Braille or 24pt bold print? This keeps educators focused on concrete classroom solutions.`,
    whatThisSectionTalksAbout: {
      headline: 'Empowering Learners with Low Vision, Albinism & Blindness',
      summary: 'This section details our clinical and educational approach to visual differences—from managing photophobia in students with albinism to mastering Grade 1 & 2 Braille and deploying assistive optical technology.',
      keyThemes: [
        {
          title: 'Tactile Literacy & Braille Fluency (Grade 1 & 2)',
          desc: 'Braille gives blind and low-vision learners genuine literacy—enabling independent spelling, punctuation, reading comprehension, and mathematics through Nemeth code.'
        },
        {
          title: 'Albinism Care & Photophobia Management',
          desc: 'Tropical sun and harsh classroom light cause acute eye strain for children with albinism. We install anti-glare window blinds, provide tinted lenses, and position desks away from direct glare.'
        },
        {
          title: 'Large-Print Adaptation & High Contrast',
          desc: 'Standard examination print is resized to 18pt–24pt bold sans-serif fonts, paired with dark felt-tip markers on clean whiteboards instead of dusty, faded chalk.'
        },
        {
          title: 'Orientation and Mobility (O&M) Cane Independence',
          desc: 'Teaching structured cane navigation, mental mapping, and sensory spatial orientation so students navigate school grounds, corridors, and stairs with complete autonomy.'
        }
      ]
    },
    ourVisionToThem: {
      headline: 'Our Vision for Visually Impaired Learners',
      statement: 'We envision a future where loss of sight is never a loss of vision for what a child can achieve. Every child with low vision, albinism, or total blindness has an innate right to read freely, navigate their campus independently, and ascend to leadership in law, technology, diplomacy, science, and the arts.',
      corePillars: [
        'Parity of Braille & Large-Print Learning Materials across every subject.',
        'Sun-safe, glare-free classroom seating designed for albinism & low vision.',
        'Unrestricted spatial independence through Orientation & Mobility mastery.',
        'Equitable access to digital devices and automated audio exam formats.'
      ],
      pledge: 'Ideal Special Education Consult commits to tearing down every visual barrier, transforming textbooks into tactile and digital triumphs so no child’s aspirations are dimmed by lack of sight.'
    },
    conditionsIncluded: [
      'Low Vision & visual acuity differences not fully corrected by glasses',
      'Albinism with Photophobia (extreme sensitivity to bright light and sun)',
      'Total Blindness & severe visual impairment',
      'Cortical Visual Impairment (CVI) and visual processing delays',
      'Tunnel vision or peripheral field limitations'
    ],
    everydaySigns: [
      'Holding books and exercise notebooks only inches away from the face',
      'Squinting, blinking repeatedly, or tilting head to read the chalkboard',
      'Extreme discomfort, tears, or headaches in bright sunlight or under fluorescent bulbs',
      'Skipping lines, re-reading the same sentence, or losing the place on the page',
      'Hesitating or feeling anxious on unfamiliar stairs or dim hallways',
      'Bumping into low objects or desks that are just outside central vision'
    ],
    howIdealHelps: [
      'Classroom-centered functional vision evaluations',
      'Braille literacy training (Grade 1 & Grade 2 Braille) and tactile diagrams',
      'Curriculum conversion into large print (18pt to 24pt bold clear fonts)',
      'Orientation and Mobility (O&M) cane navigation across school campuses',
      'Window glare reduction and lighting optimization for classrooms'
    ],
    classroomAccommodations: [
      'Desks positioned away from direct window glare with adjustable task lamps',
      'High-contrast black markers on clean whiteboards instead of faded chalk',
      'Digital textbooks on tablets with pinch-to-zoom and text-to-speech tools',
      'Tactile rulers, embossed maps, and talking calculators for mathematics',
      'Additional time allowance for reading assignments and national examinations'
    ],
    reassuranceForParents: 'Loss of sight is never a loss of vision for the future. With Braille, assistive digital devices, and skilled educators, visually impaired learners regularly graduate at the top of their classes and become influential leaders, legal minds, and innovators.',
    associatedService: 'Assistive Technology & Adaptive Tools'
  },

  'learning-differences': {
    id: 'learning-differences',
    title: 'Learning Differences & Neurodiversity',
    simplerTerm: 'Brain Wiring & Focus Needs',
    simplerSubtext: 'ADHD, Autism Spectrum & Dyslexia Support',
    tagline: 'Every brain learns differently. We replace frustration and scolding with understanding, structure, and joy.',
    headerBg: 'bg-[#4c1d95]',
    headerBorder: 'border-[#5b21b6]',
    accentColor: '#7c3aed',
    lightBg: 'bg-[#faf5ff]',
    borderColor: 'border-[#e9d5ff]',
    icon: Puzzle,
    learnerImage: '/learners/learning-differences.jpg',
    learnerImageAlt: 'Joyful African Nigerian young student with learning differences smiling proudly while solving a colorful tactile puzzle with a patient special education educator in a calm sensory-friendly Lagos classroom',
    learnerImageCaption: 'Multisensory structured learning and sensory regulation in Lagos — channeling creative energy, deep focus, and academic breakthrough.',
    audioScript: `Welcome to this special talk on Learning and Brain Differences from Ideal Special Education Consult. 
You may have heard academic terms like neurodiversity, but in plain language, it simply means that every child's brain is wired differently. 
Children with Autism, ADHD, Dyslexia, or focus challenges are not lazy, stubborn, or broken. 
Their brains learn best through movement, clear visuals, step-by-step routines, and positive encouragement rather than long passive lectures. 
Ideal Special Education Consult designs customized Individualized Education Programs, trains shadow teachers, and guides families so each child flourishes with dignity.
Our vision is to replace scolding with structure, and confusion with celebrated brilliance.`,
    whatItIs: `Instead of confusing medical jargon, "Learning Differences" explains that human brains process information in diverse ways. 
Some children think in pictures, some need physical movement to retain concepts, while others need words broken down with sound rhythms. 
When given structured routines, patience, and multisensory teaching, children with learning differences exhibit extraordinary creativity, deep focus, and inventive problem-solving.`,
    whySimplerTerm: `Why we say "Learning Differences & Brain Wiring":
Neurodiversity is a wonderful clinical concept, but many parents worry it implies disease or mental illness. "Learning Differences" tells the liberating, accurate truth: your child's brain processes information in a distinct, creative way. When teaching matches their brain, they excel effortlessly.`,
    whatThisSectionTalksAbout: {
      headline: 'Neurodiversity, Executive Function & Multisensory Pedagogy',
      summary: 'This section dismantles harmful misconceptions that label neurodivergent children as lazy or disobedient. It outlines scientific approaches to Autism, ADHD, Dyslexia, and Dyscalculia through structured routines, sensory calm, and tailored IEPs.',
      keyThemes: [
        {
          title: 'Multisensory Phonics (Orton-Gillingham Methodology)',
          desc: 'Dyslexic learners need simultaneous visual, auditory, and kinesthetic pathways to decode letters and words, bypassing phonological memory bottlenecks.'
        },
        {
          title: 'Sensory Regulation & Calm Classroom Spaces',
          desc: 'Autistic and ADHD students often feel overwhelmed by crowded, noisy Lagos classrooms. We introduce planned movement breaks, quiet regulation corners, and fidget tools.'
        },
        {
          title: 'Executive Functioning & Visual Schedule Boards',
          desc: 'Breaking lengthy instructions into pictorial schedules and single-step directives so children master morning routines and classroom tasks independently.'
        },
        {
          title: 'Shadow Teacher Placement & Positive Behavioral Support',
          desc: 'Pairing trained learning support assistants in mainstream classrooms who translate teacher instructions and provide gentle redirection without shame.'
        }
      ]
    },
    ourVisionToThem: {
      headline: 'Our Vision for Neurodivergent Learners',
      statement: 'We envision classrooms that celebrate how different brains think, innovate, and create. We reject the harmful labels of "lazy" or "stubborn", replacing punishment with personalized IEPs, sensory empathy, and structured guidance so neurodivergent children become Nigeria\'s boldest inventors, scientists, and creators.',
      corePillars: [
        'Individualized Education Programs (IEP) tailored to unique neurological strengths.',
        'Zero tolerance for corporal punishment or public shaming for learning struggles.',
        'Sensory-friendly classrooms equipped with calm zones and movement allowances.',
        'Empowered families armed with positive behavioral strategies at home.'
      ],
      pledge: 'We stand beside every child who thinks outside conventional lines. Ideal Special Education Consult promises to defend your child\'s dignity, nurture their unique gifts, and prove to the world that different is never deficient.'
    },
    conditionsIncluded: [
      'Autism Spectrum (unique communication styles, sensory sensitivities, deep passions)',
      'ADHD (Attention Deficit Hyperactivity: energetic curiosity, impulsive focus, need for movement)',
      'Dyslexia (reading and phonics decoding differences in bright, verbal children)',
      'Dyscalculia (differences understanding numbers, math symbols, and clock time)',
      'Dysgraphia (fine motor challenges with handwriting and spatial layout on paper)',
      'Executive Function differences (organizing tasks, planning homework, time perception)'
    ],
    everydaySigns: [
      'Difficulty sitting motionless through 45-minute verbal lectures; tapping or wriggling',
      'Struggling to read aloud or reverse letters (b/d, p/q) despite high spoken intelligence',
      'Overwhelmed or distressed by loud classroom noise, crowded assemblies, or itchy fabric',
      'Deep, intense fascination with specific topics (machines, dinosaurs, art, coding)',
      'Struggling to remember multi-step instructions (e.g., "take out book, open page 40, do exercise 3")',
      'Frequent emotional outbursts when routines change abruptly without warning'
    ],
    howIdealHelps: [
      'Individualized Education Program (IEP) formulation with measurable termly milestones',
      'Shadow teacher & learning support assistant training and direct school placement',
      'Multisensory structured phonics and literacy interventions for dyslexic learners',
      'Classroom sensory-friendly spaces, movement breaks, and regulation plans',
      'Parent empowerment workshops to build calm, structured homework routines at home'
    ],
    classroomAccommodations: [
      'Visual daily schedule board using pictures and checklists so the child knows what comes next',
      'Planned 2-minute movement breaks between academic subjects to release mental energy',
      'Step-by-step instructions: giving 1 command at a time rather than a long list',
      'Allowing sensory tools: stress balls, fidget bands, or quiet noise-dampening earmuffs',
      'Alternative ways to test knowledge: oral presentations, drawings, and practical projects'
    ],
    reassuranceForParents: 'Your child is not stubborn or deficient. Some of the world’s greatest scientists, entrepreneurs, and artists had learning and attention differences. With early understanding, respectful support, and structured guidance, your child will excel and lead a joyful, fulfilled life.',
    associatedService: 'Individualised Education Programme (IEP)'
  },

  'physical-access': {
    id: 'physical-access',
    title: 'Physical & Mobility Access',
    simplerTerm: 'Physical & Movement Needs',
    simplerSubtext: 'Wheelchairs, Cerebral Palsy & Ergonomics',
    tagline: 'Removing physical barriers so every learner moves freely, sits comfortably, and writes with ease.',
    headerBg: 'bg-[#0f172a]',
    headerBorder: 'border-[#1e293b]',
    accentColor: '#0284c7',
    lightBg: 'bg-[#f0f9ff]',
    borderColor: 'border-[#bae6fd]',
    icon: Accessibility,
    learnerImage: '/learners/physical-access.jpg',
    learnerImageAlt: 'African Nigerian school boy using a modern wheelchair seated comfortably at an accessible wooden classroom desk alongside smiling classmates and an encouraging teacher',
    learnerImageCaption: 'Barrier-free universal classroom in Lagos — ergonomic seating, ramp access, and equal participation in every school and playground activity.',
    audioScript: `Welcome to this talk on Physical and Mobility Access by Ideal Special Education Consult. 
A child's physical mobility must never stand between them and quality education. 
Whether a learner uses a wheelchair, lives with Cerebral Palsy, or has fine motor challenges holding a pencil, 
our mission is to eliminate physical barriers. 
When schools install gentle ramps, wide doorways, adaptive desks, and ergonomic writing tools, 
learners participate freely and independently alongside their peers. 
Ideal Special Education Consult conducts full school accessibility audits and equips families with adaptive assistive tools across Lagos.
Our vision: every doorway open, every desk accessible, every child thriving.`,
    whatItIs: `Physical and motor differences affect how a student moves, balances, walks, or controls hand muscles for writing and self-care. 
This includes learners using wheelchairs or crutches, children with Cerebral Palsy, spina bifida, muscular dystrophy, or dyspraxia. 
When school architecture and furniture are made universally accessible, physical limitations disappear in the learning environment.`,
    whySimplerTerm: `Why we say "Physical & Movement Needs":
Instead of clinical diagnoses that intimidate families, focusing on movement highlights solutions: Can the child get into the building without steps? Can their hands hold a pen without cramping? Are the desks comfortable for wheelchair height? Solutions are practical and achievable.`,
    whatThisSectionTalksAbout: {
      headline: 'Universal Architectural Design, Ergonomics & Motor Inclusion',
      summary: 'This section demonstrates how physical environments either disable or empower a student. We show how gentle ramps, wide doorways, adaptive desks, and fine-motor writing aids guarantee full participation.',
      keyThemes: [
        {
          title: 'Architectural Accessibility & Safety Audits',
          desc: 'Eliminating steep concrete stairs, high door thresholds, and narrow toilet stalls so wheelchair and walker users move with uninterrupted autonomy.'
        },
        {
          title: 'Ergonomic Adaptive Seating & Posture Support',
          desc: 'Customized trunk supports, slant boards, and padded footrests prevent severe fatigue, spinal strain, and sliding out of rigid benches for children with Cerebral Palsy.'
        },
        {
          title: 'Fine Motor Writing Aids & Digital Typing',
          desc: 'Weighted pens, grip sleeves, and speech-to-text assistive technology eliminate hand cramps and allow students to complete examinations without physical pain.'
        },
        {
          title: 'Inclusive Physical Education & Play',
          desc: 'Ensuring sports day and playground activities are adapted with seated games, boccia, and inclusive drills so no child watches from the sidelines.'
        }
      ]
    },
    ourVisionToThem: {
      headline: 'Our Vision for Physical & Mobility Learners',
      statement: 'We envision an educational environment completely free of physical obstacles. No student in Lagos or Nigeria should ever be barred from a school because of a flight of stairs, a narrow door, or an unsuitable bench. Every learner with physical or mobility challenges has the right to enter every classroom, laboratory, and library with dignity, independence, and pride.',
      corePillars: [
        'Universal Design for Learning (UDL) applied to school architecture and furniture.',
        'Ground-floor access and 1:12 slope safety ramps across all school blocks.',
        'Accessible sanitary facilities equipped with grab bars and level thresholds.',
        'Assistive tech for seamless examination writing and typing.'
      ],
      pledge: 'Ideal Special Education Consult pledges to advocate relentlessly until every school entrance is a welcoming ramp and every classroom accommodates every child\'s physical freedom to learn and flourish.'
    },
    conditionsIncluded: [
      'Cerebral Palsy (muscle tone, balance, posture, and motor control)',
      'Wheelchair, walker, and mobility cane navigation',
      'Spina Bifida and spinal cord conditions',
      'Dyspraxia (Developmental Coordination Disorder affecting motor planning)',
      'Fine motor muscle weakness (fatigue when writing or using scissors)',
      'Post-polio syndrome and limb mobility differences'
    ],
    everydaySigns: [
      'Severe hand fatigue or pain after writing just 2 or 3 lines in an exercise book',
      'Struggling to navigate high staircases, steep curbs, or unpaved sandy school compounds',
      'Slumping or sliding out of standard rigid wooden school benches lacking trunk support',
      'Difficulty managing school bags, opening lunch boxes, or buttoning school uniforms',
      'Exclusion from physical education, school playground games, or laboratory tables',
      'Restrooms without grab bars, wide doorways, or level entrance paths'
    ],
    howIdealHelps: [
      'Institutional architectural audits for ramps, doorways, handrails, and accessible toilets',
      'Ergonomic seating and supportive adaptive desk design for classrooms',
      'Fine motor toolkits: weighted pens, angled writing boards, and pencil grip adaptations',
      'Assistive digital input: speech-to-text dictation and adaptive keyboards for exams',
      'Inclusive Physical Education (PE) guidelines so every child plays and stays active'
    ],
    classroomAccommodations: [
      'Ground-floor classroom scheduling to eliminate dangerous stair climbing',
      'Ramps with gentle incline (1:12 slope) and sturdy safety handrails on both sides',
      'Desks with adjustable height to comfortably fit wheelchairs and posture supports',
      'Permission to type on a laptop or dictate answers for lengthy essays and tests',
      'Extra time between class periods to transition safely through corridors'
    ],
    reassuranceForParents: 'Physical mobility differences do not limit your child’s sharp mind, aspirations, or potential. By transforming the environment and equipping them with adaptive tools, your child will navigate school with full independence, pride, and joy.',
    associatedService: 'Assistive Technology & Adaptive Tools'
  }
};

interface DomainTalkModalProps {
  initialDomainId: AccessibilityDomainId;
  isOpen: boolean;
  onClose: () => void;
  onBookDomainSession: (serviceTitle: string) => void;
}

export const DomainTalkModal: React.FC<DomainTalkModalProps> = ({
  initialDomainId,
  isOpen,
  onClose,
  onBookDomainSession
}) => {
  // Modal is strictly locked to the clicked domain (no cross-domain pollution)
  const activeDomainId = initialDomainId;
  const [activeTab, setActiveTab] = useState<'vision' | 'languages' | 'talk' | 'signs' | 'accommodations' | 'support'>('vision');
  
  // Speech Synthesis state (accessible audio read-aloud for hearing allies & educators)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Stop speech when modal closes or domain changes
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      setActiveTab('vision');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background body scroll while modal is open on mobile and desktop
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  const domain = DOMAINS_DATA[activeDomainId] || DOMAINS_DATA['deaf-hearing'];
  const IconComponent = domain.icon;

  // Handle audio play/pause
  const handleToggleAudio = () => {
    if (!speechSupported) return;

    if (isPlayingAudio) {
      if (isAudioPaused) {
        window.speechSynthesis.resume();
        setIsAudioPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsAudioPaused(true);
      }
      return;
    }

    // Start speaking
    window.speechSynthesis.cancel();
    const fullAudioText = `${domain.audioScript} Our vision: ${domain.ourVisionToThem.statement}`;
    const utterance = new SpeechSynthesisUtterance(fullAudioText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Female') || v.name.includes('Male')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsAudioPaused(false);
  };

  const handleCopyGuide = () => {
    const guideText = `
=== Ideal Special Education Consult ===
SPECIALIST PRACTICE: ${domain.title.toUpperCase()}
Focus: ${domain.simplerTerm} (${domain.simplerSubtext})

SIGN LANGUAGE SYSTEMS SUPPORTED:
• Nigerian Sign Language (NSL): National curriculum (WAEC, NECO, JAMB), local Deaf community integration, one-handed alphabet.
• British Sign Language (BSL): Two-handed manual fingerspelling alphabet, Cambridge Primary/IGCSE, Pearson Edexcel, UK boarding school prep.
• American Sign Language (ASL): One-handed manual alphabet, American international curricula (AISL), Gallaudet/NTID university pathways.

OUR VISION FOR THESE LEARNERS:
${domain.ourVisionToThem.headline}
"${domain.ourVisionToThem.statement}"

FOUR STRATEGIC PILLARS:
${domain.ourVisionToThem.corePillars.map(p => `• ${p}`).join('\n')}

WHAT THIS SECTION TALKS ABOUT:
${domain.whatThisSectionTalksAbout.headline}
${domain.whatThisSectionTalksAbout.summary}

KEY THEMES & APPROACH:
${domain.whatThisSectionTalksAbout.keyThemes.map(t => `• ${t.title}: ${t.desc}`).join('\n')}

EVERYDAY IDENTIFICATION SIGNS:
${domain.everydaySigns.map(s => `• ${s}`).join('\n')}

CLASSROOM & EXAM ACCOMMODATIONS:
${domain.classroomAccommodations.map(a => `• ${a}`).join('\n')}

CONSULTATION PLEDGE:
${domain.ourVisionToThem.pledge}

Lagos Office: Opposite LASU Main Campus, Ojo, Lagos State, Nigeria.
Contact: +234 816 342 0864 | idealspedconsultant@gmail.com
`.trim();

    navigator.clipboard.writeText(guideText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2600);
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="domain-talk-title"
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            stopSpeech();
            onClose();
          }}
          className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[calc(100dvh-1rem)] sm:max-h-[90vh] my-auto min-h-0"
        >
          {/* Top Header: Clean, Executive, Mobile-Friendly Single-Domain Focus */}
          <div className={`${domain.headerBg} text-white px-3.5 py-3 sm:px-8 sm:py-6 border-b ${domain.headerBorder} relative shrink-0`}>
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-2.5 sm:gap-4 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-sky-200" />
                </div>
                <div className="min-w-0 flex-1">
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-sky-200 uppercase tracking-wider mb-0.5 sm:mb-1">
                    <span>Specialist Practice</span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span>{domain.simplerTerm}</span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span>Lagos Practice</span>
                  </div>
                  
                  <h2 id="domain-talk-title" className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white font-headline tracking-tight leading-tight">
                    {domain.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-slate-200 mt-0.5 sm:mt-1 max-w-2xl leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {domain.tagline}
                  </p>
                </div>
              </div>

              {/* Accessible Close Button */}
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  onClose();
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close specialist modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Utility Bar: Visual Access First, Auxiliary Audio for Hearing Allies, Copy Guide */}
          <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2 sm:px-6 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-slate-600 font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                <FileText className="w-3.5 h-3.5 text-[#004872] shrink-0" />
                <span>Format: Visual Guidance & Transcript</span>
              </span>

              {/* Secondary Audio Playback for Hearing Allies & Educators */}
              {speechSupported && (
                <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 border-l border-slate-300">
                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md font-semibold transition-colors cursor-pointer text-[11px] sm:text-xs ${
                      isPlayingAudio && !isAudioPaused
                        ? 'bg-[#366a1d] text-white hover:bg-[#2b5417]'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Audio narration for hearing teachers, parents, and allies"
                  >
                    {isPlayingAudio && !isAudioPaused ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>Pause Audio</span>
                      </>
                    ) : isAudioPaused ? (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Resume Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-slate-600" />
                        <span>Audio Read-Aloud</span>
                      </>
                    )}
                  </button>

                  {isPlayingAudio && (
                    <button
                      type="button"
                      onClick={stopSpeech}
                      className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium cursor-pointer text-xs"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Stop</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Copy Comprehensive Guide */}
            <div>
              <button
                type="button"
                onClick={handleCopyGuide}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold text-[#004872] bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-700 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#004872]" />
                    <span>Copy Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Clean Segmented Tab Navigation (Mobile touch-scrolling enabled) */}
          <div className="shrink-0 px-3 sm:px-6 pt-1.5 sm:pt-2 border-b border-slate-200 bg-white flex space-x-3 sm:space-x-6 overflow-x-auto overscroll-x-contain touch-pan-x">
            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              className={`shrink-0 pb-2 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'vision'
                  ? 'border-[#004872] text-[#004872]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Vision & Learner Focus</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('languages')}
              className={`shrink-0 pb-2 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'languages'
                  ? 'border-[#004872] text-[#004872]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0074b6]" />
              <span>Sign Languages (NSL · BSL · ASL)</span>
            </button>
            
            <button
              type="button"
              onClick={() => setActiveTab('talk')}
              className={`shrink-0 pb-2 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'talk'
                  ? 'border-[#004872] text-[#004872]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>What Section Talks About</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('signs')}
              className={`shrink-0 pb-2 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'signs'
                  ? 'border-[#004872] text-[#004872]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Everyday Signs & Screening</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('accommodations')}
              className={`shrink-0 pb-2 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'accommodations'
                  ? 'border-[#004872] text-[#004872]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Classroom Accommodations</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('support')}
              className={`shrink-0 pb-2 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'support'
                  ? 'border-[#004872] text-[#004872]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>How Ideal Helps</span>
            </button>
          </div>

          {/* Scrollable Body Content with Mobile Momentum Touch Scrolling */}
          <div 
            className="p-3.5 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4 sm:space-y-6 text-[#121c27] overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Tab 1: Vision & Dedicated Learner Focus */}
            {activeTab === 'vision' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Specific Learner Photograph Showcase Card */}
                <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <div className="relative aspect-16/9 sm:aspect-21/9 max-h-[320px] bg-slate-900 overflow-hidden">
                    <img
                      src={domain.learnerImage}
                      alt={domain.learnerImageAlt}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    {/* Clean Photographer / Focus Tag */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                        <IconComponent className="w-3.5 h-3.5 text-sky-300" />
                        <span>{domain.title} · Authentic Classroom Practice</span>
                      </div>
                    </div>

                    {/* Bottom Caption on Photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed drop-shadow-xs">
                        {domain.learnerImageCaption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Our Vision Declaration Card */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#004872] text-white flex items-center justify-center shrink-0">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                        Institutional Vision & Direction
                      </span>
                      <h3 className="text-lg font-bold text-[#004872]">
                        {domain.ourVisionToThem.headline}
                      </h3>
                    </div>
                  </div>

                  <blockquote className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-white p-4 rounded-lg border border-slate-200/90 shadow-2xs my-4 italic">
                    "{domain.ourVisionToThem.statement}"
                  </blockquote>

                  {/* Core Strategic Pillars */}
                  <div className="pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#004872] mb-3 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-[#366a1d]" />
                      <span>Four Strategic Pillars for These Learners:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {domain.ourVisionToThem.corePillars.map((pillar, pIdx) => (
                        <div 
                          key={pIdx}
                          className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Consultation Pledge */}
                  <div className="mt-4 p-3.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#004872] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#004872] font-semibold">Consultation Pledge:</strong> {domain.ourVisionToThem.pledge}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Sign Languages Triad (NSL · BSL · ASL) Comprehensive Framework */}
            {activeTab === 'languages' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Executive Orientation Banner */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0074b6] uppercase tracking-wider mb-1">
                    <Languages className="w-4 h-4 text-[#0074b6]" />
                    <span>Linguistic Diversity in Deaf Education</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#004872] mb-1.5">
                    The Sign Language Triad: Nigerian (NSL), British (BSL) & American (ASL)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    At Ideal Special Education Consult, our deaf education specialists reject a one-size-fits-all approach. 
                    Because inclusive and international schools across Lagos, Abuja, and Nigeria operate under varied curricula—from the Nigerian national NERDC syllabus to British Cambridge and American curricula—we provide tailored training, curriculum adaptations, and accredited interpreting across all three recognized sign systems.
                  </p>
                </div>

                {/* 3 Core Sign Systems Cards */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    In-Depth Framework for Each Sign Language System:
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 1. Nigerian Sign Language (NSL) */}
                    <div className="bg-white rounded-xl border border-emerald-200 p-5 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            Nigeria · National Standard
                          </span>
                          <span className="text-base">🇳🇬</span>
                        </div>
                        
                        <h5 className="text-base font-bold text-slate-900 mb-1">
                          Nigerian Sign Language (NSL)
                        </h5>
                        <p className="text-xs text-emerald-950 font-medium mb-3">
                          Primary National & Cultural Sign Language
                        </p>

                        <div className="space-y-2.5 text-xs text-slate-700">
                          <div>
                            <span className="font-bold text-slate-900 block">Manual Alphabet:</span>
                            <span className="text-slate-600">One-handed fingerspelling with Andrew Foster heritage & distinct Nigerian lexical modifications.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Target Curriculum:</span>
                            <span className="text-slate-600">NERDC National Curriculum, Federal Unity Colleges, State Inclusive Primary & Secondary Schools.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Examinations Supported:</span>
                            <span className="text-slate-600">WAEC (WASSCE), NECO, JAMB UTME, BECE, National Common Entrance Examination.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Cultural Lexicon:</span>
                            <span className="text-slate-600">Rich indigenous signs for Nigerian foods (egusi, jollof), traditional ceremonies, Naira denominations, and local geolocations.</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-emerald-800 block">
                          Ideal SpEd Training: Family immersion, peer sign clubs, and accredited WAEC/JAMB exam hall interpreting.
                        </span>
                      </div>
                    </div>

                    {/* 2. British Sign Language (BSL) */}
                    <div className="bg-white rounded-xl border border-sky-200 p-5 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#004872] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                            UK · Cambridge International
                          </span>
                          <span className="text-base">🇬🇧</span>
                        </div>
                        
                        <h5 className="text-base font-bold text-slate-900 mb-1">
                          British Sign Language (BSL)
                        </h5>
                        <p className="text-xs text-[#004872] font-medium mb-3">
                          British Curriculum & Commonwealth Standard
                        </p>

                        <div className="space-y-2.5 text-xs text-slate-700">
                          <div>
                            <span className="font-bold text-slate-900 block">Manual Alphabet:</span>
                            <span className="text-slate-600">Celebrated two-handed fingerspelling alphabet where both hands work together to formulate letters (vowels on fingertips).</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Target Curriculum:</span>
                            <span className="text-slate-600">British International Schools in Lagos/Abuja, Cambridge Primary, Lower Secondary, and UK Boarding preparation.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Examinations Supported:</span>
                            <span className="text-slate-600">Cambridge Checkpoint, Cambridge IGCSE, Pearson Edexcel GCSE, GCE AS & A-Levels.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Linguistic Syntax:</span>
                            <span className="text-slate-600">Topic-comment structure independent of spoken English word order, utilizing spatial timelines and facial grammar.</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-[#004872] block">
                          Ideal SpEd Training: Cambridge syllabus sign vocabulary glossing and two-handed fingerspelling coaching for LSAs and teachers.
                        </span>
                      </div>
                    </div>

                    {/* 3. American Sign Language (ASL) */}
                    <div className="bg-white rounded-xl border border-indigo-200 p-5 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                            Global · Collegiate & International
                          </span>
                          <span className="text-base">🇺🇸</span>
                        </div>
                        
                        <h5 className="text-base font-bold text-slate-900 mb-1">
                          American Sign Language (ASL)
                        </h5>
                        <p className="text-xs text-indigo-900 font-medium mb-3">
                          International Deaf Academia & College Prep
                        </p>

                        <div className="space-y-2.5 text-xs text-slate-700">
                          <div>
                            <span className="font-bold text-slate-900 block">Manual Alphabet:</span>
                            <span className="text-slate-600">Standardized one-handed manual alphabet (A to Z) with high velocity finger configurations.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Target Curriculum:</span>
                            <span className="text-slate-600">American International Schools (AISL), International Baccalaureate (IB), and American homeschool frameworks.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Examinations Supported:</span>
                            <span className="text-slate-600">College Board SAT, ACT, AP Exams, Gallaudet University Entrance, and NTID/RIT admissions tests.</span>
                          </div>

                          <div>
                            <span className="font-bold text-slate-900 block">Global Scope:</span>
                            <span className="text-slate-600">Global lingua franca of international Deaf academia, exchange programs, and vast digital video repositories.</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-indigo-800 block">
                          Ideal SpEd Training: Academic ASL terminology, collegiate admissions coaching for Gallaudet/NTID, and global interpreting.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Comparison Matrix Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-[#004872]">
                        Sign Language Systems Comparison & Educational Mapping
                      </h5>
                      <p className="text-xs text-slate-500">
                        Quick reference for Nigerian parents, school principals, and special needs coordinators.
                      </p>
                    </div>
                    <GraduationCap className="w-5 h-5 text-[#004872]" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700">
                      <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Sign System</th>
                          <th className="p-3">Manual Alphabet</th>
                          <th className="p-3">Primary School Type in Nigeria</th>
                          <th className="p-3">Key Examination Boards</th>
                          <th className="p-3">Ideal SpEd Service</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-emerald-900">
                            Nigerian Sign Language (NSL)
                          </td>
                          <td className="p-3">One-handed + Indigenous signs</td>
                          <td className="p-3">National NERDC / Federal Unity / Inclusive schools</td>
                          <td className="p-3 font-semibold text-slate-900">WAEC, NECO, JAMB, BECE</td>
                          <td className="p-3 text-emerald-700 font-medium">Family immersion & exam interpreters</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-[#004872]">
                            British Sign Language (BSL)
                          </td>
                          <td className="p-3">Two-handed (hand-on-hand)</td>
                          <td className="p-3">British International / Cambridge schools</td>
                          <td className="p-3 font-semibold text-slate-900">Cambridge IGCSE, Edexcel, A-Levels</td>
                          <td className="p-3 text-[#004872] font-medium">Cambridge sign glossaries & LSA coaching</td>
                        </tr>
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-bold text-indigo-900">
                            American Sign Language (ASL)
                          </td>
                          <td className="p-3">One-handed (standard A-Z)</td>
                          <td className="p-3">American schools & collegiate pathways</td>
                          <td className="p-3 font-semibold text-slate-900">SAT, ACT, Gallaudet / NTID Entrance</td>
                          <td className="p-3 text-indigo-700 font-medium">Academic ASL & US college prep</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Practical Decision Guidance for Parents & Schools */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <h5 className="text-sm font-bold text-[#004872]">
                      Which Sign Language Should Your Child or School Prioritize?
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <strong className="text-emerald-900 font-bold block mb-1">
                        Scenario 1: Nigerian National Curriculum (WAEC/JAMB)
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Prioritize <span className="font-semibold text-emerald-800">NSL</span>. It guarantees smooth communication with Nigerian Deaf peers, local educators, and accredited examiners for WAEC, NECO, and JAMB.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <strong className="text-[#004872] font-bold block mb-1">
                        Scenario 2: British International & Cambridge Schools
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Prioritize <span className="font-semibold text-[#004872]">BSL</span> for classroom learning support and Cambridge IGCSE examination access, while supporting NSL for peer socialization in Nigeria.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <strong className="text-indigo-900 font-bold block mb-1">
                        Scenario 3: American School or Global University Ambitions
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Prioritize <span className="font-semibold text-indigo-800">ASL</span> for American standardized tests (SAT/ACT) and application pipelines to world-class Deaf universities like Gallaudet or NTID.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <strong className="text-slate-900 font-bold block mb-1">
                        Scenario 4: Multilingual Sign Fluency (Total Communication)
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Deaf children are gifted visual linguists. Ideal SpEd Consult offers blended trilingual modules so learners effortlessly switch between NSL, BSL, and ASL.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sign Language Consultation CTA */}
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h5 className="text-sm font-bold text-[#004872]">
                      Need Sign Language Training or a Certified Interpreter?
                    </h5>
                    <p className="text-xs text-slate-600">
                      We train families, schoolteachers, and provide accredited interpreters for NSL, BSL, and ASL in Lagos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      stopSpeech();
                      onClose();
                      onBookDomainSession('Sign Language Training & Interpretation (NSL, BSL, ASL)');
                    }}
                    className="px-4 py-2 rounded-lg bg-[#004872] hover:bg-[#003453] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Request Sign Language Session
                  </button>
                </div>
              </motion.div>
            )}

            {/* Tab 2: What This Section Talks About & Specialist Transcript */}
            {activeTab === 'talk' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Plain-Language Orientation */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    <Info className="w-4 h-4 text-[#0074b6]" />
                    <span>Plain-Language Overview</span>
                  </div>
                  <h3 className="text-base font-bold text-[#004872] mb-2">
                    {domain.whatThisSectionTalksAbout.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {domain.whatThisSectionTalksAbout.summary}
                  </p>
                </div>

                {/* Key Thematic Deep Dives */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Core Focus Areas Addressed in This Section:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {domain.whatThisSectionTalksAbout.keyThemes.map((theme, tIdx) => (
                      <div key={tIdx} className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs">
                        <h5 className="text-sm font-bold text-[#121c27] mb-1.5 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#0074b6]" />
                          <span>{theme.title}</span>
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {theme.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Visual Briefing Transcript (Crucial for Deaf & Hard of Hearing Reading) */}
                <div className="p-5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#004872]" />
                      <h4 className="text-sm font-bold text-[#004872]">
                        Complete Written Specialist Briefing
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500">
                      Standard Practice Transcript
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {domain.audioScript}
                  </p>
                </div>

                {/* Why We Use Plain Terms */}
                {domain.whySimplerTerm && (
                  <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
                    <div className="flex items-center gap-2 font-bold mb-1 text-emerald-950">
                      <Lightbulb className="w-4 h-4 text-emerald-700" />
                      <span>Why We Value Plain Language Over Clinical Jargon</span>
                    </div>
                    <p className="leading-relaxed">
                      {domain.whySimplerTerm}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 3: Everyday Signs & Early Screening */}
            {activeTab === 'signs' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-lg text-xs sm:text-sm text-amber-900">
                  <div className="font-bold flex items-center gap-2 mb-1 text-amber-950">
                    <HelpCircle className="w-4 h-4 text-amber-700" />
                    <span>Early Identification Checklist</span>
                  </div>
                  <p className="leading-relaxed">
                    Early identification is the most critical intervention for communication parity. If you observe several of these indicators in a child, scheduling an evaluation ensures immediate educational support.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Everyday Behavioral & Classroom Indicators:
                  </h4>
                  <div className="space-y-2.5">
                    {domain.everydaySigns.map((sign, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-start gap-3 text-xs sm:text-sm"
                      >
                        <span className="w-6 h-6 rounded-md bg-[#004872]/10 text-[#004872] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-800 leading-relaxed font-medium">
                          {sign}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Profiles & Sub-types Included */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Specific Profiles Supported Under This Category:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {domain.conditionsIncluded.map((cond, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                        <span className="font-medium">{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: Classroom & Examination Accommodations */}
            {activeTab === 'accommodations' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-lg text-xs sm:text-sm text-[#004872]">
                  <p className="font-medium leading-relaxed">
                    Accommodations do not lower curriculum rigor—they remove arbitrary communication barriers so learners demonstrate their authentic subject mastery.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Classroom & National Examination Standards:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {domain.classroomAccommodations.map((acc, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-start gap-3 text-xs sm:text-sm"
                      >
                        <ShieldCheck className="w-5 h-5 text-[#366a1d] shrink-0 mt-0.5" />
                        <p className="text-slate-800 font-medium leading-relaxed">
                          {acc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parent Reassurance */}
                <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#004872] uppercase tracking-wider mb-2">
                    <Heart className="w-4 h-4 text-[#366a1d]" />
                    <span>Reassurance for Families & Educators</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{domain.reassuranceForParents}"
                  </p>
                </div>
              </motion.div>
            )}

            {/* Tab 5: How Ideal SpEd Consult Helps */}
            {activeTab === 'support' && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <h4 className="font-bold text-sm text-[#004872] mb-1">
                    Specialized Consulting & In-Person Practice in Lagos
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our team conducts on-site evaluations in schools, homes, and learning centres across Lagos (Opposite LASU Main Campus, Ojo).
                  </p>
                </div>

                <div className="space-y-3">
                  {domain.howIdealHelps.map((help, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#366a1d] shrink-0 mt-0.5" />
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {help}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Bar Footer with Mobile Responsive Stacking */}
          <div className="bg-slate-50 border-t border-slate-200 px-3.5 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
            <div className="text-xs text-slate-600 text-center sm:text-left">
              <span className="font-semibold text-slate-800">Ideal Special Education Consult</span> · Consultation & Audits in Lagos
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              {/* WhatsApp direct discussion */}
              <a
                href={`https://wa.me/2348163420864?text=${encodeURIComponent(`Hello Ideal Special Education Consult, I would like to inquire about specialized consultation for: ${domain.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#14532d] bg-[#dcfce7] hover:bg-[#bbf7d0] border border-[#86efac] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#16a34a] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Book Assessment CTA */}
              <button
                type="button"
                onClick={() => {
                  stopSpeech();
                  onClose();
                  onBookDomainSession(domain.associatedService);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#004872] hover:bg-[#003453] shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book Assessment for this Category</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
