export interface EventSlideItem {
  id: string;
  type: 'image' | 'video';
  status: 'upcoming' | 'past';
  title: string;
  category: string;
  date: string;
  time?: string;
  location: string;
  mediaUrl: string;
  videoUrl?: string;
  poster?: string;
  registrationOpen?: boolean;
}

export const EVENT_SLIDES_DATA: EventSlideItem[] = [
  // Upcoming Event 1
  {
    id: 'upcoming-teacher-workshop-2026',
    type: 'image',
    status: 'upcoming',
    title: 'Upcoming: Lagos Inclusive Classroom & Differentiated Instruction Workshop',
    category: 'Educator Training',
    date: 'Saturday, October 24, 2026',
    time: '10:00 AM – 2:00 PM WAT',
    location: 'LASU Education Corridor Auditorium, Ojo, Lagos (Hybrid)',
    mediaUrl: '/events/past_event_summit_1790589441170.jpg',
    registrationOpen: true
  },
  // Past Event Video Talk
  {
    id: 'talk-neurodiversity-video',
    type: 'video',
    status: 'past',
    title: 'Past Talk: Early Identification of Autism, ADHD & Speech Differences',
    category: 'Specialist Keynote Video',
    date: 'October 2025',
    location: 'Lagos Pediatric & Educational Forum (Hybrid)',
    mediaUrl: '/learners/learning-differences.jpg',
    poster: '/learners/learning-differences.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  // Upcoming Event 2
  {
    id: 'upcoming-early-screening-2026',
    type: 'image',
    status: 'upcoming',
    title: 'Upcoming: Free Community Developmental & Speech Screening Day',
    category: 'Pediatric Early Screening Clinic',
    date: 'Saturday, November 14, 2026',
    time: '9:00 AM – 3:30 PM WAT',
    location: 'Ideal Special Education Consult Suite, Opposite LASU, Ojo',
    mediaUrl: '/events/past_event_clinic_1790589453307.jpg',
    registrationOpen: true
  },
  // Past Event Image
  {
    id: 'summit-2025',
    type: 'image',
    status: 'past',
    title: 'Past Summit: Inclusive Education Summit for 140+ Educators',
    category: 'Teacher Capacity Building',
    date: 'November 2025',
    location: 'LASU Education Corridor Hall, Ojo, Lagos',
    mediaUrl: '/events/past_event_summit_1790589441170.jpg'
  },
  // Upcoming Event 3
  {
    id: 'upcoming-braille-sign-expo-2026',
    type: 'image',
    status: 'upcoming',
    title: 'Upcoming: Assistive Tech, Braille & Nigerian Sign Language Immersion Day',
    category: 'Assistive Tech & Sign Language',
    date: 'Saturday, December 05, 2026',
    time: '11:00 AM – 3:00 PM WAT',
    location: 'Inclusive Tech Lab, Ikeja, Lagos & Live Stream',
    mediaUrl: '/events/past_event_expo_1790589466267.jpg',
    registrationOpen: true
  },
  // Past Event Video
  {
    id: 'sign-language-video',
    type: 'video',
    status: 'past',
    title: 'Past Session: Nigerian Sign Language (NSL) & Visual Classrooms',
    category: 'Deaf Education Video',
    date: 'April 2025',
    location: 'Ideal Training Center, Lagos',
    mediaUrl: '/learners/deaf-hearing.jpg',
    poster: '/learners/deaf-hearing.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  // Past Event Image
  {
    id: 'braille-tech-expo',
    type: 'image',
    status: 'past',
    title: 'Past Expo: Assistive Technology, Tactile Learning & Low Vision Tools',
    category: 'Assistive Technology',
    date: 'June 2025',
    location: 'Ikeja Inclusive Innovation Hub, Lagos',
    mediaUrl: '/events/past_event_expo_1790589466267.jpg'
  },
  // Past Event Image
  {
    id: 'transition-roundtable',
    type: 'image',
    status: 'past',
    title: 'Past Roundtable: School Transitions from Early Intervention to Mainstream',
    category: 'School Proprietors Roundtable',
    date: 'January 2025',
    location: 'Lagos Island Civic Centre, Lagos',
    mediaUrl: '/inclusive-classroom.jpg'
  }
];

// Backward-compatible exports
export const PAST_EVENTS_DATA = EVENT_SLIDES_DATA;
export type PastEventItem = EventSlideItem;
